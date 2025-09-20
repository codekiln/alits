import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ObservablePropertyHelper, observeProperty, observeProperties } from '../src/observable-helper';

describe('ObservablePropertyHelper', () => {
  let mockLiveObject: any;

  beforeEach(() => {
    mockLiveObject = {
      id: 'test-object',
      name: 'Test Object',
      volume: 0.5,
      tempo: 120,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      set: jest.fn()
    };
  });

  afterEach(() => {
    ObservablePropertyHelper.cleanupAll();
  });

  describe('observeProperty', () => {
    it('should create an observable for a property', () => {
      const observable = ObservablePropertyHelper.observeProperty(mockLiveObject, 'volume');
      expect(observable).toBeInstanceOf(Observable);
    });

    it('should throw error for invalid live object', () => {
      expect(() => ObservablePropertyHelper.observeProperty(null, 'volume')).toThrow('LiveAPI object must be a valid object');
      expect(() => ObservablePropertyHelper.observeProperty(undefined, 'volume')).toThrow('LiveAPI object must be a valid object');
    });

    it('should throw error for invalid property name', () => {
      expect(() => ObservablePropertyHelper.observeProperty(mockLiveObject, '')).toThrow('Property name must be a non-empty string');
      expect(() => ObservablePropertyHelper.observeProperty(mockLiveObject, null as any)).toThrow('Property name must be a non-empty string');
    });

    it('should use addListener/removeListener if available', () => {
      const observable = ObservablePropertyHelper.observeProperty(mockLiveObject, 'volume');
      const subscription = observable.subscribe();
      expect(mockLiveObject.addListener).toHaveBeenCalled();
      subscription.unsubscribe();
    });
  });

  describe('observeProperties', () => {
    it('should create an observable for multiple properties', () => {
      const observable = ObservablePropertyHelper.observeProperties(mockLiveObject, ['volume', 'tempo']);
      expect(observable).toBeInstanceOf(Observable);
    });

    it('should throw error for invalid property names array', () => {
      expect(() => ObservablePropertyHelper.observeProperties(mockLiveObject, [])).toThrow('Property names must be a non-empty array');
      expect(() => ObservablePropertyHelper.observeProperties(mockLiveObject, null as any)).toThrow('Property names must be a non-empty array');
    });
  });

  describe('createBehaviorSubject', () => {
    it('should create a behavior subject with initial value', () => {
      const subject = ObservablePropertyHelper.createBehaviorSubject(mockLiveObject, 'volume', 0.5);
      expect(subject).toBeInstanceOf(BehaviorSubject);
      expect(subject.value).toBe(0.5);
    });
  });

  describe('getCurrentValue', () => {
    it('should get the current value of a property', () => {
      const value = ObservablePropertyHelper.getCurrentValue(mockLiveObject, 'volume');
      expect(value).toBe(0.5);
    });

    it('should throw error for invalid live object', () => {
      expect(() => ObservablePropertyHelper.getCurrentValue(null, 'volume')).toThrow('LiveAPI object must be a valid object');
    });
  });

  describe('setValue', () => {
    it('should set a property value using set method', () => {
      ObservablePropertyHelper.setValue(mockLiveObject, 'volume', 0.8);
      expect(mockLiveObject.set).toHaveBeenCalledWith('volume', 0.8);
    });

    it('should set a property value directly if set method not available', () => {
      const objWithoutSet = { volume: 0.5 };
      ObservablePropertyHelper.setValue(objWithoutSet, 'volume', 0.8);
      expect(objWithoutSet.volume).toBe(0.8);
    });

    it('should throw error for invalid live object', () => {
      expect(() => ObservablePropertyHelper.setValue(null, 'volume', 0.8)).toThrow('LiveAPI object must be a valid object');
    });
  });

  describe('cleanup', () => {
    it('should cleanup subscriptions for a specific object', () => {
      ObservablePropertyHelper.observeProperty(mockLiveObject, 'volume');
      ObservablePropertyHelper.cleanup(mockLiveObject);
      // Should not throw any errors
    });

    it('should cleanup all subscriptions', () => {
      ObservablePropertyHelper.observeProperty(mockLiveObject, 'volume');
      ObservablePropertyHelper.cleanupAll();
      // Should not throw any errors
    });
  });
});

describe('observeProperty convenience function', () => {
  let mockLiveObject: any;

  beforeEach(() => {
    mockLiveObject = {
      id: 'test-object',
      volume: 0.5,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  });

  afterEach(() => {
    ObservablePropertyHelper.cleanupAll();
  });

  it('should create an observable for a property', () => {
    const observable = observeProperty(mockLiveObject, 'volume');
    expect(observable).toBeInstanceOf(Observable);
  });
});

describe('observeProperties convenience function', () => {
  let mockLiveObject: any;

  beforeEach(() => {
    mockLiveObject = {
      id: 'test-object',
      volume: 0.5,
      tempo: 120,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  });

  afterEach(() => {
    ObservablePropertyHelper.cleanupAll();
  });

  it('should create an observable for multiple properties', () => {
    const observable = observeProperties(mockLiveObject, ['volume', 'tempo']);
    expect(observable).toBeInstanceOf(Observable);
  });
});
