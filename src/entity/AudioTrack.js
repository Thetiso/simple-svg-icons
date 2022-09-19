export class AudioTrack {
    url = "";
    arrayBuffer = "";
    audioBuffer = null;
    audioSource = null;
    gainNode = null;
    is_playing = false;
    default_volume = 0.5;
    constructor(url, default_volume = 0.5) {
      this.default_volume = default_volume;
      this.url = url;
    }
    async initBuffer() {
      this.arrayBuffer = await this._loadAudioFile();
      this.audioBuffer = await this._decodeArrayBuffer();
      return this.audioBuffer;
    }
    _loadAudioFile() {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
        xhr.open("GET", this.url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          //下载完成
          // this.audioBuffer = this.response;
          resolve(this.response);
        };
        xhr.send();
      });
    }
    _decodeArrayBuffer() {
      return new Promise((resolve, reject) => {
        let tmp_audio_ctx = new AudioContext();
        tmp_audio_ctx.decodeAudioData(
          this.arrayBuffer,
          function (buffer) {
            //解码成功时的回调函数
            resolve(buffer);
          },
          function (e) {
            //解码出错时的回调函数
            console.log("Error decoding file", e);
            reject();
          }
        );
      });
    }
    start(atTime = 0) {
      return new Promise((resolve) => {
        this.audioSource.start(atTime);
        this.is_playing = true;
        this.audioSource.onended = () => {
          resolve();
        };
      });
    }
    fadeIn({ currentTime, duration }) {
      if (this.is_playing) {
        this.gainNode.gain.setTargetAtTime(0.05, currentTime + 1.5, 0.5);
        this.gainNode.gain.setTargetAtTime(
          this.default_volume,
          currentTime + duration + 3,
          0.5
        );
      }
    }
  }
  