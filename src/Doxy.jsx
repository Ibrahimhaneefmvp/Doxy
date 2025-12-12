import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FileText, Copy, Settings, Eraser, Check, Type, Sparkles, AlertCircle, X,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List,
  Heading1, Heading2, FileDown, Zap, Wand2, Printer, Palette,
  GraduationCap, BookOpen, Calculator, LayoutTemplate, ArrowRight,
  Cpu, Share2, ShieldCheck, Terminal, ChevronRight, Play, Star,
  RotateCcw, Trash2, Moon, Sun, Undo, Redo, RemoveFormatting, Link as LinkIcon, Quote
} from 'lucide-react';

// --- VISUAL FX COMPONENT ---
const ParticleBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

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
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100 + 100;
        if (theme === 'sunset') {
           this.color = Math.random() > 0.5 ? '#f472b6' : '#22d3ee';
        } else {
           this.color = Math.random() > 0.5 ? '#ccff00' : '#ffffff';
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > canvas.height) this.reset();
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = window.innerWidth < 768 ? 50 : 120;
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 180) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 1 - distance / 180;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- LANDING PAGE ---
const LandingPage = ({ onLaunch, katexLoaded }) => {
  const mathRef = useRef(null);

  useEffect(() => {
    if (katexLoaded && mathRef.current && window.katex) {
      try {
        window.katex.render("\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}", mathRef.current, {
          throwOnError: false, displayMode: true, output: "html"
        });
      } catch (e) { console.error(e); }
    }
  }, [katexLoaded]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
      <ParticleBackground theme="dark" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            <span className="font-bold text-black text-xl tracking-tighter">Df.</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Doxy</span>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={onLaunch} className="text-sm font-bold bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full transition-all text-white border border-white/10 hover:border-[#ccff00]/50">Launch Studio</button>
        </div>
      </nav>
      <header className="relative z-10 px-6 pt-24 pb-32 max-w-7xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur text-[#ccff00] text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
            </span>
            We're not getting lazy, we're just becoming efficient.
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            STOP FORMATTING. <br />
            START <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-emerald-400">SUBMITTING.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            The secret weapon for the AI generation. We turn your chaotic chatbot notes into <span className="text-white font-medium"> Distinction-Grade</span> papers with zero effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <button onClick={onLaunch} className="group relative px-8 py-4 bg-[#ccff00] text-black font-bold text-lg rounded-sm hover:bg-[#b3e600] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.4)]">
              Enter The Studio <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
        <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent blur-3xl rounded-full opacity-20"></div>
          <div className="relative bg-[#0f0f0f] border border-white/10 rounded-xl p-8 backdrop-blur-md rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <div className="h-4 w-32 bg-white/10 rounded mb-8"></div>
            <div className="space-y-4">
               <div className="h-2 w-full bg-white/5 rounded"></div>
               <div className="h-2 w-5/6 bg-white/5 rounded"></div>
               <div className="py-4">
                 <div className="h-24 w-full bg-[#ccff00]/5 border border-[#ccff00]/20 rounded flex items-center justify-center text-[#ccff00] font-mono text-sm overflow-hidden p-4">
                   <div ref={mathRef}>{'$$ \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2} $$'}</div>
                 </div>
               </div>
               <div className="h-2 w-full bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 px-6 py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calculator, title: "LaTeX Math Engine", desc: "Real-time rendering for STEM majors." },
              { icon: GraduationCap, title: "Instant Cover Pages", desc: "University standard formats in 1 click." },
              { icon: Wand2, title: "AI Structure", desc: "Turns walls of text into readable reports." },
              { icon: ShieldCheck, title: "Privacy Core", desc: "Data stays in your browser's LocalStorage." },
              { icon: BookOpen, title: "Auto-Citations", desc: "Scrapes links into a Bibliography." },
              { icon: FileDown, title: "Word Export", desc: "Native .doc support for the LMS." }
            ].map((f, i) => (
              <div key={i} className="bg-black border border-white/10 p-6 hover:border-[#ccff00]/30 transition-all group">
                <f.icon className="text-slate-500 group-hover:text-[#ccff00] mb-4 transition-colors" size={24} />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-600 text-sm relative z-10 bg-black border-t border-white/5">
        <p>With ❤️, Team Swiftly⚡.</p>
      </footer>
    </div>
  );
};

// --- STUDIO COMPONENT ---
const Studio = ({ onHome, katexLoaded }) => {
  // State
  const [mode, setMode] = useState('instant');
  const [inputText, setInputText] = useState("");
  const [formattedHtml, setFormattedHtml] = useState("");
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [theme, setTheme] = useState('academic');
  const [uiTheme, setUiTheme] = useState('dark');
  const [lastSaved, setLastSaved] = useState(null);
  const [stats, setStats] = useState({ words: 0, time: 0 });
  const [activeFormats, setActiveFormats] = useState({}); // Stores which buttons are active

  const [coverData, setCoverData] = useState({
    uni: "University Name", course: "Course Title 101", title: "Assignment Title", student: "Student Name", date: new Date().toLocaleDateString()
  });

  const previewRef = useRef(null);

  // UI Theme Logic
  const uiStyles = {
    dark: {
      bg: 'bg-[#050505]', nav: 'bg-[#0a0a0a]', sidebar: 'bg-[#080808]', toolbar: 'bg-[#0a0a0a]',
      editorBg: 'bg-[#111111]', text: 'text-slate-200', border: 'border-white/5',
      accent: 'bg-[#ccff00] text-black', secondary: 'text-slate-500', selection: 'selection:bg-[#ccff00] selection:text-black',
      hover: 'hover:text-[#ccff00] hover:bg-white/5', activeBtn: 'text-[#ccff00] bg-white/10'
    },
    sunset: {
      bg: 'bg-[#1a0b2e]', nav: 'bg-[#2d1b4e]', sidebar: 'bg-[#24123b]', toolbar: 'bg-[#2d1b4e]',
      editorBg: 'bg-[#130725]', text: 'text-pink-100', border: 'border-pink-500/20',
      accent: 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white', secondary: 'text-pink-300/50',
      selection: 'selection:bg-pink-500 selection:text-white',
      hover: 'hover:text-pink-300 hover:bg-pink-500/10', activeBtn: 'text-pink-300 bg-pink-500/20'
    }
  };
  const currentUi = uiStyles[uiTheme];

  const themeStyles = {
    modern: { container: "font-sans text-slate-800", h1: "text-slate-900 border-slate-100", accent: "text-indigo-600" },
    academic: { container: "font-serif text-black leading-loose text-justify", h1: "text-black border-black/20 uppercase tracking-widest text-center", accent: "text-black italic" },
    creative: { container: "font-sans text-slate-900", h1: "text-violet-700 border-violet-100 font-black tracking-tight", accent: "text-violet-600" }
  };

  // State Persistence
  useEffect(() => {
    const saved = localStorage.getItem('Doxy_data');
    if (saved) {
      const p = JSON.parse(saved);
      setInputText(p.inputText || "");
      if (p.docTitle) setDocTitle(p.docTitle);
      if (p.theme) setTheme(p.theme);
      if (p.apiKey) setApiKey(p.apiKey);
      if (p.uiTheme) setUiTheme(p.uiTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Doxy_data', JSON.stringify({ inputText, docTitle, theme, apiKey, uiTheme }));
    setLastSaved(new Date());
    if (inputText) {
      const w = inputText.trim().split(/\s+/).length;
      setStats({ words: w, time: Math.ceil(w / 200) });
    }
  }, [inputText, docTitle, theme, apiKey, uiTheme]);

  // -- Toolbar Active State Logic --
  const updateActiveFormats = useCallback(() => {
    if (!document) return;
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    });
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    // Update toolbar state on interaction
    el.addEventListener('mouseup', updateActiveFormats);
    el.addEventListener('keyup', updateActiveFormats);
    return () => {
      el.removeEventListener('mouseup', updateActiveFormats);
      el.removeEventListener('keyup', updateActiveFormats);
    };
  }, [updateActiveFormats]);


  // -- Processing --
  const processText = (text) => {
    if (!text) return "";
    const s = themeStyles[theme];
    const renderMath = (latex, display) => {
      if (window.katex) {
        try { return window.katex.renderToString(latex, { displayMode: display, throwOnError: false }); } catch (e) { return latex; }
      }
      return latex;
    };

    let html = text
      // Math: Wrap in contentEditable=false to protect structure during manual edits
      .replace(/(\$\$[\s\S]*?\$\$)/gm, m => `<div class="math-block my-6 text-center select-none" contenteditable="false">${renderMath(m.slice(2, -2), true)}</div>`)
      .replace(/(\$[^$]*\$)/gm, m => `<span class="math-inline px-1 select-none" contenteditable="false">${renderMath(m.slice(1, -1), false)}</span>`)
      .replace(/^\s*\*\*(.*?)\*\*\s*$/gm, '### $1')
      .replace(/^#\s+(.*$)/gim, `<h1 class="text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 ${s.h1}">$1</h1>`)
      .replace(/^##\s+(.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 opacity-90">$1</h2>')
      .replace(/^###\s+(.*$)/gim, `<h3 class="text-xl font-bold mt-6 mb-3 ${s.accent}">$1</h3>`)
      .replace(/^####\s+(.*$)/gim, '<h4 class="text-lg font-bold mt-5 mb-2 opacity-85">$1</h4>') // Added H4 Support
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong class="font-bold bg-yellow-100/50 px-1 rounded"><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/__(.*?)__/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="opacity-80">$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-50 p-4 rounded-lg my-6 font-mono text-sm overflow-x-auto shadow-inner">$1</pre>')
      .replace(/`(.*?)`/gim, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 border border-slate-200">$1</code>')
      .replace(/^>\s?(.*$)/gim, `<blockquote class="border-l-4 border-current pl-4 py-2 my-6 italic opacity-70 bg-opacity-5 bg-slate-500 rounded-r-lg">$1</blockquote>`)
      .replace(/\[(.*?)\]\((.*?)\)/gim, `<a href="$2" target="_blank" class="citation-link font-medium underline underline-offset-2 ${s.accent}">$1</a>`)
      .replace(/((?:^\|[^\n]*\|\r?\n)+)/gm, (match) => formatTable(match))
      .replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-6 list-disc pl-1 mb-2 marker:opacity-50">$1</li>')
      .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-6 list-decimal pl-1 mb-2 font-medium marker:opacity-80">$2</li>')
      .split('\n\n').map(p => {
        const t = p.trim();
        if (t.startsWith('<h') || t.startsWith('<pre') || t.startsWith('<blockquote') || t.startsWith('<li') || t.startsWith('<div class="math') || t.startsWith('<div class="over')) return t;
        return `<p class="mb-4 leading-relaxed opacity-90 text-lg">${t.replace(/\n/g, '<br/>')}</p>`;
      }).join('\n');
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

    // Fixed Table Opacity Issue: Removed 'opacity-10' from div container
    let html = '<div class="overflow-x-auto my-6 border border-current rounded-lg shadow-sm">';
    html += '<table class="w-full text-sm text-left border-collapse">';
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
  }, [inputText, theme, katexLoaded]);

  // -- Actions --
  const execCmd = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    updateActiveFormats(); // Immediate feedback
    if (previewRef.current) previewRef.current.focus();
  };

  const handleLink = () => {
    const url = prompt("Enter Link URL:", "https://");
    if (url) execCmd("createLink", url);
  };

  const insertCoverPage = () => {
    const html = `<div class="cover-page mb-16 text-center py-24 border-b-2 border-slate-100" contenteditable="false">
      <h2 class="text-xl uppercase tracking-widest mb-2 opacity-60">${coverData.uni}</h2>
      <h3 class="text-lg font-medium mb-12 opacity-50">${coverData.course}</h3>
      <h1 class="text-5xl font-extrabold mb-8 leading-tight">${coverData.title}</h1>
      <div class="inline-block border-t border-slate-300 w-24 mb-8"></div>
      <p class="text-xl font-medium mb-2">${coverData.student}</p>
      <p class="text-slate-500">${coverData.date}</p>
    </div>`;
    if (previewRef.current) {
      previewRef.current.innerHTML = html + previewRef.current.innerHTML;
      setShowCoverModal(false);
    }
  };

  const generateBibliography = () => {
    if (!previewRef.current) return;
    const links = previewRef.current.querySelectorAll('a.citation-link');
    if (links.length === 0) { setNotification({msg:"No citations found.", type:'error'}); return; }
    let html = `<div class="bibliography mt-16 pt-8 border-t border-slate-200 page-break-before"><h2 class="text-2xl font-bold mb-6">References</h2><ul class="list-none space-y-4">`;
    links.forEach((l, i) => html += `<li class="pl-8 -indent-8 text-slate-700">[${i+1}] ${l.innerText}. Available at: <span class="italic underline text-blue-600">${l.href}</span> (Accessed: ${new Date().toLocaleDateString()}).</li>`);
    html += `</ul></div>`;
    previewRef.current.innerHTML += html;
    setNotification({msg:"Bibliography Generated!", type:'success'});
  };

  const handleReset = () => {
    if (confirm("Reset Document?")) {
      setInputText(""); setDocTitle("Untitled Document"); if (previewRef.current) previewRef.current.innerHTML = "";
    }
  };

  const handleDownload = (fmt) => {
    if (!previewRef.current) return;
    const content = previewRef.current.innerHTML;
    let mime = 'text/plain', ext = 'txt', body = previewRef.current.innerText;
    if (fmt === 'html') {
      mime = 'text/html'; ext = 'html';
      body = `<!DOCTYPE html><html><head><title>${docTitle}</title><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"></head><body style="max-width:800px;margin:0 auto;font-family:serif;line-height:1.6">${content}</body></html>`;
    } else if (fmt === 'doc') {
      mime = 'application/msword'; ext = 'doc';
      body = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset="utf-8"><title>${docTitle}</title></head><body>${content}</body></html>`;
    }
    const blob = new Blob([body], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${docTitle.replace(/\s+/g, '_')}.${ext}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const handleAIMagic = async () => {
    if (!apiKey) { setShowSettings(true); return; }
    setIsProcessing(true);
    try {
      const prompt = `Format text to academic ${theme} style. Use LaTeX for math ($$). Text:\n${inputText}`;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) { setInputText(text); setNotification({msg:"Magic Applied!", type:'success'}); }
    } catch (e) { setNotification({msg: e.message, type:'error'}); } finally { setIsProcessing(false); }
  };

  // --- Toolbar Component ---
  const EditorBtn = ({ icon: Icon, title, onClick, active, disabled }) => (
    <button 
      onMouseDown={(e) => { e.preventDefault(); onClick(); }} // Prevent focus loss on click
      title={title} 
      disabled={disabled}
      className={`p-2 rounded transition-colors shrink-0 ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${active ? currentUi.activeBtn : currentUi.secondary} ${!active && !disabled ? currentUi.hover : ''}`} 
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className={`flex flex-col h-screen ${currentUi.bg} font-sans ${currentUi.text} ${currentUi.selection} transition-colors duration-500`}>
      <style>{`@media print { nav, .sidebar, .toolbar, .print-hide { display: none !important; } .main-content { background: white; } }`}</style>
      
      {/* Navbar */}
      <nav className={`h-14 ${currentUi.nav} ${currentUi.border} border-b flex items-center justify-between px-4 z-20 shadow-sm shrink-0`}>
        <div className="flex items-center gap-4">
          <button onClick={onHome} className="flex items-center gap-3 hover:opacity-80"><div className={`p-1.5 rounded shadow ${currentUi.accent}`}><FileText size={20}/></div><span className="font-bold text-lg hidden sm:inline">Doxy</span></button>
          <span className={`${currentUi.secondary} hidden md:inline`}>/</span>
          <input value={docTitle} onChange={e=>setDocTitle(e.target.value)} className={`bg-transparent font-medium outline-none w-48 truncate ${currentUi.text} opacity-90 focus:opacity-100 hidden md:block`} />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>setUiTheme(t => t==='dark'?'sunset':'dark')} className={`p-2 rounded-full border ${currentUi.border} hover:bg-white/10`} title="Toggle Theme">{uiTheme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
          {lastSaved && <span className={`text-xs ${currentUi.secondary} hidden md:flex gap-1 items-center`}><Check size={12}/> Saved</span>}
          <button onClick={()=>setShowSettings(true)} className={`p-2 rounded-full border ${currentUi.border} ${!apiKey ? 'text-amber-500 border-amber-500/30' : currentUi.secondary}`}><Settings size={16}/></button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden main-content">
        {/* Input Sidebar */}
        <div className={`sidebar w-full md:w-1/3 border-r ${currentUi.border} flex flex-col ${currentUi.sidebar} ${activeTab==='editor'?'block':'hidden md:flex'}`}>
          <div className={`p-3 border-b ${currentUi.border} grid grid-cols-2 gap-1`}>
            <button onClick={()=>setMode('instant')} className={`flex items-center justify-center gap-2 py-2 rounded text-sm font-medium ${mode==='instant' ? currentUi.accent : currentUi.secondary}`}><Zap size={16}/> Instant</button>
            <button onClick={()=>setMode('magic')} className={`flex items-center justify-center gap-2 py-2 rounded text-sm font-medium ${mode==='magic' ? 'bg-indigo-600 text-white' : currentUi.secondary}`}><Wand2 size={16}/> Magic</button>
          </div>
          <div className="flex-1 relative">
            <textarea className={`absolute inset-0 w-full h-full p-6 resize-none focus:outline-none font-mono text-sm ${currentUi.text} bg-transparent leading-6`} placeholder="# Paste raw text here..." value={inputText} onChange={e=>setInputText(e.target.value)}/>
            {inputText && <button onClick={()=>setInputText('')} className="absolute top-2 right-2 p-1.5 bg-white/10 text-slate-400 rounded hover:text-red-500 opacity-70 hover:opacity-100"><Eraser size={14}/></button>}
          </div>
          <div className={`p-4 border-t ${currentUi.border}`}>
             <button onClick={handleAIMagic} disabled={isProcessing||!inputText} className={`w-full py-3 rounded font-bold flex justify-center gap-2 ${isProcessing ? 'bg-white/5 text-slate-500' : 'bg-indigo-600 text-white'}`}>{isProcessing ? "Processing..." : <><Sparkles size={16}/> Apply Magic</>}</button>
          </div>
        </div>

        {/* Editor Area */}
        <div className={`flex-1 flex flex-col ${currentUi.editorBg} ${activeTab==='preview'?'block':'hidden md:flex'}`}>
          {/* Robust Toolbar */}
          <div className={`toolbar h-12 ${currentUi.toolbar} border-b ${currentUi.border} flex items-center px-4 justify-between shadow-sm z-10 overflow-x-auto no-scrollbar`}>
            <div className={`flex items-center gap-1 pr-4 border-r ${currentUi.border}`}>
               <EditorBtn icon={Undo} title="Undo" onClick={()=>execCmd('undo')} />
               <EditorBtn icon={Redo} title="Redo" onClick={()=>execCmd('redo')} />
               <div className={`w-px h-4 bg-white/10 mx-2`}></div>
               <EditorBtn icon={Bold} title="Bold" active={activeFormats.bold} onClick={()=>execCmd('bold')} />
               <EditorBtn icon={Italic} title="Italic" active={activeFormats.italic} onClick={()=>execCmd('italic')} />
               <EditorBtn icon={Underline} title="Underline" active={activeFormats.underline} onClick={()=>execCmd('underline')} />
               <EditorBtn icon={RemoveFormatting} title="Clear Format" onClick={()=>execCmd('removeFormat')} />
               <div className={`w-px h-4 bg-white/10 mx-2`}></div>
               <EditorBtn icon={AlignLeft} title="Left" active={activeFormats.justifyLeft} onClick={()=>execCmd('justifyLeft')} />
               <EditorBtn icon={AlignCenter} title="Center" active={activeFormats.justifyCenter} onClick={()=>execCmd('justifyCenter')} />
               <EditorBtn icon={AlignRight} title="Right" active={activeFormats.justifyRight} onClick={()=>execCmd('justifyRight')} />
               <div className={`w-px h-4 bg-white/10 mx-2`}></div>
               <EditorBtn icon={Heading1} title="H1" onClick={()=>execCmd('formatBlock','H1')} />
               <EditorBtn icon={Heading2} title="H2" onClick={()=>execCmd('formatBlock','H2')} />
               <EditorBtn icon={Quote} title="Quote" onClick={()=>execCmd('formatBlock','BLOCKQUOTE')} />
               <EditorBtn icon={LinkIcon} title="Link" onClick={handleLink} />
               <div className={`w-px h-4 bg-white/10 mx-2`}></div>
               <EditorBtn icon={GraduationCap} title="Cover Page" onClick={()=>setShowCoverModal(true)} />
               <EditorBtn icon={BookOpen} title="Bibliography" onClick={generateBibliography} />
               <EditorBtn icon={Trash2} title="Reset" onClick={handleReset} />
            </div>
            <div className="flex items-center gap-2 pl-4 shrink-0">
               <button onClick={window.print} className={`px-2 py-1 text-xs font-medium ${currentUi.secondary} bg-white/5 rounded`}><Printer size={14}/></button>
               <button onClick={()=>handleDownload('doc')} className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded"><FileDown size={14}/> .Doc</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 cursor-text bg-black/20" onClick={()=>previewRef.current?.focus()}>
            <div className={`document-page max-w-3xl mx-auto bg-white shadow-2xl rounded-sm min-h-[800px] p-12 outline-none ${themeStyles[theme].container}`}>
              {!inputText && <div className="text-slate-300 italic pointer-events-none absolute">Start typing or paste content...</div>}
              <div ref={previewRef} contentEditable suppressContentEditableWarning className="outline-none min-h-[700px]" dangerouslySetInnerHTML={{__html: formattedHtml}} onInput={updateActiveFormats} />
            </div>
            <div className={`stats-footer sticky bottom-4 mx-auto w-fit ${currentUi.nav} ${currentUi.text} border ${currentUi.border} px-4 py-1.5 rounded-full text-xs shadow-lg flex gap-4 opacity-90`}>
              <span className="flex items-center gap-1"><LayoutTemplate size={12}/> {stats.words} words</span>
              <span className="opacity-50">|</span>
              <span className="flex items-center gap-1"><Calculator size={12}/> ~{stats.time} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals (Settings, Cover Page) - kept simple for brevity but styled with currentUi */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className={`${currentUi.nav} border ${currentUi.border} rounded-xl p-6 w-full max-w-sm`}>
            <div className="flex justify-between mb-4"><h3 className="font-bold">Settings</h3><button onClick={()=>setShowSettings(false)}><X/></button></div>
            <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} className="w-full p-2 bg-black/20 border border-white/10 rounded mb-4" placeholder="Gemini API Key" />
            <button onClick={()=>setShowSettings(false)} className={`w-full py-2 rounded ${currentUi.accent}`}>Save</button>
          </div>
        </div>
      )}
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-xl flex items-center gap-2 z-50 ${notification.type==='error'?'bg-red-600 text-white':'bg-green-600 text-white'}`}>
          {notification.type==='error'?<AlertCircle size={16}/>:<Check size={16}/>} {notification.msg}
        </div>
      )}
    </div>
  );
};

// --- ROOT ---
const Doxy = () => {
  const [view, setView] = useState('landing');
  const [katexLoaded, setKatexLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link'); link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"; link.rel = "stylesheet"; document.head.appendChild(link);
    const script = document.createElement('script'); script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"; 
    script.onload = () => setKatexLoaded(true); document.head.appendChild(script);
  }, []);

  return view === 'landing' ? <LandingPage onLaunch={()=>setView('app')} katexLoaded={katexLoaded}/> : <Studio onHome={()=>setView('landing')} katexLoaded={katexLoaded}/>;
};

export default Doxy;
