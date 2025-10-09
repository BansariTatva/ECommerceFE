export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products'); //API endpoint
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
