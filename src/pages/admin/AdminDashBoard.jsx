import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  X,
  Menu,
  PlusCircle,
  CheckCircle,
  Save,
  AlertTriangle,
  Image,
  UploadCloud,
  LogOut,
  TrendingUp,
  Activity,
  ShoppingBag,
  Target,
} from "lucide-react";
import CustomerList from "../../components/admin/CustomerList";
import ProductList from "../../components/admin/ProductList";
import OrderList from "../../components/admin/OrderList";
import SideBar from "../../components/admin/SideBar";
import AdminLoadingSPinner from "../../components/admin/AdminLoadingSPinner";
import ProductForm from "../../components/admin/ProductForm";
import Categories from "../../components/admin/Categories";
import { useToast } from "../../context/ToastContext";

const getConversionRate = (orders, sessions) => {
  if (sessions === 0) return 0;

  return ((orders.length / sessions) * 100).toFixed(2);
};


const calculateDashboardMetrics = (products, orders, sessions, customers) => ({
  totalProducts: products.length,
  totalOrders: orders.length,
  pendingOrders: orders.filter((o) => o.status === "pending").length,
  completedOrders: orders.filter((o) => o.status === "delivered").length,
  totalCustomers: customers.length,
  activeCustomers: customers.filter((c) => c.status).length,
  lowStockItems: products.filter((p) => p.stock < 5).length,
  monthlyRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
  averageOrderValue:
    orders.length > 0
      ? orders.reduce((sum, order) => sum + (order.total || 0), 0) /
        orders.length
      : 0,
  conversionRate: getConversionRate(orders, sessions),
  flashDeals: products.filter((p) => p.isFlashDeal).length,
});

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


//   editingProduct,
//   handleSave,
//   setActiveView,
//   categories,
// }) => {
//   const isEditing = !!editingProduct;
//   const initialData = editingProduct || {
//     name: "",
//     category: "",
//     price: "",
//     stock: "",
//     originalPrice: "",
//     discount: "",
//     images: [],
//     description: "",
//     isLimitedStock: false,
//     isFlashDeal: false,
//     reviews: 0,
//     rating: 0,
//     flashDealEnd: "",
//   };

//   const [formData, setFormData] = useState(() => {
//     if (editingProduct) {
//       return {
//         ...editingProduct,
//         // Ensure proper data types for form inputs
//         price: editingProduct.price?.toString() || "",
//         originalPrice: editingProduct.originalPrice?.toString() || "",
//         discount: editingProduct.discount?.toString() || "",
//         stock: editingProduct.stock?.toString() || "",
//         reviews: editingProduct.reviews?.toString() || "0",
//         rating: editingProduct.rating?.toString() || "0",
//         isLimitedStock: Boolean(editingProduct.isLimitedStock),
//         isFlashDeal: Boolean(editingProduct.isFlashDeal),
//       };
//     }
//     return initialData;
//   });
//   // Array to hold the selected file objects (for upload)
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   // Array to hold the local URLs or existing remote URLs (for preview)
//   const [previewImages, setPreviewImages] = useState(() => {
//     if (editingProduct && editingProduct.images) {
//       return editingProduct.images;
//     }
//     return initialData.images;
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);

//     if (newFiles.length > 0) {
//       // 1. Create local URLs for new files
//       const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

//       // 2. Add new files to the selection array
//       setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

//       // 3. Add new URLs to the preview array
//       setPreviewImages((prevUrls) => [...prevUrls, ...newPreviewUrls]);

//       // 4. Update formData's images array with the consolidated URL list
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...newPreviewUrls],
//       }));
//     }
//     // Clear file input value to allow selecting the same file again
//     e.target.value = null;
//   };

//   const handleRemoveImage = (indexToRemove) => {
//     const urlToRemove = previewImages[indexToRemove];

//     // 1. Remove the image URL from the preview array
//     setPreviewImages((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     );

//     // 2. Determine if the removed URL was a local object URL (blob:)
//     if (urlToRemove.startsWith("blob:")) {
//       // If it was a local URL, find and remove the corresponding file object
//       // This is a simple index removal, which works because files and previews
//       // are added sequentially and maintained in parallel arrays.
//       setSelectedFiles((prev) =>
//         prev.filter((_, index) => index !== indexToRemove)
//       );
//       URL.revokeObjectURL(urlToRemove); // Clean up the temporary URL
//     }

