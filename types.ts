export type UserType = 'CONSUMER' | 'BUSINESS';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  balance: number;
}

export type ServiceCategory = 'MOBILE' | 'UTILITY' | 'GAMING';

export interface Provider {
  id: string;
  name: string;
  logo: string; // URL
  category: ServiceCategory;
}

export interface ProductPlan {
  id: string;
  providerId: string;
  name: string;
  amount: number;
  price: number;
  currency: string;
  description: string;
}

export interface CartItem {
  id: string;
  plan: ProductPlan;
  accountIdentifier: string; // Phone number, Meter ID, or Game ID
  provider: Provider;
}

export interface Transaction {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  userType: UserType;
}

export enum PaymentMethod {
  CREDIT_CARD = 'Credit Card',
  E_WALLET = 'E-Wallet',
  BANK_TRANSFER = 'Bank Transfer',
  QR_PAY = 'QR PromptPay/QRIS'
}