interface Product {
    id: number;
    name: { en: string; kh: string };
    price: number;
    category: { en: string; kh: string };
    image: string;
}

export type { Product };