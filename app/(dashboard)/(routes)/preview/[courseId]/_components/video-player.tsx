"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId: string;
  isLocked: boolean;
  title: string;
}

export const PreviewVideoPlayer = ({
  playbackId,
  isLocked,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className=" relative aspect-video">
      {!isReady && !isLocked && (
        <div className=" absolute inset-0 flex items-center justify-center rounded-md border overflow-hidden border-gray-300 bg-slate-800">
          <Loader2 className=" h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className=" absolute inset-0 flex items-center border rounded-md border-gray-300 justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className=" h-8 w-8 text-secondary" />
          <p className=" text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(
            " rounded-md overflow-hidden border border-gray-300 ",
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          // onEnded={onEnd}
          // autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
