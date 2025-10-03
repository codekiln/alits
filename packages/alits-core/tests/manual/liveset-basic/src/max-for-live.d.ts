// Max for Live TypeScript Type Definitions
// These declarations provide type safety for Max 8 JavaScript runtime APIs

// Max for Live Global Variables
declare var inlets: number;
declare var outlets: number;
declare var autowatch: number;
declare var post: (message: string) => void;

// Max for Live API Classes
declare class LiveAPI {
    constructor(objectName: string);
    call(method: string, ...args: any[]): any;
    get(path: string): any;
    set(path: string, value: any): void;
}

// Max Task Object for Scheduling (Max 8 Promise polyfill alternative)
declare class Task {
    constructor(callback: () => void, context?: any);
    schedule(delay: number): void;
}

// Max for Live Global Functions
declare function outlet(port: number, value: any): void;
declare function inlet(port: number): any;
declare function bang(): void;