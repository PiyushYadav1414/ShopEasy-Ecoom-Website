export interface Product {
    _id: string;
    name: string;
    shortDescription: string; // Add shortDescription
    description: string;
    price: number;
    discount: number; // Add discount
    images: string[];
    categoryId: string;
    brandId: string;
    isFeatured:Boolean,
    isNewProduct: Boolean
  }
  