import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  FileText, Copy, Settings, Eraser, Check, Type, Sparkles, AlertCircle, X,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List,
  Heading1, Heading2, FileDown, Zap, Wand2, Printer, Palette,
  GraduationCap, BookOpen, Calculator, LayoutTemplate, ArrowRight,
  Cpu, Share2, ShieldCheck, Terminal, ChevronRight, Play, Star,
  RotateCcw, Trash2, Moon, Sun
} from 'lucide-react';

// --- VISUAL FX COMPONENT (Interactive Neural Grid) ---
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
        this.size = Math.random() * 2 + 1; // Slightly larger
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100 + 100;
        // Color based on theme
        if (theme === 'sunset') {
           this.color = Math.random() > 0.5 ? '#f472b6' : '#22d3ee'; // Pink/Cyan
        } else {
           this.color = Math.random() > 0.5 ? '#ccff00' : '#ffffff'; // Lime/White
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.y > canvas.height) this.reset();
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8; // Increased visibility
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = window.innerWidth < 768 ? 50 : 120; // More particles
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 180) { // Longer connection range
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8; // Thicker lines
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />; // Increased container opacity
};

// --- LANDING PAGE COMPONENT ---
const LandingPage = ({ onLaunch, katexLoaded }) => {
  const mathRef = useRef(null);

  useEffect(() => {
    if (katexLoaded && mathRef.current && window.katex) {
      try {
        window.katex.render("\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}", mathRef.current, {
          throwOnError: false,
          displayMode: true,
          output: "html" // Use HTML output to avoid font loading issues if possible
        });
      } catch (e) { console.error(e); }
    }
  }, [katexLoaded]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
      
      <ParticleBackground theme="dark" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            <span className="font-bold text-black text-xl tracking-tighter">Df.</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Doxy</span>
        </div>
        <div className="flex items-center gap-6">
           <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Features</a>
           <button onClick={onLaunch} className="text-sm font-bold bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full transition-all text-white border border-white/10 hover:border-[#ccff00]/50">
             Launch Studio
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
            BUILT BY A STUDENT, FOR STUDENTS
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            STOP FORMATTING. <br />
            START <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-emerald-400">SUBMITTING.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            The secret weapon for the AI generation. We turn your chaotic chatbot notes into 
            <span className="text-white font-medium"> Distinction-Grade</span> papers with zero effort. Move your mouse to see the network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <button 
              onClick={onLaunch}
              className="group relative px-8 py-4 bg-[#ccff00] text-black font-bold text-lg rounded-sm hover:bg-[#b3e600] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.4)]"
            >
              Enter The Studio
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <div className="flex items-center gap-2 px-6 py-4 text-sm font-mono text-slate-500 border border-white/10 rounded-sm">
              <ShieldCheck size={14} />
              <span>100% Free & Local</span>
            </div>
          </div>
        </div>
        
        {/* Visual: Abstract Document */}
        <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent blur-3xl rounded-full opacity-20"></div>
          {/* Floating Elements */}
          <div className="absolute top-0 right-10 bg-black border border-[#ccff00]/30 text-[#ccff00] p-4 rounded font-mono text-xs z-20 shadow-xl">
             &lt;div class="grade-A"&gt;
          </div>
          <div className="relative bg-[#0f0f0f] border border-white/10 rounded-xl p-8 backdrop-blur-md rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <div className="h-4 w-32 bg-white/10 rounded mb-8"></div>
            <div className="space-y-4">
               <div className="h-2 w-full bg-white/5 rounded"></div>
               <div className="h-2 w-5/6 bg-white/5 rounded"></div>
               <div className="h-2 w-4/6 bg-white/5 rounded"></div>
               <div className="py-4">
                 <div className="h-24 w-full bg-[#ccff00]/5 border border-[#ccff00]/20 rounded flex items-center justify-center text-[#ccff00] font-mono text-sm overflow-hidden p-4">
                   <div ref={mathRef}>
                     {/* Fallback if KaTeX isn't loaded yet */}
                     {'$$ \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2} $$'}
                   </div>
                 </div>
               </div>
               <div className="h-2 w-full bg-white/5 rounded"></div>
               <div className="h-2 w-3/4 bg-white/5 rounded"></div>
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
        <p>Made with ☕ by a Student.</p>
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
  const [docTitle, setDocTitle] = useState("Untitled Document"); 
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  
  const [theme, setTheme] = useState('academic');
  const [uiTheme, setUiTheme] = useState('dark'); // 'dark' (Default Void) or 'sunset' (Aesthetic)
  const [lastSaved, setLastSaved] = useState(null);
  const [stats, setStats] = useState({ words: 0, time: 0 });
  
  const [coverData, setCoverData] = useState({
    uni: "University Name",
    course: "Course Title 101",
    title: "Assignment Title",
    student: "Student Name",
    date: new Date().toLocaleDateString()
  });

  const previewRef = useRef(null);

  // --- UI Theme Configs ---
  const uiStyles = {
    dark: {
      bg: 'bg-[#050505]',
      nav: 'bg-[#0a0a0a]',
      sidebar: 'bg-[#080808]',
      toolbar: 'bg-[#0a0a0a]',
      editorBg: 'bg-[#111111]',
      text: 'text-slate-200',
      border: 'border-white/5',
      accent: 'bg-[#ccff00] text-black',
      secondary: 'text-slate-500',
      selection: 'selection:bg-[#ccff00] selection:text-black'
    },
    sunset: {
      bg: 'bg-[#1a0b2e]', // Deep purple
      nav: 'bg-[#2d1b4e]', // Lighter purple
      sidebar: 'bg-[#24123b]',
      toolbar: 'bg-[#2d1b4e]',
      editorBg: 'bg-[#130725]',
      text: 'text-pink-100',
      border: 'border-pink-500/20',
      accent: 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white',
      secondary: 'text-pink-300/50',
      selection: 'selection:bg-pink-500 selection:text-white'
    }
  };

  const currentUi = uiStyles[uiTheme];

  // --- Document Theme Config ---
  const themeStyles = {
    modern: {
      container: "font-sans text-slate-800",
      h1: "text-slate-900 border-slate-100",
      accent: "text-indigo-600",
    },
    academic: {
      container: "font-serif text-black leading-loose text-justify",
      h1: "text-black border-black/20 uppercase tracking-widest text-center",
      accent: "text-black italic",
    },
    creative: {
      container: "font-sans text-slate-900",
      h1: "text-violet-700 border-violet-100 font-black tracking-tight",
      accent: "text-violet-600",
    }
  };

  // --- Auto-Save & Stats Logic ---
  useEffect(() => {
    const savedData = localStorage.getItem('Doxy_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setInputText(parsed.inputText || "");
      if (parsed.docTitle) setDocTitle(parsed.docTitle);
      if (parsed.theme) setTheme(parsed.theme);
      if (parsed.apiKey) setApiKey(parsed.apiKey);
      if (parsed.uiTheme) setUiTheme(parsed.uiTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Doxy_data', JSON.stringify({ inputText, docTitle, theme, apiKey, uiTheme }));
    setLastSaved(new Date());
    
    if (inputText) {
      const words = inputText.trim().split(/\s+/).length;
      setStats({ words: words, time: Math.ceil(words / 200) });
    }
  }, [inputText, docTitle, theme, apiKey, uiTheme]);

  // --- Formatting Logic ---
  const processText = (text) => {
    if (!text) return "";
    const s = themeStyles[theme];

    const renderMath = (latex, displayMode) => {
      if (window.katex) {
        try {
          return window.katex.renderToString(latex, { displayMode, throwOnError: false });
        } catch (e) { return latex; }
      }
      return latex;
    };

    let html = text
      .replace(/(\$\$[\s\S]*?\$\$)/gm, (match) => {
        const rendered = renderMath(match.slice(2, -2), true);
        return `<div class="math-block my-6 text-center">${rendered}</div>`;
      })
      .replace(/(\$[^$]*\$)/gm, (match) => {
        const rendered = renderMath(match.slice(1, -1), false);
        return `<span class="math-inline px-1">${rendered}</span>`;
      })
      .replace(/^\s*\*\*(.*?)\*\*\s*$/gm, '### $1') 
      .replace(/^#\s+(.*$)/gim, `<h1 class="text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 ${s.h1}">$1</h1>`)
      .replace(/^##\s+(.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 opacity-90">$1</h2>')
      .replace(/^###\s+(.*$)/gim, `<h3 class="text-xl font-bold mt-6 mb-3 ${s.accent}">$1</h3>`)
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
  }, [inputText, theme, katexLoaded]);

  // --- Features ---
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
    if (links.length === 0) { showNotification("No links found.", "error"); return; }
    let bibHtml = `<div class="bibliography mt-16 pt-8 border-t border-slate-200 page-break-before"><h2 class="text-2xl font-bold mb-6">References</h2><ul class="list-none space-y-4">`;
    links.forEach((link, index) => {
      bibHtml += `<li class="pl-8 -indent-8 text-slate-700">[${index + 1}] ${link.innerText}. Available at: <span class="italic underline text-blue-600">${link.href}</span> (Accessed: ${new Date().toLocaleDateString()}).</li>`;
    });
    bibHtml += `</ul></div>`;
    previewRef.current.innerHTML += bibHtml;
    showNotification("Bibliography Generated!", "success");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete all content and reset the document.")) {
      setInputText("");
      setDocTitle("Untitled Document");
      if (previewRef.current) previewRef.current.innerHTML = "";
      showNotification("Document Reset", "success");
    }
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (previewRef.current) previewRef.current.focus();
  };

  const handlePrint = () => window.print();

  const handleDownload = (format) => {
    if (!previewRef.current) return;
    const content = previewRef.current.innerHTML;
    let mimeType = 'text/plain';
    let extension = 'txt';
    let fileContent = previewRef.current.innerText;

    if (format === 'html') {
      mimeType = 'text/html';
      extension = 'html';
      fileContent = `<!DOCTYPE html><html><head><title>${docTitle}</title><meta charset="utf-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      </head><body style="max-width:800px;margin:0 auto;font-family:serif;line-height:1.6">${content}</body></html>`;
    } else if (format === 'doc') {
      mimeType = 'application/msword';
      extension = 'doc';
      fileContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="utf-8"><title>${docTitle}</title>
        <style>body{font-family:'Times New Roman',serif;}</style>
        </head><body>${content}</body></html>
      `;
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle.replace(/\s+/g, '_')}.${extension}`;
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
      const prompt = `Format this text into a university-grade ${theme} document. Use standard headers (#), LaTeX ($$) for math, and tables for data. Text:\n${inputText}`;
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

  const EditorButton = ({ icon: Icon, title, onClick }) => (
    <button onClick={onClick} title={title} className={`p-2 rounded hover:bg-white/10 ${currentUi.secondary} hover:text-white transition-colors shrink-0`} type="button"><Icon size={18} /></button>
  );

  return (
    <div className={`flex flex-col h-screen ${currentUi.bg} font-sans ${currentUi.text} ${currentUi.selection} transition-colors duration-500`}>
      <style>{`
        @media print {
          @page { margin: 2cm; size: auto; }
          nav, .sidebar, .toolbar, .mobile-tabs, .print-hide, .stats-footer { display: none !important; }
          .main-content { background: white; padding: 0 !important; overflow: visible !important; }
          .document-page { box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; min-height: 0 !important; }
        }
      `}</style>

      {/* Top Bar */}
      <nav className={`h-14 ${currentUi.nav} ${currentUi.border} border-b flex items-center justify-between px-4 z-20 shadow-sm shrink-0 transition-colors duration-500`}>
        <div className="flex items-center gap-4">
          <button onClick={onHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className={`p-1.5 rounded-lg shadow-sm transition-colors ${mode === 'magic' ? 'bg-indigo-600 text-white' : currentUi.accent}`}>
              {mode === 'magic' ? <Sparkles size={20} /> : <FileText size={20} />}
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">Doxy</span>
          </button>
          
          {/* File Name Input */}
          <div className="hidden md:flex items-center">
             <span className={`${currentUi.secondary} mx-2`}>/</span>
             <input 
               value={docTitle} 
               onChange={(e) => setDocTitle(e.target.value)} 
               className={`bg-transparent font-medium outline-none w-48 truncate ${currentUi.text} opacity-90 focus:opacity-100`}
               placeholder="Untitled Document"
             />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* UI Theme Toggle */}
          <button 
            onClick={() => setUiTheme(prev => prev === 'dark' ? 'sunset' : 'dark')}
            className={`p-2 rounded-full ${currentUi.border} border hover:bg-white/10 transition-all text-white`}
            title="Toggle Cockpit Theme"
          >
            {uiTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className={`flex items-center ${currentUi.border} border bg-white/5 rounded-lg p-0.5 print-hide`}>
            {['modern', 'academic', 'creative'].map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${theme === t ? `${currentUi.accent} shadow-sm` : `${currentUi.secondary} hover:text-white`}`}>{t}</button>
            ))}
          </div>
          {lastSaved && <span className={`text-xs ${currentUi.secondary} hidden md:flex items-center gap-1`}><Check size={12}/> Saved</span>}
           <button onClick={() => setShowSettings(true)} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${!apiKey ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : `${currentUi.secondary} border-transparent hover:bg-white/5`}`}><Settings size={16} />{!apiKey && <span className="hidden sm:inline">Set API Key</span>}</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden main-content">
        {/* Sidebar */}
        <div className={`sidebar w-full md:w-1/3 border-r ${currentUi.border} flex flex-col ${currentUi.sidebar} ${activeTab === 'editor' ? 'block' : 'hidden md:flex'} transition-colors duration-500`}>
          <div className={`p-3 border-b ${currentUi.border} grid grid-cols-2 gap-1`}>
            <button onClick={() => setMode('instant')} className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'instant' ? `${currentUi.accent} shadow-sm` : `${currentUi.secondary} hover:bg-white/5`}`}><Zap size={16} /> Instant</button>
            <button onClick={() => setMode('magic')} className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'magic' ? 'bg-indigo-600 text-white shadow-sm' : `${currentUi.secondary} hover:bg-white/5`}`}><Wand2 size={16} /> AI Magic</button>
          </div>
          <div className="flex-1 relative group">
            <textarea className={`absolute inset-0 w-full h-full p-6 resize-none focus:outline-none font-mono text-sm ${currentUi.text} bg-transparent leading-6 ${currentUi.selection}`} placeholder={mode === 'instant' ? "# Paste Markdown here...\n\nSupports LaTeX Math ($$x=y$$)." : "Paste unstructured text here..."} value={inputText} onChange={(e) => setInputText(e.target.value)} />
            {inputText && <button onClick={() => setInputText('')} className="absolute top-2 right-2 p-1.5 bg-white/10 text-slate-400 rounded hover:bg-red-500/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Eraser size={14} /></button>}
          </div>
          <div className={`p-4 border-t ${currentUi.border}`}>
             {mode === 'instant' ? <div className={`text-center text-xs ${currentUi.secondary} font-medium py-2`}><span className="flex items-center justify-center gap-1"><Zap size={12}/> Auto-converting</span></div> : <button onClick={handleAIMagic} disabled={isProcessing || !inputText} className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${isProcessing ? 'bg-white/5 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>{isProcessing ? "Formatting..." : <><Sparkles size={16} /> Format with AI</>}</button>}
          </div>
        </div>

        {/* Studio Editor */}
        <div className={`flex-1 flex flex-col ${currentUi.editorBg} ${activeTab === 'preview' ? 'block' : 'hidden md:flex'} transition-colors duration-500`}>
          <div className={`toolbar h-12 ${currentUi.toolbar} border-b ${currentUi.border} flex items-center px-4 justify-between shadow-sm z-10 transition-colors duration-500`}>
            <div className={`flex items-center gap-1 pr-4 border-r ${currentUi.border} overflow-x-auto no-scrollbar`}>
               <EditorButton icon={Bold} title="Bold" onClick={() => execCmd('bold')} />
               <EditorButton icon={Italic} title="Italic" onClick={() => execCmd('italic')} />
               <EditorButton icon={Underline} title="Underline" onClick={() => execCmd('underline')} />
               <div className={`w-px h-4 bg-white/10 mx-2 hidden sm:block`}></div>
               <EditorButton icon={Heading1} title="H1" onClick={() => execCmd('formatBlock', 'H1')} />
               <EditorButton icon={Heading2} title="H2" onClick={() => execCmd('formatBlock', 'H2')} />
               <EditorButton icon={List} title="Bullet List" onClick={() => execCmd('insertUnorderedList')} />
               <div className={`w-px h-4 bg-white/10 mx-2 hidden sm:block`}></div>
               <EditorButton icon={GraduationCap} title="Add Cover Page" onClick={() => setShowCoverModal(true)} />
               <EditorButton icon={BookOpen} title="Auto-Generate Bibliography" onClick={generateBibliography} />
               <div className={`w-px h-4 bg-white/10 mx-2 hidden sm:block`}></div>
               <button onClick={handleReset} title="Reset Document" className="p-2 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-colors shrink-0"><Trash2 size={18} /></button>
            </div>
            <div className="flex items-center gap-2 pl-2 shrink-0">
               <button onClick={handlePrint} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${currentUi.secondary} bg-white/5 hover:bg-white/10 rounded-md transition-colors`}><Printer size={14} /> PDF</button>
               <button onClick={() => handleDownload('doc')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-md transition-colors"><FileDown size={14} /> .Doc</button>
               <button onClick={handleCopyRichText} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors shadow-sm ${currentUi.accent}`}><Copy size={14} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 cursor-text relative" onClick={() => previewRef.current?.focus()}>
            {/* The Actual Page - Stays White for Contrast */}
            <div className={`document-page max-w-3xl mx-auto bg-white shadow-2xl rounded-sm min-h-[800px] p-12 relative group animate-in fade-in zoom-in-95 duration-300 ${themeStyles[theme].container}`}>
              {inputText ? <div ref={previewRef} contentEditable suppressContentEditableWarning className="outline-none text-lg leading-relaxed min-h-[500px]" dangerouslySetInnerHTML={{ __html: formattedHtml }} /> : <div ref={previewRef} contentEditable suppressContentEditableWarning className="outline-none text-lg leading-relaxed min-h-[500px] empty:before:content-['Type_here...'] empty:before:text-slate-300" />}
            </div>
            
            <div className={`stats-footer sticky bottom-4 left-0 right-0 mx-auto w-fit ${currentUi.nav} ${currentUi.text} ${currentUi.border} border px-4 py-1.5 rounded-full text-xs shadow-lg flex gap-4 opacity-90 hover:opacity-100 transition-opacity z-20`}>
              <span className="flex items-center gap-1.5"><LayoutTemplate size={12}/> {stats.words} words</span>
              <span className="opacity-50">|</span>
              <span className="flex items-center gap-1.5"><Calculator size={12}/> ~{stats.time} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden mobile-tabs h-14 ${currentUi.nav} border-t ${currentUi.border} flex shrink-0`}>
        <button onClick={() => setActiveTab('editor')} className={`flex-1 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'editor' ? 'text-indigo-400' : 'text-slate-500'}`}><Type size={16} /> Input</button>
        <button onClick={() => setActiveTab('preview')} className={`flex-1 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'text-indigo-400' : 'text-slate-500'}`}><FileText size={16} /> Document</button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`${currentUi.nav} ${currentUi.border} border rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95`}>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Settings</h2><button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-white"><X size={20}/></button></div>
            <div className="mb-6"><label className="block text-sm font-medium text-slate-400 mb-2">Gemini API Key</label><input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="AIza..." /><p className="text-xs text-slate-500 mt-2">Required for Magic Mode. Instant mode is free.</p></div>
            <div className="flex justify-end"><button onClick={() => setShowSettings(false)} className={`px-4 py-2 ${currentUi.accent} font-bold rounded-lg`}>Done</button></div>
          </div>
        </div>
      )}

      {showCoverModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`${currentUi.nav} ${currentUi.border} border rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95`}>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Cover Page</h2><button onClick={() => setShowCoverModal(false)} className="text-slate-500 hover:text-white"><X size={20}/></button></div>
            <div className="space-y-3 mb-6">
               <input className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded outline-none" placeholder="University Name" value={coverData.uni} onChange={e => setCoverData({...coverData, uni: e.target.value})} />
               <input className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded outline-none" placeholder="Course Title" value={coverData.course} onChange={e => setCoverData({...coverData, course: e.target.value})} />
               <input className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded outline-none" placeholder="Assignment Title" value={coverData.title} onChange={e => setCoverData({...coverData, title: e.target.value})} />
               <input className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded outline-none" placeholder="Student Name" value={coverData.student} onChange={e => setCoverData({...coverData, student: e.target.value})} />
            </div>
            <div className="flex justify-end"><button onClick={insertCoverPage} className={`px-4 py-2 ${currentUi.accent} font-bold rounded-lg`}>Insert</button></div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 ${notification.type === 'success' ? 'bg-green-600 text-white' : notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'}`}>
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
    ? <LandingPage onLaunch={() => setView('app')} katexLoaded={katexLoaded} /> 
    : <Studio onHome={() => setView('landing')} katexLoaded={katexLoaded} />;
};

export default Doxy;
