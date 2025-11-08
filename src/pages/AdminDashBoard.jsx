import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, X, PlusCircle, Trash2, Edit2, CheckCircle, Save, AlertTriangle, Image, UploadCloud } from 'lucide-react';


// --- Mock Data (Updated to use 'images' array) ---
const initialProducts = [
  {
    id: 1,
    name: 'Condenser Microphone',
    price: 80000,
    originalPrice: 95000,
    discount: 16,
    images: [
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=870&auto=format&fit=crop', // Main image
        'https://images.unsplash.com/photo-1588694084365-1d02c6114b3a?q=80&w=870&auto=format&fit=crop', // Secondary image
    ],
    description: 'Studio-grade condenser microphone for clear audio recording.',
    category: 'Audio Equipment',
    brand: 'Audio-Technica',
    stock: 15,
    status: 'Active',
    isFlashDeal: true,
    flashDealEnd: '2025-10-12T18:00:00',
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    price: 34999,
    originalPrice: 42000,
    discount: 17,
    images: [
        'https://images.unsplash.com/photo-1546868846-9907f152174c?q=80&w=870&auto=format&fit=crop',
    ],
    description: 'Advanced smart watch with health monitoring features.',
    category: 'Wearables',
    brand: 'TechGear',
    stock: 75,
    status: 'Active',
    isFlashDeal: false,
    flashDealEnd: '',
  },
];

const initialOrders = [
  { id: 'ORD001', customer: 'Alice Johnson', amount: 59.99, date: '2025-09-01', status: 'Pending' },
  { id: 'ORD002', customer: 'Bob Smith', amount: 150.00, date: '2025-08-30', status: 'Approved' },
  { id: 'ORD003', customer: 'Charlie Brown', amount: 399.00, date: '2025-08-29', status: 'Pending' },
];

// --- Sub-Components ---

