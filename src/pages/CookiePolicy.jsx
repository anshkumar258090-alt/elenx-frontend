import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: '1. What Are Cookies?',
      content: `Cookies are small text files that are placed on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies help us remember your preferences, understand how you use our website, and improve your overall experience.`
    },
    {
      title: '2. How We Use Cookies',
      content: `Elenx uses cookies and similar technologies for the following purposes:

• **Essential Cookies**: These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and session management. Without these cookies, the website cannot function correctly.
• **Performance Cookies**: These cookies collect information about how you use our website, such as which pages you visit most often and if you receive error messages. This information is used to improve website performance and user experience.
• **Functional Cookies**: These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, personalized features.
• **Analytics Cookies**: We use analytics cookies to understand how visitors interact with our website, helping us improve our content and services.`
    },
    {
      title: '3. Types of Cookies We Use',
      content: `| Cookie Type | Purpose | Duration |
|------------|---------|----------|
| Session Cookies | Maintain your session while using our website | Until browser is closed |
| Authentication Cookies | Keep you logged in to your account | Up to 30 days |
| Preference Cookies | Remember your settings and preferences | Up to 1 year |
| Analytics Cookies | Track website usage patterns | Up to 2 years |
| Security Cookies | Detect authentication abuses and protect user data | Session-based |`
    },
    {
      title: '4. Third-Party Cookies',
      content: `Some cookies on our website are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies:

• **Payment Gateway (PayU)**: For secure payment processing
• **Analytics Services**: For understanding website usage patterns
• **Content Delivery Networks**: For optimizing website performance

We do not control these third-party cookies. Please refer to the respective third-party privacy policies for more information about their cookies.`
    },
    {
      title: '5. Managing Cookies',
      content: `You can control and manage cookies in several ways:

• **Browser Settings**: Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, delete cookies, or alert you when a cookie is being set.
• **Opt-Out**: You can opt out of analytics cookies by using the relevant opt-out mechanisms provided by analytics service providers.

**How to manage cookies in popular browsers**:
• **Chrome**: Settings → Privacy and Security → Cookies
• **Firefox**: Settings → Privacy & Security → Cookies
• **Safari**: Preferences → Privacy → Cookies
• **Edge**: Settings → Cookies and Site Permissions

Please note that disabling certain cookies may affect the functionality of our website and your user experience.`
    },
    {
      title: '6. Local Storage',
      content: `In addition to cookies, we use local storage technology in your browser to store certain data:

• Authentication tokens for maintaining your login session
• User preferences and settings
• Temporary data for improved performance

Local storage data can be managed through your browser's developer tools or settings.`
    },
    {
      title: '7. Changes to This Policy',
      content: `We may update this Cookie Policy from time to time to reflect changes in our practices or applicable regulations. We will post any changes on this page with an updated revision date. We encourage you to review this policy periodically.`
    },
    {
      title: '8. Contact Us',
      content: `If you have questions about our use of cookies, please contact us:

• **Email**: contact@elenx.in
• **Phone**: +91 8808290279
• **Website**: https://elenx.in/contact`
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-amber-500/30 selection:text-white bg-[#06060a]">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <Navbar />

      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tight text-white mb-4">
              Cookie <span className="text-gradient-hero">Policy</span>
            </h1>
            <p className="text-zinc-500">Last Updated: August 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-12 space-y-10"
          >
            <p className="text-zinc-400 leading-relaxed">
              This Cookie Policy explains how Elenx ("we," "our," or "us") uses cookies and similar 
              technologies when you visit our website (https://elenx.in). By using our website, you 
              consent to the use of cookies as described in this policy.
            </p>

            {sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-bold text-white font-space-grotesk mb-4">{section.title}</h2>
                <div className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">{section.content}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
