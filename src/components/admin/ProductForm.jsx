import React, { useState } from "react";
import { X, UploadCloud, Save, Image } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const ProductForm = ({
  editingProduct,
  handleSave,
  setActiveView,
  categories,
}) => {
  const { showSuccess, showError } = useToast();
  const isEditing = !!editingProduct;
  const initialData = editingProduct || {
    name: "",
    category: "",
    price: "",
    stock: "",
    originalPrice: "",
    discount: "",
    images: [],
    description: "",
    isLimitedStock: false,
    isFlashDeal: false,
    reviews: 0,
    rating: 0,
    flashDealEnd: "",
  };

  const [formData, setFormData] = useState(() => {
    if (editingProduct) {
      const categoryObj = categories.find(
        (c) => c.id === editingProduct.categoryId
      );
      return {
        ...editingProduct,
        // Ensure proper data types for form inputs
        price: editingProduct.price?.toString() || "",
        originalPrice: editingProduct.originalPrice?.toString() || "",
        discount: editingProduct.discount?.toString() || "",
        stock: editingProduct.stock?.toString() || "",
        reviews: editingProduct.reviews?.toString() || "0",
        rating: editingProduct.rating?.toString() || "0",
        isLimitedStock: Boolean(editingProduct.isLimitedStock),
        isFlashDeal: Boolean(editingProduct.isFlashDeal),
        category: categoryObj.name,
      };
    }
    return initialData;
  });
  // Array to hold the selected file objects (for upload)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Array to hold the local URLs or existing remote URLs (for preview)
  const [previewImages, setPreviewImages] = useState(() => {
    if (editingProduct && editingProduct.images) {
      return editingProduct.images;
    }
    return initialData.images;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        images: [...prev.images, ...newPreviewUrls],
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
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      showError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare FormData instead of JSON
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);

      const categoryObj = categories.find(
        (c) => c.name.toLowerCase() === formData.category.toLowerCase()
      );
      formDataToSend.append("category_id", categoryObj?.id || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("originalPrice", formData.originalPrice);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("description", formData.description);
      formDataToSend.append(
        "isLimitedStock",
        formData.isLimitedStock.toString()
      );
      formDataToSend.append("isFlashDeal", formData.isFlashDeal.toString());
      if (formData.flashDealEnd) {
        formDataToSend.append("flashDealEnd", formData.flashDealEnd);
      }

      selectedFiles.forEach((file) => {
        formDataToSend.append("image", file);
      });

      // For editing mode, include the product ID
      if (isEditing && formData.id) {
        formDataToSend.append("id", formData.id);
      }

      // Call the save function
      console.log("💾 Saving product to database...");
      await handleSave(formDataToSend, isEditing);

      // Reset form state after successful save
      setSelectedFiles([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      showError(`Failed to save product: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
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
                placeholder="Description for product"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Pricing & Stock */}
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
                placeholder="12"
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
                placeholder="10.99"
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
                placeholder="10"
              />
            </div>
            <div>
              <label className={labelClass}>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="10"
              />
            </div>
            <div>
              <label className={labelClass}>Reviews Count</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                required
                className={inputClass}
                min="0"
                placeholder="111"
              />
            </div>
            <div>
              <label className={labelClass}>Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                className={inputClass}
                min="0"
                max="5"
                step="0.1"
                placeholder="4"
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
              Upload Images (PNG, JPG, up to 10 files, max 4MB total)
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center items-center px-6 py-3 mt-8 rounded-xl font-semibold text-white transition duration-200 shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {isEditing ? "Saving Changes..." : "Creating Product..."}
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              {isEditing ? "Save Changes" : "Create Product"}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
