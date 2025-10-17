import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2 } from "lucide-react";

import Beanie from "./Beanie-Downringtone.com.mp3";
import IWannaBeYours from "./I_Wanna_Be_Yours.mp3";

export default function MusicControl() {
  const playlist = useRef<string[]>([Beanie, IWannaBeYours]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Initialize audio element and try autoplay muted (allowed by browsers)
  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const audio = audioRef.current;
      if (!audio) {
        requestAnimationFrame(init);
        return;
      }
      audio.src = playlist.current[0];
      audio.preload = "auto";
      audio.loop = false;
      audio.muted = true;
      const tryPlay = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      };
      void tryPlay();
    };
    requestAnimationFrame(init);
    return () => {
      cancelled = true;
      audioRef.current?.pause();
    };
  }, []);

  // Unmute and ensure playback on first user interaction
  useEffect(() => {
    const enableSound = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!isMuted) return;
      try {
        audio.muted = false;
        setIsMuted(false);
        await audio.play();
        setIsPlaying(true);
      } catch {
        // If play fails, user can use the control
      }
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("wheel", enableSound);
      window.removeEventListener("mousemove", enableSound);
      window.removeEventListener("scroll", enableSound);
    };
    window.addEventListener("pointerdown", enableSound, { once: true });
    window.addEventListener("keydown", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });
    window.addEventListener("wheel", enableSound, { once: true });
    window.addEventListener("mousemove", enableSound, { once: true });
    window.addEventListener("scroll", enableSound, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("wheel", enableSound);
      window.removeEventListener("mousemove", enableSound);
      window.removeEventListener("scroll", enableSound);
    };
  }, [isMuted]);

  // Single-press toggles play/pause; double-press skips to next
  const lastPressTimeRef = useRef<number>(0);
  const singlePressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        if (isMuted) {
          audio.muted = false;
          setIsMuted(false);
        }
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Play may fail if user interaction is required
      }
    }
  };

  const skipToNext = async () => {
    const nextIndex = (currentIndex + 1) % playlist.current.length;
    setCurrentIndex(nextIndex);
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = playlist.current[nextIndex];
    audioRef.current.load();
    try {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handlePress = () => {
    const now = performance.now();
    // If press occurs within 280ms, treat as double
    if (now - lastPressTimeRef.current < 280) {
      if (singlePressTimerRef.current) {
        clearTimeout(singlePressTimerRef.current);
        singlePressTimerRef.current = null;
      }
      void skipToNext();
      lastPressTimeRef.current = 0;
      return;
    }
    lastPressTimeRef.current = now;
    // Delay single press action slightly to distinguish from double
    singlePressTimerRef.current = setTimeout(() => {
      void performToggle();
      singlePressTimerRef.current = null;
    }, 280);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} autoPlay playsInline muted={isMuted} />
      <button
        type="button"
        onClick={handlePress}
        title={isPlaying ? "Pause (double-click to skip)" : "Play (double-click to skip)"}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}


