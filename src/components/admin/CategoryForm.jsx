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
import {  UploadCloud, Image } from "lucide-react";

const CategoryForm = ({
  editingCategory,
  setActiveView,
  isModal,
  onClose,
  setCategories,
}) => {
  const { showSuccess, showError } = useToast();
  const isEditing = !!editingCategory;
   const initialData = editingCategory || {
    name: "",
    image: null,
    description: ""

  };
  
  
    // Array to hold the selected file objects (for upload)
    const [selectedFiles, setSelectedFiles] = useState([]);
    // Array to hold the local URLs or existing remote URLs (for preview)
    const [previewImages, setPreviewImages] = useState(() => {
      if (editingCategory && editingCategory.image) {
        return editingCategory.image;
      }
      return initialData.image;
    });
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || "",
        description: editingCategory.description || "",
        image: editingCategory.image || null,
      });
    } else {
      setFormData({
        name: "",
        description: "",

        image: null,
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
    

         const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      

      if(isEditing){
        formDataToSend.append("id", editingCategory.id);
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
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
        image: data.image,
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

   // Helper function to calculate total file size in bytes
  const getTotalFileSize = (files) => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  // Helper function to format bytes to human readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length > 0) {
      const currentTotalSize = getTotalFileSize(selectedFiles);
      const newFilesSize = getTotalFileSize(newFiles);
      const wouldBeTotalSize = currentTotalSize + newFilesSize;

      const maxSize = 4 * 1024 * 1024; // 4MB in bytes

      if (wouldBeTotalSize > maxSize) {
        showError(
          `Total image size would be ${formatBytes(
            wouldBeTotalSize
          )}, which exceeds the 4MB limit. ` +
            `Current total: ${formatBytes(currentTotalSize)}. ` +
            `Please remove some images first or select smaller files.`
        );
        e.target.value = null;
        return;
      }

      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      setPreviewImages((prevUrls) => [...prevUrls, ...newPreviewUrls]);

      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, ...newPreviewUrls],
      }));

      showSuccess(
        `Added ${newFiles.length} image(s) (${formatBytes(newFilesSize)}). ` +
          `Total size: ${formatBytes(wouldBeTotalSize)} / 4MB`
      );
    }
    e.target.value = null;
  };

  const handleRemoveImage = (indexToRemove) => {
    const urlToRemove = previewImages[indexToRemove];

    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    if (urlToRemove.startsWith("blob:")) {
      setSelectedFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
      URL.revokeObjectURL(urlToRemove);
    }

    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, index) => index !== indexToRemove),
    }));
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const fileInputRef = React.useRef(null);
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

            {/* --- Multi-File Upload/Preview Section --- */}
        <section>
          

          <div className="mb-6 border p-4 rounded-xl space-y-4 bg-gray-50">
            <label className={labelClass}>
              Upload Image (PNG, JPG, up to 10 files, max 4MB total)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
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
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">
                  {previewImages.length} Image(s) Selected
                </p>
                <div className="text-sm text-gray-600">
                  {(() => {
                    const totalSize = getTotalFileSize(selectedFiles);
                    const maxSize = 4 * 1024 * 1024; // 4MB
                    const percentage = (totalSize / maxSize) * 100;
                    const isNearLimit = percentage > 80;

                    return (
                      <span
                        className={`font-medium ${
                          isNearLimit
                            ? "text-red-600"
                            : totalSize > maxSize
                            ? "text-red-700"
                            : "text-gray-600"
                        }`}
                      >
                        {formatBytes(totalSize)} / 4MB ({percentage.toFixed(1)}
                        %)
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Size warning bar */}
              {(() => {
                const totalSize = getTotalFileSize(selectedFiles);
                const maxSize = 4 * 1024 * 1024;
                const percentage = Math.min((totalSize / maxSize) * 100, 100);

                if (totalSize === 0) return null;

                return (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        percentage > 90
                          ? "bg-red-500"
                          : percentage > 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                );
              })()}

              {(() => {
                const totalSize = getTotalFileSize(selectedFiles);
                const remainingSize = Math.max(0, 4 * 1024 * 1024 - totalSize);

                if (remainingSize < 1024 * 1024) {
                  // Less than 1MB remaining
                  return (
                    <p className="text-xs text-red-600 font-medium">
                      ⚠️ Only {formatBytes(remainingSize)} remaining! Remove
                      some images to add more.
                    </p>
                  );
                }
                return null;
              })()}

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
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
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

            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="isLimitedStock"
                name="isLimitedStock"
                checked={formData.isLimitedStock}
                onChange={handleChange}
                className="w-5 h-5 text-red-500 rounded border-gray-300 focus:ring-red-500"
              />
              <label
                htmlFor="isLimitedStock"
                className="text-base font-medium text-gray-900"
              >
                Limited Stock Item
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
          </div>
        </section>

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
