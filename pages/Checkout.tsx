import React, { useState } from 'react';
import { CartItem, PaymentMethod, UserType } from '../types';
import { CreditCard, Smartphone, Building, QrCode, Trash2, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  userType: UserType;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, removeFromCart, clearCart, userType }) => {
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.QR_PAY);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.plan.price, 0);
  const tax = subtotal * 0.07; // 7% VAT typical in SEA (Thailand)
  const total = subtotal + tax;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
      clearCart();
    }, 2000);
  };

  if (complete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">Your top-up has been processed successfully. A receipt has been sent to your email.</p>
        
        {userType === 'BUSINESS' && (
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 inline-block mb-8">
                 <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                     <Download className="h-4 w-4" /> Download Tax Invoice (PDF)
                 </button>
             </div>
        )}
        
        <div className="flex justify-center gap-4">
             <Link to="/dashboard" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">View History</Link>
             <Link to="/" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700">Return Home</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-8">Select a service to get started.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Start Recharging
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                 <h2 className="font-semibold text-gray-700">Order Items</h2>
             </div>
             <div className="divide-y divide-gray-200">
                {cart.map(item => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img src={item.provider.logo} alt={item.provider.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.plan.name}</h3>
                                <p className="text-sm text-gray-500">{item.provider.name} • {item.accountIdentifier}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
                            <span className="font-bold text-gray-900">{item.plan.currency}{item.plan.price.toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-700">Payment Method</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { id: PaymentMethod.QR_PAY, icon: QrCode, label: 'QR PromptPay/QRIS', sub: 'Scan to pay instantly' },
                    { id: PaymentMethod.CREDIT_CARD, icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, JCB' },
                    { id: PaymentMethod.E_WALLET, icon: Smartphone, label: 'TrueMoney / GrabPay', sub: 'Connect wallet' },
                    { id: PaymentMethod.BANK_TRANSFER, icon: Building, label: 'Bank Transfer', sub: 'Direct debit' },
                ].map((pm) => (
                    <div 
                        key={pm.id}
                        onClick={() => setMethod(pm.id)}
                        className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-all ${method === pm.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                        <div className={`p-3 rounded-full ${method === pm.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <pm.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{pm.label}</p>
                            <p className="text-xs text-gray-500">{pm.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>฿{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>VAT (7%)</span>
                        <span>฿{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>฿{total.toFixed(2)}</span>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                    {processing ? (
                        <>Processing...</>
                    ) : (
                        <>Pay Now <ShieldCheck className="h-5 w-5"/></>
                    )}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Secure SSL 256-bit Encryption
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};