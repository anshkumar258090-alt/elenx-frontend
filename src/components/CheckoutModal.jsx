import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Check, Shield, AlertCircle, Loader2, Sparkles, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, product, selectedPlanIndex = 2, currency = 'INR' }) => {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [phone, setPhone] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const plan = product?.pricing?.[selectedPlanIndex] || product?.pricing?.[0] || { id: '1month', label: '1 Month', inr: 499, usd: 6 };
  const subtotal = currency === 'INR' ? plan.inr : Math.round((plan.usd || 1) * 85);

  // Reset state when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCouponInput('');
      setAppliedCoupon(null);
      setCouponError('');
      setPayError('');
      setIsPaying(false);
    }
  }, [isOpen, product, selectedPlanIndex]);

  if (!isOpen || !product) return null;

  // Calculate discount and final amount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    } else {
      discountAmount = Math.min(appliedCoupon.discountAmount || 0, subtotal);
    }
  }
  const finalTotal = Math.max(1, subtotal - discountAmount);

  const handleApplyCoupon = async (e) => {
    e?.preventDefault();
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setValidatingCoupon(true);
    setCouponError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/coupon/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponInput.trim().toUpperCase(),
          amount: subtotal
        })
      });

      const data = await response.json();
      if (response.ok && data.valid) {
        setAppliedCoupon(data);
        setCouponError('');
      } else {
        setAppliedCoupon(null);
        setCouponError(data.message || 'Invalid or expired coupon code.');
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setCouponError('Network error validating coupon. Please try again.');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('client_token');
    if (!token || token === 'null' || token === 'undefined') {
      // Save pending state and send to login
      sessionStorage.setItem('pending_checkout_item', JSON.stringify({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        isPremium: product.isPremium,
        selectedPlanIndex,
        currency,
        pricing: product.pricing,
        couponCode: appliedCoupon?.code || null
      }));
      navigate('/login');
      return;
    }

    setIsPaying(true);
    setPayError('');

    try {
      const payload = {
        items: [
          {
            product: { id: product.id },
            duration: { id: plan.id }
          }
        ],
        phone: phone.trim() || '9999999999',
        couponCode: appliedCoupon ? appliedCoupon.code : undefined
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payu/generate-hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initiation failed.');
      }

      const { actionUrl, params } = data;

      // Create and submit hidden form to PayU gateway
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = actionUrl;

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value !== undefined && value !== null ? value.toString() : '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error('Payment Error:', err);
      setPayError(err.message || 'An error occurred while connecting to payment gateway.');
      setIsPaying(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-inter">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#0f0f13] border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-space-grotesk">Secure Checkout</h3>
                <p className="text-xs text-zinc-400">Complete your tactical license activation</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            
            {/* Product Summary Card */}
            <div className="p-4 rounded-2xl bg-[#1e293b]/40 border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-space-grotesk">{product.name}</h4>
                  {product.isPremium && (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ★ Premium
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Plan: <strong className="text-zinc-200">{plan.label}</strong> • {product.compatibility || 'Windows 10/11'}
                </p>
              </div>
              <span className="text-xl font-black text-white font-space-grotesk">
                ₹{subtotal}
              </span>
            </div>

            {/* Promo / Discount Code Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag size={13} className="text-amber-400" /> Have a Discount Code?
              </label>

              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. SUMMER50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 font-mono font-bold uppercase transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validatingCoupon || !couponInput.trim()}
                    className="px-5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {validatingCoupon ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                    Apply
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Check size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 font-mono">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[11px] text-amber-400/80 ml-2 font-medium">
                        ({appliedCoupon.discountPercentage}% Discount Applied)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="p-1 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs"
                    title="Remove Code"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium animate-in fade-in duration-200">
                  <AlertCircle size={12} /> {couponError}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({plan.label})</span>
                <span className="font-mono text-zinc-300 font-medium">₹{subtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-amber-400 font-semibold animate-in fade-in">
                  <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Final Total</span>
                <div className="text-right">
                  {appliedCoupon && (
                    <span className="text-xs text-zinc-500 line-through mr-2 font-mono">
                      ₹{subtotal}
                    </span>
                  )}
                  <span className="text-2xl font-black text-white font-space-grotesk">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>
            </div>

            {payError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={14} /> {payError}
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={isPaying}
              className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-black rounded-2xl uppercase tracking-wider text-xs shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPaying ? (
                <><Loader2 className="animate-spin" size={16} /> Redirecting to PayU...</>
              ) : (
                <><Lock size={14} /> Pay ₹{finalTotal} via PayU</>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-semibold">
              <Shield size={12} className="text-amber-400" /> 256-Bit SSL Encrypted • Instant License Delivery
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
