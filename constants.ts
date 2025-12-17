import { Provider, ProductPlan, Transaction } from './types';

export const CURRENCY_SYMBOL = '฿'; // Using THB as a representative SEA currency for this demo

export const PROVIDERS: Provider[] = [
  { id: 'ais', name: 'AIS Mobile', category: 'MOBILE', logo: 'https://picsum.photos/id/1/40/40' },
  { id: 'true', name: 'TrueMove', category: 'MOBILE', logo: 'https://picsum.photos/id/2/40/40' },
  { id: 'dtac', name: 'DTAC', category: 'MOBILE', logo: 'https://picsum.photos/id/3/40/40' },
  { id: 'mea', name: 'Metro Electric', category: 'UTILITY', logo: 'https://picsum.photos/id/4/40/40' },
  { id: 'mwa', name: 'Metro Water', category: 'UTILITY', logo: 'https://picsum.photos/id/5/40/40' },
  { id: 'rov', name: 'Arena of Valor', category: 'GAMING', logo: 'https://picsum.photos/id/6/40/40' },
  { id: 'pubg', name: 'PUBG Mobile', category: 'GAMING', logo: 'https://picsum.photos/id/7/40/40' },
  { id: 'genshin', name: 'Genshin Impact', category: 'GAMING', logo: 'https://picsum.photos/id/8/40/40' },
];

export const PLANS: ProductPlan[] = [
  // Mobile
  { id: 'm1', providerId: 'ais', name: 'Topup 100', amount: 100, price: 100, currency: 'THB', description: 'Standard airtime' },
  { id: 'm2', providerId: 'ais', name: 'Unlimited 5G - 7 Days', amount: 0, price: 199, currency: 'THB', description: 'Max speed data 7 days' },
  { id: 'm3', providerId: 'true', name: 'Topup 50', amount: 50, price: 50, currency: 'THB', description: 'Standard airtime' },
  // Utility
  { id: 'u1', providerId: 'mea', name: 'Custom Amount', amount: 0, price: 0, currency: 'THB', description: 'Pay exact bill amount' },
  // Gaming
  { id: 'g1', providerId: 'rov', name: '35 Coupons', amount: 35, price: 35, currency: 'THB', description: 'Instant delivery' },
  { id: 'g2', providerId: 'rov', name: '750 Coupons', amount: 750, price: 700, currency: 'THB', description: 'Bonus +50' },
  { id: 'g3', providerId: 'pubg', name: '60 UC', amount: 60, price: 35, currency: 'THB', description: 'Starter pack' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-001',
    date: '2023-10-25',
    total: 199,
    status: 'SUCCESS',
    userType: 'CONSUMER',
    items: [{ id: 'cart-1', plan: PLANS[1], accountIdentifier: '0812345678', provider: PROVIDERS[0] }]
  },
  {
    id: 'TXN-002',
    date: '2023-10-26',
    total: 1500,
    status: 'SUCCESS',
    userType: 'BUSINESS',
    items: [
      { id: 'cart-2', plan: PLANS[0], accountIdentifier: '0899999999', provider: PROVIDERS[0] },
      { id: 'cart-3', plan: PLANS[0], accountIdentifier: '0877777777', provider: PROVIDERS[0] }
    ]
  }
];