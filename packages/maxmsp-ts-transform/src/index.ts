import * as ts from 'typescript';

/**
 * Max 8 Promise type declarations for TypeScript compilation
 * These provide Promise types without requiring es2015.promise lib
 */
const MAX8_PROMISE_TYPES = `
declare global {
  interface Promise<T> {
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): Promise<TResult1 | TResult2>;
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): Promise<T | TResult>;
  }
  
  interface PromiseConstructor {
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
    reject<T = never>(reason?: any): Promise<T>;
    all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
  }
  
  var Promise: PromiseConstructor;
}
`;

/**
 * Max 8 Iterator polyfill for TypeScript's __generator helper
 * This minimal polyfill makes TypeScript's generator-based async/await work in Max 8
 */
const MAX8_ITERATOR_POLYFILL = `
// Max 8 Iterator polyfill for async/await support
(function() {
  // Max 8's built-in Iterator has incompatible prototype that breaks TypeScript's __generator
  // Solution: Hide the native Iterator so __generator falls back to Object.prototype
  // __generator code: g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype)

  // Save reference to native Iterator if it exists
  var NativeIterator = (typeof Iterator !== 'undefined') ? Iterator : null;

  // Force Iterator to be undefined during __generator execution
  // This makes __generator use Object.prototype instead
  try {
    delete this.Iterator;
  } catch(e) {
    // In strict mode or if Iterator is non-configurable, set to undefined
    this.Iterator = undefined;
  }
})();
`;

/**
 * Max 8 Promise polyfill code that uses Max Task for scheduling
 * This polyfill must be injected at the top of compiled files
 * to ensure Promise is available before TypeScript's async/await helpers execute
 */
const MAX8_PROMISE_POLYFILL = `
// Max 8 Promise polyfill - must be first!
(function() {
  if (typeof Promise !== 'undefined') {
    return;
  }
  
  function Max8Promise(executor) {
    var self = this;
    self.state = 'pending';
    self.value = undefined;
    self.handlers = [];
    
    function resolve(result) {
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.value = result;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function reject(error) {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.value = error;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function handle(handler) {
      if (self.state === 'pending') {
        self.handlers.push(handler);
      } else {
        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(self.value);
        }
        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
          handler.onRejected(self.value);
        }
      }
    }
    
    this.then = function(onFulfilled, onRejected) {
      return new Max8Promise(function(resolve, reject) {
        handle({
          onFulfilled: function(result) {
            try {
              resolve(onFulfilled ? onFulfilled(result) : result);
            } catch (ex) {
              reject(ex);
            }
          },
          onRejected: function(error) {
            try {
              resolve(onRejected ? onRejected(error) : error);
            } catch (ex) {
              reject(ex);
            }
          }
        });
      });
    };
    
    this.catch = function(onRejected) {
      return this.then(null, onRejected);
    };
    
    try {
      executor(resolve, reject);
    } catch (ex) {
      reject(ex);
    }
  }
  
  Max8Promise.resolve = function(value) {
    return new Max8Promise(function(resolve) {
      resolve(value);
    });
  };
  
  Max8Promise.reject = function(reason) {
    return new Max8Promise(function(resolve, reject) {
      reject(reason);
    });
  };
  
  Max8Promise.all = function(promises) {
    return new Max8Promise(function(resolve, reject) {
      if (promises.length === 0) {
        resolve([]);
        return;
      }
      
      var results = [];
      var completed = 0;
      
      promises.forEach(function(promise, index) {
        Max8Promise.resolve(promise).then(function(value) {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }, reject);
      });
    });
  };
  
  // Register globally using direct assignment (works in Max 8)
  Promise = Max8Promise;
})();
`;

/**
 * Custom TypeScript transformer for Max 8 compatibility
 * Injects Promise polyfill at the top of compiled files
 */
export class Max8TransformTransformer {
  constructor(private options: Max8TransformOptions = {}) {}

  public create(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
    return (sourceFile: ts.SourceFile) => {
      return this.transformSourceFile(sourceFile, context);
    };
  }

  /**
   * Post-emit transformer that injects polyfill as raw text at the very top
   * This ensures the polyfill appears before any TypeScript-generated helpers
   */
  public createPostEmit(): ts.Transformer<ts.SourceFile> {
    return (sourceFile: ts.SourceFile) => {
      // Only inject polyfill if this is a JavaScript file and polyfill injection is enabled
      if (!this.options.injectPolyfill || sourceFile.isDeclarationFile) {
        return sourceFile;
      }

      // Check if the file contains async/await in the source text
      // This is more reliable than AST detection which can be affected by compiler host modifications
      const sourceText = sourceFile.text;
      const hasAsyncInText = sourceText.includes('async ') || sourceText.includes('await ') || sourceText.includes(': Promise<');
      
      if (!hasAsyncInText) {
        return sourceFile;
      }

      // Create a raw text injection that will be emitted at the very top
      // This bypasses TypeScript's AST and injects directly into the output
      // Include both Iterator and Promise polyfills for full async/await support
      const polyfillCode = MAX8_ITERATOR_POLYFILL.trim() + '\n' + MAX8_PROMISE_POLYFILL.trim();
      
      // Create a statement that will be emitted as raw JavaScript
      // We use a special marker that can be replaced during post-processing
      const polyfillMarker = ts.factory.createExpressionStatement(
        ts.factory.createStringLiteral(`__MAX8_POLYFILL_START__${polyfillCode}__MAX8_POLYFILL_END__`)
      );

      // Insert polyfill marker at the beginning of the file
      const newStatements = [polyfillMarker, ...sourceFile.statements];
      
      return ts.factory.updateSourceFile(
        sourceFile,
        newStatements
      );
    };
  }

