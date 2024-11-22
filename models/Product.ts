import { BaseContent } from './BaseContent';

export interface Product extends BaseContent {
name: string;
description: string;
price: number;
category: string;
stock: number;
}
