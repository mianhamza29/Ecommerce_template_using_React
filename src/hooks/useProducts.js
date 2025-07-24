import useSWR from 'swr';
import { productAPI } from '../services/apiService';

// SWR fetcher function
const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
};

// Custom hook for fetching all products
export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'https://fakestoreapi.com/products',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      errorRetryInterval: 5000, // 5 seconds
    }
  );

  return {
    products: data || [],
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for fetching a single product
export const useProduct = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      errorRetryInterval: 5000, // 5 seconds
    }
  );

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for fetching products by category
export const useProductsByCategory = (category) => {
  const { data, error, isLoading, mutate } = useSWR(
    category ? `https://fakestoreapi.com/products/category/${category}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      errorRetryInterval: 5000, // 5 seconds
    }
  );

  return {
    products: data || [],
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for fetching categories
export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'https://fakestoreapi.com/products/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
      errorRetryCount: 3,
      errorRetryInterval: 5000, // 5 seconds
    }
  );

  return {
    categories: data || [],
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for product management (CRUD operations)
export const useProductManagement = () => {
  const createProduct = async (productData) => {
    try {
      const result = await productAPI.createProduct(productData);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const result = await productAPI.updateProduct(id, productData);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await productAPI.deleteProduct(id);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
}; 