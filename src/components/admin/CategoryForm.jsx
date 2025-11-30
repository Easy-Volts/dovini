import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const CategoryForm = ({
  editingCategory,
  handleSave,
  setActiveView,
  isModal,
  onClose,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.description) {
      showError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API integration
      console.log("💾 Saving category to database...", {
        ...formData,
        id: editingCategory?.id || Date.now(), // Mock ID generation
        createdAt: new Date().toISOString(),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the save function
      await handleSave(
        {
          ...formData,
          id: editingCategory?.id || Date.now(), // Mock ID generation
        },
        isEditing
      );

      showSuccess(
        isEditing
          ? "Category updated successfully!"
          : "Category created successfully!"
      );

      // Reset form and close
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

  // Full Page Layout (fallback)
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
