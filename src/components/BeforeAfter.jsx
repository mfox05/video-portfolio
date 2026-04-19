import { useState, useRef, useCallback } from 'react';

export default function BeforeAfter({ beforeImg, afterImg, beforeLabel = 'PRZED', afterLabel = 'PO' }) {
  const [pos, setPos] = useState(50); // percent
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    calcPos(e.clientX);
    const onMove = (e) => dragging.current && calcPos(e.clientX);
    const onUp   = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onTouchMove = (e) => calcPos(e.touches[0].clientX);

  // Placeholder shown when images not yet provided
  if (!beforeImg || !afterImg) {
    return (
      <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-white/10 aspect-video flex flex-col items-center justify-center gap-3 bg-zinc-900/40">
        <div className="flex items-center gap-6 opacity-30">
          <div className="flex flex-col items-center gap-1">
            <div className="w-20 h-14 rounded-lg bg-zinc-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{beforeLabel}</span>
            </div>
          </div>
          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <div className="w-20 h-14 rounded-lg bg-orange-500/30 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{afterLabel}</span>
            </div>
          </div>
        </div>
        <p className="text-white/20 text-xs">Wrzuć before.png i after.png do<br />public/screenshots/business-before-after/</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden aspect-video select-none cursor-col-resize border border-orange-500/15 shadow-[0_0_40px_rgba(249,115,22,0.06)]"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => calcPos(e.touches[0].clientX)}
    >
      {/* After — pełny rozmiar, warstwa bazowa */}
      <img src={afterImg} alt="Po" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before — pełny rozmiar, maskowany clip-path od prawej */}
      <img
        src={beforeImg}
        alt="Przed"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]" style={{ left: `${pos}%` }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center z-10"
        style={{ left: `${pos}%` }}
      >
        <svg className="w-5 h-5 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 bg-orange-500/80 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}
