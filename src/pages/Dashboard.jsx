import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
 const [user, setUser] = useState({});

 useEffect(() => {
 const fetchProfile = async () => {
 try {
 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
 headers: { Authorization: `Bearer ${localStorage.getItem('client_token')}` },
 });
 setUser(res.data);
 } catch (err) {
 alert('Failed to fetch profile');
 }
 };
 fetchProfile();
 }, []);

 const handleDownload = () => {
 window.open(`${import.meta.env.VITE_API_URL}/api/download/exe`, '_blank');
 };

 const handleLogout = () => {
 localStorage.removeItem('client_token');
 localStorage.removeItem('role');
 window.location.href = '/login';
 };

 return (
 <div className="min-h-screen bg-zinc-800 p-6">
 <h1 className="text-3xl mb-6">User Dashboard</h1>
 <div className="bg-[#1e293b] p-6 rounded shadow-md">
 <p><strong>Username:</strong> {user.username}</p>
 <p><strong>Email:</strong> {user.email}</p>
 <p><strong>License Status:</strong> {user.license_status}</p>
 <p>{user.license_status === 'PENDING' ? 'Waiting for admin approval' : user.license_status === 'ACTIVE' ? 'License active' : 'License blocked'}</p>
 <button onClick={handleDownload} className="mt-4 bg-[#D9DEE5] text-white p-2 mr-4">Download EXE</button>
 <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2">Logout</button>
 </div>
 </div>
 );
};

export default Dashboard;
