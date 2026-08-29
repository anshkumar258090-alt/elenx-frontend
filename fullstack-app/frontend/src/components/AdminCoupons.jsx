import { useState, useEffect } from 'react';
import { 
  Tag, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Percent, 
  Calendar, 
  Users, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Loader2
} from 'lucide-react';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: 20,
    discountType: 'PERCENTAGE',
    maxUses: '',
    expiresAt: '',
    description: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/coupons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setCoupons(data);
      } else {
        showToast(data.message || 'Failed to load coupons', 'error');
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      showToast('Network error loading coupons', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Helper to generate random promo code
  const handleGenerateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const generated = `ELNX-${rand}`;
    setFormData(prev => ({ ...prev, code: generated }));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code '${code}' copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      showToast('Please enter or generate a coupon code', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('admin_token');
      const payload = {
        code: formData.code.trim().toUpperCase(),
        discountPercentage: Number(formData.discountPercentage),
        discountType: formData.discountType,
        maxUses: formData.maxUses ? Number(formData.maxUses) : null,
        expiresAt: formData.expiresAt || null,
        description: formData.description.trim() || `Universal ${formData.discountPercentage}% discount`
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        showToast(`Coupon ${payload.code} created successfully!`, 'success');
        setFormData({
          code: '',
          discountPercentage: 20,
          discountType: 'PERCENTAGE',
          maxUses: '',
          expiresAt: '',
          description: ''
        });
        fetchCoupons();
      } else {
        showToast(data.message || 'Failed to create coupon', 'error');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      showToast('Network error creating coupon', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (coupon) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/coupons/${coupon._id}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) {
        showToast(`Coupon ${coupon.code} is now ${!coupon.isActive ? 'Active' : 'Inactive'}`, 'success');
        fetchCoupons();
      } else {
        showToast(data.message || 'Failed to toggle coupon status', 'error');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      showToast('Error updating coupon', 'error');
    }
  };

  const handleDeleteCoupon = async (coupon) => {
    if (!window.confirm(`Permanently delete discount code '${coupon.code}'?`)) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/coupons/${coupon._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) {
        showToast(`Coupon '${coupon.code}' deleted`, 'success');
        fetchCoupons();
      } else {
        showToast(data.message || 'Failed to delete coupon', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Error deleting coupon', 'error');
    }
  };

  const activeCount = coupons.filter(c => c.isActive).length;
  const totalUses = coupons.reduce((acc, c) => acc + (c.usedCount || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Total Coupons</p>
            <h3 className="text-2xl font-black text-white mt-1 font-space-grotesk">{coupons.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Tag size={22} />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Active Codes</p>
            <h3 className="text-2xl font-black text-amber-400 mt-1 font-space-grotesk">{activeCount}</h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <CheckCircle size={22} />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Total Times Used</p>
            <h3 className="text-2xl font-black text-white mt-1 font-space-grotesk">{totalUses}</h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* Generator Form */}
      <div className="glass-panel border border-white/10 rounded-2xl bg-[#0f0f13]/80 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-space-grotesk">Discount Code Generator</h3>
            <p className="text-xs text-zinc-400">Create universal promotional codes valid on all product purchases.</p>
          </div>
        </div>

        <form onSubmit={handleCreateCoupon} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Code Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Discount Code <span className="text-amber-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SUMMER50"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 font-mono font-bold uppercase transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateRandomCode}
                  className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Generate Random Code"
                >
                  <Sparkles size={14} /> Auto
                </button>
              </div>
            </div>

            {/* Discount Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Discount Percentage <span className="text-amber-400">*</span>
                </label>
                <span className="text-xs font-black text-amber-400 font-mono">{formData.discountPercentage}% OFF</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="5"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="flex-1 accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="w-16 bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-center text-white font-mono font-bold focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                {/* Preset quick buttons */}
                <div className="flex gap-1.5">
                  {[10, 20, 30, 50, 75].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setFormData({ ...formData, discountPercentage: pct })}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all border ${
                        formData.discountPercentage === pct
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Max Usage Limit */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Usage Limit (Optional)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Leave blank for unlimited"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={13} /> Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
              />
            </div>

            {/* Description / Note */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Description / Campaign Note
              </label>
              <input
                type="text"
                placeholder="e.g. Special weekend promotion discount"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 className="animate-spin" size={16} /> Creating...</>
              ) : (
                <><Plus size={16} /> Create Discount Code</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Coupons List */}
      <div className="glass-panel border border-white/10 rounded-2xl bg-[#0f0f13]/80 overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Discount Registry</h3>
          </div>
          <button
            onClick={fetchCoupons}
            className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Refresh List"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-zinc-500 flex items-center justify-center gap-3">
            <Loader2 className="animate-spin text-amber-400" size={20} />
            <span>Loading discount codes...</span>
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <Tag size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No discount codes created yet. Use the generator above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="p-4 pl-6">Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Usage</th>
                  <th className="p-4">Expiry</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {coupons.map((c) => {
                  const isExpired = c.expiresAt && new Date(c.expiresAt) < new Date();
                  const isMaxedOut = c.maxUses !== null && c.usedCount >= c.maxUses;

                  return (
                    <tr key={c._id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      {/* Code + Copy */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg tracking-wider text-xs">
                            {c.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(c.code)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
                            title="Copy Promo Code"
                          >
                            {copiedCode === c.code ? <Check size={14} className="text-amber-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                        {c.description && (
                          <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] truncate">{c.description}</p>
                        )}
                      </td>

                      {/* Discount Amount */}
                      <td className="p-4">
                        <span className="text-sm font-black text-white font-space-grotesk">
                          {c.discountPercentage}% OFF
                        </span>
                        <span className="block text-[10px] text-zinc-500">All Products</span>
                      </td>

                      {/* Usage */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-white text-xs">{c.usedCount}</span>
                          <span className="text-xs text-zinc-500">
                            / {c.maxUses === null ? '∞' : c.maxUses} used
                          </span>
                        </div>
                        {isMaxedOut && (
                          <span className="text-[9px] font-bold uppercase text-red-400">Limit Reached</span>
                        )}
                      </td>

                      {/* Expiry */}
                      <td className="p-4">
                        {c.expiresAt ? (
                          <div>
                            <span className={`text-xs font-medium ${isExpired ? 'text-red-400 line-through' : 'text-zinc-300'}`}>
                              {new Date(c.expiresAt).toLocaleDateString()}
                            </span>
                            {isExpired && (
                              <span className="block text-[9px] font-bold uppercase text-red-400">Expired</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-500 font-medium">Never Expires</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(c)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
                            c.isActive && !isExpired && !isMaxedOut
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                              : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${c.isActive && !isExpired && !isMaxedOut ? 'bg-amber-400' : 'bg-red-400'}`} />
                          {c.isActive && !isExpired && !isMaxedOut ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDeleteCoupon(c)}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete Discount Code"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 z-[200] p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300
          ${toast.type === 'success'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <div className="rounded-full p-1 bg-black/20">
            {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          </div>
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
