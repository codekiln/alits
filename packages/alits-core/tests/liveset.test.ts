import { LiveSetImpl } from '../src/liveset';
import { Observable } from 'rxjs';

describe('LiveSetImpl', () => {
  let mockLiveObject: any;
  let liveSet: LiveSetImpl;

  beforeEach(() => {
    mockLiveObject = {
      id: 'test-liveset',
      tempo: 120,
      time_signature_numerator: 4,
      time_signature_denominator: 4,
      tracks: [
        {
          id: 'track-1',
          name: 'Track 1',
          volume: 0.8,
          pan: 0,
          mute: false,
          solo: false,
          devices: [],
          clips: []
        }
      ],
      scenes: [
        {
          id: 'scene-1',
          name: 'Scene 1',
          color: 0,
          is_selected: false
        }
      ],
      set: jest.fn()
    };

    liveSet = new LiveSetImpl(mockLiveObject);
  });

  afterEach(() => {
    if (liveSet) {
      liveSet.cleanup();
    }
  });

  describe('constructor', () => {
    it('should create a LiveSet instance with valid live object', () => {
      expect(liveSet).toBeInstanceOf(LiveSetImpl);
      expect(liveSet.id).toBe('test-liveset');
      expect(liveSet.liveObject).toBe(mockLiveObject);
    });

    it('should throw error for null live object', () => {
      expect(() => new LiveSetImpl(null)).toThrow('LiveAPI object is required');
    });

    it('should throw error for undefined live object', () => {
      expect(() => new LiveSetImpl(undefined)).toThrow('LiveAPI object is required');
    });
  });

  describe('initialization', () => {
    it('should initialize with correct tempo', () => {
      expect(liveSet.tempo).toBe(120);
    });

    it('should initialize with correct time signature', () => {
      expect(liveSet.timeSignature).toEqual({ numerator: 4, denominator: 4 });
    });

    it('should initialize with tracks', () => {
      expect(liveSet.tracks).toHaveLength(1);
      expect(liveSet.tracks[0].name).toBe('Track 1');
    });

    it('should initialize with scenes', () => {
      expect(liveSet.scenes).toHaveLength(1);
      expect(liveSet.scenes[0].name).toBe('Scene 1');
    });
  });

  describe('getTrack', () => {
    it('should return track by index', () => {
      const track = liveSet.getTrack(0);
      expect(track).toBeTruthy();
      expect(track!.name).toBe('Track 1');
    });

    it('should return null for invalid index', () => {
      expect(liveSet.getTrack(-1)).toBeNull();
      expect(liveSet.getTrack(999)).toBeNull();
    });
  });

  describe('getTrackByName', () => {
    it('should return track by name', () => {
      const track = liveSet.getTrackByName('Track 1');
      expect(track).toBeTruthy();
      expect(track!.name).toBe('Track 1');
    });

    it('should return null for non-existent track name', () => {
      expect(liveSet.getTrackByName('Non-existent')).toBeNull();
    });
  });

  describe('getScene', () => {
    it('should return scene by index', () => {
      const scene = liveSet.getScene(0);
      expect(scene).toBeTruthy();
      expect(scene!.name).toBe('Scene 1');
    });

    it('should return null for invalid index', () => {
      expect(liveSet.getScene(-1)).toBeNull();
      expect(liveSet.getScene(999)).toBeNull();
    });
  });

  describe('getSceneByName', () => {
    it('should return scene by name', () => {
      const scene = liveSet.getSceneByName('Scene 1');
      expect(scene).toBeTruthy();
      expect(scene!.name).toBe('Scene 1');
    });

    it('should return null for non-existent scene name', () => {
      expect(liveSet.getSceneByName('Non-existent')).toBeNull();
    });
  });

  describe('setTempo', () => {
    it('should set tempo using live object set method', async () => {
      await liveSet.setTempo(140);
      expect(mockLiveObject.set).toHaveBeenCalledWith('tempo', 140);
      expect(liveSet.tempo).toBe(140);
    });

    it('should set tempo directly if set method not available', async () => {
      const objWithoutSet = { ...mockLiveObject };
      delete objWithoutSet.set;
      const liveSetWithoutSet = new LiveSetImpl(objWithoutSet);
      
      await liveSetWithoutSet.setTempo(140);
      expect(liveSetWithoutSet.tempo).toBe(140);
    });
  });

  describe('setTimeSignature', () => {
    it('should set time signature using live object set method', async () => {
      await liveSet.setTimeSignature(3, 4);
      expect(mockLiveObject.set).toHaveBeenCalledWith('time_signature_numerator', 3);
      expect(mockLiveObject.set).toHaveBeenCalledWith('time_signature_denominator', 4);
      expect(liveSet.timeSignature).toEqual({ numerator: 3, denominator: 4 });
    });

    it('should set time signature directly if set method not available', async () => {
      const objWithoutSet = { ...mockLiveObject };
      delete objWithoutSet.set;
      const liveSetWithoutSet = new LiveSetImpl(objWithoutSet);
      
      await liveSetWithoutSet.setTimeSignature(3, 4);
      expect(liveSetWithoutSet.timeSignature).toEqual({ numerator: 3, denominator: 4 });
    });
  });

  describe('observeTempo', () => {
    it('should return an observable for tempo changes', () => {
      const observable = liveSet.observeTempo();
      expect(observable).toBeInstanceOf(Observable);
    });
  });

  describe('observeTimeSignature', () => {
    it('should return an observable for time signature changes', () => {
      const observable = liveSet.observeTimeSignature();
      expect(observable).toBeInstanceOf(Observable);
    });
  });

  describe('cleanup', () => {
    it('should cleanup resources without errors', () => {
      expect(() => liveSet.cleanup()).not.toThrow();
    });
  });
});
