// API Service for frontend communication with backend
class WishAPI {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  /**
   * Make API requests
   */
  async request(endpoint, method = 'GET', data = null) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `API Error: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Get all wishes with optional filtering
   */
  async getWishes(isPublic = undefined, limit = 50, skip = 0) {
    const params = new URLSearchParams();
    if (isPublic !== undefined) params.append('isPublic', isPublic);
    params.append('limit', limit);
    params.append('skip', skip);

    const queryString = params.toString();
    const endpoint = `/wishes${queryString ? '?' + queryString : ''}`;
    
    return this.request(endpoint);
  }

  /**
   * Get a single wish by ID
   */
  async getWish(id) {
    return this.request(`/wishes/${id}`);
  }

  /**
   * Create a new wish
   */
  async createWish(text, isPublic = false, userId = null) {
    return this.request('/wishes', 'POST', {
      text,
      isPublic,
      userId
    });
  }

  /**
   * Update a wish
   */
  async updateWish(id, text, isPublic) {
    return this.request(`/wishes/${id}`, 'PUT', {
      text,
      isPublic
    });
  }

  /**
   * Delete a wish
   */
  async deleteWish(id) {
    return this.request(`/wishes/${id}`, 'DELETE');
  }

  /**
   * Get statistics
   */
  async getStats() {
    return this.request('/stats');
  }

  /**
   * Check API health
   */
  async healthCheck() {
    return this.request('/health');
  }
}

// Create global instance
const wishAPI = new WishAPI();
