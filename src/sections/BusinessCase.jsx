import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../i18n/LangContext';
import { businessCase } from '../data/businessCase';
import BeforeAfter from '../components/BeforeAfter';

export default function BusinessCase() {
  const { t } = useLang();
  const tb = t.business;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="business" className="section-pad relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[150px]" />
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
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{tb.sectionLabel}</span>
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/40 text-xs font-bold px-2.5 py-1 rounded-full">
            {tb.platform}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white mb-6"
        >
          {tb.headline}
        </motion.h2>

        {/* ── Niche callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-start gap-4 bg-white/3 border border-white/8 rounded-2xl px-6 py-5 mb-10 max-w-3xl"
        >
          <div className="shrink-0 w-10 h-10 bg-orange-500/15 rounded-full flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-white/65 text-base leading-relaxed">{tb.nicheNote}</p>
        </motion.div>

        {/* ── 500K result ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex items-center gap-5 card-dark rounded-2xl px-6 py-5 mb-8 max-w-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-500/40 via-orange-500/20 to-transparent" />
          <div className="shrink-0 text-center">
            <div className="text-4xl font-black text-gradient leading-none">{tb.resultValue}</div>
          </div>
          <div className="w-px h-10 bg-white/10 shrink-0" />
          <div>
            <div className="text-white font-bold text-base">{tb.resultLabel}</div>
            <p className="text-white/35 text-sm mt-0.5 leading-snug">{tb.resultNote}</p>
          </div>
        </motion.div>

        {/* ── Process badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex flex-wrap items-center gap-3 mb-14"
        >
          <span className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {tb.processLabel}
          </span>
          {['Koncept', 'Scenariusz', 'Kadr', 'Nagranie', 'Montaż', 'Napisy', 'Publikacja'].map((step, i) => (
            <span key={step} className="flex items-center gap-1.5 text-white/30 text-xs">
              {i > 0 && <span className="text-orange-500/40">→</span>}
              <span>{step}</span>
            </span>
          ))}
        </motion.div>

        {/* ── Before / After ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mb-14"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-orange-500/50" />
            <span className="text-white/50 text-sm font-semibold uppercase tracking-widest">{tb.beforeAfterLabel}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <BeforeAfter
                beforeImg={businessCase.beforeImg}
                afterImg={businessCase.afterImg}
                beforeLabel={businessCase.beforeLabel}
                afterLabel={businessCase.afterLabel}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white/55 text-base leading-relaxed">{tb.beforeAfterNote}</p>
              {/* Credit pill */}
              <div className="flex items-center gap-3 bg-orange-500/8 border border-orange-500/15 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-orange-300/80 text-sm font-medium">{tb.beforeAfterCredit}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Videos grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-7">
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
            <span className="text-white/30 text-sm font-semibold uppercase tracking-widest whitespace-nowrap">{tb.videosLabel}</span>
            <div className="h-px flex-1 bg-gradient-to-l from-orange-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessCase.videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/8 hover:border-orange-500/25 transition-colors" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title || `Business video ${i + 1}`}
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
        </motion.div>

      </div>
    </section>
  );
}
