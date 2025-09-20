// Minimal LiveSet implementation for Max 8 testing
// This is a simplified version that avoids complex dependencies

"use strict";

// Simple LiveSet class for testing
function LiveSet(liveObject) {
    if (!liveObject) {
        throw new Error("LiveAPI object is required");
    }
    
    this.liveObject = liveObject;
    this.id = liveObject.id || "liveset_" + Date.now();
    this.tracks = [];
    this.scenes = [];
    this.tempo = 120;
    this.timeSignature = { numerator: 4, denominator: 4 };
    
    // Initialize synchronously for Max 8 compatibility
    this.initializeLiveSet();
}

LiveSet.prototype.initializeLiveSet = function() {
    try {
        this.loadTracks();
        this.loadScenes();
        this.loadTempo();
        this.loadTimeSignature();
    } catch (error) {
        console.error("Failed to initialize LiveSet:", error);
        throw new Error("Failed to initialize LiveSet: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.loadTracks = function() {
    try {
        if (this.liveObject.tracks && Array.isArray(this.liveObject.tracks)) {
            this.tracks = this.liveObject.tracks.map(function(track) {
                return {
                    id: track.id || "track_" + Date.now(),
                    name: track.name || "",
                    volume: track.volume || 1,
                    pan: track.pan || 0,
                    mute: track.mute || false,
                    solo: track.solo || false,
                    liveObject: track
                };
            });
        }
    } catch (error) {
        console.error("Failed to load tracks:", error);
        throw new Error("Failed to load tracks: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.loadScenes = function() {
    try {
        if (this.liveObject.scenes && Array.isArray(this.liveObject.scenes)) {
            this.scenes = this.liveObject.scenes.map(function(scene) {
                return {
                    id: scene.id || "scene_" + Date.now(),
                    name: scene.name || "",
                    color: scene.color || 0,
                    isSelected: scene.is_selected || false,
                    liveObject: scene
                };
            });
        }
    } catch (error) {
        console.error("Failed to load scenes:", error);
        throw new Error("Failed to load scenes: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.loadTempo = function() {
    try {
        if (this.liveObject.tempo !== undefined) {
            this.tempo = this.liveObject.tempo;
        }
    } catch (error) {
        console.error("Failed to load tempo:", error);
        throw new Error("Failed to load tempo: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.loadTimeSignature = function() {
    try {
        if (this.liveObject.time_signature_numerator && this.liveObject.time_signature_denominator) {
            this.timeSignature = {
                numerator: this.liveObject.time_signature_numerator,
                denominator: this.liveObject.time_signature_denominator
            };
        }
    } catch (error) {
        console.error("Failed to load time signature:", error);
        throw new Error("Failed to load time signature: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.getTrack = function(index) {
    return (index >= 0 && index < this.tracks.length) ? this.tracks[index] : null;
};

LiveSet.prototype.getTrackByName = function(name) {
    return this.tracks.find(function(track) { return track.name === name; }) || null;
};

LiveSet.prototype.getScene = function(index) {
    return (index >= 0 && index < this.scenes.length) ? this.scenes[index] : null;
};

LiveSet.prototype.getSceneByName = function(name) {
    return this.scenes.find(function(scene) { return scene.name === name; }) || null;
};

LiveSet.prototype.setTempo = function(tempo) {
    try {
        if (this.liveObject.set) {
            this.liveObject.set("tempo", tempo);
        } else {
            this.liveObject.tempo = tempo;
        }
        this.tempo = tempo;
    } catch (error) {
        console.error("Failed to set tempo:", error);
        throw new Error("Failed to set tempo: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.setTimeSignature = function(numerator, denominator) {
    try {
        if (this.liveObject.set) {
            this.liveObject.set("time_signature_numerator", numerator);
            this.liveObject.set("time_signature_denominator", denominator);
        } else {
            this.liveObject.time_signature_numerator = numerator;
            this.liveObject.time_signature_denominator = denominator;
        }
        this.timeSignature = { numerator: numerator, denominator: denominator };
    } catch (error) {
        console.error("Failed to set time signature:", error);
        throw new Error("Failed to set time signature: " + (error instanceof Error ? error.message : String(error)));
    }
};

LiveSet.prototype.cleanup = function() {
    // Simple cleanup - no complex subscription management
    this.tracks = [];
    this.scenes = [];
};

// Export for CommonJS
exports.LiveSet = LiveSet;
