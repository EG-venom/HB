import axios from 'axios';

// API base URL - change this to match your backend server URL
const API_URL = 'http://localhost:5000/api';

// Create an axios instance with base settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AUTH SERVICES
export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login a user
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout a user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

// CONTENT SERVICES
export const contentService = {
  // Get all content with filtering options
  getContents: async (params?: any) => {
    try {
      const response = await api.get('/content', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get trending content
  getTrending: async () => {
    try {
      const response = await api.get('/content/trending');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get content by ID
  getContent: async (id: string) => {
    try {
      const response = await api.get(`/content/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get content by category
  getContentByCategory: async (categoryId: string) => {
    try {
      const response = await api.get(`/content/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// USER SERVICES
export const userService = {
  // Get user's My List
  getMyList: async () => {
    try {
      const response = await api.get('/user/my-list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add content to My List
  addToMyList: async (contentId: string) => {
    try {
      const response = await api.post(`/user/my-list/${contentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove content from My List
  removeFromMyList: async (contentId: string) => {
    try {
      const response = await api.delete(`/user/my-list/${contentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get watch history
  getWatchHistory: async () => {
    try {
      const response = await api.get('/user/watch-history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update watch history
  updateWatchHistory: async (contentId: string, progress: number) => {
    try {
      const response = await api.post(`/user/watch-history/${contentId}`, {
        progress
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (name: string, email: string) => {
    try {
      const response = await api.put('/user/profile', {
        name,
        email
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await api.put('/user/update-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  authService,
  contentService,
  userService
};
