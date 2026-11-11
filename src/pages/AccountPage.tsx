import { useSearchParams } from 'react-router-dom';
import { formatPrice } from '../utils/pricing';
import { User, ShoppingBag, CreditCard, Heart, LogOut, Settings, Bell } from 'lucide-react';

const ACCOUNT_TABS = ['profile', 'orders', 'wishlist', 'payment', 'notifications', 'settings'];

const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // The active tab lives in the URL (?tab=orders) so header links can deep-link to it
  const tabParam = searchParams.get('tab') ?? '';
  const activeTab = ACCOUNT_TABS.includes(tabParam) ? tabParam : 'profile';
  const setActiveTab = (tab: string) => {
    setSearchParams(tab === 'profile' ? {} : { tab }, { replace: true });
  };
  
  // Mock data for demonstration
  const mockOrders = [
    { id: '5721', date: '2023-09-15', status: 'Delivered', total: 64999 },
    { id: '5632', date: '2023-08-22', status: 'Shipped', total: 37999 },
    { id: '5498', date: '2023-07-10', status: 'Delivered', total: 86999 },
  ];
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <User className={`h-5 w-5 mr-3 ${activeTab === 'profile' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Profile
              </button>
              
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className={`h-5 w-5 mr-3 ${activeTab === 'orders' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Orders
              </button>
              
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'wishlist' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 mr-3 ${activeTab === 'wishlist' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Wishlist
              </button>
              
              <button 
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'payment' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <CreditCard className={`h-5 w-5 mr-3 ${activeTab === 'payment' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Payment Methods
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Bell className={`h-5 w-5 mr-3 ${activeTab === 'notifications' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Notifications
              </button>
              
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Settings className={`h-5 w-5 mr-3 ${activeTab === 'settings' ? 'text-yellow-500' : 'text-gray-500'}`} />
                Settings
              </button>
              
              <button 
                className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <h3 className="font-bold mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div></div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {/* Orders tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                
                {mockOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">When you place your first order, it will appear here.</p>
                    <button className="btn btn-primary">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-left">
                        <tr>
                          <th className="py-3 px-4 font-medium">Order #</th>
                          <th className="py-3 px-4 font-medium">Date</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Total</th>
                          <th className="py-3 px-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="py-4 px-4">
                              #{order.id}
                            </td>
                            <td className="py-4 px-4">
                              {formatDate(order.date)}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium">
                              {formatPrice(order.total)}
                            </td>
                            <td className="py-4 px-4">
                              <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {activeTab !== 'profile' && activeTab !== 'orders' && (
              <div className="text-center py-12">
                <h2 className="text-xl font-bold mb-4">
                  {activeTab === 'payment' ? 'Payment Methods' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-gray-600 mb-6">
                  This section is under construction. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;