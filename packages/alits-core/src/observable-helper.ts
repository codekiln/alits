import { Observable, Subject, BehaviorSubject, fromEventPattern, Subscription } from 'rxjs';
import { map, distinctUntilChanged, share } from 'rxjs/operators';
import { PropertyChangeEvent } from './types';

/**
 * Observable property helper for LiveAPI objects
 * Creates RxJS observables for LiveAPI object properties
 */
export class ObservablePropertyHelper {
  private static subscriptions: { [key: string]: Subscription } = {};

  /**
   * Observe a property on a LiveAPI object
   * @param liveObject The LiveAPI object to observe
   * @param propertyName The property name to observe
   * @returns Observable that emits when the property changes
   */
  static observeProperty<T>(liveObject: any, propertyName: string): Observable<T> {
    if (!liveObject || typeof liveObject !== 'object') {
      throw new Error('LiveAPI object must be a valid object');
    }

    if (!propertyName || typeof propertyName !== 'string') {
      throw new Error('Property name must be a non-empty string');
    }

    const key = `${liveObject.id || 'unknown'}.${propertyName}`;

    // Return existing observable if already created
    if (this.subscriptions[key]) {
      return this.createPropertyObservable(liveObject, propertyName);
    }

    return this.createPropertyObservable(liveObject, propertyName);
  }

  /**
   * Create a property observable for a LiveAPI object
   * @param liveObject The LiveAPI object
   * @param propertyName The property name
   * @returns Observable for the property
   */
  private static createPropertyObservable<T>(liveObject: any, propertyName: string): Observable<T> {
    const key = `${liveObject.id || 'unknown'}.${propertyName}`;

    return fromEventPattern<T>(
      (handler: (value: T) => void) => {
        // Subscribe to property changes
        if (liveObject.addListener) {
          liveObject.addListener(propertyName, handler);
        } else if (liveObject.on) {
          liveObject.on(`change:${propertyName}`, handler);
        } else {
          // Fallback: poll the property value
          const interval = setInterval(() => {
            const currentValue = liveObject[propertyName];
            if (currentValue !== undefined) {
              handler(currentValue);
            }
          }, 100); // Poll every 100ms

          // Store interval for cleanup
          liveObject._pollInterval = interval;
        }
      },
      (handler: (value: T) => void) => {
        // Unsubscribe from property changes
        if (liveObject.removeListener) {
          liveObject.removeListener(propertyName, handler);
        } else if (liveObject.off) {
          liveObject.off(`change:${propertyName}`, handler);
        } else if (liveObject._pollInterval) {
          clearInterval(liveObject._pollInterval);
          delete liveObject._pollInterval;
        }
      }
    ).pipe(
      distinctUntilChanged(),
      share()
    );
  }

  /**
   * Observe multiple properties on a LiveAPI object
   * @param liveObject The LiveAPI object to observe
   * @param propertyNames Array of property names to observe
   * @returns Observable that emits when any property changes
   */
  static observeProperties<T extends Record<string, any>>(
    liveObject: any,
    propertyNames: string[]
  ): Observable<T> {
    if (!Array.isArray(propertyNames) || propertyNames.length === 0) {
      throw new Error('Property names must be a non-empty array');
    }

    const observables = propertyNames.map(name => 
      this.observeProperty(liveObject, name).pipe(
        map((value: any) => ({ [name]: value }))
      )
    );

    return new Observable<T>(subscriber => {
      const subscriptions = observables.map(obs => 
        obs.subscribe((change: any) => {
          subscriber.next(change as T);
        })
      );

      return () => {
        subscriptions.forEach(sub => sub.unsubscribe());
      };
    });
  }

  /**
   * Create a behavior subject for a property with initial value
   * @param liveObject The LiveAPI object
   * @param propertyName The property name
   * @param initialValue Initial value for the behavior subject
   * @returns BehaviorSubject for the property
   */
  static createBehaviorSubject<T>(
    liveObject: any,
    propertyName: string,
    initialValue: T
  ): BehaviorSubject<T> {
    const subject = new BehaviorSubject<T>(initialValue);
    const observable = this.observeProperty<T>(liveObject, propertyName);

    const subscription = observable.subscribe(value => {
      subject.next(value);
    });

    // Store subscription for cleanup
    const key = `${liveObject.id || 'unknown'}.${propertyName}.behavior`;
    this.subscriptions[key] = subscription;

    return subject;
  }

  /**
   * Clean up all subscriptions for a LiveAPI object
   * @param liveObject The LiveAPI object
   */
  static cleanup(liveObject: any): void {
    const objectId = liveObject.id || 'unknown';
    
    const keys = Object.keys(this.subscriptions);
    for (const key of keys) {
      if (key.startsWith(objectId)) {
        this.subscriptions[key].unsubscribe();
        delete this.subscriptions[key];
      }
    }
  }

  /**
   * Clean up all subscriptions
   */
  static cleanupAll(): void {
    const keys = Object.keys(this.subscriptions);
    for (const key of keys) {
      this.subscriptions[key].unsubscribe();
    }
    this.subscriptions = {};
  }

  /**
   * Get the current value of a property
   * @param liveObject The LiveAPI object
   * @param propertyName The property name
   * @returns Current property value
   */
  static getCurrentValue<T>(liveObject: any, propertyName: string): T {
    if (!liveObject || typeof liveObject !== 'object') {
      throw new Error('LiveAPI object must be a valid object');
    }

    return liveObject[propertyName];
  }

  /**
   * Set a property value on a LiveAPI object
   * @param liveObject The LiveAPI object
   * @param propertyName The property name
   * @param value The new value
   */
  static setValue<T>(liveObject: any, propertyName: string, value: T): void {
    if (!liveObject || typeof liveObject !== 'object') {
      throw new Error('LiveAPI object must be a valid object');
    }

    if (liveObject.set) {
      liveObject.set(propertyName, value);
    } else {
      liveObject[propertyName] = value;
    }
  }
}

/**
 * Convenience function for observing a single property
 * @param liveObject The LiveAPI object to observe
 * @param propertyName The property name to observe
 * @returns Observable that emits when the property changes
 */
export function observeProperty<T>(liveObject: any, propertyName: string): Observable<T> {
  return ObservablePropertyHelper.observeProperty<T>(liveObject, propertyName);
}

/**
 * Convenience function for observing multiple properties
 * @param liveObject The LiveAPI object to observe
 * @param propertyNames Array of property names to observe
 * @returns Observable that emits when any property changes
 */
export function observeProperties<T extends Record<string, any>>(
  liveObject: any,
  propertyNames: string[]
): Observable<T> {
  return ObservablePropertyHelper.observeProperties<T>(liveObject, propertyNames);
}
