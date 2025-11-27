import { PlusCircle,Star,Zap,Edit2 ,Trash2 } from "lucide-react";



const ProductList = ({ products, handleDelete, startEdit, setActiveView, categories }) => (

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
          {products.map((product) => {
            const matchedCategory = categories.find((c) => c.id === product.categoryId)
            return (
              <tr key={product.id} className="hover:bg-amber-50/50 transition">
              {/* Product Info */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : product.image || "https://placehold.co/40x40/94A3B8/white?text=P"
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/40x40/94A3B8/white?text=P";
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
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {matchedCategory.name}
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <div className="font-semibold text-base">
                  ${product.price?.toFixed(2)}
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
                <div className={`font-medium ${product.stock <= 10 ? 'text-red-600' : product.stock <= 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {product.stock} units
                </div>
              </td>
              
              {/* Reviews & Rating */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
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
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductList