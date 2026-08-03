import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsConditions = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the Elenx website (https://elenx.in) and our IT services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.

These terms apply to all visitors, users, and clients who access or use our services.`
    },
    {
      title: '2. Services',
      content: `Elenx provides IT services and digital products including, but not limited to:

• Custom Software Development
• Web Application Development
• AI & Machine Learning Solutions
• Cloud Infrastructure Solutions
• API Development & Integration
• UI/UX Design Services
• Business Automation Solutions
• Digital Product Development

The specific scope, deliverables, timeline, and pricing for each project will be defined in individual service agreements or proposals.`
    },
    {
      title: '3. User Accounts',
      content: `To access certain features of our platform, you may be required to create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information
• Maintain the security of your password and account
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use of your account

We reserve the right to suspend or terminate accounts that violate these terms.`
    },
    {
      title: '4. Payment Terms',
      content: `• All prices are listed in Indian Rupees (INR) and/or US Dollars (USD) as applicable
• Payments are processed securely through our authorized payment gateway (PayU)
• Full payment is required before the delivery of digital products
• For project-based services, payment milestones will be defined in the service agreement
• All applicable taxes (including GST) will be added to the quoted price
• We do not store your complete payment card details on our servers
• Failed transactions may require re-initiation of payment`
    },
    {
      title: '5. Intellectual Property',
      content: `• All content on the Elenx website, including text, graphics, logos, designs, and software, is the property of Elenx and is protected by intellectual property laws
• Upon full payment, clients receive a license to use the deliverables as specified in their service agreement
• Unless explicitly stated otherwise, source code and underlying technologies developed by Elenx remain our intellectual property
• Clients retain ownership of their pre-existing content and data
• You may not reproduce, distribute, modify, or create derivative works from our website content without written permission`
    },
    {
      title: '6. Use Restrictions',
      content: `You agree not to:

• Use our services for any unlawful purpose or in violation of any regulations
• Attempt to gain unauthorized access to our systems or other users' accounts
• Interfere with or disrupt the operation of our services
• Transmit viruses, malware, or any harmful code
• Scrape, data mine, or use automated tools to extract data from our website
• Impersonate any person or entity or misrepresent your affiliation
• Use our services to develop competing products or services
• Reverse engineer, decompile, or disassemble any aspect of our services`
    },
    {
      title: '7. Service Level & Delivery',
      content: `• Digital products are delivered instantly upon successful payment confirmation
• Custom development projects follow timelines agreed upon in the service agreement
• We strive to meet all delivery deadlines but are not liable for delays caused by factors outside our control (force majeure)
• Project modifications requested after scope finalization may affect delivery timelines and costs
• We provide reasonable support for delivered products as specified in the service agreement`
    },
    {
      title: '8. Limitation of Liability',
      content: `To the maximum extent permitted by applicable law:

• Elenx shall not be liable for any indirect, incidental, special, consequential, or punitive damages
• Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim
• We are not liable for any loss of data, profits, or business opportunities
• We do not warrant that our services will be uninterrupted, error-free, or completely secure
• We are not responsible for third-party services or content linked from our website`
    },
    {
      title: '9. Warranties and Disclaimers',
      content: `• Our services are provided "as is" and "as available" without warranties of any kind, either express or implied
• We do not warrant that our services will meet your specific requirements
• We disclaim all implied warranties, including merchantability, fitness for a particular purpose, and non-infringement
• Any advice or information obtained through our services does not create any warranty not expressly stated in these terms`
    },
    {
      title: '10. Indemnification',
      content: `You agree to indemnify and hold harmless Elenx, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from:

• Your use or misuse of our services
• Your violation of these terms
• Your violation of any rights of a third party
• Any content you provide or upload to our platform`
    },
    {
      title: '11. Termination',
      content: `• We may terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these terms or is harmful to other users or our business
• Upon termination, your right to use our services ceases immediately
• All provisions that should survive termination shall survive, including ownership, warranty disclaimers, indemnification, and limitations of liability`
    },
    {
      title: '12. Governing Law',
      content: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.`
    },
    {
      title: '13. Changes to Terms',
      content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the revised terms. We recommend reviewing these terms periodically.`
    },
    {
      title: '14. Contact Information',
      content: `For questions about these Terms and Conditions, please contact us:

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
              Terms & <span className="text-gradient-hero">Conditions</span>
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
              Welcome to Elenx. These Terms and Conditions govern your use of our website and IT services. 
              Please read these terms carefully before using our services.
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

export default TermsConditions;