//     // 3. Update the formData's images array
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare FormData instead of JSON
//     const formDataToSend = new FormData();

//     // Add all product data fields
//     formDataToSend.append("name", formData.name);

//     const categoryObj = categories.find(
//       (c) => c.name.toLowerCase() === formData.category.toLowerCase()
//     );
//     formDataToSend.append("categoryId", categoryObj?.id || "");
//     formDataToSend.append("price", formData.price);
//     formDataToSend.append("originalPrice", formData.originalPrice);
//     formDataToSend.append("discount", formData.discount);
//     formDataToSend.append("stock", formData.stock);
//     formDataToSend.append("reviews", formData.reviews);
//     formDataToSend.append("rating", formData.rating);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("isLimitedStock", formData.isLimitedStock.toString());
//     formDataToSend.append("isFlashDeal", formData.isFlashDeal.toString());
//     if (formData.flashDealEnd) {
//       formDataToSend.append("flashDealEnd", formData.flashDealEnd);
//     }

//     // Add images with "file" key name as requested
//     selectedFiles.forEach((file) => {
//       formDataToSend.append("file", file);
//     });

//     // For editing mode, include the product ID
//     if (isEditing && formData.id) {
//       formDataToSend.append("id", formData.id);
//     }

//     // Call handleSave with FormData
//     handleSave(formDataToSend, isEditing);
//     setActiveView("products");
//   };

//   const inputClass =
//     "w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition duration-150";
//   const labelClass = "block text-sm font-medium text-gray-700 mb-1";
//   const fileInputRef = React.useRef(null);

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//         <h2 className="text-3xl font-bold text-gray-800">
//           {isEditing ? "Modify Product" : "Post New Product"}
//         </h2>
//         <button
//           onClick={() => setActiveView("products")}
//           className="text-gray-500 hover:text-gray-800 transition"
//         >
//           <X className="w-6 h-6" />
//         </button>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl space-y-8"
//       >
//         {/* Basic Details (rest of form) */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
//             Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className={labelClass}>Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 placeholder="e.g., Condenser Microphone"
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//               >
//                 <option value="">Select a category</option>
//                 {categories &&
//                   categories.map((category) => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className={`${inputClass} resize-none`}
//                 placeholder="Description for product"
//               ></textarea>
//             </div>
//           </div>
//         </section>

//         {/* Pricing & Stock */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
//             Pricing & Inventory
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className={labelClass}>Original Price ($)</label>
//               <input
//                 type="number"
//                 name="originalPrice"
//                 value={formData.originalPrice}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 step="1"
//                 placeholder="12"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Selling Price ($)</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 step="1"
//                 placeholder="10.99"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Discount (%)</label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={formData.discount}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 min="0"
//                 max="100"
//                 step="1"
//                 placeholder="10"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Stock Quantity</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 placeholder="10"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Reviews Count</label>
//               <input
//                 type="number"
//                 name="reviews"
//                 value={formData.reviews}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 min="0"
//                 placeholder="111"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Rating (0-5)</label>
//               <input
//                 type="number"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 placeholder="4"
//               />
//             </div>
//           </div>
//         </section>

//         {/* --- Multi-File Upload/Preview Section --- */}
//         <section>
//           <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
//             Product Media (Multiple Images)
//           </h3>

//           <div className="mb-6 border p-4 rounded-xl space-y-4 bg-gray-50">
//             <label className={labelClass}>
//               Upload Images (PNG, JPG, up to 10 files)
//             </label>

//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               accept="image/*"
//               multiple
//               className="hidden"
//             />

//             <button
//               type="button"
//               onClick={() => fileInputRef.current.click()}
//               className="flex items-center px-4 py-2 rounded-lg font-semibold text-white transition duration-200 shadow-md bg-indigo-500 hover:bg-indigo-600"
//             >
//               <UploadCloud className="w-5 h-5 mr-2" />
//               Select Files
//             </button>

//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <p className="text-sm font-medium text-gray-700 mb-2">
//                 {previewImages.length} Image(s) Selected
//               </p>

