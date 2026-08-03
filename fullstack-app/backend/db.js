const mongoose = require('mongoose');

/**
 * Masks a MongoDB URI for safe logging.
 * Shows protocol, first 3 chars of username, host, and database — hides password entirely.
 */
function maskMongoURI(uri) {
    try {
        const match = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@(.+)$/);
        if (!match) return '[invalid URI format]';
        const [, protocol, user, , rest] = match;
        const maskedUser = user.length > 3 ? user.substring(0, 3) + '***' : '***';
        return `${protocol}${maskedUser}:****@${rest}`;
    } catch {
        return '[could not parse URI]';
    }
}

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log('MongoDB already connected (global).');
            return;
        }
        const uri = process.env.MONGO_URI;

        if (uri) {
            console.log('Attempting to connect to primary MongoDB...');
            console.log(`🔗 URI (masked): ${maskMongoURI(uri)}`);
            try {
                const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
                console.log(`✅ MongoDB Connected successfully!`);
                console.log(`   Host: ${conn.connection.host}`);
                console.log(`   Database: ${conn.connection.name}`);

                mongoose.connection.on('error', err => {
                    console.error('❌ MongoDB runtime error:', err);
                });
                return;
            } catch (primaryErr) {
                console.warn('⚠️ Primary MongoDB connection failed:', primaryErr.message);
                console.warn('🔄 Falling back to local In-Memory MongoDB Server...');
            }
        }

        // Fallback to In-Memory MongoDB
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        console.log(`🚀 In-Memory MongoDB Server started at: ${mongoUri}`);

        await mongoose.connect(mongoUri);
        console.log('✅ Connected to In-Memory MongoDB Server successfully!');

        // Auto-seed initial data if needed
        await autoSeedDatabase();

    } catch (error) {
        console.error('❌ Fatal Error starting MongoDB server:', error.message);
        process.exit(1);
    }
};

async function autoSeedDatabase() {
    try {
        const Admin = require('./models/Admin');
        const Product = require('./models/Product');
        const bcrypt = require('bcryptjs');

        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('Hell@77', 10);
            await Admin.create({ username: 'abhiraj258090@gmail.com', password: hashedPassword });
            console.log('🌱 In-memory database seeded with default Admin (abhiraj258090@gmail.com)');
        }

        const productCount = await Product.countDocuments();
        if (productCount === 0) {
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
            await Product.insertMany(products);
            console.log('🌱 In-memory database seeded with 8 default Products.');
        }
    } catch (err) {
        console.error('Error auto-seeding database:', err);
    }
}

module.exports = connectDB;
