require('dotenv').config();
const mongoose = require('mongoose');
const Wish = require('./config/models');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('--- Debugging MongoDB Connection ---');
console.log('URI:', MONGODB_URI ? 'Defined (hidden)' : 'Undefined');

async function testConnection() {
    if (!MONGODB_URI) {
        console.error('ERROR: MONGODB_URI is missing.');
        return;
    }

    try {
        console.log('Attempting to connect...');
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✓ Connected to MongoDB');

        console.log('Attempting to save a test wish...');
        const testWish = new Wish({
            text: 'Debug test wish ' + new Date().toISOString(),
            isPublic: false
        });

        const savedWish = await testWish.save();
        console.log('✓ Wish saved successfully:', savedWish._id);
        
        console.log('Attempting to delete test wish...');
        await Wish.findByIdAndDelete(savedWish._id);
        console.log('✓ Test wish deleted');

    } catch (error) {
        console.error('X Operation Failed:', error);
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.cause) console.error('Cause:', error.cause);
    } finally {
        await mongoose.disconnect();
        console.log('--- Debug Finished ---');
    }
}

testConnection();
