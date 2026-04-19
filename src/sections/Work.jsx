import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLang } from '../i18n/LangContext';

const portfolioItems = {
  business: [
    { id: 'BQU0tT17hJk', title: '' },
    { id: 'l3CXeWCdQ30', title: '' },
    { id: '9hDEQd7_4_w', title: '' },
  ],
  automotive: [
    { id: 'yPsCfnfpIB0', title: '' },
    { id: '2MUmh0rr5c8', title: '' },
    { id: 'hvpk5iVdm1c', title: '' },
  ],
  animation: [
    { id: 'EIFazsvZjD8', title: '', note: 'quomerce.com' },
  ],
};

const categoryIcons = {
  business: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  automotive: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 7h2l3 6H13V7z" />
    </svg>
  ),
  animation: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  ),
};

function VideoCard({ item, watchLabel }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`;
  const url = `https://youtu.be/${item.id}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block relative aspect-video rounded-2xl overflow-hidden border border-white/8 hover:border-orange-500/30 transition-colors duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <img
          src={thumb}
          alt={item.title || 'Video'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay always present to soften thumbnail */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

        {/* Play button */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.7)]">
            <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>

        {/* Note badge (e.g. quomerce.com) */}
        {item.note && (
          <span className="absolute bottom-3 left-3 bg-black/70 text-white/60 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {item.note}
          </span>
        )}
      </a>

      {item.title && (
        <p className="mt-2.5 text-white/50 text-sm px-1">{item.title}</p>
      )}
    </motion.div>
  );
}

export default function Work() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const categories = ['business', 'automotive', 'animation'];
  const [active, setActive] = useState('business');

  return (
    <section id="work" className="section-pad" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{t.work.sectionLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white mb-10"
        >
          {t.work.headline}
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {categoryIcons[cat]}
              {t.work.categories[cat].label}
            </button>
          ))}
        </motion.div>

        {/* Category description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-white/40 text-base mb-8 max-w-xl"
          >
            {t.work.categories[active].desc}
          </motion.p>
        </AnimatePresence>

        {/* Video grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={
              portfolioItems[active].length === 1
                ? 'max-w-md'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            }
          >
            {portfolioItems[active].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <VideoCard item={item} watchLabel={t.work.watchVideo} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
