import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, amount: 0.2 },
};

const AboutPage = () => {
  const services = [
    { icon: '💻', title: 'Software Development', desc: 'Custom software solutions tailored to your business needs with cutting-edge technologies.' },
    { icon: '🌐', title: 'Web Development', desc: 'Responsive, high-performance websites and web applications using modern frameworks.' },
    { icon: '🤖', title: 'AI Solutions', desc: 'Intelligent automation and machine learning solutions to transform your operations.' },
    { icon: '⚡', title: 'Automation', desc: 'Streamline workflows and reduce manual effort with smart automation systems.' },
    { icon: '☁️', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure setup, migration, and management services.' },
    { icon: '🔗', title: 'API Development', desc: 'Robust, secure, and well-documented APIs for seamless system integration.' },
    { icon: '🎨', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed for exceptional user experiences.' },
    { icon: '📱', title: 'Digital Products', desc: 'End-to-end digital product development from concept to market launch.' },
  ];

  const values = [
    { title: 'Innovation', desc: 'We stay at the forefront of technology to deliver cutting-edge solutions.', color: 'amber' },
    { title: 'Quality', desc: 'Every line of code we write meets the highest standards of excellence.', color: 'emerald' },
    { title: 'Reliability', desc: 'Our clients trust us to deliver on time, every time, without compromise.', color: 'blue' },
    { title: 'Transparency', desc: 'We believe in open communication and honest partnerships with our clients.', color: 'violet' },
  ];

  const techStack = [
    'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 
    'Docker', 'Kubernetes', 'TensorFlow', 'Next.js', 'TypeScript', 'Redis',
    'GraphQL', 'Flutter', 'Firebase', 'Tailwind CSS',
  ];

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-amber-500/30 selection:text-white bg-[#06060a]">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp} className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">About Us</span>
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-space-grotesk tracking-tight text-white mb-6"
          >
            Building the <span className="text-gradient-hero">Future</span>
          </motion.h1>
          <motion.p {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-lg text-zinc-500 max-w-3xl mx-auto leading-relaxed"
          >
            Elenx is a premier IT services company specializing in software development, 
            cloud solutions, AI-driven automation, and digital transformation. We empower 
            businesses with technology that drives growth and innovation.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative z-10 py-20 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/15 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white font-space-grotesk mb-4">Our Mission</h2>
                <p className="text-zinc-400 leading-relaxed">
                  To deliver exceptional IT solutions that empower businesses to achieve their 
                  full potential. We combine technical expertise with creative innovation to 
                  build software that solves real-world problems and creates lasting value 
                  for our clients.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }} className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/15 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white font-space-grotesk mb-4">Our Vision</h2>
                <p className="text-zinc-400 leading-relaxed">
                  To become a globally recognized leader in IT innovation, setting new 
                  standards for quality, reliability, and technological excellence. We 
                  envision a world where every business has access to powerful, 
                  transformative technology solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 py-20 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight mb-4"
            >
              Our <span className="text-gradient-cyan">Services</span>
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-zinc-500 text-lg max-w-2xl mx-auto"
            >
              Comprehensive IT solutions tailored to accelerate your digital transformation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-white font-space-grotesk mb-2 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight mb-4"
            >
              Our <span className="text-gradient-cyan">Values</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-${value.color}-500/10 border border-${value.color}-500/20`}>
                  <span className="text-2xl font-bold text-white font-space-grotesk">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-space-grotesk">{value.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 py-20 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight mb-4"
            >
              Technology <span className="text-gradient-cyan">Stack</span>
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-zinc-500 text-lg max-w-2xl mx-auto"
            >
              We leverage industry-leading technologies to build robust solutions.
            </motion.p>
          </div>

          <motion.div {...fadeInUp} className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-zinc-400 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="glass-card rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
                Let's discuss how Elenx can help you achieve your technology goals.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all text-sm tracking-wider"
              >
                GET IN TOUCH
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
