import { AudioTrack } from "./AudioTrack";

export class AudioManager {
    audioCtx = "";
    trackMap = null;
    constructor() {
        this.audioCtx = new AudioContext();
        this.trackMap = new Map();
    }
    async addTrackFromUrl({ url, id, volume }) {
        if (id) {
            let track = new AudioTrack(url, volume);
            let audioBuffer = await track.initBuffer();
            let { audioSource, gainNode } =
                this.generateSourceAndGainForAudioBuffer(audioBuffer);
            track.gainNode = gainNode;
            track.audioSource = audioSource;
            track.gainNode.gain.value = track.default_volume;
            this.trackMap.set(id, track);
            return track;
        }
    }
    generateSourceAndGainForAudioBuffer(audioBuffer) {
        let source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        // source.loop = true;
        //   source.connect(context.destination);
        let gainNode = this.audioCtx.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        gainNode.gain.value = 1;
        return {
            audioSource: source,
            gainNode,
        };
    }
    resetAudioSourceForTrack(id) {
        let track = this.trackMap.get(id);
        if (track) {
            let audioBuffer = track.audioBuffer;
            let { audioSource, gainNode } =
                this.generateSourceAndGainForAudioBuffer(audioBuffer);
            track.gainNode = gainNode;
            track.audioSource = audioSource;
        }
    }
    getTrack(id) {
        return this.trackMap.get(id);
    }
}
