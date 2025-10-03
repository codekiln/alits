declare global {
    interface Promise<T> {
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    }
    interface PromiseConstructor {
        new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
        resolve<T>(value: T | PromiseLike<T>): Promise<T>;
        reject<T = never>(reason?: any): Promise<T>;
        all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
    }
    var Promise: PromiseConstructor;
}
declare function printBuildInfo(): void;
declare function testPromisePolyfill(): void;
declare function testTypeofOperator(): void;
declare function testInstanceofOperator(): void;
declare function testObjectMethods(): void;
declare function testArrayMethods(): void;
declare function testGlobalMethods(): void;
declare function testES5Features(): void;
declare function testMax8SpecificFeatures(): void;
declare function test_promise(): void;
declare function test_typeof(): void;
declare function test_instanceof(): void;
declare function test_object_methods(): void;
declare function test_array_methods(): void;
declare function test_global_methods(): void;
declare function test_es5_features(): void;
declare function test_max8_features(): void;
//# sourceMappingURL=GlobalMethodsTest.d.ts.map