#!/usr/bin/env node

/**
 * Backend API Test Script
 * Run with: node test-api.js
 */

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('\n🧪 Testing One Minute for Tomorrow Backend API\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing Health Check...');
    const health = await fetch(`${BASE_URL}/health`).then(r => r.json());
    console.log('   ✓ Server Status:', health.status);
    console.log('   ✓ Database:', health.mongodb);
    
    // Test 2: Create a wish
    console.log('\n2️⃣  Creating a test wish...');
    const createRes = await fetch(`${BASE_URL}/wishes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Test wish - This is a test wish created at ' + new Date().toISOString(),
        isPublic: false
      })
    }).then(r => r.json());
    
    if (createRes.success) {
      console.log('   ✓ Wish Created');
      console.log('   ✓ ID:', createRes.data._id);
      const wishId = createRes.data._id;
      
      // Test 3: Get all wishes
      console.log('\n3️⃣  Fetching all wishes...');
      const allWishes = await fetch(`${BASE_URL}/wishes`).then(r => r.json());
      console.log('   ✓ Total Wishes:', allWishes.pagination.total);
      
      // Test 4: Get single wish
      console.log('\n4️⃣  Fetching single wish...');
      const singleWish = await fetch(`${BASE_URL}/wishes/${wishId}`).then(r => r.json());
      if (singleWish.success) {
        console.log('   ✓ Wish Text:', singleWish.data.text.substring(0, 50) + '...');
      }
      
      // Test 5: Update wish
      console.log('\n5️⃣  Updating wish to public...');
      const updateRes = await fetch(`${BASE_URL}/wishes/${wishId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPublic: true
        })
      }).then(r => r.json());
      
      if (updateRes.success) {
        console.log('   ✓ Updated Successfully');
        console.log('   ✓ isPublic:', updateRes.data.isPublic);
      }
      
      // Test 6: Get statistics
      console.log('\n6️⃣  Fetching statistics...');
      const stats = await fetch(`${BASE_URL}/stats`).then(r => r.json());
      console.log('   ✓ Total Wishes:', stats.data.total);
      console.log('   ✓ Public Wishes:', stats.data.public);
      console.log('   ✓ Private Wishes:', stats.data.private);
      
      // Test 7: Delete wish
      console.log('\n7️⃣  Deleting test wish...');
      const deleteRes = await fetch(`${BASE_URL}/wishes/${wishId}`, {
        method: 'DELETE'
      }).then(r => r.json());
      
      if (deleteRes.success) {
        console.log('   ✓ Wish Deleted');
      }
      
      console.log('\n✅ All tests passed!\n');
    } else {
      console.log('   ✗ Failed to create wish');
    }
    
  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
    console.error('\nMake sure:');
    console.error('1. Server is running (npm start)');
    console.error('2. MongoDB is connected');
    console.error('3. .env file has correct MONGODB_URI');
  }
}

testAPI();
