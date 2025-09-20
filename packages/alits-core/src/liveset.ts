import { Observable } from 'rxjs';
import { LiveSet, Track, Scene, Device, RackDevice, DrumPad, Clip, Parameter, TimeSignature } from './types';
import { observeProperty, ObservablePropertyHelper } from './observable-helper';

/**
 * LiveSet abstraction for interacting with Ableton Live's LiveAPI
 * Provides async/await API for Live Object Model operations
 */
export class LiveSetImpl implements LiveSet {
  public readonly id: string;
  public readonly liveObject: any;
  public tracks: Track[] = [];
  public scenes: Scene[] = [];
  public tempo: number = 120;
  public timeSignature: TimeSignature = { numerator: 4, denominator: 4 };

  constructor(liveObject: any) {
    if (!liveObject) {
      throw new Error('LiveAPI object is required');
    }

    this.liveObject = liveObject;
    this.id = liveObject.id || `liveset_${Date.now()}`;
    
    this.initializeLiveSet();
  }

  /**
   * Initialize the LiveSet with current LiveAPI data
   */
  private async initializeLiveSet(): Promise<void> {
    try {
      await this.loadTracks();
      await this.loadScenes();
      await this.loadTempo();
      await this.loadTimeSignature();
    } catch (error) {
      console.error('Failed to initialize LiveSet:', error);
      throw new Error(`Failed to initialize LiveSet: ${error.message}`);
    }
  }

  /**
   * Load tracks from LiveAPI
   */
  private async loadTracks(): Promise<void> {
    try {
      if (this.liveObject.tracks && Array.isArray(this.liveObject.tracks)) {
        this.tracks = await Promise.all(
          this.liveObject.tracks.map(async (trackObj: any) => {
            const track = new TrackImpl(trackObj);
            await track.initialize();
            return track;
          })
        );
      }
    } catch (error) {
      console.error('Failed to load tracks:', error);
      throw new Error(`Failed to load tracks: ${error.message}`);
    }
  }

  /**
   * Load scenes from LiveAPI
   */
  private async loadScenes(): Promise<void> {
    try {
      if (this.liveObject.scenes && Array.isArray(this.liveObject.scenes)) {
        this.scenes = await Promise.all(
          this.liveObject.scenes.map(async (sceneObj: any) => {
            const scene = new SceneImpl(sceneObj);
            await scene.initialize();
            return scene;
          })
        );
      }
    } catch (error) {
      console.error('Failed to load scenes:', error);
      throw new Error(`Failed to load scenes: ${error.message}`);
    }
  }

  /**
   * Load tempo from LiveAPI
   */
  private async loadTempo(): Promise<void> {
    try {
      if (this.liveObject.tempo !== undefined) {
        this.tempo = this.liveObject.tempo;
      }
    } catch (error) {
      console.error('Failed to load tempo:', error);
      throw new Error(`Failed to load tempo: ${error.message}`);
    }
  }

  /**
   * Load time signature from LiveAPI
   */
  private async loadTimeSignature(): Promise<void> {
    try {
      if (this.liveObject.time_signature_numerator && this.liveObject.time_signature_denominator) {
        this.timeSignature = {
          numerator: this.liveObject.time_signature_numerator,
          denominator: this.liveObject.time_signature_denominator
        };
      }
    } catch (error) {
      console.error('Failed to load time signature:', error);
      throw new Error(`Failed to load time signature: ${error.message}`);
    }
  }

  /**
   * Get a track by index
   * @param index Track index
   * @returns Track at the specified index
   */
  getTrack(index: number): Track | null {
    if (index >= 0 && index < this.tracks.length) {
      return this.tracks[index];
    }
    return null;
  }

  /**
   * Get a track by name
   * @param name Track name
   * @returns Track with the specified name
   */
  getTrackByName(name: string): Track | null {
    return this.tracks.find(track => track.name === name) || null;
  }

  /**
   * Get a scene by index
   * @param index Scene index
   * @returns Scene at the specified index
   */
  getScene(index: number): Scene | null {
    if (index >= 0 && index < this.scenes.length) {
      return this.scenes[index];
    }
    return null;
  }

  /**
   * Get a scene by name
   * @param name Scene name
   * @returns Scene with the specified name
   */
  getSceneByName(name: string): Scene | null {
    return this.scenes.find(scene => scene.name === name) || null;
  }

  /**
   * Set the tempo
   * @param tempo New tempo value
   */
  async setTempo(tempo: number): Promise<void> {
    try {
      if (this.liveObject.set) {
        await this.liveObject.set('tempo', tempo);
      } else {
        this.liveObject.tempo = tempo;
      }
      this.tempo = tempo;
    } catch (error) {
      console.error('Failed to set tempo:', error);
      throw new Error(`Failed to set tempo: ${error.message}`);
    }
  }

  /**
   * Set the time signature
   * @param numerator Time signature numerator
   * @param denominator Time signature denominator
   */
  async setTimeSignature(numerator: number, denominator: number): Promise<void> {
    try {
      if (this.liveObject.set) {
        await this.liveObject.set('time_signature_numerator', numerator);
        await this.liveObject.set('time_signature_denominator', denominator);
      } else {
        this.liveObject.time_signature_numerator = numerator;
        this.liveObject.time_signature_denominator = denominator;
      }
      this.timeSignature = { numerator, denominator };
    } catch (error) {
      console.error('Failed to set time signature:', error);
      throw new Error(`Failed to set time signature: ${error.message}`);
    }
  }

