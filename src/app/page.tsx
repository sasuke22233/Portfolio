"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  RefreshCw, 
  Monitor, 
  Folder, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Palette, 
  Info, 
  X, 
  Minus, 
  Maximize2 
} from "lucide-react";

// Translations
const translations = {
  ru: {
    identity: "[ Identity ]",
    projects: "[ Projects ]",
    kernel: "[ Kernel ]",
    links: "[ Links ]",
    readme: "README",
    music: "Music",
    wallpaper: "Wallpaper",
    paint: "Paint",
    systemProperties: "СИСТЕМНЫЕ СВОЙСТВА",
    expertise: "ОБЛАСТЬ ЭКСПЕРТИЗЫ",
    tools: "ИНСТРУМЕНТЫ",
    development: "Разработка",
    design: "Дизайн",
    other: "Другое",
    webDev: "Веб-разработка",
    uiux: "UI/UX Дизайн",
    frontend: "Фронтенд",
    aboutMe: "О СЕБЕ",
    experience: "ОПЫТ",
    contacts: "КОНТАКТЫ",
    aboutText: "Привет! Я веб-разработчик и дизайнер. Создаю современные веб-приложения и интерфейсы.",
    expText: "Работаю в сфере веб-разработки с 2020 года. Специализируюсь на React, Next.js и UI/UX дизайне.",
    contactText: "Открыт для сотрудничества и интересных проектов. Свяжитесь со мной через раздел Links.",
    externalNodes: "Внешние узлы",
    selectWallpaper: "Выберите обои",
    animated: "Анимированные",
    static: "Статические",
    lyrics: "Текст",
    nowPlaying: "Сейчас играет",
  },
  en: {
    identity: "[ Identity ]",
    projects: "[ Projects ]",
    kernel: "[ Kernel ]",
    links: "[ Links ]",
    readme: "README",
    music: "Music",
    wallpaper: "Wallpaper",
    paint: "Paint",
    systemProperties: "SYSTEM PROPERTIES",
    expertise: "AREA OF EXPERTISE",
    tools: "TOOLS",
    development: "Development",
    design: "Design",
    other: "Other",
    webDev: "Web Development",
    uiux: "UI/UX Design",
    frontend: "Frontend",
    aboutMe: "ABOUT ME",
    experience: "EXPERIENCE",
    contacts: "CONTACTS",
    aboutText: "Hi! I'm a web developer and designer. Creating modern web applications and interfaces.",
    expText: "Working in web development since 2020. Specializing in React, Next.js and UI/UX design.",
    contactText: "Open for collaboration and interesting projects. Contact me via the Links section.",
    externalNodes: "External Nodes",
    selectWallpaper: "Select Wallpaper",
    animated: "Animated",
    static: "Static",
    lyrics: "Lyrics",
    nowPlaying: "Now Playing",
  },
};

// Music tracks with lyrics
type MusicTrack = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  src?: string;
  lrcUrl?: string; // путь к .lrc для синхронных субтитров
  lyrics: string;
};

const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: "Не Шипи",
    artist: "PUSSYKILLER",
    duration: "3:00",
    src: "/tracks/Не шипи - pussykiller.mp3",
    lrcUrl: "/lyrics/ne-shipi.lrc",
    lyrics: "",
  },
  {
    id: 2,
    title: "Sicko Mode",
    artist: "Travis Scott",
    duration: "3:40",
    src: "/tracks/SICKO MODE - traviss scott.mp3",
    lrcUrl: "/lyrics/sicko-mode.lrc",
    lyrics: "",
  },
  {
    id: 3,
    title: "Свалка",
    artist: "Тёмный принц",
    duration: "2:00",
    src: "/tracks/свалка - тёмный принц.mp3",
    lrcUrl: "/lyrics/svalka.lrc",
    lyrics: "",
  },
];

// Wallpapers
type Wallpaper = {
  id: string;
  name: string;
  type: string;
  style: string;
  videoUrl?: string;
};

const wallpapers: Wallpaper[] = [
  { id: "vampire", name: "Vampire", type: "video", videoUrl: "/wallpaper/vampire.mp4", style: "#000" },
  { id: "hypnotic-eyes", name: "Hypnotic Eyes", type: "video", videoUrl: "/wallpaper/hypnotic-eyes.mp4", style: "#000" },
  { id: "katana", name: "Katana", type: "video", videoUrl: "/wallpaper/katana.mp4", style: "#000" },
  { id: "default", name: "Default Dark", type: "static", style: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)" },
  { id: "red-glow", name: "Red Glow", type: "animated", style: "radial-gradient(ellipse at center, #1a0505 0%, #0a0a0a 70%)" },
  { id: "matrix", name: "Matrix Red", type: "animated", style: "linear-gradient(180deg, #0a0a0a 0%, #1a0505 100%)" },
  { id: "cyber", name: "Cyber Grid", type: "static", style: "linear-gradient(45deg, #0a0a0a 25%, #140505 25%, #140505 50%, #0a0a0a 50%, #0a0a0a 75%, #140505 75%)" },
];

// Social links — GitHub и Telegram рабочие, остальные показывают None
const socialLinks = [
  { name: "Telegram", icon: "https://ext.same-assets.com/2652132577/80339305.png", url: "https://t.me/Menaceeq", handle: "@Menaceeq" },
  { name: "GitHub", icon: "https://ext.same-assets.com/2652132577/299486771.png", url: "https://github.com/sasuke22233", handle: "sasuke22233" },
  { name: "Instagram", icon: "https://ext.same-assets.com/2652132577/800234660.png", url: null, handle: null },
  { name: "TikTok", icon: "https://ext.same-assets.com/2652132577/388565096.png", url: null, handle: null },
  { name: "Twitter", icon: "https://ext.same-assets.com/2652132577/1826780290.png", url: null, handle: null },
  { name: "Behance", icon: "https://ext.same-assets.com/2652132577/3869428610.png", url: null, handle: null },
];

// OS Logo Component
function StaticBat({ className = "" }: { className?: string }) {
  return (
    <img
      className={className}
      src="/img/2027826.svg"
      alt="menace OS logo"
    />
  );
}

