import React, { useState } from "react";
import { X, UploadCloud, Save, Image } from "lucide-react";

const ProductForm = ({
  editingProduct,
  handleSave,
  setActiveView,
  categories,
}) => {
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

  // Upload images to server and get permanent URLs
  const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file, index) => {
      const formData_upload = new FormData();
      formData_upload.append("image", file); // ← The actual file

      try {
        console.log(`Uploading file ${index + 1}: ${file.name}`);

        const response = await fetch("https://api.dovinigears.ng/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData_upload, // ← File data sent here
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Upload failed for ${file.name}: ${response.status} - ${errorText}`
          );
        }

        const result = await response.json();

        // Check if the response has the expected structure
        if (result.success && result.url) {
          console.log(`✅ Uploaded ${file.name}: ${result.url}`);
          return result.url; // ← Get permanent URL back
        } else {
          throw new Error(`Invalid response format for ${file.name}`);
        }
      } catch (error) {
        console.error(`❌ Error uploading ${file.name}:`, error);
        throw error;
      }
    });

    // Wait for all uploads to complete (or fail)
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
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
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalFormData = { ...formData };

      // Handle image upload if there are new files
      if (selectedFiles.length > 0) {
        console.log("🚀 Starting image upload process...");
        console.log(`📁 Files to upload: ${selectedFiles.length}`);

        try {
          // Upload all selected files and get permanent URLs
          const uploadedUrls = await uploadImages(selectedFiles);

          // Keep existing images that are NOT blob URLs, add new uploaded URLs
          const existingUrls = previewImages.filter(
            (url) => !url.startsWith("blob:")
          );
          finalFormData.images = [...existingUrls, ...uploadedUrls];

          console.log("✅ All images uploaded successfully!");
          console.log("📸 Uploaded URLs:", uploadedUrls);
          console.log("🖼️  All product images:", finalFormData.images);
        } catch (uploadError) {
          console.error("❌ Some images failed to upload:", uploadError);
          // Continue without the new images, but inform the user
          alert(
            `Some images failed to upload: ${uploadError.message}. Product will be saved without new images.`
          );

          // Use only existing non-blob images
          const existingUrls = previewImages.filter(
            (url) => !url.startsWith("blob:")
          );
          finalFormData.images = existingUrls;
        }
      }

      // Call the save function (now async)
      console.log("💾 Saving product to database...");
      await handleSave(finalFormData, isEditing);

      // Reset form state after successful save
      setSelectedFiles([]);
      setPreviewImages([]);

      console.log("✅ Product saved successfully!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert(`Failed to save product: ${error.message}`);
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
