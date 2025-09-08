cgpt-link:: [Alits - Ableton Live Typescript - LOM typescript wrapper order](https://chatgpt.com/g/g-p-68be88fc18f48191b0eebdcda2fc48b3-alits-ableton-live-typescript/c/68bea6a8-be40-832a-ad94-3f124866ff3e) 

### **Phase 1: Roots & Global Objects**

1. **[Application](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Application)**

   * [`Application.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Application.View)

2. **[Song](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song)**

   * [`Song.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.View)
   * [`Song.Tracks`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.Tracks), [`Song.ReturnTracks`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.ReturnTracks), [`Song.MasterTrack`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.MasterTrack)
   * [`Song.Scenes`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.Scenes)

---

### **Phase 2: Track & Scene Basics**

3. **[Track](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track)**

   * [`Track.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.View)
   * [`Track.ClipSlots`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.ClipSlots)
   * [`Track.Devices`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.Devices)
   * [`Track.ArrangementClips`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.ArrangementClips)
   * Special: [`Song.VisibleTracks`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.VisibleTracks), [`Song.SelectedTrack`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.SelectedTrack), [`Track.GroupTrack`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.GroupTrack)

4. **[Scene](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Scene)**

   * [`Scene.ClipSlots`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Scene.ClipSlots)

---

### **Phase 3: Clip Layer**

5. **[ClipSlot](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_ClipSlot)**

   * [`ClipSlot.Clip`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_ClipSlot.Clip)

6. **[Clip](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Clip)**

   * [`Clip.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Clip.View)

---

### **Phase 4: Device Layer**

7. **[Device](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device)**

   * [`Device.Parameters`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.Parameters)
   * [`Device.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.View)
   * [`Device.AudioInputs`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.AudioInputs), [`Device.AudioOutputs`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.AudioOutputs), [`Device.MidiInputs`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.MidiInputs), [`Device.MidiOutputs`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Device.MidiOutputs)

8. **Core Subclasses of Device**

   * [RackDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice) → [`RackDevice.Chains`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.Chains), [`RackDevice.ReturnChains`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.ReturnChains), [`RackDevice.Devices`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.Devices)
   * [SimplerDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_SimplerDevice) → [`SimplerDevice.Sample`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_SimplerDevice.Sample), [`SimplerDevice.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_SimplerDevice.View)
   * [MaxDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_MaxDevice)
   * [Sample](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Sample)

---

### **Phase 5: Chains, Drum Racks & Pads**

9. **[Chain](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Chain)**

   * [`Chain.Devices`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Chain.Devices), [`Chain.MixerDevice`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Chain.MixerDevice), [`Chain.ReturnChains`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Chain.ReturnChains)
   * [`RackDevice.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.View)

10. **[DrumChain](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumChain)**

11. **[DrumPad](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumPad)**

    * [`DrumPad.Chains`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumPad.Chains), [`DrumPad.Devices`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumPad.Devices), [`DrumPad.MixerDevice`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumPad.MixerDevice)
    * Special: [`RackDevice.SelectedDrumPad`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.SelectedDrumPad), [`RackDevice.VisibleDrumPads`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_RackDevice.VisibleDrumPads)

12. **[DrumCellDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DrumCellDevice)**

---

### **Phase 6: Parameters & Mixers**

13. **[DeviceParameter](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DeviceParameter)**

    * Controls: [`Track.Volume`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.Volume), [`Track.Panning`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.Panning), [`Track.Sends`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Track.Sends),
    * Support for [`Song.SelectedParameter`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.SelectedParameter)

14. **Mixer Devices**

    * [MixerDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_MixerDevice)
    * [ChainMixerDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_ChainMixerDevice)

---

### **Phase 7: Specific/Common Stock Devices**

15. **Stock Devices**

    * [Eq8Device](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Eq8Device) → [`Eq8Device.View`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Eq8Device.View)
    * [CompressorDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_CompressorDevice)
    * [HybridReverbDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_HybridReverbDevice)
    * [SpectralResonatorDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_SpectralResonatorDevice)
    * [WavetableDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_WavetableDevice)
    * [PluginDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_PluginDevice)

---

### **Phase 8: Secondary Objects**

16. **[CuePoint](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_CuePoint)**

17. **[GroovePool](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_GroovePool)** → [`GroovePool.Grooves`](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_GroovePool.Grooves) → [Groove](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Groove)

18. **[ControlSurface](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_ControlSurface)**

---

### **Phase 9: Less Critical / Niche Objects**

* [Application.ControlSurfaces](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Application.ControlSurfaces)
* [Application.CuePoints](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Application.CuePoints)
* [Application.GroovePool](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Application.GroovePool)
* [Song.CueVolume](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.CueVolume)
* [Song.Tempo](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Song.Tempo)
* [TuningSystem](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_TuningSystem)
* [DriftDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_DriftDevice)
* [MeldDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_MeldDevice)
* [ShifterDevice](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_ShifterDevice)
* [Browser](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_Browser)
* [BrowserItem](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model#live_obj_anchor_BrowserItem)

---
