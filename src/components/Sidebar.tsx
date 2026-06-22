import React from 'react';
import { Settings, Lock, Clock, Globe, Palette } from 'lucide-react';

export default function Sidebar({ keys, setKeys, duration, setDuration, language, setLanguage, theme, setTheme }: any) {
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, service: string) => {
    setKeys({ ...keys, [service]: e.target.value });
  };

  return (
    <div className="w-80 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-600 p-2 rounded-lg">
          <Settings size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold font-sans tracking-tight">DocuRush AI</h1>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-zinc-400" />
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">API Keys</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 'elevenlabs', label: 'ElevenLabs API Key' },
              { id: 'pexels', label: 'Pexels API Key' },
              { id: 'openai', label: 'OpenAI API Key' },
              { id: 'shotstack', label: 'Shotstack API Key' },
            ].map((keyItem) => (
              <div key={keyItem.id}>
                <label className="block text-xs text-zinc-500 mb-1">{keyItem.label}</label>
                <input
                  type="password"
                  value={keys[keyItem.id]}
                  onChange={(e) => handleKeyChange(e, keyItem.id)}
                  placeholder="Enter secret key..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-zinc-800 my-4"></div>

        <div>
           <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-zinc-400" />
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Duration</h2>
          </div>
          <label className="block text-xs text-zinc-500 mb-2">Target Duration: {duration} min</label>
          <input 
            type="range" 
            min="1" max="30" 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>

        <div>
           <div className="flex items-center gap-2 mb-3">
            <Globe size={16} className="text-zinc-400" />
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Language</h2>
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Nepali</option>
          </select>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-3">
            <Palette size={16} className="text-zinc-400" />
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Theme Engine</h2>
          </div>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
          >
            <option>True Crime / Mystery</option>
            <option>Historical Archive</option>
          </select>
        </div>
      </div>
    </div>
  );
}
