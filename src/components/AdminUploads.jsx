import { useState, useEffect } from 'react';
import { Upload, FileCode, Shield, Zap, CheckCircle, AlertCircle, Trash2, Loader2 } from 'lucide-react';

const AdminUploads = () => {
 const [uploading, setUploading] = useState({ internal: false, external: false, bypass: false });
 const [fileStatus, setFileStatus] = useState({ internal: false, external: false, bypass: false });

 useEffect(() => {
 fetchStatus();
 }, []);

 const fetchStatus = async () => {
 try {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/files/status`);
 const data = await response.json();
 setFileStatus(data);
 } catch (error) {
 console.error("Failed to fetch file status");
 }
 };

 const handleUpload = async (type, file) => {
 if (!file) {
 alert("Please select a file first!");
 return;
 }

 setUploading(prev => ({ ...prev, [type]: true }));
 const formData = new FormData();
 formData.append('file', file);

 try {
 const token = localStorage.getItem('admin_token');
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload/${type}`, {
 method: 'POST',
 headers: {
 'Authorization': `Bearer ${token}`
 },
 body: formData
 });

 const data = await response.json();

 if (response.ok) {
 alert(`${type.toUpperCase()} Uploaded Successfully!`);
 fetchStatus();
 } else {
 alert(`Upload Failed: ${data.message || 'Unknown Error'}`);
 }
 } catch (error) {
 console.error("Upload error", error);
 alert("Server Error. Check console for details.");
 } finally {
 setUploading(prev => ({ ...prev, [type]: false }));
 }
 };

 const handleDelete = async (type) => {
 if (!window.confirm(`Are you sure you want to delete the ${type.toUpperCase()} file? Users will not be able to download it.`)) return;

 try {
 const token = localStorage.getItem('admin_token');
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/files/${type}`, {
 method: 'DELETE',
 headers: {
 'Authorization': `Bearer ${token}`
 }
 });

 const data = await response.json();

 if (response.ok) {
 alert(`${type.toUpperCase()} Deleted Successfully!`);
 fetchStatus();
 } else {
 alert(`Delete Failed: ${data.message}`);
 }
 } catch (error) {
 console.error("Delete error", error);
 alert("Server Error during delete.");
 }
 };

 const UploadCard = ({ title, type, icon: Icon, color }) => {
 const [selectedFile, setSelectedFile] = useState(null);
 const isActive = fileStatus[type];

 return (
 <div className={`relative overflow-hidden glass-panel bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group`}>
 <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
 <Icon size={100} />
 </div>

 <div className="flex justify-between items-start mb-4">
 <h3 className="text-xl font-bold text-white flex items-center gap-2">
 <Icon className={color} /> {title}
 </h3>
 <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 border ${isActive ? 'bg-[#D9DEE5]/20 text-green-300 border-[#AEB6C2]/30' : 'bg-red-500/20 text-red-300 border-red-500/50'}`}>
 {isActive ? <><CheckCircle size={12} /> Active</> : <><AlertCircle size={12} /> Empty</>}
 </div>
 </div>

 <div className="space-y-4">
 <div className="relative border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/10 transition-colors bg-black/20">
 <input
 type="file"
 onChange={(e) => setSelectedFile(e.target.files[0])}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 accept=".exe"
 />
 <div className="flex flex-col items-center gap-2">
 <Upload className="text-zinc-300" />
 <span className="text-sm text-zinc-200 truncate max-w-[200px]">
 {selectedFile ? selectedFile.name : "Drag & Drop or Click"}
 </span>
 </div>
 </div>

 <div className="flex gap-2">
 <button
 onClick={() => handleUpload(type, selectedFile)}
 disabled={uploading[type]}
 className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2
 ${uploading[type]
 ? 'bg-zinc-700 cursor-not-allowed'
 : 'bg-gradient-to-r from-[#AEB6C2] to-[#AEB6C2] hover:from-[#D9DEE5] hover:to-[#D9DEE5]'}`}
 >
 {uploading[type] ? <Loader2 className="animate-spin" size={20} /> : "Upload Build"}
 </button>

 {isActive && (
 <button
 onClick={() => handleDelete(type)}
 className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/50 rounded-lg transition-all"
 title="Delete Build"
 >
 <Trash2 size={20} />
 </button>
 )}
 </div>
 </div>
 </div>
 );
 };

 return (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <UploadCard
 title="INTERNAL EXE"
 type="internal"
 icon={Shield}
 color="text-[#AEB6C2]"
 />
 <UploadCard
 title="EXTERNAL EXE"
 type="external"
 icon={FileCode}
 color="text-[#AEB6C2]"
 />
 <UploadCard
 title="BYPASS EMULATOR"
 type="bypass"
 icon={Zap}
 color="text-yellow-400"
 />
 </div>
 );
};

export default AdminUploads;