  /**
   * Post-emit text replacement function that processes the emitted JavaScript
   * This is called after TypeScript compilation to inject the polyfill at the very top
   */
  public static processEmittedText(emittedText: string): string {
    // Look for the polyfill marker and replace it with the actual polyfill
    const polyfillMarker = /"__MAX8_POLYFILL_START__(.*?)__MAX8_POLYFILL_END__"/s;
    const match = emittedText.match(polyfillMarker);

    if (match) {
      const polyfillCode = match[1];
      // Unescape the newlines that TypeScript added when emitting the string literal
      const unescapedPolyfill = polyfillCode.replace(/\\n/g, '\n');
      // Remove the marker line and inject the polyfill at the very top
      const textWithoutMarker = emittedText.replace(polyfillMarker, '');
      return unescapedPolyfill + '\n' + textWithoutMarker;
    }

    return emittedText;
  }

  private transformSourceFile(
    sourceFile: ts.SourceFile,
    context: ts.TransformationContext
  ): ts.SourceFile {
    // Only inject polyfill if this is a JavaScript file and polyfill injection is enabled
    if (!this.options.injectPolyfill || sourceFile.isDeclarationFile) {
      return sourceFile;
    }

    // Check if this file contains async/await or Promise usage
    const hasAsyncCode = this.hasAsyncCode(sourceFile);
    if (!hasAsyncCode) {
      return sourceFile;
    }

    // Create the polyfill statement - inject as raw JavaScript code
    // Use a simple function call that will be emitted at the top
    const polyfillStatement = ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createParenthesizedExpression(
          ts.factory.createFunctionExpression(
            undefined,
            undefined,
            undefined,
            undefined,
            [],
            undefined,
            ts.factory.createBlock([
              ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                  ts.factory.createIdentifier('eval'),
                  undefined,
                  [ts.factory.createStringLiteral(MAX8_PROMISE_POLYFILL)]
                )
              )
            ])
          )
        ),
        undefined,
        []
      )
    );

    // Insert polyfill at the beginning of the file
    const newStatements = [polyfillStatement, ...sourceFile.statements];
    
    return ts.factory.updateSourceFile(
      sourceFile,
      newStatements
    );
  }

  /**
   * Check if the source file contains async/await or Promise usage
   */
  private hasAsyncCode(sourceFile: ts.SourceFile): boolean {
    let hasAsync = false;
    
    const visit = (node: ts.Node): void => {
      if (hasAsync) return;
      
      // Check for async functions
      if (ts.isFunctionDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)) {
        hasAsync = true;
        return;
      }
      
      if (ts.isMethodDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)) {
        hasAsync = true;
        return;
      }
      
      if (ts.isArrowFunction(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)) {
        hasAsync = true;
        return;
      }
      
      // Check for await expressions
      if (ts.isAwaitExpression(node)) {
        hasAsync = true;
        return;
      }
      
      // Check for Promise references
      if (ts.isIdentifier(node) && node.text === 'Promise') {
        hasAsync = true;
        return;
      }
      
      ts.forEachChild(node, visit);
    };
    
    visit(sourceFile);
    return hasAsync;
  }
}

/**
 * Options for the Max 8 transform
 */
export interface Max8TransformOptions {
  /**
   * Whether to inject Promise polyfill into compiled files
   * @default true
   */
  injectPolyfill?: boolean;
  
  /**
   * Custom polyfill code to inject (optional)
   * If not provided, uses the built-in Max 8 polyfill
   */
  customPolyfill?: string;
}

/**
 * Create a Max 8 transform transformer factory for before phase
 */
export function createMax8Transform(options?: Max8TransformOptions): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return new Max8TransformTransformer(options).create(context);
  };
}

/**
 * Create a Max 8 transform transformer factory for after phase
 * This ensures the polyfill is injected after TypeScript helpers are generated
 */
export function createMax8TransformAfter(options?: Max8TransformOptions): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return new Max8TransformTransformer(options).createPostEmit();
  };
}


/**
 * Default export for easy importing
 */
export default Max8TransformTransformer;
