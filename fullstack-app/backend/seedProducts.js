const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    productId: 1,
    name: 'EXTERNAL BASIC',
    slug: 'external-basic',
    description: 'Essential external tactical advantage with location and stream protection.',
    isPremium: false,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/external.exe',
    file_size: '12.4 MB',
    version: 'v1.1.2',
    features: ['Aimbot Head', 'Aimbot Drag', 'Sniper Scope', 'Sniper Switch', 'Location', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 250 },
      { id: '1month', label: '1 Month', usd: 6, inr: 499 },
      { id: '1year', label: '1 Year', usd: 20, inr: 1900 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 2800 }
    ]
  },
  {
    productId: 2,
    name: 'EXTERNAL PREMIUM',
    slug: 'external-premium',
    description: 'Advanced external suite with full esp vision, speed, and hardware resets.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/external_premium.exe',
    file_size: '14.8 MB',
    version: 'v2.4.1',
    features: ['Aimbot Head', 'Aimbot Drag', 'Aimbot AI', 'Sniper Scope', 'Sniper Switch', 'Location', 'Wall Hack', 'Speed Hack', 'Camera Hack', 'Vision Hack', 'Guest Reset', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 300 },
      { id: '1month', label: '1 Month', usd: 8, inr: 749 },
      { id: '1year', label: '1 Year', usd: 25, inr: 2300 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 3000 }
    ]
  },
  {
    productId: 3,
    name: 'INTERNAL BASIC',
    slug: 'internal-basic',
    description: 'Core internal hooks for pure performance, direct bones mapping, and boxes.',
    isPremium: false,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/internal.exe',
    file_size: '18.2 MB',
    version: 'v1.2.0',
    features: ['Aimbot Head', 'Aimbot Body', 'Aimbot Speed', 'Visible Check', 'ESP Bone', 'ESP Box', 'ESP Line', 'ESP Name', 'Guest Reset', 'Bypass Hook', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 180 },
      { id: '1week', label: '1 Week', usd: 5, inr: 400 },
      { id: '1month', label: '1 Month', usd: 10, inr: 899 },
      { id: '1year', label: '1 Year', usd: 30, inr: 2800 },
      { id: 'lifetime', label: 'Lifetime', usd: 45, inr: 4000 }
    ]
  },
  {
    productId: 4,
    name: 'INTERNAL PRO',
    slug: 'internal-pro',
    description: 'Full domination suite with silent aim, custom overlays, and high performance overlays.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/internal_pro.exe',
    file_size: '22.1 MB',
    version: 'v3.1.0',
    features: ['Aimbot Head', 'Aimbot Body', 'Silent Aim', 'FOV Custom', 'Visible Check', 'Wall ESP', 'Bones ESP', 'Bounding Box', 'Crosshair Visual', 'Custom Theme', 'OBS Stream Proof', 'No Blacklist', 'Anti-Ban Active', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 3, inr: 250 },
      { id: '1week', label: '1 Week', usd: 7, inr: 600 },
      { id: '1month', label: '1 Month', usd: 12, inr: 1099 },
      { id: '1year', label: '1 Year', usd: 40, inr: 3600 },
      { id: 'lifetime', label: 'Lifetime', usd: 55, inr: 5000 }
    ]
  },
  {
    productId: 5,
    name: 'BIOS STREAMER',
    slug: 'bios-streamer',
    description: 'Hardware level bios streamer utility with deep kernel HWID spoofing controls.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All BIOS Types)',
    file_path: '/uploads/bios_streamer.exe',
    file_size: '8.6 MB',
    version: 'v1.0.5',
    features: ['BIOS Flasher', 'HWID Spoof', 'Mac Changer', 'Registry Cleaner', 'Kernel Hide', 'Safe Load', 'Instant Process', 'Anti-Leak Protect'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 5, inr: 400 },
      { id: '1week', label: '1 Week', usd: 10, inr: 850 },
      { id: '1month', label: '1 Month', usd: 20, inr: 1799 },
      { id: '1year', label: '1 Year', usd: 60, inr: 5200 },
      { id: 'lifetime', label: 'Lifetime', usd: 85, inr: 7500 }
    ]
  },
  {
    productId: 6,
    name: 'STREAMER BASIC',
    slug: 'streamer-basic',
    description: 'Lag-free stream protection protocols with dynamic video controller hooking.',
    isPremium: false,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/streamer.exe',
    file_size: '9.3 MB',
    version: 'v1.3.1',
    features: ['Stream Protect', 'No Frame Drop', 'OBS Hook', 'Discord Hook', 'Dynamic Control', 'Lag Free', 'Hotkeys Active'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 180 },
      { id: '1week', label: '1 Week', usd: 5, inr: 400 },
      { id: '1month', label: '1 Month', usd: 10, inr: 899 },
      { id: '1year', label: '1 Year', usd: 30, inr: 2800 },
      { id: 'lifetime', label: 'Lifetime', usd: 45, inr: 4000 }
    ]
  },
  {
    productId: 7,
    name: 'STREAMER PRO',
    slug: 'streamer-pro',
    description: 'Ultra-premium stream bypassing for heavy software overlays and recording suites.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All Versions)',
    file_path: '/uploads/streamer_pro.exe',
    file_size: '11.5 MB',
    version: 'v2.0.2',
    features: ['Direct OBS Bypass', 'Discord Stream Hide', 'Kernel Overlay Masking', 'HW Acceleration', 'Lag-Free Protect', 'Custom Overlay Stream', 'Bypass Twitch Hook'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 3, inr: 250 },
      { id: '1week', label: '1 Week', usd: 7, inr: 600 },
      { id: '1month', label: '1 Month', usd: 12, inr: 1099 },
      { id: '1year', label: '1 Year', usd: 40, inr: 3600 },
      { id: 'lifetime', label: 'Lifetime', usd: 55, inr: 5000 }
    ]
  },
  {
    productId: 8,
    name: 'BYPASS SUPREME',
    slug: 'bypass-supreme',
    description: 'Universal bypass emulator logic with signatures anti-ban protection overlays.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All Anti-Cheats)',
    file_path: '/uploads/bypass.exe',
    file_size: '6.7 MB',
    version: 'v1.0.1',
    features: ['Universal Bypass', 'Emulator Signature Hide', 'Anti-Ban Shields', 'Memory Encryption', 'Virtual Machine Detect', 'Log Cleaner', 'Silent Injection', 'Safe Active'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 170 },
      { id: '1week', label: '1 Week', usd: 4, inr: 350 },
      { id: '1month', label: '1 Month', usd: 7, inr: 650 },
      { id: '1year', label: '1 Year', usd: 22, inr: 1999 },
      { id: 'lifetime', label: 'Lifetime', usd: 32, inr: 2900 }
    ]
  }
];

const seedProducts = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected.');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Products cleared.');

    console.log('Seeding products...');
    await Product.insertMany(products);
    console.log('Successfully seeded 8 professional products!');

    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