  /**
   * Observe tempo changes
   * @returns Observable that emits tempo changes
   */
  observeTempo(): Observable<number> {
    return observeProperty<number>(this.liveObject, 'tempo');
  }

  /**
   * Observe time signature changes
   * @returns Observable that emits time signature changes
   */
  observeTimeSignature(): Observable<TimeSignature> {
    return ObservablePropertyHelper.observeProperties<TimeSignature>(
      this.liveObject,
      ['time_signature_numerator', 'time_signature_denominator']
    ).pipe(
      map(values => ({
        numerator: values.time_signature_numerator || 4,
        denominator: values.time_signature_denominator || 4
      }))
    );
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    ObservablePropertyHelper.cleanup(this.liveObject);
    this.tracks.forEach(track => track.cleanup());
    this.scenes.forEach(scene => scene.cleanup());
  }
}

/**
 * Track implementation
 */
class TrackImpl implements Track {
  public readonly id: string;
  public readonly liveObject: any;
  public name: string = '';
  public volume: number = 1;
  public pan: number = 0;
  public mute: boolean = false;
  public solo: boolean = false;
  public devices: Device[] = [];
  public clips: Clip[] = [];

  constructor(liveObject: any) {
    this.liveObject = liveObject;
    this.id = liveObject.id || `track_${Date.now()}`;
  }

  async initialize(): Promise<void> {
    this.name = this.liveObject.name || '';
    this.volume = this.liveObject.volume || 1;
    this.pan = this.liveObject.pan || 0;
    this.mute = this.liveObject.mute || false;
    this.solo = this.liveObject.solo || false;
    
    await this.loadDevices();
    await this.loadClips();
  }

  private async loadDevices(): Promise<void> {
    if (this.liveObject.devices && Array.isArray(this.liveObject.devices)) {
      this.devices = await Promise.all(
        this.liveObject.devices.map(async (deviceObj: any) => {
          const device = new DeviceImpl(deviceObj);
          await device.initialize();
          return device;
        })
      );
    }
  }

  private async loadClips(): Promise<void> {
    if (this.liveObject.clips && Array.isArray(this.liveObject.clips)) {
      this.clips = await Promise.all(
        this.liveObject.clips.map(async (clipObj: any) => {
          const clip = new ClipImpl(clipObj);
          await clip.initialize();
          return clip;
        })
      );
    }
  }

  cleanup(): void {
    ObservablePropertyHelper.cleanup(this.liveObject);
    this.devices.forEach(device => device.cleanup());
    this.clips.forEach(clip => clip.cleanup());
  }
}

/**
 * Scene implementation
 */
class SceneImpl implements Scene {
  public readonly id: string;
  public readonly liveObject: any;
  public name: string = '';
  public color: number = 0;
  public isSelected: boolean = false;

  constructor(liveObject: any) {
    this.liveObject = liveObject;
    this.id = liveObject.id || `scene_${Date.now()}`;
  }

  async initialize(): Promise<void> {
    this.name = this.liveObject.name || '';
    this.color = this.liveObject.color || 0;
    this.isSelected = this.liveObject.is_selected || false;
  }

  cleanup(): void {
    ObservablePropertyHelper.cleanup(this.liveObject);
  }
}

/**
 * Device implementation
 */
class DeviceImpl implements Device {
  public readonly id: string;
  public readonly liveObject: any;
  public name: string = '';
  public type: string = '';
  public parameters: Parameter[] = [];

  constructor(liveObject: any) {
    this.liveObject = liveObject;
    this.id = liveObject.id || `device_${Date.now()}`;
  }

  async initialize(): Promise<void> {
    this.name = this.liveObject.name || '';
    this.type = this.liveObject.type || '';
    
    if (this.liveObject.parameters && Array.isArray(this.liveObject.parameters)) {
      this.parameters = this.liveObject.parameters.map((paramObj: any) => ({
        id: paramObj.id || `param_${Date.now()}`,
        liveObject: paramObj,
        name: paramObj.name || '',
        value: paramObj.value || 0,
        min: paramObj.min || 0,
        max: paramObj.max || 1,
        unit: paramObj.unit || ''
      }));
    }
  }

  cleanup(): void {
    ObservablePropertyHelper.cleanup(this.liveObject);
  }
}

/**
 * Clip implementation
 */
class ClipImpl implements Clip {
  public readonly id: string;
  public readonly liveObject: any;
  public name: string = '';
  public length: number = 0;
  public startTime: number = 0;
  public isPlaying: boolean = false;
  public isRecording: boolean = false;

  constructor(liveObject: any) {
    this.liveObject = liveObject;
    this.id = liveObject.id || `clip_${Date.now()}`;
  }

  async initialize(): Promise<void> {
    this.name = this.liveObject.name || '';
    this.length = this.liveObject.length || 0;
    this.startTime = this.liveObject.start_time || 0;
    this.isPlaying = this.liveObject.is_playing || false;
    this.isRecording = this.liveObject.is_recording || false;
  }

  cleanup(): void {
    ObservablePropertyHelper.cleanup(this.liveObject);
  }
}
