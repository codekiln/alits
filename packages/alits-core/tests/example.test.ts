import { 
  LiveSet, 
  MIDIUtils, 
  ObservablePropertyHelper, 
  observeProperty,
  Observable 
} from "../src";

describe("@alits/core exports", () => {
  it("should export LiveSet class", () => {
    expect(LiveSet).toBeDefined();
    expect(typeof LiveSet).toBe('function');
  });

  it("should export MIDIUtils class", () => {
    expect(MIDIUtils).toBeDefined();
    expect(typeof MIDIUtils).toBe('function');
  });

  it("should export ObservablePropertyHelper class", () => {
    expect(ObservablePropertyHelper).toBeDefined();
    expect(typeof ObservablePropertyHelper).toBe('function');
  });

  it("should export observeProperty function", () => {
    expect(observeProperty).toBeDefined();
    expect(typeof observeProperty).toBe('function');
  });

  it("should export Observable from RxJS", () => {
    expect(Observable).toBeDefined();
    expect(typeof Observable).toBe('function');
  });
});

describe("MIDIUtils basic functionality", () => {
  it("should convert MIDI note 60 to C4", () => {
    expect(MIDIUtils.noteNumberToName(60)).toBe('C4');
  });

  it("should convert C4 to MIDI note 60", () => {
    expect(MIDIUtils.noteNameToNumber('C4')).toBe(60);
  });

  it("should handle round-trip conversion", () => {
    const originalNote = 69;
    const noteName = MIDIUtils.noteNumberToName(originalNote);
    const convertedNote = MIDIUtils.noteNameToNumber(noteName);
    expect(convertedNote).toBe(originalNote);
  });
});

describe("LiveSet basic functionality", () => {
  let mockLiveObject: any;
  let liveSet: LiveSet;

  beforeEach(() => {
    mockLiveObject = {
      id: 'test-liveset',
      tempo: 120,
      time_signature_numerator: 4,
      time_signature_denominator: 4,
      tracks: [],
      scenes: []
    };
    liveSet = new LiveSet(mockLiveObject);
  });

  afterEach(() => {
    if (liveSet) {
      liveSet.cleanup();
    }
  });

  it("should create LiveSet instance", () => {
    expect(liveSet).toBeDefined();
    expect(liveSet.id).toBe('test-liveset');
    expect(liveSet.tempo).toBe(120);
  });

  it("should have correct time signature", () => {
    expect(liveSet.timeSignature).toEqual({ numerator: 4, denominator: 4 });
  });

  it("should return null for non-existent track", () => {
    expect(liveSet.getTrack(0)).toBeNull();
  });

  it("should return null for non-existent scene", () => {
    expect(liveSet.getScene(0)).toBeNull();
  });
});
