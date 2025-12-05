import React, { useState } from "react";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Camera,
  Headphones,
  Laptop,
  Gamepad2,
  Shirt,
  Home,
  Heart,
} from "lucide-react";
import CategoryForm from "./CategoryForm";


const Categories = ({ handleDelete, categories ,products,setCategories}) => {
  const [isModal, setIsModal] = useState()
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleEdit = (category) => {
    setIsModal(true)
    setSelectedCategory(category)
    
  }

  const onClose = () => {
    if (selectedCategory) {
      setIsModal(false)
      setSelectedCategory(null)
    } else {
      setIsModal(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Category Management
        </h2>
        <button
          onClick={() => setIsModal(true)}
          className="flex items-center sm:px-6 sm:py-3 text-sm whitespace-nowrap px-6 justify-center py-1 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 hover:border-amber-200"
            >
              <div className="relative mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-xl bg-gray-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/200x128/94A3B8/white?text=No+Image";
                  }}
                />
                <div className="absolute -bottom-3 left-4 bg-white p-2 rounded-lg shadow-md border">
                  <IconComponent className="w-6 h-6 text-amber-600" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {category.name}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {category.productCount} products
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    ID: {category.id}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-orange-600 hover:text-orange-800 p-2 rounded-full hover:bg-orange-50 transition"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600">Total Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {products.length}
            </div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
         
        </div>
      </div>
      <CategoryForm isModal={isModal} onClose={onClose} editingCategory={selectedCategory} setCategories={setCategories} />
    </div>
  );
};

export default Categories;
