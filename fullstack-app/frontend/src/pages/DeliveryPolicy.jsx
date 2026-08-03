import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DeliveryPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: '1. Overview',
      content: `This Shipping and Delivery Policy outlines how Elenx delivers its IT services and digital products to customers. As a digital-first IT services company, our products and services are delivered electronically. There are no physical goods requiring traditional shipping.`
    },
    {
      title: '2. Digital Product Delivery',
      content: `All digital products are delivered electronically. Here is how our delivery process works:

• **Instant Delivery**: Upon successful payment confirmation, digital products (software licenses, access credentials, downloadable files) are delivered instantly to your registered email address and/or made available in your user dashboard.
• **Delivery Method**: Products are delivered via secure download links, license keys, or direct dashboard access.
• **Delivery Confirmation**: You will receive an email confirmation with your order details and access instructions immediately after successful payment.
• **Download Availability**: Download links remain active in your dashboard for the duration of your license period.`
    },
    {
      title: '3. IT Service Delivery',
      content: `For custom IT services and development projects:

• **Project Kickoff**: Service delivery begins within 2-5 business days of project agreement and advance payment confirmation.
• **Development Timeline**: Specific timelines are defined in individual service agreements based on project scope and complexity.
• **Milestone Delivery**: Large projects are delivered in phases/milestones with review periods between each phase.
• **Final Delivery**: Completed projects are delivered via secure file transfer, repository access, or deployment to the client's infrastructure.
• **Documentation**: All deliverables include relevant documentation and deployment guides.`
    },
    {
      title: '4. Delivery Timelines',
      content: `Typical delivery timelines for our services:

• **Digital Products (Software/Licenses)**: Instant delivery upon payment confirmation
• **API Access & Integrations**: Within 24 hours of purchase
• **UI/UX Design Projects**: 1-4 weeks depending on scope
• **Web Development Projects**: 2-12 weeks depending on complexity
• **Custom Software Development**: 4-24 weeks depending on scope
• **AI/ML Solutions**: 4-16 weeks depending on requirements
• **Cloud Migration**: 2-8 weeks depending on infrastructure size

Note: These are estimated timelines. Exact delivery dates will be specified in your service agreement.`
    },
    {
      title: '5. Delivery Notifications',
      content: `You will receive notifications at the following stages:

• **Order Confirmation**: Immediately after successful payment
• **Delivery Initiated**: When your product/service delivery begins
• **Delivery Completed**: When your product is ready for access/download
• **Access Instructions**: Detailed instructions on how to access your deliverables

All notifications are sent to the email address registered with your account.`
    },
    {
      title: '6. Delivery Issues',
      content: `If you experience any issues with delivery:

• **Not Received**: If you haven't received your digital product within 1 hour of payment confirmation, please check your spam/junk folder first, then contact us.
• **Access Issues**: If you're unable to access delivered content, contact our support team for immediate assistance.
• **Incorrect Delivery**: If you received incorrect files or access credentials, notify us within 24 hours for prompt resolution.

Our support team is available to resolve delivery issues promptly.`
    },
    {
      title: '7. System Requirements',
      content: `To receive and use our digital products:

• A stable internet connection is required for downloading products and accessing services
• A valid email address is required for delivery notifications and access credentials
• Specific software or system requirements (if any) will be listed on the product page before purchase
• Modern web browser for accessing the user dashboard`
    },
    {
      title: '8. Contact Information',
      content: `For delivery-related inquiries:

• **Email**: contact@elenx.in
• **Phone**: +91-9876-543210
• **Website**: https://elenx.in/contact
• **Support Hours**: Monday - Saturday, 9:00 AM - 7:00 PM IST`
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
              Shipping & <span className="text-gradient-hero">Delivery</span>
            </h1>
            <p className="text-zinc-500">Last Updated: August 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-12 space-y-10"
          >
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-amber-300 text-sm font-medium">
                📦 Elenx is a digital-first IT services company. All products and services are delivered electronically. 
                No physical shipping is involved.
              </p>
            </div>

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

export default DeliveryPolicy;
