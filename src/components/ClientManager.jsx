import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Users, Edit, Trash2, Shield, FileCode, Zap, Eye, EyeOff, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientManager = () => {
 const [clients, setClients] = useState([]);
 const [newClient, setNewClient] = useState({ username: '', password: '', accessType: 'internal' });
 const [editingUser, setEditingUser] = useState(null);
 const [showPassword, setShowPassword] = useState({});

 useEffect(() => {
 fetchClients();
 }, []);

 const fetchClients = async () => {
 try {
 const token = localStorage.getItem('client_token');
 const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
 headers: { Authorization: token }
 });
 setClients(response.data);
 } catch (error) {
 console.error("Error fetching clients:", error);
 }
 };

 const handleCreateClient = async (e) => {
 e.preventDefault();
 try {
 const token = localStorage.getItem('client_token');
 await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/create-user`, newClient, {
 headers: { Authorization: token }
 });
 alert('User Created Successfully');
 setNewClient({ username: '', password: '', accessType: 'internal' });
 fetchClients();
 } catch (error) {
 console.error("Error creating client:", error);
 alert("Failed to create user");
 }
 };

 const handleDeleteUser = async (id) => {
 if (!window.confirm("Are you sure you want to delete this user?")) return;
 try {
 const token = localStorage.getItem('client_token');
 await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
 headers: { Authorization: token }
 });
 fetchClients();
 } catch (error) {
 console.error("Delete failed:", error);
 alert("Failed to delete user");
 }
 };

 const handleUpdateUser = async (e) => {
 e.preventDefault();
 try {
 const token = localStorage.getItem('client_token');
 await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update-user/${editingUser._id}`, {
 username: editingUser.username,
 password: editingUser.password, // Only send if changed/non-empty logic handled in backend or here
 accessType: editingUser.accessType
 }, {
 headers: { Authorization: token }
 });
 alert("User Updated Successfully");
 setEditingUser(null);
 fetchClients();
 } catch (error) {
 console.error("Update failed:", error);
 alert("Failed to update user");
 }
 };

 const togglePasswordVisibility = (id) => {
 setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
 };

 const getAccessBadge = (type) => {
 switch (type) {
 case 'internal': return <span className="px-2 py-1 bg-[#D9DEE5]/20 text-[#AEB6C2] text-xs font-bold rounded uppercase flex items-center gap-1"><Shield size={12} /> Internal</span>;
 case 'external': return <span className="px-2 py-1 bg-[#D9DEE5]/20 text-[#AEB6C2] text-xs font-bold rounded uppercase flex items-center gap-1"><FileCode size={12} /> External</span>;
 case 'bypass': return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded uppercase flex items-center gap-1"><Zap size={12} /> Bypass</span>;
 default: return <span className="px-2 py-1 bg-zinc-500/20 text-zinc-500 text-xs font-bold rounded uppercase">Unknown</span>;
 }
 };

 return (
 <div className="space-y-8">
 {/* Create New User Section */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-8 rounded-[2rem] border border-white/5 shadow-2xl bg-[#1e293b]/60 backdrop-blur-md"
 >
 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
 <UserPlus className="text-[#AEB6C2]" /> Create New User
 </h3>
 <form onSubmit={handleCreateClient} className="space-y-4">
 <div>
 <label className="block text-zinc-500 text-sm mb-2">Select Product Access</label>
 <div className="grid grid-cols-3 gap-4">
 {['internal', 'external', 'bypass'].map((type) => (
 <button
 key={type}
 type="button"
 onClick={() => setNewClient({ ...newClient, accessType: type })}
 className={`py-3 px-4 rounded-xl border transition-all text-sm font-bold uppercase ${newClient.accessType === type
 ? 'bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] border-[#AEB6C2] text-white shadow-lg shadow-[#AEB6C2]/30'
 : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'
 }`}
 >
 {type} Client
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <input
 type="text"
 placeholder="Username"
 value={newClient.username}
 onChange={(e) => setNewClient({ ...newClient, username: e.target.value })}
 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] text-white placeholder-gray-500 transition-all"
 required
 />
 <input
 type="text"
 placeholder="Password"
 value={newClient.password}
 onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] text-white placeholder-gray-500 transition-all"
 required
 />
 </div>
 <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#AEB6C2] to-[#D9DEE5] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#AEB6C2]/30 transition-all">
 Generate User
 </button>
 </form>
 </motion.div>

 {/* Manage User Pass Section */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="glass-panel p-8 rounded-[2rem] border border-white/5 shadow-2xl bg-[#1e293b]/60 backdrop-blur-md"
 >
 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
 <Users className="text-[#AEB6C2]" /> Manage User Pass
 </h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b border-white/10 text-zinc-500 text-sm uppercase tracking-wider">
 <th className="pb-4 pl-4">Username</th>
 <th className="pb-4">Access Type</th>
 <th className="pb-4">Password</th>
 <th className="pb-4 text-right pr-4">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {clients.map((client) => client.role !== 'admin' && (
 <tr key={client._id} className="group hover:bg-white/5 transition-colors">
 <td className="py-4 pl-4 font-medium text-white">{client.username}</td>
 <td className="py-4">{getAccessBadge(client.accessType)}</td>
 <td className="py-4 text-zinc-500 font-mono text-sm">
 {/* Since passwords are hashed, displaying them is tricky. Usually "Reset" is better.
 Assuming backend returns hashed, showing '***' is safe.
 If user meant "Show Password" for *newly created* locally, or just a place to set it.
 I will render '********' by default as we likely can't see the real password.
 But the request asked for "Password (Hidden with ***, optional 'Show' eye icon)".
 Realistically only possible if we stored plain text (bad) or if this just means "Edit Password".
 I will treat it as a placeholder for visual completeness.
 */}
 ********
 </td>
 <td className="py-4 text-right pr-4">
 <div className="flex items-center justify-end gap-2">
 <button
 onClick={() => setEditingUser({ ...client, password: '' })} // Clear password for edit
 className="p-2 bg-[#D9DEE5]/10 text-[#AEB6C2] rounded-lg hover:bg-[#F5F7FA]/20 transition-all"
 title="Edit User"
 >
 <Edit size={16} />
 </button>
 <button
 onClick={() => handleDeleteUser(client._id)}
 className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
 title="Delete User"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </td>
 </tr>
 ))}
 {clients.filter(c => c.role !== 'admin').length === 0 && (
 <tr>
 <td colSpan="4" className="py-8 text-center text-zinc-400 italic">No users found. Create one above.</td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </motion.div>

 {/* Edit User Modal */}
 <AnimatePresence>
 {editingUser && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
 >
 <motion.div
 initial={{ scale: 0.9, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.9, opacity: 0 }}
 className="bg-[#050608] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
 >
 <button
 onClick={() => setEditingUser(null)}
 className="absolute top-4 right-4 text-zinc-500 hover:text-white"
 >
 <X size={20} />
 </button>
 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
 <Edit className="text-[#AEB6C2]" /> Edit User
 </h3>
 <form onSubmit={handleUpdateUser} className="space-y-4">
 <div>
 <label className="block text-zinc-500 text-sm mb-2">Access Type</label>
 <select
 value={editingUser.accessType || 'internal'}
 onChange={(e) => setEditingUser({ ...editingUser, accessType: e.target.value })}
 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] text-white"
 >
 <option value="internal">Internal Client</option>
 <option value="external">External Client</option>
 <option value="bypass">Bypass Emulator</option>
 </select>
 </div>
 <div>
 <label className="block text-zinc-500 text-sm mb-2">Username</label>
 <input
 type="text"
 value={editingUser.username}
 onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] text-white"
 />
 </div>
 <div>
 <label className="block text-zinc-500 text-sm mb-2">New Password (leave blank to keep current)</label>
 <input
 type="text"
 value={editingUser.password}
 onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
 placeholder="Enter new password"
 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] text-white"
 />
 </div>
 <div className="pt-4 flex gap-3">
 <button
 type="button"
 onClick={() => setEditingUser(null)}
 className="flex-1 py-3 bg-white/5 text-zinc-300 font-bold rounded-xl hover:bg-white/10 transition-all"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="flex-1 py-3 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] font-bold rounded-xl hover:bg-[#F5F7FA] transition-all flex items-center justify-center gap-2"
 >
 <Save size={18} /> Save Changes
 </button>
 </div>
 </form>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};

export default ClientManager;
