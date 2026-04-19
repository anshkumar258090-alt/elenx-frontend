
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Gauge } from 'lucide-react';

const SystemArchitecture = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Stagger delays for children
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -100 }, // Slide in from Left
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 20,
            },
        },
    };

    const cardVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
            boxShadow: '0px 0px 20px rgba(6, 182, 212, 0.4)', // Cyan glow
            borderColor: 'rgba(6, 182, 212, 0.6)',
        },
    };

    const iconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.1,
            rotate: 360,
            transition: {
                rotate: { duration: 1, ease: "linear", repeat: Infinity }, // Spinning effect
                scale: { duration: 0.3 }
            },
        },
    };

    const features = [
        {
            title: 'Kernel Optimization',
            description: 'Direct hardware access tailored for gaming workloads.',
            icon: Cpu,
        },
        {
            title: 'Network Stabilization',
            description: 'AI-driven packet routing to eliminate jitter.',
            icon: Wifi,
        },
        {
            title: 'Resource Management',
            description: 'Dynamic allocation of CPU/RAM for active processes.',
            icon: Gauge,
        },
    ];

    return (
        <section className="bg-transparent dark:bg-slate-950 py-24 relative overflow-hidden font-sans transition-colors duration-300">
            {/* Background Grid Pattern - Adaptive */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-radial from-cyan-500/10 dark:from-cyan-900/20 via-transparent to-transparent opacity-50 pointer-events-none blur-3xl"></div>

            <motion.div
                className="max-w-6xl mx-auto px-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger earlier
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 drop-shadow-sm">
                            System Architecture
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Engineered for peak performance, ensuring minimal latency and maximum frame rates.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <motion.div
                                className={`relative group h-full p-8 rounded-2xl 
                                    bg-white/60 dark:bg-white/5 
                                    backdrop-blur-md 
                                    border border-slate-200 dark:border-white/10 
                                    shadow-sm dark:shadow-none
                                    overflow-hidden cursor-default transition-all duration-300`}
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                {/* Inner Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <motion.div
                                    className="mb-6 inline-flex p-3 rounded-lg 
                                        bg-white dark:bg-slate-800/50 
                                        border border-slate-100 dark:border-white/5 
                                        text-cyan-600 dark:text-cyan-400 
                                        shadow-sm dark:shadow-none
                                        group-hover:text-white group-hover:bg-cyan-500/20 transition-colors duration-300"
                                    variants={iconVariants}
                                >
                                    <feature.icon size={32} strokeWidth={1.5} />
                                </motion.div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default SystemArchitecture;
