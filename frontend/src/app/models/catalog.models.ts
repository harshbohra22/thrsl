export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  robotCount: number;
}

export interface Robot {
  id: string;
  categoryId: string;
  name: string;
  model: string;
  manufacturer: string;
  description: string;
  imageUrl: string;
  partCount: number;
  status: 'active' | 'discontinued' | 'prototype';
}

export interface Part {
  id: string;
  robotId: string;
  name: string;
  partNumber: string;
  category: string;
  description: string;
  price: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  weight: string;
  imageUrl?: string;
}
