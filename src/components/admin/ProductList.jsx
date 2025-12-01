import {
  PlusCircle,
  Star,
  Zap,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo,useRef } from "react";

const ProductList = ({
  products,
  handleDelete,
  startEdit,
  setActiveView,
  categories,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = useMemo(
    () => products.slice(startIndex, endIndex),
    [products, startIndex, endIndex]
  );

  // Reset to first page when products change
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [products.length, currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < (rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStockColor = (stock) => {
    if (stock <= 10) return "text-red-600";
    if (stock <= 20) return "text-yellow-600";
    return "text-green-600";
  };

  const mobileRef = useRef(null);

  // Mobile Card Component
  const ProductCard = ({ product }) => {
    const matchedCategory = categories.find((c) => c.id === product.categoryId);

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-4 overflow-hidden">
        {/* Header Section */}
        <div className="p-4 pb-3">
          <div className="flex items-start space-x-3">
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : product.image ||
                    "https://placehold.co/72x72/94A3B8/white?text=P"
              }
              alt={product.name}
              className="w-18 h-18 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/72x72/94A3B8/white?text=P";
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight truncate pr-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                  {matchedCategory?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Current Price
                </span>
                <div className="text-xl font-bold text-gray-900">
                  ₦{product.price?.toFixed(2)}
                </div>
              </div>
              {product.originalPrice && (
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Was
                  </span>
                  <div className="text-sm text-gray-500 line-through">
                    ${product.originalPrice?.toFixed(2)}
                  </div>
                  {product.discount && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Stock Status */}
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">
                Stock Level
              </span>
              <span className={`text-sm font-semibold ${getStockColor(product.stock)}`}>
                {product.stock} units
              </span>
            </div>

            {/* Rating */}
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">
                Rating
              </span>
              <div className="flex items-center space-x-1.5">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ({product.reviews || 0})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="px-4 pb-3">
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                product.isLimitedStock
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  product.isLimitedStock ? "bg-red-400" : "bg-green-400"
                }`}
              />
              {product.isLimitedStock ? "Limited Stock" : "In Stock"}
            </span>
            {product.isFlashDeal && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                <Zap className="w-3 h-3 mr-1.5" />
                Flash Deal
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => startEdit(product)}
              className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 transition-colors"
              title="Modify Product"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Product
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
              title="Delete Product"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6 rounded-b-xl">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => (handlePageChange(Math.max(1, currentPage - 1)), mobileRef.current.scrollIntoView({ behavior: "smooth" }))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() =>
              (handlePageChange(Math.min(totalPages, currentPage + 1)), mobileRef.current.scrollIntoView({ behavior: "smooth" }))
            }
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, products.length)}
              </span>{" "}
              of <span className="font-medium">{products.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => (handlePageChange(Math.max(1, currentPage - 1)), mobileRef.current.scrollIntoView({ behavior: "smooth" }))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                  (typeof page === "number" && (handlePageChange(page), mobileRef.current.scrollIntoView({ behavior: "smooth" })))
                  }
                  disabled={page === "..."}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? "z-10 bg-orange-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                      : page === "..."
                      ? "text-gray-700"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                (handlePageChange(Math.min(totalPages, currentPage + 1)), mobileRef.current.scrollIntoView({ behavior: "smooth" }))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex flex-col" ref={mobileRef}>
          Product Inventory
          <span className="text-sm sm:text:md font-normal text-gray-600 sm:ml-2">
            ({products.length} products)
          </span>
        </h2>
        <button
          onClick={() => setActiveView("productForm")}
          className="flex items-center sm:px-6 sm:py-3 text-sm whitespace-nowrap px-5 py-2 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Post New Product
        </button>
      </div>

      {/* Product Display - Responsive */}
      <div className="bg-white rounded-2xl shadow-xl">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Product",
                  "Category",
                  "Pricing",
                  "Stock",
                  "Reviews & Rating",
                  "Limited Stock",
                  "Flash Deal",
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
              {currentProducts.map((product) => {
                const matchedCategory = categories.find(
                  (c) => c.id === product.categoryId
                );
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-amber-50/50 transition"
                  >
                    {/* Product Info */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : product.image ||
                                "https://placehold.co/40x40/94A3B8/white?text=P"
                          }
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md mr-3"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/40x40/94A3B8/white?text=P";
                          }}
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium ">
                        {matchedCategory?.name}
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <div className="font-semibold text-base">
                        ₦{product.price?.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500">
                          <del>${product.originalPrice?.toFixed(2)}</del>
                          {product.discount && ` (${product.discount}% off)`}
                        </div>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div
                        className={`font-medium ${getStockColor(
                          product.stock
                        )}`}
                      >
                        {product.stock} units
                      </div>
                    </td>

                    {/* Reviews & Rating */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviews || 0} reviews)
                        </span>
                      </div>
                    </td>

                    {/* Limited Stock */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.isLimitedStock
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.isLimitedStock ? "Limited" : "Normal"}
                      </span>
                    </td>

                    {/* Flash Deal */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.isFlashDeal ? (
                        <span className="text-red-600 font-semibold text-xs flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          Flash Deal
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Normal</span>
                      )}
                    </td>

                    {/* Actions */}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default ProductList;