// Desktop icons data
const getDesktopIcons = (t: typeof translations.ru) => [
  { id: "identity", name: t.identity, icon: "bat" },
  { id: "projects", name: t.projects, icon: "https://ext.same-assets.com/2652132577/330046947.png" },
  { id: "kernel", name: t.kernel, icon: "https://ext.same-assets.com/2652132577/1330243865.png" },
  { id: "links", name: t.links, icon: "https://ext.same-assets.com/2652132577/2785492833.png" },
  { id: "readme", name: t.readme, icon: "https://ext.same-assets.com/2652132577/1236305909.png" },
  { id: "music", name: t.music, icon: "https://ext.same-assets.com/2652132577/3738041053.png" },
  { id: "wallpaper", name: t.wallpaper, icon: "https://ext.same-assets.com/2652132577/2212866765.png" },
  { id: "paint", name: t.paint, icon: "https://ext.same-assets.com/2652132577/2212866765.png" }, // Using wallpaper icon as placeholder or find a paint one
];

// Dock items
const dockItems = [
  { id: "identity", icon: "bat" },
  { id: "projects", icon: "https://ext.same-assets.com/2652132577/330046947.png" },
  { id: "kernel", icon: "https://ext.same-assets.com/2652132577/1330243865.png" },
  { id: "links", icon: "https://ext.same-assets.com/2652132577/2785492833.png" },
  { id: "music", icon: "https://ext.same-assets.com/2652132577/3738041053.png" },
  { id: "wallpaper", icon: "https://ext.same-assets.com/2652132577/2212866765.png" },
  { id: "paint", icon: "https://ext.same-assets.com/2652132577/2212866765.png" },
  { id: "readme", icon: "https://ext.same-assets.com/2652132577/1236305909.png" },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [openWindows, setOpenWindows] = useState<string[]>(["identity"]);
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [selectedWallpaper, setSelectedWallpaper] = useState("vampire");
  const [windowPositions, setWindowPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [windowSizes, setWindowSizes] = useState<Record<string, { w: number; h: number }>>({});
  
  // New States
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number } | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [dialog, setDialog] = useState<{ visible: boolean; title: string; message: string; buttonText: string } | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [cascadeOffset, setCascadeOffset] = useState(0);
  const [selection, setSelection] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);

  // Music player state (живёт в Home, чтобы музыка не останавливалась при сворачивании окна)
  const [musicTrackIndex, setMusicTrackIndex] = useState(0);
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [musicCurrentTime, setMusicCurrentTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [musicLoop, setMusicLoop] = useState(false);
  const [musicShowLyrics, setMusicShowLyrics] = useState(false);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const wallpaperVideoRef = useRef<HTMLVideoElement | null>(null);
  const wasPlayingBeforeLockRef = useRef(false);

  const t = translations[lang];
  const desktopIcons = getDesktopIcons(t);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString("ru-RU", { weekday: 'long', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock Screen: Esc — пауза музыки и обоев; Continue — возобновление
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        wasPlayingBeforeLockRef.current = musicIsPlaying;
        if (musicAudioRef.current) {
          musicAudioRef.current.pause();
          setMusicIsPlaying(false);
        }
        wallpaperVideoRef.current?.pause();
        setIsLocked(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [musicIsPlaying]);

  // Context Menu Handler
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Синхрон: громкость и воспроизведение музыки (audio живёт в Home, музыка не прерывается при сворачивании)
  useEffect(() => {
    const a = musicAudioRef.current;
    if (!a) return;
    a.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    const a = musicAudioRef.current;
    if (!a || !openWindows.includes("music")) return;
    if (musicIsPlaying) a.play().catch(() => {});
    else a.pause();
  }, [musicIsPlaying, musicTrackIndex, openWindows]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const windowsAreaRef = useRef<HTMLDivElement>(null);
  const handleDesktopMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const pt = { x: e.clientX, y: e.clientY };
    setSelection({ start: pt, end: pt });
    e.preventDefault();
  }, []);
  useEffect(() => {
    if (!selection) return;
    const move = (e: MouseEvent) => setSelection((s) => s ? { ...s, end: { x: e.clientX, y: e.clientY } } : null);
    const up = () => setSelection(null);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [selection]);

  const bringToFront = (windowId: string) => {
    setOpenWindows((prev) => {
      if (prev[prev.length - 1] === windowId) return prev;
      return [...prev.filter((id) => id !== windowId), windowId];
    });
  };

  const resetDesktop = () => {
    setOpenWindows(["identity"]);
    setMinimizedWindows([]);
    setMaximizedWindows([]);
    setCascadeOffset(0);
    setWindowPositions({});
    setWindowSizes({});
    setSelectedWallpaper("vampire");
    setDialog(null);
    setIsLocked(false);
  };

  const toggleWindow = (windowId: string) => {
    // Check if window is already open
    if (openWindows.includes(windowId)) {
      if (minimizedWindows.includes(windowId)) {
        setMinimizedWindows((m) => m.filter((id) => id !== windowId));
      }
      bringToFront(windowId);
      return;
    }

    // Window is not open, open it
    const width = 500;
    const height = 400;

    // Базовая позиция окна в рабочей области (относительно контейнера окон, а не всего окна браузера)
    const baseX = 80;
    const baseY = 80;
    
    const offset = cascadeOffset * 30; // лёгкий каскад при открытии нескольких окон
    const newPos = { 
      x: Math.max(0, baseX + offset), 
      y: Math.max(0, baseY + offset) 
    };

    setWindowPositions((p) => ({ ...p, [windowId]: newPos }));
    setCascadeOffset((prev) => (prev + 1) % 5);
    setOpenWindows((prev) => [...prev, windowId]);
  };

  const closeWindow = (windowId: string) => {
    if (windowId === "music") {
      musicAudioRef.current?.pause();
      setMusicIsPlaying(false);
    }
    setOpenWindows((prev) => prev.filter((w) => w !== windowId));
  };

  const handleMinimize = (id: string) => {
    setMinimizedWindows((prev) => [...prev, id]);
  };

  const handleMaximize = (id: string) => {
    setMaximizedWindows((prev) => 
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const restoreWindow = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
      bringToFront(id);
    } else if (openWindows.includes(id)) {
      bringToFront(id);
    } else {
      toggleWindow(id);
    }
  };

  const showDialog = (title: string, message: string, buttonText: string) => {
    setDialog({ visible: true, title, message, buttonText });
  };

  const currentWallpaper = wallpapers.find((w) => w.id === selectedWallpaper);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: currentWallpaper?.type === 'video' ? 'black' : (currentWallpaper?.style || "#0a0a0a") }}
      onContextMenu={handleContextMenu}
    >
      {isMobile && (
        <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-[#dc2626]">
            <img src="/img/445706e965c0710abb0bf09af7c1b172.jpg" alt="menace" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">murcielago.pro</h1>
          <p className="text-[#666666] mb-6 max-w-sm">
            Сайт разработан только для ПК.<br />Посетите сайт с компьютера.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="https://github.com/sasuke22233" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#dc2626] transition-colors">
              GitHub — menace
            </a>
            <a href="https://t.me/Menaceeq" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#dc2626] transition-colors">
              TG @Menaceeq
            </a>
          </div>
        </div>
      )}
      {currentWallpaper?.type === 'video' && (
        <video
          ref={wallpaperVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={currentWallpaper.videoUrl}
        />
      )}

      {/* Глобальный audio для плеера — key заставляет перезагрузить при смене трека */}
      {openWindows.includes("music") && (
        <audio
          key={musicTrackIndex}
          ref={musicAudioRef}
          src={musicTracks[musicTrackIndex]?.src ? encodeURI(musicTracks[musicTrackIndex].src!) : undefined}
          loop={musicLoop}
          onTimeUpdate={(e) => setMusicCurrentTime((e.target as HTMLAudioElement).currentTime)}
          onLoadedMetadata={(e) => setMusicDuration((e.target as HTMLAudioElement).duration)}
          onCanPlay={(e) => {
            if (musicIsPlaying) (e.target as HTMLAudioElement).play().catch(() => {});
          }}
          onEnded={() => {
            if (!musicLoop) setMusicTrackIndex((i) => (i < musicTracks.length - 1 ? i + 1 : 0));
          }}
        />
      )}

      {/* Lock Screen */}
      {isLocked && (
        <div className="lock-screen">
          <div className="lock-avatar overflow-hidden">
            <img
              src="/img/445706e965c0710abb0bf09af7c1b172.jpg"
              alt="menace avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white">menace</h2>
          <button
            className="lock-btn"
            onClick={() => {
              setIsLocked(false);
              wallpaperVideoRef.current?.play();
              if (wasPlayingBeforeLockRef.current && musicAudioRef.current) {
                musicAudioRef.current.play().catch(() => {});
                setMusicIsPlaying(true);
              }
            }}
          >
            Continue
          </button>
        </div>
      )}

      {/* Dialog Overlay */}
      {dialog?.visible && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3 className="text-lg font-bold text-[#dc2626] mb-2">{dialog.title}</h3>
            <p className="text-sm text-[#e5e5e5] mb-6 whitespace-pre-line">{dialog.message}</p>
            <button 
              className="px-4 py-2 bg-[#dc2626] text-white rounded hover:bg-[#ef4444] transition-colors text-sm"
              onClick={() => setDialog(null)}
            >
              {dialog.buttonText}
            </button>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu?.visible && (
        <div 
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ctx-item" onClick={() => { resetDesktop(); setContextMenu(null); }}>
            <RefreshCw size={14} /> Refresh
          </div>
          <div className="ctx-separator"></div>
          <div className="ctx-item" onClick={() => { toggleWindow('identity'); setContextMenu(null); }}>
            <Monitor size={14} /> [ Identity ]
          </div>
          <div className="ctx-item" onClick={() => { toggleWindow('projects'); setContextMenu(null); }}>
            <Folder size={14} /> [ Visual Assets ]
          </div>
          <div className="ctx-item" onClick={() => { toggleWindow('links'); setContextMenu(null); }}>
            <LinkIcon size={14} /> [ Links ]
          </div>
          <div className="ctx-separator"></div>
          <div className="ctx-item" onClick={() => { toggleWindow('wallpaper'); setContextMenu(null); }}>
            <ImageIcon size={14} /> Shell Environment
          </div>
          <div className="ctx-item" onClick={() => { toggleWindow('paint'); setContextMenu(null); }}>
            <Palette size={14} /> Paint
          </div>
          <div className="ctx-separator"></div>
          <div className="ctx-item" onClick={() => { showDialog('Yeulette.info v2.0', 'Architecture of Dissonance\nVisual performance over KPIs.\nDeconstructing digital standards since 2019.', 'Close'); setContextMenu(null); }}>
            <Info size={14} /> About OS
          </div>
        </div>
      )}
      {/* Animated Background */}
      <div className="animated-bg" />

      {/* Floating Particles — фиксированные значения для избежания hydration mismatch */}
      {[
        [12, 4.2, 19.3], [87, 12.5, 16.4], [34, 1.3, 19.8], [56, 8.9, 17.7], [23, 14.7, 15.3],
        [78, 3.5, 21.2], [45, 11.1, 18.5], [91, 6.8, 16.9], [67, 2.2, 20.1], [29, 9.4, 19.3],
        [73, 13.6, 15.7], [41, 5.0, 22.4], [82, 7.3, 17.1], [18, 10.8, 18.8], [64, 4.1, 16.2],
      ].map(([left, delay, duration], i) => (
        <div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#2a2a2a] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#dc2626]">murcielago.pro</span>
          <span className="text-[#666666] text-sm">~</span>
          <span className="text-sm text-[#666666]">
            {openWindows.length > 0 ? `[ ${openWindows[openWindows.length - 1]} ]` : "Desktop"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="lang-switch">
            <button
              type="button"
              className={lang === "ru" ? "active" : ""}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-10 pb-20 px-4 flex gap-4 h-screen overflow-hidden relative z-10">
        {/* Sidebar with desktop icons - fixed narrow column on the left */}
        <div className="flex flex-col flex-wrap content-start gap-2 pt-2 h-full w-[200px] pointer-events-none flex-shrink-0">
          {desktopIcons.map((icon, index) => (
            <div
              key={icon.id}
              className={`desktop-icon pointer-events-auto ${openWindows.includes(icon.id) ? "active" : ""}`}
              onClick={() => toggleWindow(icon.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {icon.icon === "bat" ? (
                <StaticBat />
              ) : (
                <img src={icon.icon} alt={icon.name} />
              )}
              <span>{icon.name}</span>
            </div>
          ))}
        </div>

        {/* Windows Area: слой для клика по столу + выделение светло-серым прямоугольником */}
        <div ref={windowsAreaRef} className="flex-1 relative">
          <div
            className="absolute inset-0 z-0"
            onMouseDown={handleDesktopMouseDown}
            aria-hidden
          />
          {selection && (
            <div
              className="fixed z-[5] pointer-events-none border border-[#94a3b8] bg-[#94a3b8]/20"
              style={{
                left: Math.min(selection.start.x, selection.end.x),
                top: Math.min(selection.start.y, selection.end.y),
                width: Math.abs(selection.end.x - selection.start.x),
                height: Math.abs(selection.end.y - selection.start.y),
              }}
            />
          )}
          {openWindows.map((id) => {
            if (minimizedWindows.includes(id)) return null;
            
            const isMaximized = maximizedWindows.includes(id);
            const commonProps = {
              id,
              onClose: () => closeWindow(id),
              onMinimize: () => handleMinimize(id),
              onMaximize: () => handleMaximize(id),
              onFocus: () => bringToFront(id),
              isMaximized,
              initialPosition: windowPositions[id] || { x: 100, y: 100 },
              onPositionChange: (pos: { x: number; y: number }) => setWindowPositions((p) => ({ ...p, [id]: pos })),
              initialSize: windowSizes[id] || { w: 500, h: 400 },
              onSizeChange: (size: { w: number; h: number }) => setWindowSizes((p) => ({ ...p, [id]: size })),
            };

            switch (id) {
              case "identity":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={`${t.identity} — menace`}
                    icon="bat"
                  >
                    <IdentityContent t={t} />
                  </DraggableWindow>
                );
              case "links":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={`${t.links} ${t.externalNodes}`}
                    icon="https://ext.same-assets.com/2652132577/2785492833.png"
                  >
                    <LinksContent onShowNone={(title) => showDialog(title, "None", "OK")} />
                  </DraggableWindow>
                );
              case "projects":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={t.projects}
                    icon="https://ext.same-assets.com/2652132577/330046947.png"
                  >
                    <ProjectsContent onShowDialog={showDialog} />
                  </DraggableWindow>
                );
              case "kernel":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={t.kernel}
                    icon="https://ext.same-assets.com/2652132577/1330243865.png"
                  >
                    <KernelContent />
                  </DraggableWindow>
                );
              case "readme":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title="README.sys"
                    icon="https://ext.same-assets.com/2652132577/1236305909.png"
                  >
                    <ReadmeContent t={t} />
                  </DraggableWindow>
                );
              case "music":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={`${t.music} Player`}
                    icon="https://ext.same-assets.com/2652132577/3738041053.png"
                  >
                    <MusicContent
                      t={t}
                      track={musicTracks[musicTrackIndex]}
                      isPlaying={musicIsPlaying}
                      setIsPlaying={setMusicIsPlaying}
                      currentTrackIndex={musicTrackIndex}
                      setCurrentTrackIndex={setMusicTrackIndex}
                      currentTime={musicCurrentTime}
                      setCurrentTime={(time: number) => {
                        if (musicAudioRef.current) musicAudioRef.current.currentTime = time;
                        setMusicCurrentTime(time);
                      }}
                      duration={musicDuration}
                      volume={musicVolume}
                      setVolume={setMusicVolume}
                      loop={musicLoop}
                      setLoop={setMusicLoop}
                      showLyrics={musicShowLyrics}
                      setShowLyrics={setMusicShowLyrics}
                      audioRef={musicAudioRef}
                    />
                  </DraggableWindow>
                );
              case "wallpaper":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={t.wallpaper}
                    icon="https://ext.same-assets.com/2652132577/2212866765.png"
                  >
                    <WallpaperContent
                      t={t}
                      selected={selectedWallpaper}
                      onSelect={setSelectedWallpaper}
                    />
                  </DraggableWindow>
                );
              case "paint":
                return (
                  <DraggableWindow
                    key={id}
                    {...commonProps}
                    title={t.paint}
                    icon="https://ext.same-assets.com/2652132577/2212866765.png"
                  >
                    <PaintContent />
                  </DraggableWindow>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Right sidebar info */}
        <div className="hidden xl:flex flex-col items-end pt-4 pr-2 pointer-events-none">
          <div className="text-right select-none">
            <div className="text-6xl font-bold text-[#dc2626] leading-none opacity-90">
              {currentTime}
            </div>
            <div className="text-xl text-[#e5e5e5] font-medium mt-1 uppercase tracking-wide opacity-80">
              {currentDate}
            </div>
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="dock">
          {dockItems.map((item) => (
            <div
              key={item.id}
              className={`dock-item ${openWindows.includes(item.id) && !minimizedWindows.includes(item.id) ? "active" : ""}`}
              title={item.id}
              onClick={() => restoreWindow(item.id)}
            >
              {item.icon === "bat" ? (
                <StaticBat className="w-10 h-10" />
              ) : (
                <img src={item.icon} alt={item.id} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Draggable Window Component
interface DraggableWindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus?: () => void;
  isMaximized: boolean;
  initialPosition: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  initialSize: { w: number; h: number };
  onSizeChange: (size: { w: number; h: number }) => void;
}

function DraggableWindow({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  initialPosition,
  onPositionChange,
  initialSize,
  onSizeChange,
}: DraggableWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);
  const prevX = useRef(initialPosition.x);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Bring to front
    if (onFocus) onFocus();

    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      e.stopPropagation();
      // При максимизации: снять максимизацию и задать размер под viewport, затем ресайз
      if (isMaximized && onMaximize) {
        onMaximize();
        const vw = typeof window !== "undefined" ? window.innerWidth : 800;
        const vh = typeof window !== "undefined" ? window.innerHeight - 32 - 80 : 600;
        setPosition({ x: 0, y: 32 });
        setSize({ w: vw, h: vh });
        onPositionChange({ x: 0, y: 32 });
        onSizeChange({ w: vw, h: vh });
      }
      setIsResizing(true);
      const classes = target.className.split(' ');
      const dir = classes.find(c => c.startsWith('resize-') && c !== 'resize-handle')?.replace('resize-', '');
      if (dir) setResizeDir(dir);
      setDragOffset({ x: e.clientX, y: e.clientY });
      return;
    }

    if (isMaximized) return;
    if (target.closest(".window-header")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      prevX.current = e.clientX;
    }
  }, [position, isMaximized, onFocus, onMaximize, onPositionChange, onSizeChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPos = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };
        
        // Calculate velocity for tilt
        const velocity = e.clientX - prevX.current;
        const newRotation = Math.max(Math.min(velocity * 0.5, 10), -10);
        
        setPosition(newPos);
        setRotation(newRotation);
        onPositionChange(newPos);
        
        prevX.current = e.clientX;
      } else if (isResizing && resizeDir) {
        const deltaX = e.clientX - dragOffset.x;
        const deltaY = e.clientY - dragOffset.y;
        
        let newW = size.w;
        let newH = size.h;
        let newX = position.x;
        let newY = position.y;

        if (resizeDir.includes('e')) newW = Math.max(300, size.w + deltaX);
        if (resizeDir.includes('s')) newH = Math.max(200, size.h + deltaY);
        if (resizeDir.includes('w')) {
          const possibleW = Math.max(300, size.w - deltaX);
          if (possibleW !== 300 || size.w > 300) {
             newW = possibleW;
             newX = position.x + deltaX;
          }
        }
        if (resizeDir.includes('n')) {
          const possibleH = Math.max(200, size.h - deltaY);
          if (possibleH !== 200 || size.h > 200) {
            newH = possibleH;
            newY = position.y + deltaY;
          }
        }

        // Update state only if changed
        if (newW !== size.w || newH !== size.h) {
          setSize({ w: newW, h: newH });
          onSizeChange({ w: newW, h: newH });
          // Reset drag origin for next delta
          setDragOffset({ x: e.clientX, y: e.clientY });
        }
        
        if (newX !== position.x || newY !== position.y) {
          setPosition({ x: newX, y: newY });
          onPositionChange({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDir(null);
      setRotation(0);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDir, dragOffset, size, position, onPositionChange, onSizeChange]);

  const windowStyle = isMaximized ? {
    left: 0,
    top: '32px',
    width: '100%',
    height: 'calc(100vh - 32px - 80px)',
    zIndex: 50,
    transform: 'none',
    borderRadius: 0,
  } : {
    left: position.x,
    top: position.y,
    width: size.w,
    height: size.h,
    zIndex: isDragging || isResizing ? 100 : 10,
    transform: `rotate(${rotation}deg)`,
    transition: isDragging ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
  } as React.CSSProperties;

  return (
    <div
      ref={windowRef}
      className={`draggable-window window window-enter ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.stopPropagation()}
    >
      {/* Ручки ресайза видны и при максимизации — можно растягивать за края после снятия максимизации */}
      <div className="resize-handle resize-n" />
      <div className="resize-handle resize-s" />
      <div className="resize-handle resize-e" />
      <div className="resize-handle resize-w" />
      <div className="resize-handle resize-ne" />
      <div className="resize-handle resize-nw" />
      <div className="resize-handle resize-se" />
      <div className="resize-handle resize-sw" />
      <div className="window-header">
        <div className="flex items-center gap-3">
          {icon === "bat" ? (
            <StaticBat className="w-5 h-5" />
          ) : (
            <img src={icon} alt={title} className="w-5 h-5" />
          )}
          <span className="text-sm">{title}</span>
        </div>
        <div className="window-controls">
          <button
            type="button"
            onClick={onMinimize}
            className="btn-control"
            title="Minimize"
          >
            <div className="btn-minimize" />
          </button>
          <button
            type="button"
            onClick={onMaximize}
            className="btn-control"
            title="Maximize"
          >
            <div className="btn-maximize" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-control"
            title="Close"
          >
            <div className="btn-close" />
          </button>
        </div>
      </div>
      <div className={`overflow-y-auto ${isMaximized ? 'h-[calc(100%-40px)]' : 'h-[calc(100%-40px)]'}`}>{children}</div>
    </div>
  );
}

// Paint Content
function PaintContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [primaryColor, setPrimaryColor] = useState("#dc2626");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [activeColorType, setActiveColorType] = useState<'primary' | 'secondary'>('primary');
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'brush'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    "#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200", "#22b14c", "#00a2e8", "#3f48cc", "#a349a4",
    "#ffffff", "#c3c3c3", "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0", "#b5e61d", "#99d9ea", "#7092be", "#c8bfe7"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    // левая или правая кнопка — обе начинают рисование
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    
    const isRightButton = e.buttons === 2;
    const baseColor = isRightButton ? secondaryColor : primaryColor;
    ctx.strokeStyle = tool === 'eraser' ? secondaryColor : baseColor;
    ctx.lineWidth = tool === 'pencil' ? 1 : brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handlePrimaryColorClick = (color: string) => {
    setPrimaryColor(color);
    setActiveColorType('primary');
  };

  const handleSecondaryColorClick = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSecondaryColor(color);
    setActiveColorType('secondary');
  };

  return (
    <div
      className="p-2 flex flex-col h-full bg-transparent text-gray-200 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 p-2 border-b border-white/10 bg-white/5 rounded-t-lg backdrop-blur-sm">
        {/* Tools */}
        <div className="flex flex-col gap-1 border-r border-white/10 pr-2">
          <div className="flex gap-1">
            <button
              className={`p-1 rounded border ${tool === 'pencil' ? 'border-blue-500/50 bg-blue-500/20' : 'border-transparent hover:bg-white/10'}`}
              onClick={() => setTool('pencil')}
              title="Pencil"
            >
              ✏️
            </button>
            <button
              className={`p-1 rounded border ${tool === 'eraser' ? 'border-blue-500/50 bg-blue-500/20' : 'border-transparent hover:bg-white/10'}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              🧼
            </button>
            <button
              className={`p-1 rounded border ${tool === 'brush' ? 'border-blue-500/50 bg-blue-500/20' : 'border-transparent hover:bg-white/10'}`}
              onClick={() => setTool('brush')}
              title="Brush"
            >
              🖌️
            </button>
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col justify-center border-r border-white/10 pr-2 px-2">
          <label className="text-[10px] mb-1 text-gray-400">Size: {brushSize}px</label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-20 h-2 accent-[#dc2626] bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Colors Selection Display */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-2">
          <div className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 border-2 rounded ${activeColorType === 'primary' ? 'border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] z-10' : 'border-white/20'}`}
              style={{ backgroundColor: primaryColor }}
              onClick={() => setActiveColorType('primary')}
            />
            <span className="text-[10px] text-gray-400 mt-1">Color 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 border-2 rounded ${activeColorType === 'secondary' ? 'border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] z-10' : 'border-white/20'}`}
              style={{ backgroundColor: secondaryColor }}
              onClick={() => setActiveColorType('secondary')}
            />
            <span className="text-[10px] text-gray-400 mt-1">Color 2</span>
          </div>
        </div>

        {/* Palette */}
        <div className="grid grid-cols-10 gap-1 w-40">
          {colors.map((c) => (
            <div
              key={c}
              className="w-3.5 h-3.5 rounded-sm border border-white/20 cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: c }}
              onClick={() => handlePrimaryColorClick(c)}
              onContextMenu={(e) => handleSecondaryColorClick(c, e)}
            />
          ))}
        </div>

        <button
          type="button"
          className="ml-auto px-3 py-1 text-xs bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 text-red-200 transition-colors"
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (canvas && ctx) {
              ctx.fillStyle = secondaryColor;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
          }}
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-black/20 rounded-b-lg p-4 flex items-center justify-center backdrop-blur-sm">
        <canvas
          ref={canvasRef}
          className="bg-white shadow-2xl cursor-crosshair touch-none rounded-sm"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

// Identity Content
function IdentityContent({ t }: { t: typeof translations.ru }) {
  const skills = [
    { name: t.webDev, level: 90 },
    { name: t.uiux, level: 85 },
    { name: t.frontend, level: 95 },
  ];

  const tools = {
    [t.development]: ["React", "Next.js", "TypeScript"],
    [t.design]: ["Figma", "Photoshop", "Illustrator"],
    [t.other]: ["Git", "Node.js", "Tailwind CSS"],
  };

  return (
    <div className="p-6">
      <div className="font-mono text-sm text-[#666666] mb-6">
        ~/system/identity/user
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dc2626] to-[#991b1b] p-0.5">
          <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden">
            <img
              src="/img/445706e965c0710abb0bf09af7c1b172.jpg"
              alt="menace avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">menace</h2>
          <p className="text-[#666666] text-sm">Web Developer & Designer</p>
          <p className="text-[#dc2626] text-sm">Architecture of Creativity</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-[#666666] mb-4">
          {t.systemProperties}
        </h3>
        <div className="grid gap-2 font-mono text-sm">
          <div className="flex">
            <span className="text-[#666666] w-40">node_id:</span>
            <span>menace</span>
          </div>
          <div className="flex">
            <span className="text-[#666666] w-40">runtime:</span>
            <span>2020 → present</span>
          </div>
          <div className="flex">
            <span className="text-[#666666] w-40">specialization:</span>
            <span>Web Development, UI/UX</span>
          </div>
          <div className="flex">
            <span className="text-[#666666] w-40">os_build:</span>
            <span>Portfolio OS — v2.0</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-[#666666] mb-4">
          {t.expertise}
        </h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>► {skill.name}</span>
                <span className="text-[#666666]">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="progress-bar h-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wider text-[#666666] mb-4">
          {t.tools}
        </h3>
        {Object.entries(tools).map(([category, items]) => (
          <div key={category} className="mb-4">
            <p className="text-sm text-[#666666] mb-2">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Links Content
function LinksContent({ onShowNone }: { onShowNone?: (title: string) => void }) {
  return (
    <div className="p-6">
      <div className="font-mono text-sm text-[#666666] mb-6">
        ~/links/external-nodes
      </div>
      <div className="grid gap-3">
        {socialLinks.map((link) =>
          link.url ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] transition-colors border border-[#2a2a2a] hover:border-[#dc2626]"
            >
              <img src={link.icon} alt={link.name} className="w-8 h-8" />
              <span>{link.name} — menace</span>
            </a>
          ) : (
            <button
              key={link.name}
              type="button"
              onClick={() => onShowNone?.(link.name)}
              className="flex items-center gap-4 p-3 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] transition-colors border border-[#2a2a2a] hover:border-[#dc2626] w-full text-left"
            >
              <img src={link.icon} alt={link.name} className="w-8 h-8" />
              <span>{link.name} — menace</span>
            </button>
          )
        )}
      </div>
      <div className="mt-6 text-center">
        <span className="text-xs text-[#666666]">{socialLinks.length} nodes</span>
      </div>
    </div>
  );
}

// Projects Content
function ProjectsContent({ onShowDialog }: { onShowDialog?: (title: string, msg: string, btn: string) => void }) {
  const projects = [
    { name: "Block Blast", type: "Game", url: "https://sasuke22233.github.io/blockblast/" },
    { name: "Lego", type: "React Bricks 3D", url: "http://lego.murcielago.pro/" },
    { name: "Vizit", type: "Web", url: "https://ask.murcielago.pro/" },
    { name: "NunaCake", type: "Конструктор тортиков", url: "http://www.nununana.pro/" },
    { name: "GameStore", type: "В разработке", inDevelopment: true },
  ] as const;

  return (
    <div className="p-6">
      <div className="font-mono text-sm text-[#666666] mb-6">~/projects/</div>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            role="button"
            tabIndex={0}
            onClick={() => {
              if ("inDevelopment" in project && project.inDevelopment) {
                onShowDialog?.("GameStore", "В разработке", "OK");
              } else if ("url" in project && project.url) {
                window.open(project.url, "_blank", "noopener,noreferrer");
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLElement).click()}
            className="folder-item group cursor-pointer"
          >
            <div className="folder-icon transition-transform group-hover:-translate-y-1" />
            <div className="text-center">
              <span className="text-sm block font-medium group-hover:text-[#dc2626] transition-colors">{project.name}</span>
              <span className="text-[10px] text-[#666666] uppercase tracking-wider">{project.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Kernel Content
function KernelContent() {
  return (
    <div className="p-6">
      <div className="font-mono text-sm text-[#666666] mb-6">~/kernel/branding/</div>
      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#dc2626]/30 to-[#991b1b]/30 border border-[#2a2a2a] flex items-center justify-center">
        <StaticBat className="w-24 h-24" />
      </div>
      <p className="text-[#666666] text-sm mt-4">
        Your branding and visual identity work goes here.
      </p>
    </div>
  );
}

// Readme Content
function ReadmeContent({ t }: { t: typeof translations.ru }) {
  return (
    <div className="p-6 font-mono text-sm">
      <div className="space-y-4 text-[#e5e5e5]">
        <p>{"// README.sys"}</p>
        <p className="text-[#dc2626]">## {t.aboutMe}</p>
        <p>{t.aboutText}</p>
        <p className="text-[#dc2626]">## {t.experience}</p>
        <p>{t.expText}</p>
        <p className="text-[#dc2626]">## {t.contacts}</p>
        <p>{t.contactText}</p>
      </div>
    </div>
  );
}

// Парсинг LRC: [mm:ss.xx] текст (убираем BOM и \r для совместимости с разными файлами)
function parseLrc(lrcText: string): { time: number; line: string }[] {
  const raw = lrcText.replace(/^\uFEFF/, "").trim();
  const lines = raw.split(/\r?\n/);
  const result: { time: number; line: string }[] = [];
  // [mm:ss.xx] или [mm:ss.xxx]
  const regex = /^\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.*)$/;
  for (const line of lines) {
    const m = line.trim().match(regex);
    if (m) {
      const min = parseInt(m[1], 10);
      const sec = parseInt(m[2], 10);
      const frac = m[3].length === 3 ? parseInt(m[3], 10) / 1000 : parseInt(m[3], 10) / 100;
      const time = min * 60 + sec + frac;
      const text = m[4].trim();
      if (text) result.push({ time, line: text });
    }
  }
  return result.sort((a, b) => a.time - b.time);
}

// Кэш анализатора на уровне модуля: один MediaElementSource на элемент, иначе при повторном открытии плеера — ошибка
const globalAudioAnalyserCache = new WeakMap<HTMLAudioElement, AnalyserNode>();

type MusicContentProps = {
  t: typeof translations.ru;
  track: MusicTrack;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (v: number | ((i: number) => number)) => void;
  currentTime: number;
  setCurrentTime: (v: number) => void;
  duration: number;
  volume: number;
  setVolume: (v: number) => void;
  loop: boolean;
  setLoop: (v: boolean) => void;
  showLyrics: boolean;
  setShowLyrics: (v: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

// Music Content: LRC, режим «только текст», эквалайзер по Web Audio API
function MusicContent({
  t,
  track,
  isPlaying,
  setIsPlaying,
  currentTrackIndex,
  setCurrentTrackIndex,
  currentTime,
  setCurrentTime,
  duration,
  volume,
  setVolume,
  loop,
  setLoop,
  showLyrics,
  setShowLyrics,
  audioRef,
}: MusicContentProps) {
  const [timedLyrics, setTimedLyrics] = useState<{ time: number; line: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);
  const [barHeights, setBarHeights] = useState<number[]>(Array(20).fill(10));

  // Загрузка LRC: как у «Не Шипи» — файлы в public/lyrics без пробелов (ne-shipi.lrc, svalka.lrc, sicko-mode.lrc)
  useEffect(() => {
    setCurrentLine(0);
    if (!track.lrcUrl) {
      setTimedLyrics([]);
      return;
    }
    let cancelled = false;
    const url = typeof window !== "undefined" ? `${window.location.origin}${track.lrcUrl}` : track.lrcUrl;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.statusText))))
      .then((text) => {
        if (!cancelled) setTimedLyrics(parseLrc(text));
      })
      .catch(() => {
        if (!cancelled) setTimedLyrics([]);
      });
    return () => { cancelled = true; };
  }, [track.lrcUrl]);

  // Подсветка строки по времени
  useEffect(() => {
    if (timedLyrics.length === 0) return;
    let idx = 0;
    for (let i = 0; i < timedLyrics.length; i++) {
      if (timedLyrics[i].time <= currentTime) idx = i;
      else break;
    }
    setCurrentLine(idx);
  }, [currentTime, timedLyrics]);


  // Эквалайзер: один MediaElementSource на элемент (модульный кэш — иначе ошибка при повторном открытии окна)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let analyser = globalAudioAnalyserCache.get(audio);
    if (!analyser) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.7;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      globalAudioAnalyserCache.set(audio, analyser);
    }
    analyserRef.current = analyser;

    const run = () => {
      const analyser = analyserRef.current;
      if (!analyser || !isPlaying) {
        animationRef.current = requestAnimationFrame(run);
        return;
      }
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);
      const step = Math.floor(data.length / 20);
      const heights = Array.from({ length: 20 }, (_, i) => {
        const v = data[i * step] ?? 0;
        return Math.max(8, (v / 255) * 100);
      });
      setBarHeights(heights);
      animationRef.current = requestAnimationFrame(run);
    };

    if (isPlaying) run();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, audioRef, currentTrackIndex]);

  const formatTime = (sec: number) =>
    sec ? new Date(sec * 1000).toISOString().substr(14, 5) : "0:00";

  // Режим «только текст»: аватар, название, текст на всё окно, 5 кнопок
  if (showLyrics) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-4 p-4 flex-shrink-0 border-b border-[#2a2a2a]">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center text-xl flex-shrink-0">
            🎵
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{track.title}</p>
            <p className="text-sm text-[#666666] truncate">{track.artist}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 overflow-hidden">
          {/* Предыдущая строка — текущая (выделена) — следующая */}
          <div className="flex flex-col justify-center items-center gap-3 w-full max-w-xl">
            {timedLyrics.length > 0 ? (
              <>
                <p className="text-[#666666] text-lg md:text-xl text-center w-full">
                  {currentLine > 0 ? timedLyrics[currentLine - 1]?.line : "\u00A0"}
                </p>
                <p className="text-white font-bold text-2xl md:text-4xl text-center w-full px-4 transition-opacity duration-200">
                  {timedLyrics[currentLine]?.line ?? ""}
                </p>
                <p className="text-[#666666] text-lg md:text-xl text-center w-full">
                  {currentLine < timedLyrics.length - 1 ? timedLyrics[currentLine + 1]?.line : "\u00A0"}
                </p>
              </>
            ) : (
              <p className="text-[#666666] text-lg">Нет текста</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 p-4 flex-shrink-0 border-t border-[#2a2a2a]">
        <button
          type="button"
          onClick={() => setLoop(!loop)}
          title={loop ? "Выкл. повтор" : "Повтор трека"}
          className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-0 [&>svg]:w-5 [&>svg]:h-5 ${loop ? "text-[#dc2626] bg-[#dc2626]/20" : "bg-transparent text-[#c0c0c0] hover:text-white hover:bg-[#1a1a1a]"}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
          </svg>
        </button>
          <button
            type="button"
            onClick={() => setCurrentTrackIndex((i) => (i > 0 ? i - 1 : musicTracks.length - 1))}
            className="p-2 text-[#666666] hover:text-white transition-colors"
            title="Пред."
          >
            ⏮
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-[#dc2626] flex items-center justify-center text-xl hover:scale-105 transition-transform"
            title={isPlaying ? "Пауза" : "Играть"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            onClick={() => setCurrentTrackIndex((i) => (i < musicTracks.length - 1 ? i + 1 : 0))}
            className="p-2 text-[#666666] hover:text-white transition-colors"
            title="След."
          >
            ⏭
          </button>
          <button
            type="button"
            onClick={() => setShowLyrics(false)}
            title="Скрыть текст"
            className="p-2 rounded-full border border-[#4b5563] text-[#9ca3af] hover:border-[#dc2626] hover:text-[#dc2626] transition-colors text-sm"
          >
            TXT
          </button>
        </div>
      </div>
    );
  }

  // Обычный режим: полный плеер с эквалайзером, seek, громкость, плейлист
  return (
    <div className="p-6 flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center text-2xl flex-shrink-0">
          🎵
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{track.title}</p>
          <p className="text-sm text-[#666666]">{track.artist}</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full h-2 accent-[#dc2626] cursor-pointer mb-1"
        />
        <div className="flex justify-between text-xs text-[#666666]">
          <span>{formatTime(currentTime)}</span>
          <span>{duration ? formatTime(duration) : track.duration}</span>
        </div>
      </div>

      {/* Эквалайзер по биту */}
      <div className="flex items-end justify-center gap-0.5 h-14 mb-4">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-1.5 bg-[#dc2626] rounded-sm transition-all duration-75"
            style={{ height: `${h}%`, minHeight: 4 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setLoop(!loop)}
          title={loop ? "Выкл. повтор" : "Повтор"}
          className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-0 [&>svg]:w-5 [&>svg]:h-5 ${loop ? "text-[#dc2626] bg-[#dc2626]/20" : "bg-transparent text-[#c0c0c0] hover:text-white hover:bg-[#1a1a1a]"}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTrackIndex((i) => (i > 0 ? i - 1 : musicTracks.length - 1))}
          className="text-[#666666] hover:text-white text-xl"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-[#dc2626] flex items-center justify-center text-xl hover:scale-105"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => setCurrentTrackIndex((i) => (i < musicTracks.length - 1 ? i + 1 : 0))}
          className="text-[#666666] hover:text-white text-xl"
        >
          ⏭
        </button>
        <button
          type="button"
          onClick={() => setShowLyrics(true)}
          title={t.lyrics}
          className="px-3 py-1.5 text-xs rounded-full border border-[#4b5563] text-[#9ca3af] hover:border-[#dc2626] hover:text-[#dc2626]"
        >
          TXT
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs text-[#666666]">
        <span>VOL</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 accent-[#dc2626]"
        />
      </div>

      <div className="border-t border-[#2a2a2a] pt-3 flex-1 min-h-0 overflow-auto">
        <p className="text-xs text-[#666666] mb-2">Playlist</p>
        <div className="space-y-1">
          {musicTracks.map((tr, i) => (
            <div
              key={tr.id}
              onClick={() => setCurrentTrackIndex(i)}
              className={`flex justify-between p-2 rounded cursor-pointer ${
                i === currentTrackIndex ? "bg-[#dc2626]/20 text-[#dc2626]" : "hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="text-sm truncate">{tr.title}</span>
              <span className="text-xs text-[#666666]">{tr.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Wallpaper Content
function WallpaperContent({
  t,
  selected,
  onSelect,
}: {
  t: typeof translations.ru;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <h3 className="text-sm font-semibold">{t.selectWallpaper}</h3>

      <div>
        <p className="text-xs text-[#666666] mb-2">{t.animated}</p>
        <div className="grid grid-cols-2 gap-3">
          {wallpapers
            .filter((w) => w.type === "animated" || w.type === "video")
            .map((wp) => (
              <div
                key={wp.id}
                onClick={() => onSelect(wp.id)}
                className={`relative wallpaper-option aspect-video ${
                  selected === wp.id ? "active" : ""
                }`}
              >
                {wp.type === "video" ? (
                  <>
                    <video
                      src={wp.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-start justify-between p-2 pointer-events-none">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/60 text-white/80">
                        {wp.name}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono tracking-[0.15em] rounded-full border border-white/30 text-white/80 bg-black/40">
                        VIDEO
                      </span>
                    </div>
                  </>
                ) : (
                  <div
                    className="h-full flex items-center justify-center text-xs text-[#e5e5e5]"
                    style={{ background: wp.style }}
                  >
                    {wp.name}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-[#666666] mb-2">{t.static}</p>
        <div className="grid grid-cols-2 gap-3">
          {wallpapers
            .filter((w) => w.type === "static")
            .map((wp) => (
              <div
                key={wp.id}
                onClick={() => onSelect(wp.id)}
                className={`wallpaper-option aspect-video ${
                  selected === wp.id ? "active" : ""
                }`}
                style={{ background: wp.style }}
              >
                <div className="h-full flex items-center justify-center text-xs text-[#e5e5e5]">
                  {wp.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
