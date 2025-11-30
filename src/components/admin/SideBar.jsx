import { LayoutDashboard, Package, ShoppingCart, Users ,LogOut,X,Grid3X3} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";


const SideBar = ({ activeView, setActiveView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
    { name: "Products", icon: Package, view: "products" },
    { name: "Orders", icon: ShoppingCart, view: "orders" },
    { name: "Customers", icon: Users, view: "customers" },
    { name: "Categories", icon: Grid3X3, view: "categories" },
  ];
  const { logout } = useAdmin();

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false); 
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col p-6 bg-white shadow-r-xl h-full border-r border-gray-100">
        <div className="p-4 rounded-xl mb-10 text-xl font-black tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
          ADMIN
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center p-3 rounded-xl font-medium transition duration-200 ${
                activeView === item.view
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg shadow-red-200/50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6">
          <button
            onClick={logout}
            className="w-full flex items-center p-3 rounded-xl font-semibold transition duration-200 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 shadow-md hover:shadow-lg transform hover:scale-105"
            title="Logout"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 flex md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div 
          className={`fixed inset-0 bg-black/50 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className={`relative flex flex-col w-64 h-full bg-white shadow-r-xl border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="p-3 rounded-xl text-lg font-black tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
              ADMIN
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.view)}
                className={`w-full flex items-center p-3 rounded-xl font-medium transition duration-200 ${
                  activeView === item.view
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center p-3 rounded-xl font-semibold transition duration-200 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 shadow-md"
              title="Logout"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar