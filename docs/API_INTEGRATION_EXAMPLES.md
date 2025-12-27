# 📖 API Integration Examples

## Overview
This guide shows how to integrate the MongoDB API into your pages.

---

## 1. Writing Page (✅ ALREADY DONE)

The writing page already integrates the API:

```javascript
// In writing.html script tag
wishAPI.createWish(text, false)
  .then(response => {
    // Save wish ID for next page
    sessionStorage.setItem('currentWish', JSON.stringify(response.data));
    // Navigate to visibility
    goTo('visibility');
  })
  .catch(error => console.error('Error:', error));
```

---

## 2. Visibility Page (TODO)

Update the wish to be public/private:

```javascript
// visibility.html
async function toggleVisibility(isPublic) {
  const currentWish = JSON.parse(sessionStorage.getItem('currentWish'));
  
  try {
    const response = await wishAPI.updateWish(
      currentWish.id,
      currentWish.text,
      isPublic
    );
    
    if (response.success) {
      console.log('Wish updated:', response.data);
      // Navigate to wall or confirmation
      goTo('confirmation');
    }
  } catch (error) {
    console.error('Failed to update wish:', error);
  }
}

// Use in your button clicks:
document.getElementById('publicBtn').addEventListener('click', () => {
  toggleVisibility(true);
});

document.getElementById('privateBtn').addEventListener('click', () => {
  toggleVisibility(false);
});
```

---

## 3. Wall Page (TODO)

Display all public wishes:

```javascript
// wall.html
async function loadPublicWishes() {
  try {
    const response = await wishAPI.getWishes(true, 50, 0);
    
    if (response.success) {
      const container = document.getElementById('wishes-container');
      container.innerHTML = ''; // Clear existing
      
      response.data.forEach(wish => {
        const wishEl = document.createElement('div');
        wishEl.className = 'wish-card';
        wishEl.innerHTML = `
          <p class="wish-text">${escapeHtml(wish.text)}</p>
          <div class="wish-meta">
            <span class="wish-date">${formatDate(wish.createdAt)}</span>
            <span class="wish-likes">❤️ ${wish.likes}</span>
          </div>
        `;
        container.appendChild(wishEl);
      });
      
      // Show pagination info
      console.log(`Showing ${response.data.length} of ${response.pagination.total}`);
    }
  } catch (error) {
    console.error('Failed to load wishes:', error);
  }
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadPublicWishes);

// Helper functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
```

---

## 4. Index/Home Page (TODO)

Show statistics:

```javascript
// index.html
async function showStatistics() {
  try {
    const response = await wishAPI.getStats();
    
    if (response.success) {
      const { total, public: publicCount, private: privateCount } = response.data;
      
      document.getElementById('totalWishes').textContent = total;
      document.getElementById('publicWishes').textContent = publicCount;
      document.getElementById('sharedWishes').textContent = `${Math.round((publicCount/total)*100)}%`;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Load on page load
document.addEventListener('DOMContentLoaded', showStatistics);
```

**HTML to display stats**:
```html
<div class="stats-container">
  <div class="stat">
    <span class="stat-number" id="totalWishes">0</span>
    <span class="stat-label">Total Wishes</span>
  </div>
  <div class="stat">
    <span class="stat-number" id="publicWishes">0</span>
    <span class="stat-label">Shared Wishes</span>
  </div>
  <div class="stat">
    <span class="stat-number" id="sharedWishes">0%</span>
    <span class="stat-label">Shared Rate</span>
  </div>
</div>
```

---

## 5. Confirmation Page (TODO)

Show newly created wish:

```javascript
// confirmation.html
async function showConfirmation() {
  const currentWish = JSON.parse(sessionStorage.getItem('currentWish'));
  
  if (!currentWish) {
    // No wish data, redirect to writing
    goTo('writing');
    return;
  }
  
  try {
    // Fetch fresh data from database
    const response = await wishAPI.getWish(currentWish.id);
    
    if (response.success) {
      const wish = response.data;
      document.getElementById('wishText').textContent = wish.text;
      document.getElementById('wishStatus').textContent = 
        wish.isPublic ? '🌍 Shared with the world' : '🔒 Kept private';
      document.getElementById('wishDate').textContent = 
        `Created: ${formatDate(wish.createdAt)}`;
    }
  } catch (error) {
    console.error('Failed to load wish:', error);
  }
}

document.addEventListener('DOMContentLoaded', showConfirmation);
```

