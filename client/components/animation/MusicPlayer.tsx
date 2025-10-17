import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";

import Beanie from "./Beanie-Downringtone.com.mp3";
import IWannaBeYours from "./I_Wanna_Be_Yours.mp3";

interface MusicPlayerProps {
  autoPlay?: boolean;
  className?: string;
}

export default function MusicPlayer({ autoPlay = false, className = "" }: MusicPlayerProps) {
  const playlist = useRef<string[]>([Beanie, IWannaBeYours]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(!autoPlay);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.src = playlist.current[currentIndex];
    audio.preload = "auto";
    audio.loop = false;
    audio.muted = isMuted;
    
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      handleNext();
    };
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    
    if (autoPlay) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
    
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const nextIndex = (currentIndex + 1) % playlist.current.length;
    setCurrentIndex(nextIndex);
    audio.src = playlist.current[nextIndex];
    
    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex items-center space-x-2 bg-black/10 backdrop-blur-sm p-2 rounded-full ${className}`}>
      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      
      <button
        onClick={handleNext}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
      >
        <SkipForward size={16} />
      </button>
      
      <div className="hidden sm:flex flex-col min-w-[100px]">
        <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <button
        onClick={toggleMute}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}