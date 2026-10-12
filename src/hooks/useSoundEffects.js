import { useCallback } from 'react';

export function useSoundEffects(soundEnabled = true) {
  // Inicialização sob demanda do Web Audio Context
  const playTone = useCallback((freq = 440, type = 'sine', duration = 0.1, gainVal = 0.1) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignorar caso o áudio esteja bloqueado por políticas do browser
    }
  }, [soundEnabled]);

  const vibrate = useCallback((pattern = [30]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignorar
      }
    }
  }, []);

  // Sons específicos para a experiência de compras
  const playCheck = useCallback(() => {
    vibrate([20]);
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }, [soundEnabled, vibrate]);

  const playUncheck = useCallback(() => {
    vibrate([15]);
    playTone(350, 'sine', 0.08, 0.08);
  }, [playTone, vibrate]);

  const playAdd = useCallback(() => {
    vibrate([25]);
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }, [soundEnabled, vibrate]);

  const playSuccess = useCallback(() => {
    vibrate([40, 50, 60]);
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.15);
      });
    } catch {}
  }, [soundEnabled, vibrate]);

  const playScanBeep = useCallback(() => {
    vibrate([60]);
    playTone(1800, 'square', 0.1, 0.15);
  }, [playTone, vibrate]);

  const playWarning = useCallback(() => {
    vibrate([80, 40, 80]);
    playTone(280, 'sawtooth', 0.25, 0.15);
  }, [playTone, vibrate]);

  return {
    playCheck,
    playUncheck,
    playAdd,
    playSuccess,
    playScanBeep,
    playWarning,
    vibrate
  };
}
