import { motion } from 'framer-motion';
import { useLang } from '../i18n/LangContext';
import { heroConfig } from '../data/heroConfig';

const stats = [
  { value: '225K', labelKey: 'views' },
  { value: '25K',  labelKey: 'likes' },
  { value: '4K',   labelKey: 'shares' },
  { value: '500K+', labelKey: 'won' },
];

export default function Hero() {
  const { t, lang } = useLang();
  const subtitle = lang === 'pl' ? heroConfig.subtitlePL : heroConfig.subtitleEN;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background layers ── */}
      {/* Large radial blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-150 h-150 bg-orange-500/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-orange-400/8 rounded-full blur-[100px]" />
      </div>

      {/* Diagonal gradient sweep across whole section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 50%, rgba(249,115,22,0.04) 100%)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text ── */}
          <div>
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-orange-500" />
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest">
                {subtitle}
              </p>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-6xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-8"
            >
              Maciej&nbsp;
              <span
                className="text-gradient"
                style={{ textShadow: '0 0 80px rgba(249,115,22,0.35)' }}
              >
                Foks.
              </span>
            </motion.h1>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.labelKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
                  className="relative rounded-xl px-4 py-3 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(249,115,22,0.15)',
                  }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-orange-500/50 via-orange-500/20 to-transparent" />
                  <div className="text-2xl font-black text-gradient leading-none mb-0.5">{s.value}</div>
                  <div className="text-white/35 text-xs">{t.stats[s.labelKey]}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#viral"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-orange-500/40 text-white/70 hover:text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* ── Right: photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >

            <div className="relative rounded-3xl overflow-hidden border border-orange-500/25 aspect-4/5">
              {heroConfig.photo ? (
                <img
                  src={heroConfig.photo}
                  alt="Maciej Foks"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-3">
                  <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-white/20 text-xs text-center leading-relaxed px-6">
                    Wrzuć zdjęcie do<br />
                    <span className="text-white/40 font-mono">public/photos/hero.jpeg</span>
                  </p>
                </div>
              )}

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />

              {/* Orange corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-orange-500/30 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-4 -left-4 bg-black/90 border border-orange-500/30 rounded-2xl px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-bold">225K</span>
                <span className="text-white/40 text-xs">views · 1 video</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-linear-to-b from-orange-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
