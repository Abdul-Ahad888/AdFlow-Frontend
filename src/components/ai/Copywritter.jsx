import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://ad-flow-backend.vercel.app';

export default function Copywriter() {
  const [input, setInput] = useState({ product: '', tone: 'Professional', platform: 'Facebook' });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const startStreaming = async () => {
    setLoading(true);
    setOutput("");
    
    try {
      const response = await fetch(`${API_BASE}/api/generate/copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: input.product,
          tone: input.tone,
          platform: input.platform,
          word_limit: 100
        }),
      });

      if (!response.ok) {
        let msg = `Request failed (${response.status}).`;
        try {
          const errBody = await response.json();
          if (errBody?.error || errBody?.message) {
            msg = errBody.message || errBody.error || msg;
          }
        } catch {
          try {
            msg = (await response.text()) || msg;
          } catch { /* keep default */ }
        }
        setOutput(msg);
        return;
      }

      if (!response.body) {
        setOutput('No response body from server. Streaming may be disabled on the host.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split('\n');
        sseBuffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trimStart();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error != null) {
              const errMsg =
                typeof parsed.message === 'string'
                  ? parsed.message
                  : typeof parsed.error === 'string'
                    ? parsed.error
                    : 'Stream error from server.';
              setOutput((prev) => (prev ? `${prev}\n\n` : '') + errMsg);
              continue;
            }
            if (typeof parsed.text === 'string' && parsed.text.length > 0) {
              setOutput((prev) => prev + parsed.text);
            }
          } catch {
            /* incomplete JSON; will resolve on next chunk if line was buffered wrong */
          }
        }
      }
    } catch (err) {
      setOutput("Connection failed. Check backend URL, CORS, and that GEMINI_API_KEY is set on Vercel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input 
          className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Product name..."
          onChange={(e) => setInput({...input, product: e.target.value})}
        />
        <select 
          className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 outline-none"
          onChange={(e) => setInput({...input, platform: e.target.value})}
        >
          <option>Facebook</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
        </select>
      </div>

      <button 
        onClick={startStreaming}
        disabled={loading || !input.product}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? 'Generating...' : 'Execute Generation'}
      </button>

      <div className="mt-8 p-8 bg-slate-900 rounded-[2rem] min-h-[300px] border border-slate-800 relative">
        <div className="absolute top-4 left-6 flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <pre className="text-blue-400 font-mono text-sm whitespace-pre-wrap leading-relaxed mt-4">
          {output || "// Awaiting system input..."}
          {loading && <span className="inline-block w-2 h-5 ml-1 bg-blue-500 animate-pulse align-middle"></span>}
        </pre>
      </div>
    </div>
  );
}