---

## 6. Advanced: Search and Filter (TODO)

Implement wish search:

```javascript
async function searchWishes(searchTerm) {
  try {
    const response = await wishAPI.getWishes(true); // Get all public
    
    // Filter on client-side (or implement server-side search)
    const filtered = response.data.filter(wish =>
      wish.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log(`Found ${filtered.length} wishes matching "${searchTerm}"`);
    
    // Display filtered wishes
    displayWishes(filtered);
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// Use with search input
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchWishes(e.target.value);
});
```

---

## 7. Error Handling Pattern

Use this pattern for all API calls:

```javascript
async function apiCall(apiFunction, onSuccess, onError) {
  try {
    // Show loading indicator
    showLoading(true);
    
    const response = await apiFunction();
    
    if (response.success) {
      onSuccess(response.data);
    } else {
      throw new Error(response.message || 'Operation failed');
    }
  } catch (error) {
    console.error('Error:', error);
    
    // Show user-friendly error
    showError(error.message || 'Something went wrong. Please try again.');
    
    if (onError) onError(error);
  } finally {
    showLoading(false);
  }
}

// Usage:
apiCall(
  () => wishAPI.getWishes(true),
  (wishes) => displayWishes(wishes),
  (error) => console.error(error)
);
```

---

## 8. Loading and Error States

UI patterns for handling API states:

```javascript
function showLoading(show) {
  const loader = document.getElementById('loader');
  if (show) {
    loader.style.display = 'flex';
  } else {
    loader.style.display = 'none';
  }
}

function showError(message) {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorEl.style.display = 'none';
  }, 5000);
}

function showSuccess(message) {
  const successEl = document.getElementById('success-message');
  successEl.textContent = message;
  successEl.style.display = 'block';
  
  setTimeout(() => {
    successEl.style.display = 'none';
  }, 3000);
}
```

---

## 9. Pagination Example

Handle large datasets:

```javascript
class WishWall {
  constructor() {
    this.currentPage = 0;
    this.pageSize = 20;
    this.totalWishes = 0;
  }
  
  async loadPage(pageNumber) {
    try {
      const skip = pageNumber * this.pageSize;
      const response = await wishAPI.getWishes(
        true,
        this.pageSize,
        skip
      );
      
      if (response.success) {
        this.totalWishes = response.pagination.total;
        this.currentPage = pageNumber;
        
        displayWishes(response.data);
        updatePagination(
          this.currentPage,
          Math.ceil(this.totalWishes / this.pageSize)
        );
      }
    } catch (error) {
      console.error('Failed to load page:', error);
    }
  }
  
  nextPage() {
    this.loadPage(this.currentPage + 1);
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }
}

// Usage:
const wall = new WishWall();
wall.loadPage(0); // Load first page
```

---

## 10. Data Validation Before Sending

Validate client-side before API calls:

```javascript
function validateWish(text) {
  const errors = [];
  
  if (!text || text.trim().length === 0) {
    errors.push('Wish cannot be empty');
  }
  
  if (text.length > 200) {
    errors.push('Wish cannot exceed 200 characters');
  }
  
  // Check for inappropriate content (basic check)
  const bannedWords = ['badword1', 'badword2'];
  if (bannedWords.some(word => text.toLowerCase().includes(word))) {
    errors.push('Wish contains inappropriate content');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Usage:
const validation = validateWish(userInput);
if (!validation.valid) {
  showError(validation.errors.join(', '));
  return;
}

// Proceed with API call
await wishAPI.createWish(userInput, false);
```

---

## Summary: API Methods Available

```javascript
// Create
wishAPI.createWish(text, isPublic, userId)

// Read
wishAPI.getWishes(isPublic, limit, skip)
wishAPI.getWish(id)

// Update
wishAPI.updateWish(id, text, isPublic)

// Delete
wishAPI.deleteWish(id)

// Statistics
wishAPI.getStats()

// Health
wishAPI.healthCheck()
```

---

## Next Steps

1. ✅ Writing page integration (DONE)
2. ⬜ Update visibility page
3. ⬜ Create wall page with public wishes
4. ⬜ Add statistics to home page
5. ⬜ Create confirmation page
6. ⬜ Add search functionality
7. ⬜ Implement user authentication

All examples above are ready to copy and use!
