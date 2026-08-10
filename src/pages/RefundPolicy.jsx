import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: '1. Overview',
      content: `This Refund and Cancellation Policy outlines the terms and conditions under which Elenx processes refunds and handles cancellations for our IT services and digital products. We are committed to ensuring customer satisfaction and transparency in all our transactions.`
    },
    {
      title: '2. Digital Products',
      content: `For digital products and software licenses:

• **Before Delivery**: You may cancel your order and receive a full refund if the product has not yet been delivered or the download link has not been accessed.
• **After Delivery**: Due to the nature of digital products, refunds are generally not provided once the product has been delivered and the download link has been accessed. However, we consider refund requests on a case-by-case basis.
• **Defective Products**: If a digital product is defective, non-functional, or significantly differs from its description, you are entitled to a full refund within 7 days of purchase.`
    },
    {
      title: '3. IT Services & Custom Projects',
      content: `For custom software development and IT service projects:

• **Before Project Commencement**: Full refund of any advance payment if cancellation is requested before work begins.
• **During Development**: Refund is proportional to the work not yet completed. Work already delivered and approved will be billed accordingly.
• **After Completion**: No refund for completed and delivered work that meets the specifications agreed upon in the service agreement.
• **Milestone-Based Projects**: Refunds are processed based on incomplete milestones. Completed milestones are non-refundable.`
    },
    {
      title: '4. Subscription Services',
      content: `For subscription-based services:

• You may cancel your subscription at any time.
• Cancellation will take effect at the end of the current billing period.
• No prorated refunds are provided for the remaining period of the current billing cycle.
• Annual subscriptions may be eligible for a prorated refund within the first 30 days, minus any usage charges.`
    },
    {
      title: '5. Refund Process',
      content: `To request a refund:

1. **Submit a Request**: Contact us at contact@elenx.in with your order details and reason for the refund.
2. **Review**: Our team will review your request within 3-5 business days.
3. **Resolution**: We will notify you of the outcome via email.
4. **Processing**: Approved refunds are processed within 7-10 business days.
5. **Payment Method**: Refunds are credited back to the original payment method used for the purchase.

**Required Information for Refund Requests**:
• Order ID / Transaction ID
• Date of purchase
• Reason for refund
• Supporting evidence (if applicable, e.g., screenshots of defects)`
    },
    {
      title: '6. Non-Refundable Items',
      content: `The following are non-refundable:

• Setup fees and installation charges once the service has been configured
• Domain registration fees
• Third-party software licenses purchased on your behalf
• Customized services that have been delivered per specification
• Rush or expedited service surcharges
• Services already consumed or utilized`
    },
    {
      title: '7. Cancellation Policy',
      content: `• Orders can be cancelled before the service delivery begins.
• For ongoing projects, a written cancellation notice is required.
• Cancellation fees may apply depending on the stage of the project and resources already allocated.
• We reserve the right to cancel orders if we detect fraudulent activity or violation of our terms.`
    },
    {
      title: '8. Disputes',
      content: `If you are not satisfied with our refund decision:

• You may escalate the matter by emailing contact@elenx.in with "Refund Escalation" in the subject line.
• Our senior management will review the case within 7 business days.
• We aim to reach a fair resolution for both parties.`
    },
    {
      title: '9. Contact Information',
      content: `For refund and cancellation inquiries:

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
              Refund & <span className="text-gradient-metal">Cancellation</span>
            </h1>
            <p className="text-zinc-500">Last Updated: August 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-12 space-y-10"
          >
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

export default RefundPolicy;
