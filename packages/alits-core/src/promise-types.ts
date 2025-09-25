// Promise Type Exports for Max 8 Compatibility
// This module exports Promise types that are compatible with Max 8 JavaScript runtime

// Re-export Promise types for Max 8 compatibility
export type PromiseConstructor = typeof Promise;
export type Promise<T> = globalThis.Promise<T>;
export type PromiseLike<T> = globalThis.PromiseLike<T>;

// Max 8 specific Promise utilities
export interface Max8PromiseOptions {
    useTaskObject?: boolean;
    timeout?: number;
}

// Max 8 compatible Promise factory
export function createMax8Promise<T>(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
    options?: Max8PromiseOptions
): Promise<T> {
    return new Promise(executor);
}