import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SupportBot } from './components/SupportBot';
import { Dashboard } from './pages/Dashboard';
import { RechargeFlow } from './pages/RechargeFlow';
import { Checkout } from './pages/Checkout';
import { CartItem, UserType } from './types';
import { Smartphone, Zap, Gamepad2, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
             {/* Hero Section */}
             <div className="bg-blue-600 text-white pt-20 pb-32 rounded-b-[3rem] shadow-xl px-4">
                 <div className="max-w-4xl mx-auto text-center">
                     <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Recharge Your World.</h1>
                     <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
                         The easiest way to top up mobile data, pay utilities, and buy game credits in Southeast Asia.
                     </p>
                 </div>
             </div>
             
             {/* Service Selection Cards */}
             <div className="max-w-6xl mx-auto px-4 -mt-24 pb-20">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <LinkCard to="/mobile" icon={Smartphone} title="Mobile Top-up" desc="Data packages & airtime for AIS, True, DTAC" color="blue" />
                     <LinkCard to="/utilities" icon={Zap} title="Utilities" desc="Pay your electricity (MEA/PEA) and water bills" color="yellow" />
                     <LinkCard to="/gaming" icon={Gamepad2} title="Game Credits" desc="Instant vouchers for RoV, PUBG, Genshin Impact" color="purple" />
                 </div>
             </div>

             <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Why choose SeaCharge?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Feature title="Instant Delivery" desc="Credits are added to your account in seconds." />
                    <Feature title="Secure Payments" desc="PCI-DSS compliant handling of cards and banking data." />
                    <Feature title="24/7 Support" desc="Our AI and human team are always here to help." />
                </div>
             </div>
        </div>
    )
}

const LinkCard = ({ to, icon: Icon, title, desc, color }: any) => {
    const colorClasses: any = {
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    };

    return (
        <a href={`#${to}`} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group border border-gray-100">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colorClasses[color]}`}>
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-6">{desc}</p>
            <div className="flex items-center text-sm font-bold uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: `var(--text-${color}-600)`}}>
                Start Now <ArrowRight className="h-4 w-4 ml-1" />
            </div>
        </a>
    )
}

const Feature = ({ title, desc }: any) => (
    <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{desc}</p>
    </div>
)

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Simple toggle for demo purposes
  const [userType, setUserType] = useState<UserType>('CONSUMER'); 

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar cartCount={cart.length} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<div className="p-10 text-center"><h1 className="text-2xl font-bold">Business Portal</h1><p>Switching context...</p>{/* In real app, this would switch context */}</div>} />
          
          <Route path="/mobile" element={<RechargeFlow category="MOBILE" addToCart={addToCart} />} />
          <Route path="/utilities" element={<RechargeFlow category="UTILITY" addToCart={addToCart} />} />
          <Route path="/gaming" element={<RechargeFlow category="GAMING" addToCart={addToCart} />} />
          
          <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} userType={userType} />} />
          <Route path="/dashboard" element={<Dashboard isAdmin={false} />} />
          <Route path="/admin" element={<Dashboard isAdmin={true} />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <SupportBot />

        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-white font-bold mb-4">SeaCharge</h4>
                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;