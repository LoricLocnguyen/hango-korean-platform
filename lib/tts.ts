// Shared Korean text-to-speech helper built on the browser's
// speechSynthesis. Works around two common Chrome quirks:
//  - calling speak() immediately after cancel() can swallow the utterance,
//    so we wait a tick before speaking;
//  - the voices list may load asynchronously, so we pick a Korean voice
//    explicitly when one is available.
export function speakKorean(
  text: string,
  opts: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
  } = {}
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    opts.onEnd?.();
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = opts.rate ?? 0.9;

    const koVoice = synth
      .getVoices()
      .find((v) => v.lang && v.lang.toLowerCase().startsWith("ko"));
    if (koVoice) utterance.voice = koVoice;

    let ended = false;
    const finish = () => {
      if (ended) return;
      ended = true;
      opts.onEnd?.();
    };
    utterance.onstart = () => opts.onStart?.();
    utterance.onend = finish;
    utterance.onerror = finish;

    // Safety net: some browsers never fire onend (e.g. no Korean voice
    // installed) — clear the playing state after an estimated duration.
    const estimatedMs = Math.min(15000, Math.max(1500, text.length * 220));
    window.setTimeout(finish, estimatedMs);

    synth.resume();
    synth.speak(utterance);
  }, 60);
}
