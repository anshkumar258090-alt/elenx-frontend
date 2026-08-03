import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    icon: '💻',
    title: 'Software Development',
    desc: 'Custom enterprise software solutions built with cutting-edge technologies to solve complex business challenges.',
    features: ['Scalable Architecture', 'Agile Development', 'Quality Assurance', 'Continuous Support'],
  },
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'High-performance, responsive web applications using React, Next.js, and modern frameworks.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Cross-Browser'],
  },
  {
    icon: '🤖',
    title: 'AI Solutions',
    desc: 'Intelligent automation and machine learning solutions that transform data into actionable insights.',
    features: ['Machine Learning', 'NLP Processing', 'Computer Vision', 'Predictive Analytics'],
  },
  {
    icon: '⚡',
    title: 'Automation',
    desc: 'Streamline workflows and eliminate manual processes with intelligent automation systems.',
    features: ['Workflow Automation', 'CI/CD Pipelines', 'Process Optimization', 'Bot Development'],
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, Azure, and GCP with 99.99% uptime guarantee.',
    features: ['Cloud Migration', 'DevOps', 'Kubernetes', 'Auto Scaling'],
  },
  {
    icon: '🔗',
    title: 'API Development',
    desc: 'Robust, secure, and well-documented RESTful & GraphQL APIs for seamless integration.',
    features: ['REST & GraphQL', 'Authentication', 'Rate Limiting', 'Documentation'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with a focus on user experience and conversion.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: '📱',
    title: 'Digital Products',
    desc: 'End-to-end digital product development from ideation to launch and beyond.',
    features: ['Product Strategy', 'MVP Development', 'Market Fit', 'Growth Hacking'],
  },
];

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Active Clients' },
  { value: '24/7', label: 'Support Available' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'CTO, TechStart India', rating: 5, text: 'Elenx transformed our legacy system into a modern cloud-native application. Their team delivered on time and exceeded our expectations. Highly recommended for enterprise projects.', avatar: 'RK' },
  { name: 'Sarah Mitchell', role: 'Product Manager, GlobalTech', rating: 5, text: 'The AI solution Elenx built for us reduced our data processing time by 80%. Their expertise in machine learning and automation is truly world-class.', avatar: 'SM' },
  { name: 'Amit Patel', role: 'Founder, FinFlow', rating: 5, text: 'Working with Elenx on our fintech platform was an exceptional experience. Their attention to security, performance, and user experience was outstanding.', avatar: 'AP' },
  { name: 'Priya Sharma', role: 'CEO, HealthBridge', rating: 5, text: 'The web application Elenx developed for our healthcare startup is robust, scalable, and beautifully designed. They understood our vision perfectly.', avatar: 'PS' },
  { name: 'David Chen', role: 'Director, CloudNine Solutions', rating: 5, text: 'Elenx helped us migrate our entire infrastructure to AWS. The transition was seamless with zero downtime. Their DevOps expertise is top-notch.', avatar: 'DC' },
  { name: 'Neha Gupta', role: 'VP Engineering, DataSync', rating: 5, text: 'The API architecture designed by Elenx handles millions of requests daily without any issues. Their technical depth and professionalism are remarkable.', avatar: 'NG' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'We analyze your requirements, business goals, and technical landscape to craft the perfect solution.' },
  { step: '02', title: 'Design', desc: 'Our designers create intuitive wireframes and prototypes, ensuring the best user experience.' },
  { step: '03', title: 'Development', desc: 'Our engineers build your solution using modern technologies with agile methodology.' },
  { step: '04', title: 'Delivery', desc: 'We deploy, test, and optimize your solution with ongoing support and maintenance.' },
];

