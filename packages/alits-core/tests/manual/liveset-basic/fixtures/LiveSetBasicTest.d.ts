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
declare const _default: {};
export = _default;
//# sourceMappingURL=LiveSetBasicTest.d.ts.map