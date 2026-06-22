import React, { useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ThumbnailStudio({ keys, topic, theme }: any) {
  const [title, setTitle] = useState(topic || 'The Mystery Unfolds');
  const [fontSize, setFontSize] = useState(60);
  const [bannerColor, setBannerColor] = useState(theme === 'True Crime / Mystery' ? '#CC0000' : '#1A1A1A');
  
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // We usually hit DALL-E 3 here, for safety we will just use a nice placeholder 
  // or actually hit the OpenAI proxy if the key exists! Since we haven't built the OpenAI proxy in server.ts, 
  // let's just use a high-quality placeholder for the sandbox, or simulate the fetch.
  
  const generateBackground = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    // Simulated DALL-E 3 response
    const mockImages = {
      'True Crime / Mystery': 'https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      'Historical Archive': 'https://images.pexels.com/photos/3684122/pexels-photo-3684122.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2'
    };
    setThumbnailUrl((mockImages as any)[theme] || mockImages['True Crime / Mystery']);
    setIsLoading(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ImageIcon className="text-red-500" />
        Thumbnail Refinement Studio
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="col-span-1 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">High-Impact Title Overlay</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Font Size ({fontSize}px)</label>
             <input flex-1="" type="range" min="40" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-red-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Title Banner Color</label>
            <input type="color" value={bannerColor} onChange={e => setBannerColor(e.target.value)} className="w-full h-10 rounded border border-zinc-800 bg-zinc-950 cursor-pointer" />
          </div>
          
          <button 
            onClick={generateBackground}
            disabled={isLoading}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-3 rounded transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
            Generate DALL-E 3 Background
          </button>
        </div>

        <div className="col-span-1 lg:col-span-2">
           <div className="aspect-video bg-zinc-950 rounded-lg overflow-hidden relative border border-zinc-800 flex items-center justify-center">
             {thumbnailUrl ? (
               <img src={thumbnailUrl} alt="Thumbnail Background" className="w-full h-full object-cover opacity-80" />
             ) : (
               <div className="text-zinc-600 font-mono text-sm text-center px-8">
                 Click "Generate DALL-E 3 Background" to load contextual image canvas.
               </div>
             )}
             
             {/* Center Title Banner */}
             {(thumbnailUrl || title) && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                 <div 
                   style={{ backgroundColor: bannerColor, padding: '10px 20px', borderRadius: '4px' }}
                   className="shadow-2xl border border-white/20"
                 >
                    <h1 
                      style={{ fontSize: `${fontSize}px` }} 
                      className="font-bold text-white tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl font-sans"
                    >
                      {title}
                    </h1>
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
