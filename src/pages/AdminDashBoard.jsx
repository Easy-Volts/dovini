import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  X,
  PlusCircle,
  Trash2,
  Edit2,
  CheckCircle,
  Save,
  AlertTriangle,
  Image,
  UploadCloud,
  LogOut,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Calendar,
  MapPin,
  Star,
  Activity,
  ShoppingBag,
  Target,
  Award,
  Menu,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

// --- Mock Data (Updated to use 'images' array) ---
const initialProducts = [
  {
    id: 1,
    name: "Condenser Microphone",
    price: 80000,
    originalPrice: 95000,
    discount: 16,
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=870&auto=format&fit=crop", // Main image
      "https://images.unsplash.com/photo-1588694084365-1d02c6114b3a?q=80&w=870&auto=format&fit=crop", // Secondary image
    ],
    description: "Studio-grade condenser microphone for clear audio recording.",
    category: "Audio Equipment",
    brand: "Audio-Technica",
    stock: 15,
    status: "Active",
    isFlashDeal: true,
    flashDealEnd: "2025-10-12T18:00:00",
  },
  {
    id: 2,
    name: "Smart Watch Series 7",
    price: 34999,
    originalPrice: 42000,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1546868846-9907f152174c?q=80&w=870&auto=format&fit=crop",
    ],
    description: "Advanced smart watch with health monitoring features.",
    category: "Wearables",
    brand: "TechGear",
    stock: 75,
    status: "Active",
    isFlashDeal: false,
    flashDealEnd: "",
  },
];

const mockCustomers = [
  {
    id: 1,
    fullName: "Alice Johnson",
    email: "alice@example.com",
    status: true,
    createdAt: "2025-10-15",
  },
  {
    id: 2,
    fullName: "Bob Smith",
    email: "bob@example.com",
    status: true,
    createdAt: "2025-10-20",
  },
  {
    id: 3,
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    status: false,
    createdAt: "2025-11-01",
  },
  {
    id: 4,
    fullName: "Diana Prince",
    email: "diana@example.com",
    status: true,
    createdAt: "2025-11-05",
  },
  {
    id: 5,
    fullName: "Eddie Murphy",
    email: "eddie@example.com",
    status: true,
    createdAt: "2025-11-10",
  },
];

const getConversionRate = (orders, sessions) => {
  if (sessions === 0) return 0;

  return ((orders.length / sessions) * 100).toFixed(2);
};

// Calculate dashboard metrics from real data
const calculateDashboardMetrics = (products, orders, sessions, customers) => ({
  totalProducts: products.length,
  totalOrders: orders.length,
  pendingOrders: orders.filter((o) => o.status === "pending").length,
  completedOrders: orders.filter((o) => o.status === "delivered").length,
  totalCustomers: customers.length, // Will be updated when customers API is connected
  activeCustomers: customers.filter((c) => c.status).length, // Will be updated when customers API is connected
  lowStockItems: products.filter((p) => p.stock < 20).length,
  monthlyRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
  averageOrderValue:
    orders.length > 0
      ? orders.reduce((sum, order) => sum + (order.total || 0), 0) /
        orders.length
      : 0,
  conversionRate: getConversionRate(orders, sessions),
  flashDeals: products.filter((p) => p.isFlashDeal).length,
});

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

// 1. Sidebar Navigation (Updated for mobile)
const SideBar = ({ activeView, setActiveView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
    { name: "Products", icon: Package, view: "products" },
    { name: "Orders", icon: ShoppingCart, view: "orders" },
    { name: "Customers", icon: Users, view: "customers" },
  ];
  const { logout } = useAdmin();

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col p-6 bg-white shadow-xl h-full border-r border-gray-100">
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

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden transition duration-300">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 bg-opacity-50" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Mobile Sidebar */}
          <div className="relative flex flex-col w-64 h-full bg-white shadow-xl border-r border-gray-100">
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
      )}
    </>
  );
};

