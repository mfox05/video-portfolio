import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../i18n/LangContext';

export default function Results() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="results" className="section-pad relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{t.results.sectionLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white mb-16"
        >
          {t.results.headline}
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.results.items.map((item, i) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`relative card-dark rounded-3xl p-8 overflow-hidden group hover:border-orange-500/30 transition-all duration-300 ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/3 transition-all duration-300 rounded-3xl" />

              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

              <div className="relative">
                <div className="text-5xl md:text-6xl font-black text-gradient mb-3 leading-none">
                  {item.value}
                </div>
                <div className="text-white font-bold text-lg mb-2">{item.label}</div>
                <div className="text-white/40 text-sm leading-relaxed">{item.desc}</div>
              </div>

              {/* Number */}
              <div className="absolute bottom-4 right-6 text-7xl font-black text-white/[0.03] select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
