export interface Product {
  id: number;
  sku: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
