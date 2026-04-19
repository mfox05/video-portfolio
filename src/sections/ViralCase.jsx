import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLang } from '../i18n/LangContext';
import { viralCase } from '../data/viralCase';

// ─── Screenshot gallery ───────────────────────────────────────────────────────

function ScreenshotGallery({ screenshots, placeholderCount, label, hint }) {
  const [lightbox, setLightbox] = useState(null); // index of open image

  const items =
    screenshots.length > 0
      ? screenshots
      : Array.from({ length: placeholderCount }, () => null);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z" />
        </svg>
        <div>
          <span className="text-white font-semibold text-sm">{label}</span>
          <p className="text-white/30 text-xs mt-0.5">{hint}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            onClick={() => src && setLightbox(i)}
            className={`relative aspect-[9/16] rounded-xl overflow-hidden border border-white/8 ${
              src ? 'cursor-zoom-in hover:border-orange-500/40 transition-colors' : ''
            }`}
          >
            {src ? (
              <>
                <img
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </>
            ) : (
              // Placeholder slot
              <div className="w-full h-full bg-zinc-900/60 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/10 rounded-xl">
                <svg className="w-6 h-6 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-white/15 text-xs text-center px-2 leading-tight">
                  screen-0{i + 1}.png
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={items[lightbox]}
              alt="Screenshot"
              className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Prev / Next */}
            {items.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
                  onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length); }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
                  onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length); }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ViralCase() {
  const { t, lang } = useLang();
  const tv = t.viral;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const embedUrl = `https://www.youtube.com/embed/${viralCase.youtubeId}?rel=0&modestbranding=1&color=white`;

  return (
    <section id="viral" className="section-pad relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/6 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{tv.sectionLabel}</span>
          {/* Viral badge */}
          <span className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            {tv.platform}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white mb-3"
        >
          {tv.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/40 text-lg mb-12 max-w-xl"
        >
          {tv.sub}
        </motion.p>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {viralCase.stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
              className="card-dark rounded-2xl p-5 text-center relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
              <div className="text-3xl md:text-4xl font-black text-gradient leading-none mb-1.5">
                {s.value}
              </div>
              <div className="text-white/70 text-sm font-semibold">
                {lang === 'pl' ? s.labelPL : s.labelEN}
              </div>
              <div className="text-white/25 text-xs mt-0.5">
                {lang === 'pl' ? s.subPL : s.subEN}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Sound callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-start gap-4 bg-orange-500/8 border border-orange-500/20 rounded-2xl px-6 py-4 mb-10"
        >
          <div className="shrink-0 w-10 h-10 bg-orange-500/15 rounded-full flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-base leading-snug">{tv.soundCallout}</p>
            <p className="text-white/40 text-sm mt-1">{tv.soundSub}</p>
          </div>
        </motion.div>

        {/* ── Video + screenshots layout ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: YouTube embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
              {/* 16:9 aspect ratio */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title="Viral TikTok video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Orange corner glow */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-orange-500/20 rounded-br-full pointer-events-none" />
            </div>

            {/* Watch on YouTube link */}
            <a
              href={`https://youtu.be/${viralCase.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-white/40 hover:text-orange-400 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {tv.watchOn}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>

          {/* Right: screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <ScreenshotGallery
              screenshots={viralCase.screenshots}
              placeholderCount={viralCase.placeholderCount}
              label={tv.screenshotsLabel}
              hint={tv.screenshotsHint}
            />
          </motion.div>
        </div>

        {/* ── More videos grid ── */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-14"
          >
            {/* Divider + label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
              <span className="text-white/30 text-sm font-semibold uppercase tracking-widest whitespace-nowrap">
                {tv.moreLabel}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-orange-500/20 to-transparent" />
            </div>

            {viralCase.moreVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {viralCase.moreVideos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden border border-white/8 hover:border-orange-500/25 transition-colors"
                      style={{ paddingBottom: video.aspect === 'portrait' ? '177.78%' : '56.25%' }}
                    >
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {video.title && (
                      <p className="mt-2.5 text-white/50 text-sm px-1">{video.title}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Placeholder slots when no videos added yet */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border-2 border-dashed border-white/8 aspect-video flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span className="text-white/15 text-xs">video {i + 1}</span>
                  </div>
                ))}
              </div>
            )}
        </motion.div>
      </div>
    </section>
  );
}
