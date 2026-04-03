import React, { useState } from 'react';
import { Hash, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';

export default function HashtagGuru() {
  const [industry, setIndustry] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const fetchHashtags = async () => {
    if (!industry) return;
    setLoading(true);
    try {
      const response = await fetch('https://ad-flow-backend.vercel.app/api/generate/hashtag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          industry: industry,
          content: "Trending topics and high-reach keywords" 
        }),
      });
  
      const data = await response.json();
      
      const rawTags = data.hashtags.match(/#[\w\d]+/g) || [];
      
      setHashtags(rawTags.slice(0, 10));
    } catch (err) {
      console.error("Hashtag Error:", err);
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
    <div className="flex flex-col gap-5">
      {/* Input Section */}
      <div className="relative">
        <input 
          type="text"
          placeholder="e.g. Fintech, Luxury Fashion..."
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
        />
        <button 
          onClick={fetchHashtags}
          disabled={loading || !industry}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
        </button>
      </div>

      {/* Tags Display Area */}
      <div className="min-h-[120px] p-4 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 items-center justify-center">
        {hashtags.length > 0 ? (
          hashtags.map((tag, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(tag, index)}
              className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-green-500 dark:hover:border-green-500 transition-all flex items-center gap-2 group"
            >
              {tag}
              {copiedIndex === index ? (
                <Check size={12} className="text-green-500" />
              ) : (
                <Copy size={12} className="opacity-0 group-hover:opacity-100 text-slate-400" />
              )}
            </button>
          ))
        ) : (
          <div className="text-center">
             <Hash size={24} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
             <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Awaiting Industry Input</p>
          </div>
        )}
      </div>

      {/* Bulk Action */}
      {hashtags.length > 0 && (
        <button 
          onClick={() => copyToClipboard(hashtags.join(' '), 'all')}
          className="text-[10px] font-bold text-slate-400 hover:text-green-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
        >
          {copiedIndex === 'all' ? 'All Copied!' : 'Copy All Hashtags'}
        </button>
      )}
    </div>
  );
}