//               {/* Thumbnail Preview Gallery */}
//               <div className="flex flex-wrap gap-4 p-2 bg-white rounded-lg border border-dashed border-gray-300 min-h-[100px]">
//                 {previewImages.length === 0 ? (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
//                     <Image className="w-5 h-5 mr-2" /> No images uploaded yet.
//                   </div>
//                 ) : (
//                   previewImages.map((url, index) => (
//                     <div key={index} className="relative w-20 h-20 group">
//                       <img
//                         src={url}
//                         alt={`Product image ${index + 1}`}
//                         className="w-full h-full object-cover rounded-md border-2 border-gray-200 transition group-hover:border-red-400"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src =
//                             "https://placehold.co/80x80/94A3B8/white?text=Error";
//                         }}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                         title="Remove Image"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Flash Deal Section */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center space-x-4">
//               <input
//                 type="checkbox"
//                 id="isFlashDeal"
//                 name="isFlashDeal"
//                 checked={formData.isFlashDeal}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
//               />
//               <label
//                 htmlFor="isFlashDeal"
//                 className="text-base font-medium text-gray-900"
//               >
//                 Enable Flash Deal
//               </label>
//             </div>

//             <div className="flex items-center space-x-4">
//               <input
//                 type="checkbox"
//                 id="isLimitedStock"
//                 name="isLimitedStock"
//                 checked={formData.isLimitedStock}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-red-500 rounded border-gray-300 focus:ring-red-500"
//               />
//               <label
//                 htmlFor="isLimitedStock"
//                 className="text-base font-medium text-gray-900"
//               >
//                 Limited Stock Item
//               </label>
//             </div>

//             {formData.isFlashDeal && (
//               <div className="mt-4">
//                 <label className={labelClass}>Flash Deal End Date/Time</label>
//                 <input
//                   type="datetime-local"
//                   name="flashDealEnd"
//                   value={formData.flashDealEnd}
//                   onChange={handleChange}
//                   required={formData.isFlashDeal}
//                   className={inputClass}
//                 />
//               </div>
//             )}
//           </div>
//         </section>

//         <button
//           type="submit"
//           className="w-full flex justify-center items-center px-6 py-3 mt-8 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90"
//         >
//           <Save className="w-5 h-5 mr-2" />
//           {isEditing ? "Save Changes" : "Create Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

const DashboardCard = ({ title, value, color, icon, trend, trendUp }) => {
  const IconComponent = icon;
  return (
    <div className="p-4 sm:p-6 rounded-2xl shadow-lg bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div
        className={`p-2 sm:p-3 rounded-full text-white w-min mb-3 sm:mb-4 ${color}`}
      >
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
        {value}
      </p>
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

const AdminDashBoard = ({ sessions, categories,setCategories }) => {
  const { showSuccess, showError } = useToast();
  const [activeView, setActiveView] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderMetrics, setOrderMetrics] = useState({
    totalOrders: 0,
    trendText: "→ 0%",
  });
  const [revenueMetrics, setRevenueMetrics] = React.useState({
    monthlyRevenue: 0,
    trendText: "→ 0% vs last month",
    trendUp: false,
  });
  console.log(orders)
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
  
  // Add state to track if orders have been loaded
  const [ordersLoaded, setOrdersLoaded] = React.useState(false);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.dovinigears.ng/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTimeout(() => {
          setCustomers(data.users);
          setLoading(false);
        }, 2000);
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
        console.log("🔍 Raw API response:", data);
        console.log("📦 Orders data:", data.orders);
        
        // Debug: Check first few orders to see structure
        if (data.orders && data.orders.length > 0) {
          console.log("🧾 First order structure:", data.orders[0]);
          console.log("💰 First order total:", data.orders[0]?.total);
          console.log("📅 First order date:", data.orders[0]?.date);
        }
        
        setOrders(data.orders || []);
        setOrdersLoaded(true); // Mark orders as loaded
        const metrics = calculateOrderTrend(data.orders || []);
        setOrderMetrics(metrics);
        const completedOrdersMetrics = calculateCompletedOrdersTrend(
          data.orders || []
        );
        setCompletedOrdersMetrics(completedOrdersMetrics);
        const revenueMetrics = calculateRevenueTrend(data.orders || []);
        setRevenueMetrics(revenueMetrics);
        const aovMetrics = calculateAOVTrend(data.orders || []);
        setAovMetrics(aovMetrics);
        
        console.log("💵 Calculated revenue metrics:", revenueMetrics);
      } catch (error) {
        console.log("❌ Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [token]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.dovinigears.ng/products");
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Error fetching products");
        }
        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  function calculateOrderTrend(orders) {
    const now = new Date();

    const parseDate = (dateStr) => new Date(dateStr.replace(" ", "T"));

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month

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
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0); // Return epoch if no date
      try {
        return new Date(dateStr.replace(" ", "T")); // reliable parsing
      } catch {
        console.warn("Failed to parse date:", dateStr);
        return new Date(0);
      }
    };

    // Define current month and last month
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month

    console.log("📊 Calculating revenue trends...");
    console.log("📅 This month starts:", startOfThisMonth);
    console.log("📅 Last month range:", startOfLastMonth, "to", endOfLastMonth);
    console.log("🛒 Processing", orders.length, "orders");

    // Sum revenue for this month
    const revenueThisMonth = orders
      .filter((o) => {
        const orderDate = parseDate(o.date);
        const isThisMonth = orderDate >= startOfThisMonth;
        if (o.date && !isThisMonth) {
          console.log("📅 Order date excluded from this month:", o.date, orderDate);
        }
        return isThisMonth;
      })
      .reduce((sum, o) => {
        const total = Number(o.total) || 0;
        console.log("💰 Adding to this month revenue:", o.id, total);
        return sum + total;
      }, 0);

    // Sum revenue for last month
    const revenueLastMonth = orders
      .filter((o) => {
        const orderDate = parseDate(o.date);
        return orderDate >= startOfLastMonth && orderDate <= endOfLastMonth;
      })
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    console.log("💵 This month revenue:", revenueThisMonth);
    console.log("💵 Last month revenue:", revenueLastMonth);

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
  const handleCategoryDelete=(category)=>{
    console.log(category)
    console.log(categories)
      setCategoryToDelete(category);
      setCategoryIsModalOpen(true);
  }

  const handleDeleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductToDelete(product);
      setIsModalOpen(true);
    }
  };

