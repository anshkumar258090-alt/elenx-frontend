
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
 <section className="bg-transparent py-24 relative overflow-hidden font-sans transition-colors duration-300">
 {/* Background Grid Pattern - Adaptive */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

 {/* Subtle Gradient Glow */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-radial from-[#AEB6C2]/8 via-transparent to-transparent opacity-50 pointer-events-none blur-3xl"></div>

 <motion.div
 className="max-w-6xl mx-auto px-6 relative z-10"
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }} // Trigger earlier
 >
 {/* Header */}
 <motion.div variants={itemVariants} className="text-center mb-16">
 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 ">
 <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#AEB6C2] to-[#AEB6C2] dark:from-[#AEB6C2] drop-shadow-sm">
 System Architecture
 </span>
 </h2>
 <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
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
 bg-zinc-800/60 /5 
 backdrop-blur-md 
 border border-zinc-200 
 shadow-sm 
 overflow-hidden cursor-default transition-all duration-300`}
 variants={cardVariants}
 whileHover="hover"
 >
 {/* Inner Glow Effect */}
 <div className="absolute inset-0 bg-gradient-to-b from-[#AEB6C2]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

 <motion.div
 className="mb-6 inline-flex p-3 rounded-lg 
 bg-[#1e293b] /50 
 border border-zinc-100 dark:border-white/5 
 text-[#AEB6C2] 
 shadow-sm 
 group-hover:text-white group-hover:bg-[#F5F7FA]/20 transition-colors duration-300"
 variants={iconVariants}
 >
 <feature.icon size={32} strokeWidth={1.5} />
 </motion.div>

 <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#AEB6C2] dark:group-hover:text-[#F5F7FA] transition-colors duration-300">
 {feature.title}
 </h3>

 <p className="text-zinc-600 leading-relaxed font-light group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300">
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
