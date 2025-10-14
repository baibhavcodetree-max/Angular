export interface ProductImage {
  Id: number;
  ImageUrl: string;
  isPrimary: boolean;
}

export interface Product {

    // ProductId: number;
    // name: string;
    // description: string;
    // price: number;
    // IsAvailable: boolean;
    // CategoryId: number;
    // Category?: {Name:string};
    // ProductImage?: ProductImage[]; 

  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  
}