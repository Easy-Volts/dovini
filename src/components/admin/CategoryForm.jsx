import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  SunMedium,
  Focus,
  Cpu,
  Lightbulb,
  BatteryCharging,
  Package,
  Video,
  Zap,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

const CategoryForm = ({
  editingCategory,
  setActiveView,
  isModal,
  onClose,
  setCategories,
}) => {
  const { showSuccess, showError } = useToast();
  const isEditing = !!editingCategory;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || "",
        description: editingCategory.description || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CATEGORY_IMAGES = [
    "https://images.openai.com/thumbnails/url/WSbURnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70cw1NrwoO8Y7MLAkrcNTNKAmszC1zS88xNbNIyc8Ny6kw9jLLTYuPd3VNVyu2NTQAAB6oJYw",

    "https://images.unsplash.com/photo-1574281813181-02b512471486?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "https://burst.shopifycdn.com/photos/black-microphone-set-against-a-pink-background.jpg?exif=0&format=pjpg&iptc=0&width=1000",

    "https://lumecube.com/cdn/shop/files/Studio_Panel_Lighting_Kit_UCSD-09339-1160x1500-64b44e5_1160x.jpg?v=1704215663",

    "https://www.lighting-geek.com/wp-content/uploads/2023/05/14-3-1-e1689965711325.png",

    "https://freestockfootagearchive.com/wp-content/uploads/2019/08/Glitchy-Shapes-Strobe-Light-Overlay-Effect.jpeg",

    "https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-studio-lighting-isolated-on-black02-11-10-e852f1a4722511624c5d4d237891e5857f2abad0c0b13f9912f6708d40fc8dfd.jpg",
    "https://www.ulanzi.com/cdn/shop/files/2_2x-2.png?v=1753167291",
  ];

  const CATEGORY_ICONS = [
    SunMedium,
    Focus,
    Cpu,
    Zap,
    Lightbulb,
    BatteryCharging,
    Package,
    Video,
  ];

  const getRandomImage = () => {
    return CATEGORY_IMAGES[Math.floor(Math.random() * CATEGORY_IMAGES.length)];
  };

  const getRandomIcon = () => {
    return CATEGORY_ICONS[Math.floor(Math.random() * CATEGORY_ICONS.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      showError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("adminToken");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const url = isEditing
        ? "https://api.dovinigears.ng/admin/category/update"
        : "https://api.dovinigears.ng/admin/category/create";
      const payload = isEditing
        ? { id: editingCategory.id, ...formData }
        : { ...formData };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      const newCategory = {
        id: data.id,
        name: data.name,
        description: data.description,
        image: getRandomImage(),
        icon: getRandomIcon(),
      };

      if (!isEditing) {
        setCategories((prev) => [...prev, newCategory]);
      } else {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === newCategory.id ? newCategory : cat))
        );
      }

      showSuccess(
        isEditing
          ? "Category updated successfully!"
          : "Category created successfully!"
      );

      setFormData({
        name: "",
        description: "",
      });

      if (isModal && onClose) {
        onClose();
      } else {
        setActiveView("categories");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      showError(`Failed to save category: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      setActiveView("categories");
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div
      className={`fixed inset-0 bg-black/60 transition duration-300 bg-opacity-50 flex items-center justify-center z-50 p-4 ${
        isModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className={labelClass}>Category Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g., Photography Equipment"
            />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Brief description of the category..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex justify-center items-center px-4 py-3 rounded-lg font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isEditing ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {isEditing ? "Save Changes" : "Create Category"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
