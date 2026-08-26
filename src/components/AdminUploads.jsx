import { useState, useEffect } from 'react';
import { Link2, Shield, FileCode, Zap, Cpu, Monitor, Radio, Lock, CheckCircle, AlertCircle, Loader2, Trash2, Save, ExternalLink } from 'lucide-react';

const AdminUploads = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Icon mapping based on product name keywords
  const getProductIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('internal') && n.includes('pro')) return Lock;
    if (n.includes('internal')) return Shield;
    if (n.includes('external') && n.includes('premium')) return Cpu;
    if (n.includes('external')) return FileCode;
    if (n.includes('bios')) return Monitor;
    if (n.includes('streamer') && n.includes('pro')) return Radio;
    if (n.includes('streamer')) return Radio;
    if (n.includes('bypass')) return Zap;
    return FileCode;
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.map(p => ({ ...p, _editUrl: p.download_url || '' })));
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUrlChange = (productId, value) => {
    setProducts(prev => prev.map(p =>
      p.productId === productId ? { ...p, _editUrl: value } : p
    ));
  };

  const handleSaveLink = async (product) => {
    setSavingId(product.productId);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product/${product.productId}/download-link`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ download_url: product._editUrl })
      });

      const data = await response.json();
      if (response.ok) {
        showToast(`${product.name} — Link saved successfully!`, 'success');
        fetchProducts();
      } else {
        showToast(`Failed: ${data.message}`, 'error');
      }
    } catch (error) {
      console.error('Save link error', error);
      showToast('Server error. Check console.', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleRemoveLink = async (product) => {
    if (!window.confirm(`Remove download link for ${product.name}? Users won't be able to download.`)) return;
    setSavingId(product.productId);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product/${product.productId}/download-link`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ download_url: '' })
      });

      if (response.ok) {
        showToast(`${product.name} — Link removed`, 'success');
        fetchProducts();
      }
    } catch (error) {
      console.error('Remove link error', error);
      showToast('Server error.', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const ProductLinkCard = ({ product }) => {
    const Icon = getProductIcon(product.name);
    const hasLink = !!product.download_url;
    const isSaving = savingId === product.productId;
    const isEdited = product._editUrl !== (product.download_url || '');

    return (
      <div className={`relative overflow-hidden glass-panel backdrop-blur-md border p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
        hasLink
          ? 'bg-white/[0.04] border-amber-500/20 hover:border-amber-500/40'
          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
      }`}>
        {/* Background watermark icon */}
        <div className="absolute -top-2 -right-2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <Icon size={100} />
        </div>

        {/* Header Row */}
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${hasLink ? 'bg-amber-500/15' : 'bg-white/5'}`}>
              <Icon size={20} className={hasLink ? 'text-amber-400' : 'text-zinc-500'} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">{product.name}</h3>
              <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                {product.compatibility} • {product.version}
              </p>
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border ${
            hasLink
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {hasLink ? <><CheckCircle size={10} /> Active</> : <><AlertCircle size={10} /> No Link</>}
          </div>
        </div>

        {/* Current Link Preview */}
        {hasLink && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center gap-2">
            <ExternalLink size={12} className="text-amber-400 flex-shrink-0" />
            <a href={product.download_url} target="_blank" rel="noopener noreferrer"
              className="text-xs text-amber-300/80 truncate hover:text-amber-200 transition-colors font-mono">
              {product.download_url}
            </a>
          </div>
        )}

        {/* URL Input */}
        <div className="space-y-3 relative z-10">
          <div className="relative">
            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="url"
              placeholder="Paste download link (Google Drive, Mega, etc.)"
              value={product._editUrl}
              onChange={(e) => handleUrlChange(product.productId, e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 transition-colors font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSaveLink(product)}
              disabled={isSaving || (!product._editUrl && !hasLink)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isSaving
                  ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  : isEdited && product._editUrl
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
              }`}
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <Save size={14} />
                  {isEdited ? 'Save Link' : 'Update Link'}
                </>
              )}
            </button>

            {hasLink && (
              <button
                onClick={() => handleRemoveLink(product)}
                disabled={isSaving}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all"
                title="Remove Download Link"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-amber-400" size={32} />
        <span className="ml-3 text-zinc-400 font-medium">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map(product => (
          <ProductLinkCard key={product.productId} product={product} />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="py-20 text-center">
          <p className="text-zinc-500">No products found in the database. Run the seed script first.</p>
        </div>
      )}

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

export default AdminUploads;