const confirmCategoryDelete = async () => {
  if (!categoryToDelete) return;

  try {
    // Call your API
  
     const  res = await fetch(
          `https://api.dovinigears.ng/admin/category/delete?id=${categoryToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }

    // Update local state only after successful delete
    setCategories(categories.filter((p) => p.id !== categoryToDelete.id));
    showSuccess('Category deleted successfully');
  } catch (error) {
    console.error(error);
    // Optionally show error message to the user
  } finally {
    // Close modal and clean up
    setCategoryIsModalOpen(false);
    setCategoryToDelete(null);
  }
};

const confirmDelete = async () => {
  if (!productToDelete) return;

  try {
    // Call your API
  
     const  res = await fetch(
          `https://api.dovinigears.ng/admin/product/delete?id=${productToDelete.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    // Update local state only after successful delete
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    showSuccess('Product deleted successfully');
  } catch (error) {
    console.error(error);
    // Optionally show error message to the user
  } finally {
    // Close modal and clean up
    setIsModalOpen(false);
    setProductToDelete(null);
  }
};


  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setActiveView("productForm");
  };

  const handleSaveProduct = async (formDataToSend, isEditing) => {
    try {
      let response;
      let responseData;

            for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (isEditing) {
        const productId = formDataToSend.get("id");
        console.log("Updating product with ID from FormData:", productId);
        response = await fetch(
          `https://api.dovinigears.ng/admin/product/update`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Update failed: ${response.status} - ${errorText}`);
        }

        responseData = await response.json();
        console.log("Product updated successfully:", responseData);
        const updatedProduct = {
          name: formDataToSend.get("name"),
          categoryId: parseInt(formDataToSend.get("category_id")),
          price: parseFloat(formDataToSend.get("price")),
          originalPrice: parseFloat(formDataToSend.get("originalPrice")),
          discount: parseFloat(formDataToSend.get("discount")),
          stock: parseInt(formDataToSend.get("stock")),
          reviews: 0,
          rating: parseFloat(formDataToSend.get("rating")),
          description: formDataToSend.get("description"),
          isLimitedStock:
            formDataToSend.get("isLimitedStock") === "true" ? true : false,
          isFlashDeal:
            formDataToSend.get("isFlashDeal") === "true" ? true : false,
          images: []
        }
        
        const foundIndex = products.findIndex((p) => {
          return p.id === Number(productId);
        });
        setProducts((prev) => {
          const newProducts = [...prev];
          newProducts[foundIndex] = updatedProduct;
          return newProducts;
        });
          
        if (responseData.success) {
          showSuccess('Product updated successfully')
          
        }
      } else {
        // CREATE new product
        console.log("Creating new product");
        response = await fetch(
          "https://api.dovinigears.ng/admin/product/create",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Creation failed: ${response.status} - ${errorText}`);
        }

        responseData = await response.json();
        console.log("Product created successfully:", responseData);
        const res = await fetch("https://api.dovinigears.ng/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const newProduct = data.data.find(
          (product) => product.id === responseData.id
        );
        if (responseData.success) {
          !isEditing && setProducts([...products, newProduct]);
          showSuccess(
            isEditing
              ? "Product updated successfully!"
              : "Product created successfully!"
          );
        }
      }

      // Reset editing state and navigate back
      setEditingProduct(null);
      setActiveView("products");

      // Show success toast
    } catch (error) {
      console.error("Error saving product:", error);

      // Handle specific error types
      let errorMessage = error.message;
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (error.message.includes("timed out")) {
        errorMessage =
          "The server is taking too long to respond. Please try again in a moment.";
      }

      // Show error toast
      showError(`Failed to save product: ${errorMessage}`);
    }
  };

  // --- Order Management Handlers (Updated for backend API) ---

  const handleApproveOrder = async (id) => {
 

       try {
      let response;

      
        console.log("Updating product with ID from FormData:", id);
        response = await fetch(
          `https://api.dovinigears.ng/admin/orders/process`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId: id, status: "approved" }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Update failed: ${response.status} - ${errorText}`);
        }
           setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "approved" } : order
      )
    );

      }catch (error) {
        showError("Error approving order:", error);

      }

  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)

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
            categories={categories}
          />
        );
      case "orders":
        return <OrderList orders={orders} handleApprove={handleApproveOrder} />;
      case "customers":
        return <CustomerList customers={customers} />;
      case "categories":
        return <Categories handleDelete={handleCategoryDelete} categories={categories} products={products} setCategories={ setCategories} />;
      case "productForm":
        return (
          <ProductForm
            editingProduct={editingProduct}
            handleSave={handleSaveProduct}
            setActiveView={setActiveView}
            categories={categories}
          />
        );
      case "dashboard":
      default: {
        const dashboardMetrics = calculateDashboardMetrics(
          products,
          orders,
          sessions,
          customers
        );

      

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
                  <div className="font-semibold text-sm sm:text-base">
                    Total Sessions: {sessions}
                  </div>
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
                title="Monthly Revenue"
                value={`${Number(revenueMetrics.monthlyRevenue).toLocaleString(
                  "en-NG",
                  {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2,
                  }
                )}`}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Average Order Value
                  </h3>
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {`${Number(dashboardMetrics.averageOrderValue).toLocaleString(
                    "en-NG",
                    {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 2,
                    }
                  )}`}
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
                    Total Revenue <span className="text-xs text-gray-600 font-medium">(All Time)</span>
                  </h3>
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {`${Number(totalRevenue).toLocaleString(
                  "en-NG",
                  {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2,
                  }
                )}`}
                </p>
                <p className="text-xs sm:text-sm text-blue-600 mt-2">
                  ↗ 100%
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
                          ₦{(order.total || 0).toFixed(2)}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 ">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Add New Product
                    </h3>
                    <p className="text-blue-100 mt-1 text-sm">
                      Expand your inventory
                    </p>
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
                    <h3 className="text-base sm:text-lg font-semibold">
                      Process Orders
                    </h3>
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
                    <h3 className="text-base sm:text-lg font-semibold">
                      Manage Customers
                    </h3>
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

  if (loading && !ordersLoaded) {
    return <AdminLoadingSPinner />;
  }

  return (
    <div>
      <div className="flex h-screen bg-gray-100 antialiased">
        {/* Custom Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to delete product "${productToDelete?.name}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
         <ConfirmationModal
          isOpen={isCategoryModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to delete category "${categoryToDelete?.name}"? This action cannot be undone.`}
          onConfirm={confirmCategoryDelete}
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
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold text-gray-800">
                Admin Dashboard
              </h1>
              {/* Spacer for centering */}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 pb-16 sm:pb-20 lg:pb-24">
              <div className="max-w-7xl mx-auto">{renderContent()}</div>
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-medium">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>© 2025 Dovini Gears</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashBoard;
