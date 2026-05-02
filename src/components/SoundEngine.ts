// Web Audio API sound engine for Confrontation
class SoundEngine {
  private ctx: AudioContext | null = null;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      const W = window as Window & { webkitAudioContext?: typeof AudioContext };
      this.ctx = new (window.AudioContext || W.webkitAudioContext!)();
    }
    return this.ctx;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.15, delay = 0) {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  }

  private playNoise(duration: number, vol = 0.05, delay = 0, highpass = 1000) {
    const ctx = this.getCtx();
    const bufSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = highpass;
    const gain = ctx.createGain();
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    src.start(ctx.currentTime + delay);
    src.stop(ctx.currentTime + delay + duration + 0.05);
  }

  click() {
    this.playTone(800, 0.08, 'square', 0.12);
    this.playNoise(0.05, 0.04, 0, 2000);
  }

  hover() {
    this.playTone(600, 0.06, 'sine', 0.06);
  }

  openSection() {
    this.playTone(200, 0.15, 'sawtooth', 0.08);
    this.playTone(400, 0.12, 'square', 0.06, 0.05);
    this.playTone(600, 0.1, 'sine', 0.08, 0.1);
  }

  openCase() {
    for (let i = 0; i < 8; i++) {
      this.playTone(200 + i * 80, 0.15, 'square', 0.1, i * 0.06);
    }
    this.playTone(1200, 0.4, 'sine', 0.2, 0.5);
    this.playNoise(0.3, 0.1, 0.5, 3000);
  }

  buy() {
    this.playTone(523, 0.12, 'sine', 0.15);
    this.playTone(659, 0.12, 'sine', 0.15, 0.1);
    this.playTone(784, 0.2, 'sine', 0.15, 0.2);
  }

  alert() {
    this.playTone(880, 0.1, 'square', 0.12);
    this.playTone(880, 0.1, 'square', 0.12, 0.15);
  }

  // Intro sequence sounds
  introGlitch() {
    this.playNoise(0.08, 0.15, 0, 500);
    this.playTone(120, 0.2, 'sawtooth', 0.2);
  }

  introBeep(delay = 0) {
    this.playTone(1000, 0.05, 'square', 0.15, delay);
    this.playNoise(0.03, 0.08, delay, 4000);
  }

  introReveal() {
    // Deep military drum-like impact
    this.playTone(60, 0.5, 'sine', 0.3);
    this.playNoise(0.3, 0.2, 0, 100);
    this.playTone(120, 0.15, 'sawtooth', 0.1, 0.05);
    // Rising sweep
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc.start(ctx.currentTime + 0.1);
    osc.stop(ctx.currentTime + 1);
  }

  introFinal() {
    // Final dramatic hit
    this.playTone(55, 0.8, 'sine', 0.35);
    this.playTone(110, 0.6, 'sawtooth', 0.15);
    this.playNoise(0.4, 0.25, 0, 80);
    // High chord
    this.playTone(440, 0.5, 'square', 0.08, 0.1);
    this.playTone(550, 0.5, 'square', 0.06, 0.1);
    this.playTone(660, 0.5, 'square', 0.05, 0.1);
  }
}

export const sound = new SoundEngine();