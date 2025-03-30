export type Brand = {
  id: number;
  name: string;
  description?: string;
  category: string;
  image?: string;
  slug?: string;
  reason?: string;
  website?: string;
  subBrands?: Brand[];
};
