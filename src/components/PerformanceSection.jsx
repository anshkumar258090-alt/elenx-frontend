import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (node) node.textContent = Math.round(latest) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const PerformanceSection = () => {
  return (
    <section id="comparison" className="relative z-10 py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
          >
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Performance</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight"
          >
            The <span className="text-gradient-metal">Difference</span> is Real
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 80, damping: 20 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card rounded-3xl overflow-hidden border border-white/[0.06]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Standard PC Side */}
            <div className="p-10 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.04]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-500 font-space-grotesk tracking-wide">Standard PC</h3>
              </div>
              
              <div className="space-y-8">
                {/* FPS */}
                <div>
                  <div className="flex justify-between text-zinc-400 mb-2.5 font-medium text-sm">
                    <span>Average FPS</span>
                    <Counter value={140} />
                  </div>
                  <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-zinc-600 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Latency */}
                <div>
                  <div className="flex justify-between text-zinc-400 mb-2.5 font-medium text-sm">
                    <span>Input Latency</span>
                    <Counter value={15} suffix="ms" />
                  </div>
                  <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-red-400/60 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Elenx Side */}
            <div className="p-10 md:p-12 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D9DEE5]/[0.06] via-transparent to-[#858E9A]/[0.04] opacity-80" />

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#D9DEE5]/10 border border-[#AEB6C2]/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-space-grotesk tracking-wide">With Elenx</h3>
                <span className="px-3 py-1 text-[10px] font-black bg-gradient-to-r from-[#D9DEE5] to-[#D9DEE5] text-black rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(174,182,194,0.4)]">Pro</span>
              </div>

              <div className="space-y-8 relative z-10">
                {/* FPS */}
                <div>
                  <div className="flex justify-between text-white font-bold mb-2.5 text-lg">
                    <span>Average FPS</span>
                    <Counter value={240} suffix="+" />
                  </div>
                  <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-[#AEB6C2] via-[#F5F7FA] to-[#D9DEE5] h-full rounded-full shadow-[0_0_15px_rgba(174,182,194,0.5)] relative"
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 skew-x-12 translate-x-full animate-shimmer" />
                    </motion.div>
                  </div>
                </div>

                {/* Latency */}
                <div>
                  <div className="flex justify-between text-white font-bold mb-2.5 text-lg">
                    <span>Input Latency</span>
                    <span className="text-gradient-metal"><Counter value={2} suffix="ms" /></span>
                  </div>
                  <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-[#D9DEE5] to-[#D9DEE5] h-full rounded-full shadow-[0_0_15px_rgba(174,182,194,0.5)]"
                    />
                  </div>
                  <p className="text-xs text-[#AEB6C2] mt-2 font-medium flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    86% Reduction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