/* ===== MAIN LANDING PAGE ===== */
const LandingPage = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem('client_token');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('role');
    setUserToken(null);
  };

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-amber-500/30 selection:text-white bg-[#06060a]">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      
      <Navbar userToken={userToken} onLogout={handleLogout} />

      {/* ===== HERO ===== */}
      <section id="home" className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,rgba(0,0,0,0)_70%)] transform -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
          <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        {/* Floating shapes */}
        <div className="absolute top-32 left-[10%] w-20 h-20 border border-amber-500/10 rounded-lg rotate-45 animate-float pointer-events-none hidden lg:block" />
        <div className="absolute top-52 right-[12%] w-16 h-16 border border-orange-500/10 rounded-full animate-float-reverse pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto text-center w-full z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 left-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-emerald-500/15 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 tracking-wider">IT SERVICES</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-10 right-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-amber-500/15 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-xs font-bold text-amber-300 tracking-wider">DIGITAL INNOVATION</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mt-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Premium IT Solutions</span>
            </div>

            <h1 className="text-6xl md:text-[100px] lg:text-[120px] leading-[0.85] font-black tracking-tighter mb-6 font-space-grotesk uppercase">
              <span className="text-gradient-hero">ELENX</span>
            </h1>
            
            <p className="mt-8 max-w-3xl mx-auto text-[17px] font-medium text-zinc-500 leading-relaxed">
              We build exceptional software, design stunning interfaces, and deliver<br className="hidden md:block" />
              cutting-edge AI & cloud solutions that transform businesses.
            </p>
            
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative group px-10 py-4 bg-amber-600 text-white text-sm font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 border border-amber-400/30 overflow-hidden hover:scale-105 cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider">
                  OUR SERVICES <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <Link to="/contact" className="px-10 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/30 text-zinc-400 hover:text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] tracking-wider text-center">
                GET IN TOUCH
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 py-16 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-black text-gradient-cyan font-space-grotesk">{stat.value}</span>
                <span className="block text-xs text-zinc-600 uppercase tracking-wider mt-2 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / WHY CHOOSE US ===== */}
      <section id="about" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Why Choose Elenx</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Built for <span className="text-gradient-cyan">Excellence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500 max-w-2xl mx-auto"
            >
              We combine technical expertise with creative innovation to deliver solutions that drive real business results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Rapid Delivery', 
                desc: 'Agile development methodology ensures fast delivery without compromising quality.', 
                stat: '2x', 
                statLabel: 'Faster Delivery' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Enterprise Security', 
                desc: 'Bank-grade security practices, SSL encryption, and compliance-ready architecture.', 
                stat: '100%', 
                statLabel: 'Secure Solutions' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Global Reach', 
                desc: 'Serving clients worldwide with 24/7 support and multi-timezone availability.', 
                stat: '50+', 
                statLabel: 'Happy Clients' 
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: 'spring', stiffness: 80, damping: 20 }}
                viewport={{ once: true, amount: 0.3 }}
                className="glass-card rounded-2xl p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-amber-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-5 border-t border-white/[0.04]">
                  <span className="text-3xl font-bold text-gradient-cyan font-space-grotesk">{item.stat}</span>
                  <span className="block text-[11px] text-zinc-600 uppercase tracking-wider mt-1 font-medium">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Our Services</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              What We <span className="text-gradient-cyan">Offer</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500"
            >
              Comprehensive IT solutions tailored to accelerate your digital transformation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: idx * 0.08, type: 'spring', stiffness: 100, damping: 18 }}
                viewport={{ once: true, amount: 0.15 }}
                className="h-full"
              >
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col group cursor-default hover:-translate-y-2 transition-all duration-500">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-white font-space-grotesk mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-5 flex-grow">{service.desc}</p>
                  <ul className="space-y-2 pt-4 border-t border-white/[0.04]">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center text-[12px]">
                        <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">How We Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Our <span className="text-gradient-cyan">Process</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 group text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/10 transition-all" />
                <span className="text-5xl font-black font-space-grotesk text-white/[0.06] group-hover:text-amber-500/20 transition-colors block mb-4">{step.step}</span>
                <h3 className="text-xl font-bold text-white font-space-grotesk mb-3 group-hover:text-amber-300 transition-colors">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="reviews" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-orange-600/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Client Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Trusted by <span className="text-gradient-cyan">Industry Leaders</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500"
            >
              Real feedback from businesses we've helped transform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-6 group relative"
              >
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-amber-500/50 via-orange-500/30 to-transparent rounded-full" />
                
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-amber-300">
                      {review.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{review.name}</span>
                      <span className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">{review.role}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400' : 'text-zinc-800'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed italic">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 py-28 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white font-space-grotesk mb-6 tracking-tight">
                Ready to Build Something<br /><span className="text-gradient-hero">Amazing?</span>
              </h2>
              <p className="text-zinc-500 mb-10 max-w-xl mx-auto text-lg">
                Let's discuss your project and discover how Elenx can transform your business with technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all text-sm tracking-wider"
                >
                  START YOUR PROJECT
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/30 text-zinc-400 hover:text-white font-bold rounded-full transition-all text-sm tracking-wider"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
