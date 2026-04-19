import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../i18n/LangContext';

const tagColors = [
  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'bg-white/5 text-white/60 border-white/10',
];

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-pad bg-black/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{t.about.sectionLabel}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
            >
              {t.about.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-8"
            >
              {t.about.body}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {t.about.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${tagColors[i % tagColors.length]}`}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right: visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-orange-500/5 rounded-3xl blur-2xl scale-110" />

            <div className="relative card-dark rounded-3xl p-8 overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full" />

              {/* Name */}
              <div className="mb-6">
                <div className="text-white/30 text-xs uppercase tracking-widest mb-1">Video Creator</div>
                <div className="text-3xl font-black text-white">Maciej Foks</div>
                <div className="text-orange-400 font-semibold text-sm mt-1">@ Onlyfox</div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-orange-500/30 via-orange-500/10 to-transparent mb-6" />

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '205K', l: 'views / 7 dni' },
                  { v: '500K+', l: 'PLN' },
                  { v: '30+', l: 'TikToks' },
                  { v: '4K', l: 'shares' },
                ].map((s) => (
                  <div key={s.l} className="bg-white/3 rounded-xl p-3">
                    <div className="text-xl font-black text-gradient">{s.v}</div>
                    <div className="text-white/30 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Services row */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {['📹 Film', '✂️ Edit', '🎞️ 3D', '📱 Social'].map((s) => (
                    <span key={s} className="text-white/40 text-xs bg-white/4 px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
