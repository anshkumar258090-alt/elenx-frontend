const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
// Adjust path if running from root or backend folder. 
// Assuming running from backend folder:
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const username = 'abhiraj258090@gmail.com';
        const password = 'Hell@77';
        const hashedPassword = await bcrypt.hash(password, 10);


        // Check if admin exists
        let admin = await Admin.findOne({ username });

        if (admin) {
            admin.password = hashedPassword;
            await admin.save();
            console.log('Admin user found. Password updated to:', password);
        } else {
            admin = new Admin({ username, password: hashedPassword });
            await admin.save();
            console.log('Admin user created with username:', username);
        }

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
