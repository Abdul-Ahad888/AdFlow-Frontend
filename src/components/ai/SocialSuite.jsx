import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function SocialSuite() {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getSocial = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate/social', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: "Instagram",
          campaign_goal: "Brand Awareness",
          brand_voice: "Friendly"
        })
      }); 
      const data = await response.json();
      if (data.captions) {
        const cleaned = data.captions
          .split('\n')
          .filter(t => t.trim())
          .map(t => t.replace(/^\d+\.\s*/, ''));
        setCaptions(cleaned); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={getSocial}
        className="text-[10px] font-black uppercase tracking-widest text-purple-500 border border-purple-500/20 w-full py-2 rounded-xl hover:bg-purple-500/10 transition-all"
      >
        {loading ? 'Syncing...' : 'Generate 5 Variations'}
      </button>

      <div className="space-y-3">
        {captions.map((text, i) => (
          <div key={i} className="group relative p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-purple-500/30 transition-all">
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{text.substring(0, 100)}..."</p>
            <button 
              onClick={() => copyToClipboard(text, i)}
              className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-purple-500"
            >
              {copiedIndex === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}