import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';

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
        <section id="comparison" className="relative z-10 py-24 bg-white/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Standard PC Side */}
                        <div className="p-12 bg-gray-50 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-400 mb-8 font-space-grotesk tracking-wide">Standard PC</h3>
                            <div className="space-y-8">
                                {/* FPS */}
                                <div>
                                    <div className="flex justify-between text-gray-500 mb-2 font-medium">
                                        <span>Average FPS</span>
                                        <Counter value={140} />
                                    </div>
                                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "60%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="bg-gray-400 h-full rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Latency */}
                                <div>
                                    <div className="flex justify-between text-gray-500 mb-2 font-medium">
                                        <span>Input Latency</span>
                                        <Counter value={15} suffix="ms" />
                                    </div>
                                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "80%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="bg-red-300 h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ElenX Side */}
                        <div className="p-12 bg-white relative overflow-hidden group">
                            {/* Subtle background glow for ElenX */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-50"></div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-8 relative z-10 font-space-grotesk tracking-wide flex items-center">
                                With ElenX
                                <span className="ml-3 px-2 py-0.5 text-xs bg-black text-white rounded-full uppercase tracking-wider">Pro</span>
                            </h3>

                            <div className="space-y-8 relative z-10">
                                {/* FPS */}
                                <div>
                                    <div className="flex justify-between text-gray-900 font-bold mb-2 text-lg">
                                        <span>Average FPS</span>
                                        <Counter value={240} suffix="+" />
                                    </div>
                                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "95%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="bg-gray-900 h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] relative"
                                        >
                                            {/* Shine effect on bar */}
                                            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/20 skew-x-12 translate-x-full animate-shimmer" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Latency */}
                                <div>
                                    <div className="flex justify-between text-gray-900 font-bold mb-2 text-lg">
                                        <span>Input Latency</span>
                                        <span className="text-green-500"><Counter value={2} suffix="ms" /></span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "10%" }} // Low width = low latency = good
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="bg-green-400 h-full rounded-full shadow-[0_0_15px_rgba(74,222,128,0.6)]"
                                        />
                                    </div>
                                    <p className="text-xs text-green-500 mt-2 font-medium flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                        86% Reduction
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PerformanceSection;