// 2. Product Management View (Updated for image array)
const ProductList = ({ products, handleDelete, startEdit, setActiveView }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Product Inventory</h2>
      <button
        onClick={() => setActiveView("productForm")}
        className="flex items-center sm:px-6 sm:py-3 text-sm whitespace-nowrap px-3 py-1 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90"
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
            {[
              "Name",
              "Brand",
              "Price/Discount",
              "Stock",
              "Status",
              "Deal",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
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
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://placehold.co/40x40/94A3B8/white?text=P"
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/40x40/94A3B8/white?text=P";
                    }}
                  />
                  {product.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.brand}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <div className="font-semibold text-base">
                  ${product.price.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  <del>${product.originalPrice.toLocaleString()}</del> (
                  {product.discount}%)
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.isFlashDeal ? (
                  <span className="text-red-600 font-semibold text-xs">
                    Flash Deal
                  </span>
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
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    originalPrice: "",
    discount: "",
    brand: "",
    images: [],
    description: "",
    isFlashDeal: false,
    flashDealEnd: "",
  };

  const [formData, setFormData] = useState(initialData);
  // Array to hold the selected file objects (for upload)
  const [selectedFiles, setSelectedFiles] = useState([]);
  // Array to hold the local URLs or existing remote URLs (for preview)
  const [previewImages, setPreviewImages] = useState(initialData.images);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length > 0) {
      // 1. Create local URLs for new files
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      // 2. Add new files to the selection array
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // 3. Add new URLs to the preview array
      setPreviewImages((prevUrls) => [...prevUrls, ...newPreviewUrls]);

      // 4. Update formData's images array with the consolidated URL list
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newPreviewUrls],
      }));
    }
    // Clear file input value to allow selecting the same file again
    e.target.value = null;
  };

  const handleRemoveImage = (indexToRemove) => {
    const urlToRemove = previewImages[indexToRemove];

    // 1. Remove the image URL from the preview array
    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    // 2. Determine if the removed URL was a local object URL (blob:)
    if (urlToRemove.startsWith("blob:")) {
      // If it was a local URL, find and remove the corresponding file object
      // This is a simple index removal, which works because files and previews
      // are added sequentially and maintained in parallel arrays.
      setSelectedFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
      URL.revokeObjectURL(urlToRemove); // Clean up the temporary URL
    }

    // 3. Update the formData's images array
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFiles.length > 0) {
      // --- YOUR CUSTOM UPLOAD LOGIC STARTS HERE ---
      console.log("--- Ready to Upload: ---");
      console.log(`Total files to upload: ${selectedFiles.length}`);
      // This is the array of File objects you would send to your server/storage:
      console.log("Files to Upload:", selectedFiles);
      console.log("-----------------------");
      // --- YOUR CUSTOM UPLOAD LOGIC ENDS HERE ---
    } else {
      console.log("No new files selected for upload.");
    }

    // In a real app, you would wait for upload completion, collect the
    // permanent URLs, and then pass them in the savedData.
    handleSave(formData, isEditing);
    setActiveView("products");
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const fileInputRef = React.useRef(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">
          {isEditing ? "Modify Product" : "Post New Product"}
        </h2>
        <button
          onClick={() => setActiveView("products")}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-8"
      >
        {/* Basic Details (rest of form) */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Basic Information
          </h3>
          {/* ... other form inputs ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g., Condenser Microphone"
              />
            </div>

            <div>
              <label className={labelClass}>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g., Audio-Technica"
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g., Audio Equipment"
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`${inputClass} resize-none`}
                placeholder="Detailed product description..."
              ></textarea>
            </div>
          </div>
        </section>

        {/* Pricing & Stock (omitted for brevity) */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Pricing & Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Original Price ($)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                className={inputClass}
                step="1"
                placeholder="95000"
              />
            </div>
            <div>
              <label className={labelClass}>Selling Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className={inputClass}
                step="1"
                placeholder="80000"
              />
            </div>
            <div>
              <label className={labelClass}>Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                required
                className={inputClass}
                min="0"
                max="100"
                step="1"
                placeholder="16"
              />
            </div>
            <div className="md:col-span-3">
              <label className={labelClass}>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="15"
              />
            </div>
          </div>
        </section>

        {/* --- Multi-File Upload/Preview Section --- */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Product Media (Multiple Images)
          </h3>

          <div className="mb-6 border p-4 rounded-xl space-y-4 bg-gray-50">
            <label className={labelClass}>
              Upload Images (PNG, JPG, up to 10 files)
            </label>

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
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/80x80/94A3B8/white?text=Error";
                        }}
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
            <label
              htmlFor="isFlashDeal"
              className="text-base font-medium text-gray-900"
            >
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
          {isEditing ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

// 4. Order Management View (Updated for real API data structure)
const OrderList = ({ orders, handleApprove }) => {
  // Transform backend data structure to match component expectations
  const transformedOrders = orders.map((order) => ({
    id: order.order_code || `ORD-${order.id}`,
    customer: order.shippingAddress?.name || "Unknown Customer",
    amount: order.total || 0,
    date: order.date ? new Date(order.date).toLocaleDateString() : "N/A",
    status: order.status
      ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
      : "Unknown",
    rawStatus: order.status,
    orderId: order.id, // Keep original ID for backend operations
    items: order.items || [],
    shippingAddress: order.shippingAddress,
    tracking: order.tracking,
  }));

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButton = (order) => {
    if (order.rawStatus === "pending") {
      return (
        <button
          onClick={() => handleApprove(order.orderId)}
          className="text-green-600 hover:text-green-800 flex items-center p-2 rounded-full hover:bg-green-50 transition"
          title="Approve Order"
        >
          <CheckCircle className="w-5 h-5 mr-1" /> Approve
        </button>
      );
    }
    return <span className="text-gray-400 text-sm">Processed</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Order Management</h2>
        <div className="sm:text-sm text-xs text-gray-700">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Order Code",
                "Customer",
                "Items",
                "Total Amount",
                "Order Date",
                "Status",
                "Shipping Address",
                "Tracking",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transformedOrders.length > 0 ? (
              transformedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-amber-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </div>
                    {order.shippingAddress?.phone && (
                      <div className="text-sm text-gray-500">
                        {order.shippingAddress.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item(s)
                    </div>
                    {order.items.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {order.items[0].name}
                        {order.items.length > 1 &&
                          ` +${order.items.length - 1} more`}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {order.shippingAddress?.address || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.tracking?.number ? (
                      <div>
                        <div className="font-medium">
                          {order.tracking.carrier}
                        </div>
                        <div className="text-xs">{order.tracking.number}</div>
                      </div>
                    ) : (
                      "Not available"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {getActionButton(order)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No orders found</p>
                  <p className="text-sm">
                    Orders will appear here once customers start purchasing.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. Customer Management View
const CustomerList = ({ customers }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPhone = (phone) => {
    return phone || "Not provided";
  };

  const formatAddress = (address) => {
    return address || "Not provided";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Customer Management
        </h2>
        <div className="sm:text-sm text-xs text-gray-700">
          Total Customers: {customers.length}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Customer ID",
                "Full Name",
                "Email",
                "Phone",
                "Status",
                "Registered Date",
                "Address",
                "Role",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-amber-50/50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{customer.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPhone(customer.phone)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {customer.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(customer.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {formatAddress(customer.address)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {customer.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No customers found</p>
                  <p className="text-sm">
                    Customers will appear here once they register.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Component ---
const App = ({ sessions }) => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [orderMetrics, setOrderMetrics] = useState({
    totalOrders: 0,
    trendText: "→ 0%",
  });
  const [revenueMetrics, setRevenueMetrics] = React.useState({
    monthlyRevenue: 0,
    trendText: "→ 0% vs last month",
    trendUp: false,
  });

  const [aovMetrics, setAovMetrics] = React.useState({
    aovThisMonth: 0,
    trendText: "→ 0% increase",
    trendUp: true,
  });

  const [completedOrdersMetrics, setCompletedOrdersMetrics] = React.useState({
    completedThisWeek: 0,
    trendText: "→ 0% this week",
    trendUp: false,
  });

  const token = localStorage.getItem("adminToken");
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://api.dovinigears.ng/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCustomers(data.users);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, [token]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://api.dovinigears.ng/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data.orders);
        const metrics = calculateOrderTrend(data.orders);
        setOrderMetrics(metrics);
        const completedOrdersMetrics = calculateCompletedOrdersTrend(
          data.orders
        );
        setCompletedOrdersMetrics(completedOrdersMetrics);
        const revenueMetrics = calculateRevenueTrend(data.orders);
        setRevenueMetrics(revenueMetrics);
        const aovMetrics = calculateAOVTrend(data.orders);
        setAovMetrics(aovMetrics);
        
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOrders();
  }, [token]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://api.dovinigears.ng/products')
        const data = await res.json()
        if (!res.ok) {
          throw new Error('Error fetching products')
        }
        setProducts(data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchProducts()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  function calculateOrderTrend(orders) {
    const now = new Date();

    // --- Helper to parse order date string reliably ---
    const parseDate = (dateStr) => new Date(dateStr.replace(" ", "T")); // convert "YYYY-MM-DD HH:MM:SS" → ISO

    // --- Define current month period dynamically ---
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // --- Define previous month period dynamically ---
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month

    // --- Count orders in each period ---
    const ordersThisMonth = orders.filter(
      (o) => parseDate(o.date) >= startOfThisMonth
    ).length;
    const ordersLastMonth = orders.filter(
      (o) =>
        parseDate(o.date) >= startOfLastMonth &&
        parseDate(o.date) <= endOfLastMonth
    ).length;

    // --- Calculate trend ---
    let trendPercent = 0;
    let trendSymbol = "→";

    if (ordersLastMonth > 0) {
      trendPercent =
        ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;
      trendSymbol = trendPercent >= 0 ? "↗" : "↘";
    } else if (ordersThisMonth > 0) {
      trendSymbol = "↗"; // first orders this month, treat as positive
      trendPercent = 100;
    }

    const trendText = `${trendSymbol} ${Math.abs(
      trendPercent.toFixed(0)
    )}% from last month`;

    return {
      totalOrders: ordersThisMonth,
      trendText,
    };
  }

  function calculateRevenueTrend(orders) {
    const now = new Date();
    const parseDate = (dateStr) => new Date(dateStr.replace(" ", "T")); // reliable parsing

    // Define current month and last month
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month

    // Sum revenue for this month
    const revenueThisMonth = orders
      .filter((o) => parseDate(o.date) >= startOfThisMonth)
      .reduce((sum, o) => sum + o.total, 0);

    // Sum revenue for last month
    const revenueLastMonth = orders
      .filter(
        (o) =>
          parseDate(o.date) >= startOfLastMonth &&
          parseDate(o.date) <= endOfLastMonth
      )
      .reduce((sum, o) => sum + o.total, 0);

    // Calculate trend
    let trendPercent = 0;
    let trendSymbol = "→";

    if (revenueLastMonth > 0) {
      trendPercent =
        ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
      trendSymbol = trendPercent >= 0 ? "↗" : "↘";
    } else if (revenueThisMonth > 0) {
      trendPercent = 100;
      trendSymbol = "↗";
    }

    const trendText = `${trendSymbol} ${Math.abs(
      trendPercent.toFixed(0)
    )}% vs last month`;
    const trendUp = trendSymbol === "↗";

    return {
      monthlyRevenue: revenueThisMonth,
      trendText,
      trendUp,
    };
  }

  function calculateCompletedOrdersTrend(orders) {
    const now = new Date();
    const parseDate = (dateStr) => new Date(dateStr.replace(" ", "T")); // reliable parsing

    // Start of this week (Sunday)
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setHours(0, 0, 0, 0);
    startOfThisWeek.setDate(now.getDate() - now.getDay());

    // Start and end of last week
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);

    // Count completed orders
    const completedThisWeek = orders.filter(
      (o) => o.status === "completed" && parseDate(o.date) >= startOfThisWeek
    ).length;

    const completedLastWeek = orders.filter(
      (o) =>
        o.status === "completed" &&
        parseDate(o.date) >= startOfLastWeek &&
        parseDate(o.date) <= endOfLastWeek
    ).length;

    // Calculate trend
    let trendPercent = 0;
    let trendSymbol = "→";

    if (completedLastWeek > 0) {
      trendPercent =
        ((completedThisWeek - completedLastWeek) / completedLastWeek) * 100;
      trendSymbol = trendPercent >= 0 ? "↗" : "↘";
    } else if (completedThisWeek > 0) {
      trendPercent = 100;
      trendSymbol = "↗";
    }

    const trendText = `${trendSymbol} ${Math.abs(
      trendPercent.toFixed(0)
    )}% this week`;
    const trendUp = trendSymbol === "↗";

    return {
      completedThisWeek,
      trendText,
      trendUp,
    };
  }

  function calculateAOVTrend(orders) {
    const now = new Date();
    const parseDate = (dateStr) => new Date(dateStr.replace(" ", "T"));

    // --- Global AOV (all orders) ---
    const globalAOV = orders.length
      ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length
      : 0;

    // --- Define last month period ---
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // --- Filter orders for last month ---
    const ordersLastMonth = orders.filter(
      (o) =>
        parseDate(o.date) >= startOfLastMonth &&
        parseDate(o.date) <= endOfLastMonth
    );

    // --- Last month AOV ---
    const aovLastMonth = ordersLastMonth.length
      ? ordersLastMonth.reduce((sum, o) => sum + (o.total || 0), 0) /
        ordersLastMonth.length
      : 0;

    // --- Calculate trend ---
    let trendPercent = 0;
    let trendSymbol = "→";

    if (aovLastMonth > 0) {
      trendPercent = ((globalAOV - aovLastMonth) / aovLastMonth) * 100;
      trendSymbol = trendPercent >= 0 ? "↗" : "↘";
    } else if (globalAOV > 0) {
      trendPercent = 100;
      trendSymbol = "↗";
    }

    const trendText = `${trendSymbol} ${Math.abs(trendPercent.toFixed(1))}% ${
      trendPercent >= 0 ? "increase" : "decrease"
    }`;
    const trendUp = trendSymbol === "↗";

    return { aov: globalAOV, trendText, trendUp };
  }

 

  // --- Product CRUD Handlers ---

  const handleDeleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductToDelete(product);
      setIsModalOpen(true);
    }
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setActiveView("productForm");
  };

  const handleSaveProduct = (formData, isEditing) => {
    // Ensure numeric fields are parsed correctly
    const savedData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      discount: parseInt(formData.discount, 10),
      stock: parseInt(formData.stock, 10),
    };

    // In a real application, you would ensure the `savedData.images` array
    // contains permanent, public URLs after a successful upload.

    if (isEditing) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === savedData.id ? { ...p, ...savedData } : p
        )
      );
    } else {
      // Create new product
      const newProduct = {
        ...savedData,
        id:
          products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      };
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  // --- Order Management Handlers (Updated for backend API) ---

  const handleApproveOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "approved" } : order
      )
    );
  };

  // --- View Renderer ---

  const renderContent = () => {
    switch (activeView) {
      case "products":
        return (
          <ProductList
            products={products}
            handleDelete={handleDeleteProduct}
            startEdit={startEditProduct}
            setActiveView={setActiveView}
          />
        );
      case "orders":
        return <OrderList orders={orders} handleApprove={handleApproveOrder} />;
      case "customers":
        return <CustomerList customers={customers} />;
      case "productForm":
        return (
          <ProductForm
            editingProduct={editingProduct}
            handleSave={handleSaveProduct}
            setActiveView={setActiveView}
          />
        );
      case "dashboard":
      default: {
        // Calculate metrics from real data
        const dashboardMetrics = calculateDashboardMetrics(
          products,
          orders,
          sessions,
          customers
        );

        // Comprehensive dashboard overview
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                    Welcome back! Here's what's happening with your store today.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-semibold text-sm sm:text-base">Total Sessions: {sessions}</div>
                  <p className="text-xs text-gray-600">(Total visitors)</p>
                </div>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Products"
                value={dashboardMetrics.totalProducts}
                color="bg-blue-500"
                icon={Package}
                trend="+2 this week"
                trendUp={true}
              />
              <DashboardCard
                title="Total Orders"
                value={dashboardMetrics.totalOrders}
                color="bg-green-500"
                icon={ShoppingCart}
                trend={orderMetrics.trendText}
                trendUp={orderMetrics.trendText.startsWith("↗")}
              />
              <DashboardCard
                title="Total Customers"
                value={dashboardMetrics.totalCustomers}
                color="bg-purple-500"
                icon={Users}
                trend={`${dashboardMetrics.activeCustomers} active`}
                trendUp={true}
              />
              <DashboardCard
                title="Total Revenue"
                value={`₦${revenueMetrics.monthlyRevenue.toLocaleString()}`}
                color="bg-emerald-500"
                icon={DollarSign}
                trend={revenueMetrics.trendText}
                trendUp={revenueMetrics.trendUp}
              />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Pending Orders"
                value={dashboardMetrics.pendingOrders}
                color="bg-orange-500"
                icon={Activity}
                trend="Needs attention"
                trendUp={false}
              />
              <DashboardCard
                title="Completed Orders"
                value={dashboardMetrics.completedOrders}
                color="bg-teal-500"
                icon={CheckCircle}
                trend={completedOrdersMetrics.trendText}
                trendUp={completedOrdersMetrics.trendUp}
              />
              <DashboardCard
                title="Low Stock Items"
                value={dashboardMetrics.lowStockItems}
                color="bg-red-500"
                icon={AlertTriangle}
                trend="Restock needed"
                trendUp={false}
              />
              <DashboardCard
                title="Flash Deals Active"
                value={dashboardMetrics.flashDeals}
                color="bg-pink-500"
                icon={Target}
                trend="Limited time offers"
                trendUp={true}
              />
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Average Order Value
                  </h3>
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ₦{dashboardMetrics.averageOrderValue.toFixed(2)}
                </p>
                <p
                  className={`text-xs sm:text-sm mt-2 ${
                    aovMetrics.trendUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {aovMetrics.trendText}
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Conversion Rate
                  </h3>
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {dashboardMetrics.conversionRate}%
                </p>
                <p className="text-xs sm:text-sm text-blue-600 mt-2">
                  ↗ 0.3% vs last month
                </p>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {order.order_code || `ORD-${order.id}`}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-800">
                          {order.shippingAddress?.name || "Unknown Customer"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          ${(order.total || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "approved"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {order.status
                              ? order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)
                              : "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Add New Product</h3>
                    <p className="text-blue-100 mt-1 text-sm">Expand your inventory</p>
                  </div>
                  <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
                </div>
                <button
                  onClick={() => setActiveView("productForm")}
                  className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-blue-500 font-medium px-3 sm:px-4 py-2 rounded-lg transition text-sm"
                >
                  Get Started
                </button>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Process Orders</h3>
                    <p className="text-green-100 mt-1 text-sm">
                      {dashboardMetrics.pendingOrders} orders pending
                    </p>
                  </div>
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
                </div>
                <button
                  onClick={() => setActiveView("orders")}
                  className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-green-500 font-medium px-3 sm:px-4 py-2 rounded-lg transition text-sm"
                >
                  Review Orders
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl mb-8 sm:mb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Manage Customers</h3>
                    <p className="text-purple-100 mt-1 text-sm">
                      {dashboardMetrics.totalCustomers} total customers
                    </p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
                </div>
                <button
                  onClick={() => setActiveView("customers")}
                  className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-purple-500 font-medium px-3 sm:px-4 py-2 rounded-lg transition text-sm"
                >
                  View Customers
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const DashboardCard = ({ title, value, color, icon, trend, trendUp }) => {
    const IconComponent = icon;
    return (
      <div className="p-4 sm:p-6 rounded-2xl shadow-lg bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div className={`p-2 sm:p-3 rounded-full text-white w-min mb-3 sm:mb-4 ${color}`}>
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
        {trend && (
          <div className="mt-2 flex items-center">
            <span
              className={`text-xs sm:text-sm ${
                trendUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendUp ? "↗" : "↘"} {trend}
            </span>
          </div>
        )}
      </div>
    );
  };

  const DollarSign = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  return (
    <div className="flex h-screen bg-gray-100 antialiased font-sans">
      {/* Custom Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete product "${productToDelete?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Sidebar */}
      <SideBar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col pb-6">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
            {/* Spacer for centering */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
