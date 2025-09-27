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
 * Max 8 Promise polyfill code that uses Max Task for scheduling
 * This polyfill must be injected at the top of compiled files
 * to ensure Promise is available before TypeScript's async/await helpers execute
 */
const MAX8_PROMISE_POLYFILL = `
(function() {
  // Check if Promise already exists - typeof returns "undefined" for undeclared variables
  if (typeof Promise !== 'undefined') {
    return;
  }
  
  // Max Task-based Promise implementation
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
  
  // Register globally immediately
  if (typeof global !== 'undefined') {
    global.Promise = Max8Promise;
  } else {
    eval('Promise = Max8Promise');
  }
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

    // Create the polyfill statement
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
                  ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier('eval'),
                    ts.factory.createIdentifier('call')
                  ),
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
 * Create a Max 8 transform transformer factory
 */
export function createMax8Transform(options?: Max8TransformOptions): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return new Max8TransformTransformer(options).create(context);
  };
}

/**
 * Default export for easy importing
 */
export default Max8TransformTransformer;
