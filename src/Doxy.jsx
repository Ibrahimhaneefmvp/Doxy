import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  FileText, Copy, Settings, Eraser, Check, Type, Sparkles, AlertCircle, X,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List,
  Heading1, Heading2, FileDown, Zap, Wand2, Printer, Palette,
  GraduationCap, BookOpen, Calculator, LayoutTemplate, ArrowRight,
  Cpu, Share2, ShieldCheck, Terminal, ChevronRight, Play, Star
} from 'lucide-react';

// --- VISUAL FX COMPONENT (Cyber-Sakura) ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Cyber-Sakura Particle Class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Start scattered
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1; // Drift left/right
        this.speedY = Math.random() * 1 + 0.5; // Fall speed
        this.life = Math.random() * 100 + 100;
        this.opacity = Math.random() * 0.5 + 0.2;
        // Theme colors: Cyber Lime or Ghostly White
        this.color = Math.random() > 0.8 ? '#ccff00' : '#ffffff'; 
        this.rotation = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
      }
      
      update() {
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // Wind effect
        this.y += this.speedY;
        this.rotation += this.spin;
        this.life--;
        
        if (this.life <= 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Draw a small "petal" or "data shard" (diamond shape)
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size * 0.6, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Init particles
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Subtle gradient background helper
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradient.addColorStop(1, "rgba(20, 20, 20, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- LANDING PAGE COMPONENT ---
const LandingPage = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
      
      <ParticleBackground />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            <span className="font-bold text-black text-xl tracking-tighter">Df.</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Doxy</span>
        </div>
        <div className="flex items-center gap-6">
           <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Features</a>
           <a href="#workflow" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Workflow</a>
           <button onClick={onLaunch} className="text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-white border border-white/10">
             Open Studio
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 px-6 pt-24 pb-32 max-w-7xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur text-[#ccff00] text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
            </span>
            SYSTEM ONLINE v2.1
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            FROM CHAOS <br />
            TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-emerald-400">CLARITY.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            The professional formatting engine for the AI era. Transform raw chatbot output into 
            <span className="text-white font-medium"> university-grade documents</span> with LaTeX math, cover pages, and proper citations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <button 
              onClick={onLaunch}
              className="group relative px-8 py-4 bg-[#ccff00] text-black font-bold text-lg rounded-sm hover:bg-[#b3e600] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              Start Formatting
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <div className="flex items-center gap-2 px-6 py-4 text-sm font-mono text-slate-500 border border-white/10 rounded-sm">
              <Terminal size={14} />
              <span>Free & Local-First</span>
            </div>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent blur-3xl rounded-full opacity-20"></div>
          <div className="relative bg-slate-900/50 border border-white/10 rounded-lg p-6 backdrop-blur-md rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-auto text-xs font-mono text-slate-500">preview.tex</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex gap-4">
                <span className="text-slate-600">01</span>
                <span className="text-pink-400"># Introduction</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">02</span>
                <span className="text-slate-300">The algorithm solves <span className="text-[#ccff00]">$$E = mc^2$$</span> efficiently.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">03</span>
                <span className="text-slate-300">Key findings include:</span>
              </div>
               <div className="flex gap-4">
                <span className="text-slate-600">04</span>
                <span className="text-slate-500 pl-4">- Reduced latency</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">05</span>
                <span className="text-slate-500 pl-4">- Improved accuracy</span>
              </div>
              <div className="mt-4 p-3 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded text-[#ccff00]">
                 <Check size={14} className="inline mr-2" />
                 Formatted successfully
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Workflow Section (New) */}
      <section id="workflow" className="relative z-10 px-6 py-24 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#ccff00] mb-2">THE WORKFLOW</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">From Chatbot to Submit.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
            
            {[
              { icon: Sparkles, title: "1. Copy", desc: "Grab the raw output from ChatGPT, Claude, or Gemini." },
              { icon: Wand2, title: "2. Clean", desc: "Paste into Doxy. Our engine fixes headers, math, and layout." },
              { icon: FileDown, title: "3. Export", desc: "Download as Word (.doc), HTML, or PDF ready for the LMS." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-[#0a0a0a] border border-white/10 p-8 rounded-lg text-center hover:translate-y-[-5px] transition-transform">
                <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <step.icon size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid (Bento Style) */}
      <section id="features" className="relative z-10 px-6 py-24 bg-slate-900/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Math */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#ccff00]/50 transition-colors group">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real Math Rendering</h3>
              <p className="text-slate-400 text-sm">We use KaTeX to transform raw `$$x=y$$` code into beautiful, academic equations.</p>
            </div>

            {/* Card 2: Cover Page */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#ccff00]/50 transition-colors group">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1-Click Cover Pages</h3>
              <p className="text-slate-400 text-sm">Forget formatting title pages. Generate a standard university cover page with one tap.</p>
            </div>

            {/* Card 3: Magic Formatting */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#ccff00]/50 transition-colors group md:row-span-2 flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <Wand2 size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Structure Engine</h3>
                <p className="text-slate-400 text-sm mb-6">Have a wall of text? Our "Magic Mode" uses Gemini to detect headers, lists, and key terms automatically.</p>
              </div>
              <div className="bg-slate-900 rounded p-4 border border-white/5 font-mono text-xs text-slate-500 relative z-10">
                <div className="flex gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <p className="typing-effect text-xs opacity-70">&gt; Scanning input...</p>
                <p className="text-[#ccff00] text-xs">&gt; Structure identified.</p>
                <p className="text-[#ccff00] text-xs">&gt; Optimizing layout.</p>
              </div>
              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ccff00]/10 blur-3xl rounded-full group-hover:bg-[#ccff00]/20 transition-colors"></div>
            </div>

             {/* Card 4: Local First */}
             <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#ccff00]/50 transition-colors group">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Privacy Native</h3>
              <p className="text-slate-400 text-sm">Your essays never leave your browser (unless you use AI features). LocalStorage saves your work.</p>
            </div>

            {/* Card 5: Bibliography */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#ccff00]/50 transition-colors group">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Auto-Bibliography</h3>
              <p className="text-slate-400 text-sm">We scan your text for links and automatically generate a reference list at the bottom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-600 text-sm relative z-10 border-t border-white/5 bg-black">
        <p>&copy; {new Date().getFullYear()} Doxy System. Built for the AI Generation.</p>
      </footer>
    </div>
  );
};


// --- MAIN APP COMPONENT (THE STUDIO) ---
const Studio = ({ onHome, katexLoaded }) => {
  // --- State ---
  const [mode, setMode] = useState('instant');
  const [inputText, setInputText] = useState("");
  const [formattedHtml, setFormattedHtml] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  
  // New State for Academic Features
  const [theme, setTheme] = useState('academic');
  const [lastSaved, setLastSaved] = useState(null);
  const [stats, setStats] = useState({ words: 0, time: 0 });
  
  // Cover Page State
  const [coverData, setCoverData] = useState({
    uni: "University Name",
    course: "Course Title 101",
    title: "Assignment Title",
    student: "Student Name",
    date: new Date().toLocaleDateString()
  });

  // --- Refs ---
  const previewRef = useRef(null);
  const titleRef = useRef(null);

  // --- Theme Config ---
  const themeStyles = {
    modern: {
      container: "font-sans text-slate-800",
      h1: "text-slate-900 border-slate-100",
      accent: "text-indigo-600",
      bg: "bg-white"
    },
    academic: {
      container: "font-serif text-black leading-loose text-justify",
      h1: "text-black border-black/20 uppercase tracking-widest text-center",
      accent: "text-black italic",
      bg: "bg-white"
    },
    creative: {
      container: "font-sans text-slate-900",
      h1: "text-violet-700 border-violet-100 font-black tracking-tight",
      accent: "text-violet-600",
      bg: "bg-violet-50/10"
    }
  };

  // --- Auto-Save & Stats Logic ---
  useEffect(() => {
    const savedData = localStorage.getItem('Doxy_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setInputText(parsed.inputText || "");
      if (parsed.theme) setTheme(parsed.theme);
      if (parsed.apiKey) setApiKey(parsed.apiKey);
    }
  }, []);

  useEffect(() => {
    if (inputText) {
      localStorage.setItem('Doxy_data', JSON.stringify({ inputText, theme, apiKey }));
      setLastSaved(new Date());
      
      const words = inputText.trim().split(/\s+/).length;
      setStats({
        words: words,
        time: Math.ceil(words / 200)
      });
    }
  }, [inputText, theme, apiKey]);

  // --- Formatting Logic ---
  const processText = (text) => {
    if (!text) return "";
    const s = themeStyles[theme];

    // Helper to render math if KaTeX is loaded
    const renderMath = (latex, displayMode) => {
      if (window.katex) {
        try {
          return window.katex.renderToString(latex, {
            displayMode: displayMode,
            throwOnError: false
          });
        } catch (e) {
          console.error(e);
          return latex;
        }
      }
      return latex;
    };

    let html = text
      // We process Math BEFORE escaping HTML to let KaTeX handle the raw string
      // Block Math
      .replace(/(\$\$[\s\S]*?\$\$)/gm, (match) => {
        const latex = match.slice(2, -2);
        const rendered = renderMath(latex, true);
        return `<div class="math-block my-6 text-center">${rendered}</div>`;
      })
      // Inline Math
      .replace(/(\$[^$]*\$)/gm, (match) => {
        const latex = match.slice(1, -1);
        const rendered = renderMath(latex, false);
        return `<span class="math-inline px-1">${rendered}</span>`;
      })

      // NOW escape HTML characters for the rest of the text (careful not to break the HTML we just added)
      // This is a simplified parser; in a production app we'd use a parser tree. 
      // For this single-file robust solution, we assume the user isn't trying to XSS themselves in the other parts.
      // To be safe, we mainly replaced only specific markdown patterns.
      
      // Headers
      .replace(/^\s*\*\*(.*?)\*\*\s*$/gm, '### $1') 
      .replace(/^#\s+(.*$)/gim, `<h1 class="text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 ${s.h1}">$1</h1>`)
      .replace(/^##\s+(.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 opacity-90">$1</h2>')
      .replace(/^###\s+(.*$)/gim, `<h3 class="text-xl font-bold mt-6 mb-3 ${s.accent}">$1</h3>`)
      
      // Emphasis
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong class="font-bold bg-yellow-100/50 px-1 rounded"><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/__(.*?)__/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="opacity-80">$1</em>')
      
      // Code & Quotes
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-50 p-4 rounded-lg my-6 font-mono text-sm overflow-x-auto shadow-inner">$1</pre>')
      .replace(/`(.*?)`/gim, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 border border-slate-200">$1</code>')
      .replace(/^>\s?(.*$)/gim, `<blockquote class="border-l-4 border-current pl-4 py-2 my-6 italic opacity-70 bg-opacity-5 bg-slate-500 rounded-r-lg">$1</blockquote>`)
      
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, `<a href="$2" target="_blank" class="citation-link font-medium underline underline-offset-2 ${s.accent}">$1</a>`)
      
      // Lists & Tables
      .replace(/((?:^\|[^\n]*\|\r?\n)+)/gm, (match) => formatTable(match))
      .replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-6 list-disc pl-1 mb-2 marker:opacity-50">$1</li>')
      .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-6 list-decimal pl-1 mb-2 font-medium marker:opacity-80">$2</li>')
      
      // Paragraphs (Skip our Math blocks and headers)
      .split('\n\n').map(p => {
        const trimmed = p.trim();
        if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li') || trimmed.startsWith('<div class="math-block') || trimmed.startsWith('<div class="overflow-x-auto')) {
          return trimmed;
        }
        return `<p class="mb-4 leading-relaxed opacity-90 text-lg">${trimmed.replace(/\n/g, '<br/>')}</p>`;
      }).join('\n');

    html = html.replace(/((<li class="[^"]*list-disc[^"]*">.*<\/li>\n?)+)/g, '<ul class="my-4 space-y-1">$1</ul>');
    html = html.replace(/((<li class="[^"]*list-decimal[^"]*">.*<\/li>\n?)+)/g, '<ol class="my-4 space-y-1">$1</ol>');
    
    return html;
  };

  const formatTable = (tableBlock) => {
    const lines = tableBlock.trim().split('\n');
    if (lines.length < 2) return tableBlock;
    const headerLine = lines[0];
    const separatorLine = lines[1];
    if (!separatorLine.includes('-') || !separatorLine.includes('|')) return tableBlock;
    const headers = headerLine.split('|').filter(c => c.trim()).map(c => c.trim());
    const alignments = separatorLine.split('|').filter(c => c.trim()).map(cell => {
      const c = cell.trim();
      return (c.startsWith(':') && c.endsWith(':')) ? 'center' : (c.endsWith(':') ? 'right' : 'left');
    });
    const rows = lines.slice(2).map(line => {
      if (!line.trim()) return null;
      return line.split('|').filter(c => c.trim()).map(c => c.trim());
    }).filter(r => r);

    let html = '<div class="overflow-x-auto my-6 border border-current opacity-10 rounded-lg shadow-sm">';
    html += '<table class="w-full text-sm text-left border-collapse opacity-100">';
    html += '<thead class="text-xs uppercase bg-black/5 border-b border-current/10"><tr>';
    headers.forEach((h, i) => html += `<th class="px-6 py-3 font-bold text-${alignments[i] || 'left'} border-r border-current/10 last:border-r-0">${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => {
      html += '<tr class="border-b border-current/5 hover:bg-black/5 transition-colors">';
      row.forEach((c, i) => html += `<td class="px-6 py-3 text-${alignments[i] || 'left'} border-r border-current/10 last:border-r-0">${c || '&nbsp;'}</td>`);
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  };

  useEffect(() => {
    if (inputText) setFormattedHtml(processText(inputText));
  }, [inputText, theme, katexLoaded]); // Re-run if KaTeX loads

  // --- Academic Features ---
  const insertCoverPage = () => {
    const coverHtml = `
      <div class="cover-page mb-16 text-center py-24 border-b-2 border-slate-100" contenteditable="false">
        <h2 class="text-xl uppercase tracking-widest mb-2 opacity-60">${coverData.uni}</h2>
        <h3 class="text-lg font-medium mb-12 opacity-50">${coverData.course}</h3>
        <h1 class="text-5xl font-extrabold mb-8 leading-tight">${coverData.title}</h1>
        <div class="inline-block border-t border-slate-300 w-24 mb-8"></div>
        <p class="text-xl font-medium mb-2">${coverData.student}</p>
        <p class="text-slate-500">${coverData.date}</p>
      </div>
    `;
    if (previewRef.current) {
      previewRef.current.innerHTML = coverHtml + previewRef.current.innerHTML;
      setShowCoverModal(false);
      showNotification("Cover Page Added!", "success");
    }
  };

  const generateBibliography = () => {
    if (!previewRef.current) return;
    const links = previewRef.current.querySelectorAll('a.citation-link');
    if (links.length === 0) {
      showNotification("No links found to cite.", "error");
      return;
    }
    let bibHtml = `<div class="bibliography mt-16 pt-8 border-t border-slate-200 page-break-before">
      <h2 class="text-2xl font-bold mb-6">References</h2>
      <ul class="list-none space-y-4">`;
    links.forEach((link, index) => {
      bibHtml += `<li class="pl-8 -indent-8 text-slate-700">[${index + 1}] ${link.innerText}. Available at: <span class="italic underline text-blue-600">${link.href}</span> (Accessed: ${new Date().toLocaleDateString()}).</li>`;
    });
    bibHtml += `</ul></div>`;
    previewRef.current.innerHTML += bibHtml;
    showNotification("Bibliography Generated!", "success");
  };

  // --- Actions ---
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (previewRef.current) previewRef.current.focus();
  };

  const handlePrint = () => window.print();

  const handleDownload = (format) => {
    if (!previewRef.current) return;
    const content = previewRef.current.innerHTML;
    const title = titleRef.current?.innerText || "Untitled";
    
    let mimeType = 'text/plain';
    let extension = 'txt';
    let fileContent = previewRef.current.innerText;

    if (format === 'html') {
      mimeType = 'text/html';
      extension = 'html';
      fileContent = `<!DOCTYPE html><html><head><title>${title}</title><meta charset="utf-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      </head><body style="max-width:800px;margin:0 auto;font-family:serif;line-height:1.6">${content}</body></html>`;
    } else if (format === 'doc') {
      mimeType = 'application/msword';
      extension = 'doc';
      fileContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="utf-8"><title>${title}</title>
        <style>body{font-family:'Times New Roman',serif;}</style>
        </head><body>${content}</body></html>
      `;
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification(`Downloaded as .${extension}`, "success");
  };

  const handleCopyRichText = async () => {
    if (!previewRef.current) return;
    try {
      const blobHtml = new Blob([previewRef.current.innerHTML], { type: 'text/html' });
      const blobText = new Blob([previewRef.current.innerText], { type: 'text/plain' });
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })]);
      showNotification("Copied to Clipboard!", "success");
    } catch (err) { showNotification("Clipboard error.", "error"); }
  };

  const handleAIMagic = async () => {
    if (!apiKey) { setShowSettings(true); showNotification("API Key required.", "info"); return; }
    if (!inputText) return;
    setIsProcessing(true);
    try {
      const prompt = `Format this text into a university-grade ${theme} document. 
      - Use standard headers (#).
      - Ensure equations are formatted with LaTeX ($$).
      - Create tables for data.
      - Keep citations as links.
      Text:\n${inputText}`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) { setInputText(aiText); showNotification("Magic Complete!", "success"); }
    } catch (error) { showNotification(`AI Error: ${error.message}`, "error"); } finally { setIsProcessing(false); }
  };

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Components ---
  const EditorButton = ({ icon: Icon, title, onClick }) => (
    <button onClick={onClick} title={title} className="p-1.5 rounded transition-colors text-slate-600 hover:bg-slate-100 shrink-0" type="button"><Icon size={18} /></button>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      <style>{`
        @media print {
          @page { margin: 2cm; size: auto; }
          nav, .sidebar, .toolbar, .mobile-tabs, .print-hide, .stats-footer { display: none !important; }
          .main-content { background: white; padding: 0 !important; overflow: visible !important; }
          .document-page { box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; min-height: 0 !important; }
          .page-break-before { page-break-before: always; }
        }
      `}</style>

      {/* Top Bar */}
      <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo Click Handler */}
          <button onClick={onHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className={`p-1.5 rounded-lg shadow-sm transition-colors ${mode === 'magic' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
              {mode === 'magic' ? <Sparkles className="text-white" size={20} /> : <FileText className="text-white" size={20} />}
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800 hidden sm:inline">Doxy <span className={`font-light ${mode === 'magic' ? 'text-indigo-600' : 'text-slate-500'}`}>Studio</span></span>
          </button>
          
          <div className="flex items-center ml-6 bg-slate-100 rounded-lg p-0.5 border border-slate-200 print-hide">
            {['modern', 'academic', 'creative'].map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${theme === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
           {lastSaved && <span className="text-xs text-slate-400 mr-2 hidden md:inline flex items-center gap-1"><Check size={12}/> Saved</span>}
           <button onClick={() => setShowSettings(true)} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${!apiKey ? 'bg-amber-50 text-amber-600 border-amber-200' : 'text-slate-500 border-transparent hover:bg-slate-100'}`}><Settings size={16} />{!apiKey && <span className="hidden sm:inline">Set API Key</span>}</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden main-content">
        <div className={`sidebar w-full md:w-1/3 border-r border-slate-200 flex flex-col bg-slate-50 ${activeTab === 'editor' ? 'block' : 'hidden md:flex'}`}>
          <div className="p-3 border-b border-slate-200 bg-white grid grid-cols-2 gap-1">
            <button onClick={() => setMode('instant')} className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'instant' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><Zap size={16} className={mode === 'instant' ? 'text-amber-500' : ''} /> Instant</button>
            <button onClick={() => setMode('magic')} className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'magic' ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}><Wand2 size={16} className={mode === 'magic' ? 'text-indigo-600' : ''} /> AI Magic</button>
          </div>
          <div className="flex-1 relative group">
            <textarea className="absolute inset-0 w-full h-full p-4 resize-none focus:outline-none font-mono text-sm text-slate-600 bg-slate-50 leading-6" placeholder={mode === 'instant' ? "# Paste Markdown here...\n\nSupports LaTeX Math ($$x=y$$)." : "Paste unstructured text here..."} value={inputText} onChange={(e) => setInputText(e.target.value)} />
            {inputText && <button onClick={() => setInputText('')} className="absolute top-2 right-2 p-1.5 bg-slate-200 text-slate-500 rounded hover:bg-red-100 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Eraser size={14} /></button>}
          </div>
          <div className="p-4 border-t border-slate-200 bg-white">
             {mode === 'instant' ? <div className="text-center text-xs text-slate-400 font-medium py-2"><span className="flex items-center justify-center gap-1"><Zap size={12}/> Auto-converting</span></div> : <button onClick={handleAIMagic} disabled={isProcessing || !inputText} className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{isProcessing ? "Formatting..." : <><Sparkles size={16} /> Format with AI</>}</button>}
          </div>
        </div>

        <div className={`flex-1 flex flex-col bg-slate-100 ${activeTab === 'preview' ? 'block' : 'hidden md:flex'}`}>
          <div className="toolbar h-12 bg-white border-b border-slate-200 flex items-center px-4 justify-between shadow-sm z-10">
            <div className="flex items-center gap-1 pr-4 border-r border-slate-200 overflow-x-auto no-scrollbar">
               <EditorButton icon={Bold} title="Bold" onClick={() => execCmd('bold')} />
               <EditorButton icon={Italic} title="Italic" onClick={() => execCmd('italic')} />
               <EditorButton icon={Underline} title="Underline" onClick={() => execCmd('underline')} />
               <div className="w-px h-4 bg-slate-200 mx-2 hidden sm:block"></div>
               <EditorButton icon={Heading1} title="H1" onClick={() => execCmd('formatBlock', 'H1')} />
               <EditorButton icon={Heading2} title="H2" onClick={() => execCmd('formatBlock', 'H2')} />
               <EditorButton icon={List} title="Bullet List" onClick={() => execCmd('insertUnorderedList')} />
               <div className="w-px h-4 bg-slate-200 mx-2 hidden sm:block"></div>
               <EditorButton icon={GraduationCap} title="Add Cover Page" onClick={() => setShowCoverModal(true)} />
               <EditorButton icon={BookOpen} title="Auto-Generate Bibliography" onClick={generateBibliography} />
            </div>
            <div className="flex items-center gap-2 pl-2 shrink-0">
               <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"><Printer size={14} /> PDF</button>
               <button onClick={() => handleDownload('doc')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"><FileDown size={14} /> .Doc</button>
               <button onClick={handleCopyRichText} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-sm"><Copy size={14} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 cursor-text relative" onClick={() => previewRef.current?.focus()}>
            <div className={`document-page max-w-3xl mx-auto bg-white shadow-xl rounded-sm min-h-[800px] p-12 relative group animate-in fade-in zoom-in-95 duration-300 ${themeStyles[theme].container}`}>
              <div ref={titleRef} contentEditable suppressContentEditableWarning={true} className="text-4xl font-extrabold mb-8 pb-4 border-b border-slate-100 outline-none empty:before:content-['Untitled_Doc'] empty:before:text-slate-300 hover:border-slate-300 transition-colors">New Document</div>
              {inputText ? <div ref={previewRef} contentEditable suppressContentEditableWarning className="outline-none text-lg leading-relaxed min-h-[500px]" dangerouslySetInnerHTML={{ __html: formattedHtml }} /> : <div ref={previewRef} contentEditable suppressContentEditableWarning className="outline-none text-lg leading-relaxed min-h-[500px] empty:before:content-['Type_here...'] empty:before:text-slate-300" />}
            </div>
            <div className="stats-footer sticky bottom-4 left-0 right-0 mx-auto w-fit bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs shadow-lg flex gap-4 opacity-90 hover:opacity-100 transition-opacity z-20">
              <span className="flex items-center gap-1.5"><LayoutTemplate size={12}/> {stats.words} words</span>
              <span className="opacity-50">|</span>
              <span className="flex items-center gap-1.5"><Calculator size={12}/> ~{stats.time} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden mobile-tabs h-14 bg-white border-t border-slate-200 flex shrink-0">
        <button onClick={() => setActiveTab('editor')} className={`flex-1 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'editor' ? 'text-indigo-600' : 'text-slate-500'}`}><Type size={16} /> Input</button>
        <button onClick={() => setActiveTab('preview')} className={`flex-1 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'text-indigo-600' : 'text-slate-500'}`}><FileText size={16} /> Document</button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-slate-800">Settings</h2><button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button></div>
            <div className="mb-6"><label className="block text-sm font-medium text-slate-700 mb-2">Gemini API Key</label><input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="AIza..." /><p className="text-xs text-slate-500 mt-2">Required for Magic Mode. Instant mode is free.</p></div>
            <div className="flex justify-end"><button onClick={() => setShowSettings(false)} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">Done</button></div>
          </div>
        </div>
      )}

      {showCoverModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-slate-800">Cover Page</h2><button onClick={() => setShowCoverModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button></div>
            <div className="space-y-3 mb-6">
               <input className="w-full px-3 py-2 border rounded" placeholder="University Name" value={coverData.uni} onChange={e => setCoverData({...coverData, uni: e.target.value})} />
               <input className="w-full px-3 py-2 border rounded" placeholder="Course Title" value={coverData.course} onChange={e => setCoverData({...coverData, course: e.target.value})} />
               <input className="w-full px-3 py-2 border rounded" placeholder="Assignment Title" value={coverData.title} onChange={e => setCoverData({...coverData, title: e.target.value})} />
               <input className="w-full px-3 py-2 border rounded" placeholder="Student Name" value={coverData.student} onChange={e => setCoverData({...coverData, student: e.target.value})} />
            </div>
            <div className="flex justify-end"><button onClick={insertCoverPage} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Insert</button></div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 ${notification.type === 'success' ? 'bg-green-700 text-white' : notification.type === 'error' ? 'bg-red-700 text-white' : 'bg-slate-800 text-white'}`}>
          {notification.type === 'success' ? <Check size={18} /> : notification.type === 'error' ? <AlertCircle size={18} /> : <Sparkles size={18} />} <span className="font-medium text-sm">{notification.msg}</span>
        </div>
      )}
    </div>
  );
};

// --- ROOT WRAPPER ---
const Doxy = () => {
  const [view, setView] = useState('landing');
  const [katexLoaded, setKatexLoaded] = useState(false);

  useEffect(() => {
    // Load KaTeX CSS
    const link = document.createElement('link');
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load KaTeX JS
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js";
    script.onload = () => {
      setKatexLoaded(true);
      console.log("KaTeX Loaded");
    };
    document.head.appendChild(script);
  }, []);

  return view === 'landing' 
    ? <LandingPage onLaunch={() => setView('app')} /> 
    : <Studio onHome={() => setView('landing')} katexLoaded={katexLoaded} />;
};

export default Doxy;
