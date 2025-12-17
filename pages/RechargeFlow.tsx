import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROVIDERS, PLANS } from '../constants';
import { Smartphone, Gamepad2, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { CartItem, ProductPlan, Provider, ServiceCategory } from '../types';

interface RechargeFlowProps {
  category: ServiceCategory;
  addToCart: (item: CartItem) => void;
}

export const RechargeFlow: React.FC<RechargeFlowProps> = ({ category, addToCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [accountIdentifier, setAccountIdentifier] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<ProductPlan | null>(null);

  const filteredProviders = PROVIDERS.filter(p => p.category === category);
  const filteredPlans = selectedProvider ? PLANS.filter(p => p.providerId === selectedProvider.id) : [];

  const handleAddToCart = () => {
    if (selectedPlan && selectedProvider && accountIdentifier) {
      addToCart({
        id: Math.random().toString(36).substr(2, 9),
        plan: selectedPlan,
        provider: selectedProvider,
        accountIdentifier
      });
      navigate('/checkout');
    }
  };

  const getLabel = () => {
    switch(category) {
        case 'MOBILE': return 'Phone Number';
        case 'UTILITY': return 'Meter / Customer ID';
        case 'GAMING': return 'User ID / Server ID';
        default: return 'Identifier';
    }
  }

  const getPlaceholder = () => {
      switch(category) {
          case 'MOBILE': return '08x-xxx-xxxx';
          case 'UTILITY': return 'e.g. 123456789';
          case 'GAMING': return '12345678 (1234)';
          default: return '';
      }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Stepper */}
      <div className="flex justify-center items-center mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > s ? <Check className="h-6 w-6"/> : s}
            </div>
            {s < 3 && <div className={`w-20 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[400px]">
        {/* Step 1: Select Provider */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Provider</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProviders.map(provider => (
                <button
                  key={provider.id}
                  onClick={() => { setSelectedProvider(provider); setStep(2); }}
                  className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <img src={provider.logo} alt={provider.name} className="w-16 h-16 rounded-full mb-4 object-cover group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-700">{provider.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Input Details */}
        {step === 2 && selectedProvider && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Enter Details</h2>
            <p className="text-gray-500 mb-8">For {selectedProvider.name}</p>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">{getLabel()}</label>
              <input
                type="text"
                value={accountIdentifier}
                onChange={(e) => setAccountIdentifier(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              />
              <div className="mt-8 flex gap-4">
                 <button onClick={() => setStep(1)} className="flex-1 py-3 px-6 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                     Back
                 </button>
                 <button
                    onClick={() => accountIdentifier && setStep(3)}
                    disabled={!accountIdentifier}
                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                     Next <ArrowRight className="h-5 w-5" />
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Plan */}
        {step === 3 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredPlans.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all relative ${selectedPlan?.id === plan.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold text-blue-600">{plan.currency}{plan.price}</span>
                  </div>
                  {selectedPlan?.id === plan.id && (
                      <div className="absolute top-4 right-4 text-blue-600">
                          <Check className="h-6 w-6" />
                      </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
                <button onClick={() => setStep(2)} className="py-3 px-6 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                     Back
                 </button>
                <button
                    onClick={handleAddToCart}
                    disabled={!selectedPlan}
                    className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg disabled:opacity-50 transition-colors"
                >
                    Proceed to Payment
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};