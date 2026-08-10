import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information that you provide directly to us, including:

• **Personal Information**: Name, email address, phone number, and billing address when you register for an account, make a purchase, or contact us.
• **Payment Information**: Payment card details, UPI IDs, and billing information processed through our secure payment gateway (PayU). We do not store complete payment card details on our servers.
• **Usage Data**: Information about how you interact with our website, including pages visited, time spent, browser type, device information, and IP address.
• **Communication Data**: Records of your correspondence with us, including support tickets, emails, and feedback.
• **Cookies and Tracking**: We use cookies and similar technologies to enhance your experience. See our Cookie Policy for details.`
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:

• Provide, maintain, and improve our IT services and digital products
• Process transactions and send related information, including purchase confirmations and invoices
• Send technical notices, security alerts, and support messages
• Respond to your comments, questions, and customer service requests
• Monitor and analyze trends, usage, and activities to improve our services
• Detect, investigate, and prevent fraudulent transactions and unauthorized access
• Comply with legal obligations and enforce our terms of service
• Personalize your experience and deliver content relevant to your interests`
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

• **Service Providers**: With trusted third-party service providers who assist us in operating our website, processing payments (PayU), and delivering services, subject to strict confidentiality obligations.
• **Legal Requirements**: When required by law, regulation, legal process, or governmental request.
• **Business Transfers**: In connection with a merger, acquisition, or sale of assets, your information may be transferred.
• **Consent**: With your explicit consent for purposes not covered by this policy.`
    },
    {
      title: '4. Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information:

• SSL/TLS encryption for all data transmitted between your browser and our servers
• Encrypted storage of sensitive data at rest
• Regular security audits and vulnerability assessments
• Access controls limiting employee access to personal data on a need-to-know basis
• Secure payment processing through PCI-DSS compliant payment gateways

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.`
    },
    {
      title: '5. Your Rights',
      content: `You have the following rights regarding your personal information:

• **Access**: Request access to the personal data we hold about you
• **Correction**: Request correction of inaccurate or incomplete data
• **Deletion**: Request deletion of your personal data, subject to legal obligations
• **Portability**: Request a copy of your data in a structured, machine-readable format
• **Objection**: Object to the processing of your personal data for specific purposes
• **Withdrawal of Consent**: Withdraw consent at any time where processing is based on consent

To exercise any of these rights, contact us at contact@elenx.in.`
    },
    {
      title: '6. Data Retention',
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Specifically:

• Account information is retained as long as your account is active
• Transaction records are retained for a minimum of 7 years for tax and legal compliance
• Communication records are retained for 3 years
• Usage data is retained for 2 years in an anonymized form`
    },
    {
      title: '7. Third-Party Links',
      content: `Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party services you access through our website.`
    },
    {
      title: '8. Children\'s Privacy',
      content: `Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information.`
    },
    {
      title: '9. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on this page with a revised "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.`
    },
    {
      title: '10. Contact Us',
      content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:

• **Email**: contact@elenx.in
• **Phone**: +91 8808290279
• **Website**: https://elenx.in/contact`
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-[#D9DEE5]/30 selection:text-white bg-[#050608]">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
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
              Privacy <span className="text-gradient-metal">Policy</span>
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
              At Elenx ("we," "our," or "us"), we are committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website (https://elenx.in) and use our IT services and digital products.
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

export default PrivacyPolicy;
