const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Connection Error:', err);
        process.exit(1);
    }
};

const dropIndex = async () => {
    await connectDB();

    try {
        const collection = mongoose.connection.collection('users');
        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        const emailIndex = indexes.find(idx => idx.name === 'email_1');
        if (emailIndex) {
            await collection.dropIndex('email_1');
            console.log('Successfully dropped "email_1" index.');
        } else {
            console.log('"email_1" index not found. Might already be dropped.');
        }

    } catch (err) {
        console.error('Error dropping index:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
        process.exit(0);
    }
};

dropIndex();
