import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  User,
  PlusCircle,
  AlertTriangle,
  X,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

const AddAddressModal = ({
  showAddress,
  setShowAddress,
  editingAddress,
  setEditingAddress,
  onAddAddress,
  onUpdateAddress
}) => {
  const { showSuccess, showError } = useToast();
  const [homeData, setHomeData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    isDefault: true,
    type: "Home",
  });
  const [workData, setWorkData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    isDefault: false,
    type: "Work",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle editing mode
  useEffect(() => {
    if (editingAddress) {
      if (editingAddress.type === "Home") {
        setHomeData({
          fullName: editingAddress.name || "",
          street: editingAddress.street || "",
          city: editingAddress.city || "",
          state: editingAddress.state || "",
          zip: editingAddress.zip || "",
          phone: editingAddress.phone || "",
          isDefault: editingAddress.isDefault || false,
          type: "Home",
        });
        // Reset work data when editing home
        setWorkData({
          fullName: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          isDefault: false,
          type: "Work",
        });
      } else if (editingAddress.type === "Work") {
        setWorkData({
          fullName: editingAddress.name || "",
          street: editingAddress.street || "",
          city: editingAddress.city || "",
          state: editingAddress.state || "",
          zip: editingAddress.zip || "",
          phone: editingAddress.phone || "",
          isDefault: editingAddress.isDefault || false,
          type: "Work",
        });
        // Reset home data when editing work
        setHomeData({
          fullName: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          isDefault: true,
          type: "Home",
        });
      }
    } else {
      // Reset form when not editing
      setHomeData({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        isDefault: true,
        type: "Home",
      });
      setWorkData({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        isDefault: false,
        type: "Work",
      });
    }
  }, [editingAddress]);

  const handleHomeChange = (e) => {
    const { name, value } = e.target;

    setHomeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkChange = (e) => {
    const { name, value } = e.target;

    setWorkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleHomeSave = async (e) => {
    e.preventDefault();

    if (
      !homeData.fullName ||
      !homeData.city ||
      !homeData.phone ||
      !homeData.state ||
      !homeData.street ||
      !homeData.zip
    ) {
      showError("All Home fields are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const addressData = {
        name: homeData.fullName,
        street: homeData.street,
        city: homeData.city,
        state: homeData.state,
        zip: homeData.zip,
        phone: homeData.phone,
        type: "Home",
        isDefault: homeData.isDefault
      };

      let result;
      if (editingAddress && editingAddress.type === "Home") {
        // Update existing address
        result = await onUpdateAddress(editingAddress.id, addressData);
      } else {
        // Add new address
        result = await onAddAddress(addressData);
      }

      if (result.success) {
        showSuccess(editingAddress ? "Address updated successfully!" : "Address added successfully!", 1000);
        setShowAddress(false);
        setEditingAddress(null);
      } else {
        showError(result.error || "Failed to save address. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWorkSave = async (e) => {
    e.preventDefault();

    if (
      !workData.fullName ||
      !workData.city ||
      !workData.phone ||
      !workData.state ||
      !workData.street ||
      !workData.zip
    ) {
      showError("All Work fields are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const addressData = {
        name: workData.fullName,
        street: workData.street,
        city: workData.city,
        state: workData.state,
        zip: workData.zip,
        phone: workData.phone,
        type: "Work",
        isDefault: workData.isDefault
      };

      let result;
      if (editingAddress && editingAddress.type === "Work") {
        // Update existing address
        result = await onUpdateAddress(editingAddress.id, addressData);
      } else {
        // Add new address
        result = await onAddAddress(addressData);
      }

      if (result.success) {
        showSuccess(editingAddress ? "Address updated successfully!" : "Address added successfully!", 1000);
        setShowAddress(false);
        setEditingAddress(null);
      } else {
        showError(result.error || "Failed to save address. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          showAddress ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setShowAddress(false);
          setEditingAddress && setEditingAddress(null);
        }}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          showAddress
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          <div className="p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAddress(false);
                setEditingAddress && setEditingAddress(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pr-12">
              {editingAddress ? "Edit Address" : "Shipping & Contact Information"}
            </h2>

            {/* Main Card Container */}
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-6 sm:p-8">
              {/* Conditional Content Display */}

              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center">
                  <PlusCircle className="w-6 h-6 text-red-600 mr-2" />
                  {editingAddress ? `Edit ${editingAddress.type} Address` : "Add New Shipping & Contact Details"}
                </h3>

                {/* Two-Column Layout for Home and Work */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 1. HOME ADDRESS SECTION (Primary Action) */}
                  <div className={`p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition-shadow duration-300 ${
                    editingAddress && editingAddress.type === "Work" ? "opacity-50 pointer-events-none" : "hover:shadow-red-100"
                  }`}>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 text-red-600 mr-2" />
                      Home Address
                      {editingAddress && editingAddress.type === "Work" && (
                        <span className="text-xs text-gray-500 font-normal ml-2">(Disabled - Editing Work)</span>
                      )}
                    </h4>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {/* Input fields are  for UI demonstration */}
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Full Name (e.g., Jane Doe)"
                        name="fullName"
                        value={homeData.fullName}
                        onChange={handleHomeChange}
                        disabled={editingAddress && editingAddress.type === "Work"}
                      />
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Street Address / Apt No."
                        name="street"
                        value={homeData.street}
                        onChange={handleHomeChange}
                        disabled={editingAddress && editingAddress.type === "Work"}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="City"
                          name="city"
                          value={homeData.city}
                          onChange={handleHomeChange}
                          disabled={editingAddress && editingAddress.type === "Work"}
                        />
                        <input
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="State/Region"
                          name="state"
                          value={homeData.state}
                          onChange={handleHomeChange}
                          disabled={editingAddress && editingAddress.type === "Work"}
                        />
                      </div>
                      <input
                        className=" p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Zip code"
                        name="zip"
                        value={homeData.zip}
                        onChange={handleHomeChange}
                        type="number"
                        disabled={editingAddress && editingAddress.type === "Work"}
                      />

                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Phone Number (e.g., +234...)"
                        name="phone"
                        value={homeData.phone}
                        onChange={handleHomeChange}
                        disabled={editingAddress && editingAddress.type === "Work"}
                      />
                    </form>
                  </div>


                  {/* 2. WORK ADDRESS SECTION (Secondary Action) */}
                  <div className={`p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-shadow duration-300 ${
                    editingAddress && editingAddress.type === "Home" ? "opacity-50 pointer-events-none" : "hover:shadow-gray-100"
                  }`}>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                      Work Address{" "}
                      {editingAddress && editingAddress.type === "Home" ? (
                        <span className="text-xs text-gray-500 font-normal ml-2">(Disabled - Editing Home)</span>
                      ) : (
                        <span className="text-xs text-gray-500 font-normal ml-2">(Optional)</span>
                      )}
                    </h4>
                    <form
                      className="space-y-4"
                      onSubmit={handleWorkSave}
                    >
                      {/* Input fields are  for UI demonstration */}
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Company / Full Name"
                        name="fullName"
                        value={workData.fullName}
                        onChange={handleWorkChange}
                        disabled={editingAddress && editingAddress.type === "Home"}
                      />
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Office Address / Suite No."
                        name="street"
                        value={workData.street}
                        onChange={handleWorkChange}
                        disabled={editingAddress && editingAddress.type === "Home"}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="City"
                          name="city"
                          value={workData.city}
                          onChange={handleWorkChange}
                          disabled={editingAddress && editingAddress.type === "Home"}
                        />
                        <input
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="State/Region"
                          name="state"
                          value={workData.state}
                          onChange={handleWorkChange}
                          disabled={editingAddress && editingAddress.type === "Home"}
                        />
                      </div>
                      <input
                        className=" p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Zip code"
                        name="zip"
                        value={workData.zip}
                        onChange={handleWorkChange}
                        disabled={editingAddress && editingAddress.type === "Home"}
                      />
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Work Phone Number"
                        name="phone"
                        value={workData.phone}
                        onChange={handleWorkChange}
                        disabled={editingAddress && editingAddress.type === "Home"}
                      />

                      <button
                        type="submit"
                        className={`w-full mt-4 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-md disabled:bg-gray-500 cursor-pointer ${
                          editingAddress && editingAddress.type === "Home" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting || (editingAddress && editingAddress.type === "Home")}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-t-transparent animate-spin border-white border-4 rounded-full"></div>
                            <p>Saving...</p>
                          </div>
                        ) : (
                          editingAddress && editingAddress.type === "Work" ? "Update Work Address" : "Save Work Address"
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Save Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleHomeSave}
                    className={`flex-1 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 shadow-md shadow-red-300/50 disabled:bg-gray-500 cursor-pointer ${
                      editingAddress && editingAddress.type === "Work" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting || (editingAddress && editingAddress.type === "Work")}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-transparent animate-spin border-white border-4 rounded-full"></div>
                        <p>Saving...</p>
                      </div>
                    ) : (
                      editingAddress && editingAddress.type === "Home" ? "Update Home Address" : "Save Home Address"
                    )}
                  </button>

                  <button
                    onClick={handleWorkSave}
                    className={`flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-md disabled:bg-gray-500 cursor-pointer ${
                      editingAddress && editingAddress.type === "Home" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting || (editingAddress && editingAddress.type === "Home")}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-transparent animate-spin border-white border-4 rounded-full"></div>
                        <p>Saving...</p>
                      </div>
                    ) : (
                      editingAddress && editingAddress.type === "Work" ? "Update Work Address" : "Save Work Address"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddressModal;
