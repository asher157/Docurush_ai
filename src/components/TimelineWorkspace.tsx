import React from 'react';
import { Layers, Film, Type, Mic, Music, Layout } from 'lucide-react';

export default function TimelineWorkspace({ data, theme }: any) {
  
  const tracks = [
    { name: 'Visuals', icon: <Film size={14}/>, desc: data.visuals, color: 'bg-blue-900/40 text-blue-400 border-blue-800' },
    { name: 'Overlays', icon: <Layout size={14}/>, desc: data.overlays, color: 'bg-purple-900/40 text-purple-400 border-purple-800' },
    { name: 'Transitions', icon: <Layers size={14}/>, desc: data.transitions, color: 'bg-emerald-900/40 text-emerald-400 border-emerald-800' },
    { name: 'Subtitles', icon: <Type size={14}/>, desc: data.subtitles, color: 'bg-yellow-900/40 text-yellow-400 border-yellow-800' },
    { name: 'Voiceover', icon: <Mic size={14}/>, desc: 'TTS Speech Track (auto-synced timestamps)', color: 'bg-orange-900/40 text-orange-400 border-orange-800' },
    { name: 'SFX & Music', icon: <Music size={14}/>, desc: data.sfx, color: 'bg-pink-900/40 text-pink-400 border-pink-800' },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Layers className="text-red-500" />
        6-Track Workspace Architecture
      </h2>
      
      <div className="space-y-2">
        {tracks.map((track, i) => (
          <div key={i} className="flex overflow-hidden">
            <div className="w-40 shrink-0 bg-zinc-950 border border-zinc-800 p-3 flex items-center gap-2 border-r-0 rounded-l font-mono text-xs text-zinc-400">
              {track.icon} Track {i + 1}: {track.name}
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 p-2 rounded-r flex items-center">
              <div className={`px-4 py-1.5 rounded-full text-xs font-medium border ${track.color}`}>
                {track.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