// Generic Modal for Confirmation
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all scale-100">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex space-x-4 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:opacity-90"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 1. Sidebar Navigation (No change)
const SideBar = ({ activeView, setActiveView }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'Products', icon: Package, view: 'products' },
    { name: 'Orders', icon: ShoppingCart, view: 'orders' },
    { name: 'Customers', icon: Users, view: 'customers' },
  ];

  return (
    <div className="w-64 flex flex-col p-6 bg-white shadow-xl h-full border-r border-gray-100">
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
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg shadow-red-200/50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

// 2. Product Management View (Updated for image array)
const ProductList = ({ products, handleDelete, startEdit, setActiveView }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800">Product Inventory</h2>
      <button
        onClick={() => setActiveView('productForm')}
        className="flex items-center px-6 py-3 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Post New Product
      </button>
    </div>

    {/* Product Table */}
    <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Brand', 'Price/Discount', 'Stock', 'Status', 'Deal', 'Actions'].map(header => (
              <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-amber-50/50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/40x40/94A3B8/white?text=P'} 
                      alt={product.name} 
                      className="w-10 h-10 object-cover rounded-md mr-3" 
                      onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/40x40/94A3B8/white?text=P"}} 
                    />
                    {product.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <div className="font-semibold text-base">${product.price.toLocaleString()}</div>
                <div className="text-xs text-gray-500">
                  <del>${product.originalPrice.toLocaleString()}</del> ({product.discount}%)
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.isFlashDeal ? (
                    <span className="text-red-600 font-semibold text-xs">Flash Deal</span>
                ) : (
                    <span className="text-gray-400 text-xs">Normal</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                  onClick={() => startEdit(product)}
                  className="text-orange-600 hover:text-orange-800 p-2 rounded-full hover:bg-orange-50 transition"
                  title="Modify Product"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                  title="Delete Product"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 3. Product Form View (Updated for Multi-File Preview)
const ProductForm = ({ editingProduct, handleSave, setActiveView }) => {
  const isEditing = !!editingProduct;
  const initialData = editingProduct || { 
    name: '', category: '', price: '', stock: '', status: 'Active', 
    originalPrice: '', discount: '', brand: '', images: [], description: '',
    isFlashDeal: false, flashDealEnd: '' 
  };
  
  const [formData, setFormData] = useState(initialData);
  // Array to hold the selected file objects (for upload)
  const [selectedFiles, setSelectedFiles] = useState([]);
  // Array to hold the local URLs or existing remote URLs (for preview)
  const [previewImages, setPreviewImages] = useState(initialData.images);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    if (newFiles.length > 0) {
        // 1. Create local URLs for new files
        const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
        
        // 2. Add new files to the selection array
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        
        // 3. Add new URLs to the preview array
        setPreviewImages(prevUrls => [...prevUrls, ...newPreviewUrls]);
        
        // 4. Update formData's images array with the consolidated URL list
        setFormData(prev => ({ 
            ...prev, 
            images: [...prev.images, ...newPreviewUrls] 
        }));
    }
    // Clear file input value to allow selecting the same file again
    e.target.value = null; 
  };
  
  const handleRemoveImage = (indexToRemove) => {
    const urlToRemove = previewImages[indexToRemove];

    // 1. Remove the image URL from the preview array
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));

    // 2. Determine if the removed URL was a local object URL (blob:)
    if (urlToRemove.startsWith('blob:')) {
      // If it was a local URL, find and remove the corresponding file object
      // This is a simple index removal, which works because files and previews 
      // are added sequentially and maintained in parallel arrays.
      setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
      URL.revokeObjectURL(urlToRemove); // Clean up the temporary URL
    }
    
    // 3. Update the formData's images array
    setFormData(prev => ({ 
        ...prev, 
        images: prev.images.filter((_, index) => index !== indexToRemove) 
    }));
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFiles.length > 0) {
        // --- YOUR CUSTOM UPLOAD LOGIC STARTS HERE ---
        console.log('--- Ready to Upload: ---');
        console.log(`Total files to upload: ${selectedFiles.length}`);
        // This is the array of File objects you would send to your server/storage:
        console.log('Files to Upload:', selectedFiles); 
        console.log('-----------------------');
        // --- YOUR CUSTOM UPLOAD LOGIC ENDS HERE ---
    } else {
        console.log('No new files selected for upload.');
    }

    // In a real app, you would wait for upload completion, collect the 
    // permanent URLs, and then pass them in the savedData.
    handleSave(formData, isEditing);
    setActiveView('products');
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const fileInputRef = React.useRef(null);


  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">{isEditing ? 'Modify Product' : 'Post New Product'}</h2>
        <button
          onClick={() => setActiveView('products')}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
        
        {/* Basic Details (rest of form) */}
        <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h3>
            {/* ... other form inputs ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className={labelClass}>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="e.g., Condenser Microphone" />
              </div>

              <div>
                <label className={labelClass}>Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className={inputClass} placeholder="e.g., Audio-Technica" />
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required className={inputClass} placeholder="e.g., Audio Equipment" />
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className={`${inputClass} resize-none`} placeholder="Detailed product description..."></textarea>
              </div>
            </div>
        </section>

        {/* Pricing & Stock (omitted for brevity) */}
        <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className={labelClass}>Original Price ($)</label>
                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required className={inputClass} step="1" placeholder="95000" />
                </div>
                <div>
                    <label className={labelClass}>Selling Price ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className={inputClass} step="1" placeholder="80000" />
                </div>
                <div>
                    <label className={labelClass}>Discount (%)</label>
                    <input type="number" name="discount" value={formData.discount} onChange={handleChange} required className={inputClass} min="0" max="100" step="1" placeholder="16" />
                </div>
                <div className="md:col-span-3">
                    <label className={labelClass}>Stock Quantity</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className={inputClass} placeholder="15" />
                </div>
            </div>
        </section>


        {/* --- Multi-File Upload/Preview Section --- */}
        <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Product Media (Multiple Images)</h3>

            <div className="mb-6 border p-4 rounded-xl space-y-4 bg-gray-50">
                <label className={labelClass}>Upload Images (PNG, JPG, up to 10 files)</label>
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*"
                    multiple // Key change: allows multiple file selection
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center px-4 py-2 rounded-lg font-semibold text-white transition duration-200 shadow-md bg-indigo-500 hover:bg-indigo-600"
                >
                    <UploadCloud className="w-5 h-5 mr-2" />
                    Select Files
                </button>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        {previewImages.length} Image(s) Selected
                    </p>
                    
                    {/* Thumbnail Preview Gallery */}
                    <div className="flex flex-wrap gap-4 p-2 bg-white rounded-lg border border-dashed border-gray-300 min-h-[100px]">
                        {previewImages.length === 0 ? (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                <Image className="w-5 h-5 mr-2" /> No images uploaded yet.
                            </div>
                        ) : (
                            previewImages.map((url, index) => (
                                <div key={index} className="relative w-20 h-20 group">
                                    <img 
                                        src={url} 
                                        alt={`Product image ${index + 1}`} 
                                        className="w-full h-full object-cover rounded-md border-2 border-gray-200 transition group-hover:border-red-400"
                                        onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/80x80/94A3B8/white?text=Error"}}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove Image"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Flash Deal Section */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <input 
                    type="checkbox" 
                    id="isFlashDeal" 
                    name="isFlashDeal" 
                    checked={formData.isFlashDeal} 
                    onChange={handleChange} 
                    className="w-5 h-5 text-amber-500 rounded border-gray-300 focus:ring-amber-500" 
                />
                <label htmlFor="isFlashDeal" className="text-base font-medium text-gray-900">
                    Enable Flash Deal
                </label>
            </div>

            {formData.isFlashDeal && (
              <div className="mt-4">
                  <label className={labelClass}>Flash Deal End Date/Time</label>
                  <input 
                      type="datetime-local" 
                      name="flashDealEnd" 
                      value={formData.flashDealEnd} 
                      onChange={handleChange} 
                      required={formData.isFlashDeal}
                      className={inputClass}
                  />
              </div>
            )}
        </section>


        <button
          type="submit"
          className="w-full flex justify-center items-center px-6 py-3 mt-8 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90"
        >
          <Save className="w-5 h-5 mr-2" />
          {isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

// 4. Order Management View (No change)
const OrderList = ({ orders, handleApprove }) => {
    // ... OrderList component implementation (omitted for brevity)
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 pb-4 border-b border-gray-200">Pending Orders</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Order ID', 'Customer', 'Amount', 'Date', 'Status', 'Action'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-amber-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === 'Approved' ? 'bg-indigo-100 text-indigo-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {order.status === 'Pending' ? (
                                        <button 
                                            onClick={() => handleApprove(order.id)}
                                            className="text-green-600 hover:text-green-800 flex items-center p-2 rounded-full hover:bg-green-50 transition"
                                            title="Approve Order"
                                        >
                                            <CheckCircle className="w-5 h-5 mr-1" /> Approve
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-sm">Shipped</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main App Component ---
const App = () => {
  const [activeView, setActiveView] = useState('products');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Auth state (kept simple without Firestore)
 

  // Modal state for confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);


 

  
  // --- Product CRUD Handlers ---

  const handleDeleteProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
        setProductToDelete(product);
        setIsModalOpen(true);
    }
  };
  
  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setIsModalOpen(false);
    setProductToDelete(null);
  };
  
  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };
  
  const startEditProduct = (product) => {
    setEditingProduct(product);
    setActiveView('productForm');
  };

  const handleSaveProduct = (formData, isEditing) => {
    // Ensure numeric fields are parsed correctly
    const savedData = { 
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseInt(formData.discount, 10),
        stock: parseInt(formData.stock, 10)
    };
    
    // In a real application, you would ensure the `savedData.images` array 
    // contains permanent, public URLs after a successful upload.
    
    if (isEditing) {
      // Update existing product
      setProducts(products.map(p => p.id === savedData.id ? { ...p, ...savedData } : p));
    } else {
      // Create new product
      const newProduct = { 
        ...savedData, 
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      };
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  // --- Order Management Handlers (No change) ---

  const handleApproveOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Approved' } : order
    ));
  };
  
  // --- View Renderer ---

  const renderContent = () => {
    switch (activeView) {
      case 'products':
        return (
          <ProductList
            products={products}
            handleDelete={handleDeleteProduct}
            startEdit={startEditProduct}
            setActiveView={setActiveView}
          />
        );
      case 'orders':
        return <OrderList orders={orders} handleApprove={handleApproveOrder} />;
      case 'productForm':
        return (
          <ProductForm 
            editingProduct={editingProduct} 
            handleSave={handleSaveProduct}
            setActiveView={setActiveView}
          />
        );
      case 'dashboard':
      default:
        // Simple dashboard overview
        return (
          <div className="p-10 bg-white rounded-2xl shadow-xl">
             <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Total Products" value={products.length} color="bg-red-500" Icon={Package} />
                <DashboardCard title="Pending Orders" value={orders.filter(o => o.status === 'Pending').length} color="bg-orange-500" Icon={ShoppingCart} />
                <DashboardCard title="Total Revenue (Mock)" value="$58,450" color="bg-amber-500" Icon={DollarSign} />
             </div>
             <p className="mt-8 text-gray-600">
               Select an option from the sidebar to manage your inventory and orders.
             </p>
          </div>
        );
    }
  };

  const DashboardCard = ({ title, value, color, Icon }) => (
      <div className="p-6 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          <div className={`p-3 rounded-full text-white w-min mb-4 ${color}`}>
              <Icon className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
      </div>
  );

  const DollarSign = ({ className }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 antialiased font-sans">
      
      {/* Custom Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete product "${productToDelete?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Sidebar */}
      <SideBar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;