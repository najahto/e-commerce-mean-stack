import { Category } from './category.model';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  price?: number;
  image?: string;
  images: string[] = [];
  brand?: string;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
