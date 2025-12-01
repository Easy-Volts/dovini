import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo,useRef } from "react";

const CustomerList = ({ customers, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = useMemo(
    () => customers.slice(startIndex, endIndex),
    [customers, startIndex, endIndex]
  );

  // Reset to first page when customers change
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [customers.length, currentPage, totalPages]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatPhone = (phone) => {
    return phone || "Not provided";
  };

  const formatAddress = (address) => {
    return address || "Not provided";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mobile Customer Card Component
  const CustomerCard = ({ customer }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-4 overflow-hidden">
        {/* Header Section */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-base leading-tight">
                  {customer.fullName}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    customer.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {customer.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                ID: #{customer.id}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                customer.status
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  customer.status ? "bg-green-400" : "bg-red-400"
                }`}
              />
              {customer.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-4 pb-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
              Contact Information
            </span>
            <div className="space-y-1.5">
              <div>
                <span className="text-xs text-gray-500 block">Email</span>
                <span className="text-sm font-medium text-gray-900 break-all">
                  {customer.email}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Phone</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPhone(customer.phone)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-1 gap-3">
            {/* Registration Date */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">
                Registered
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {formatDate(customer.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="px-4 pb-4">
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">
              Address
            </span>
            <p className="text-sm text-gray-900 leading-relaxed">
              {formatAddress(customer.address)}
            </p>
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
                {Math.min(endIndex, customers.length)}
              </span>{" "}
              of <span className="font-medium">{customers.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => (handlePageChange(Math.max(1, currentPage - 1)),mobileRef.current.scrollIntoView({ behavior: "smooth" }))}
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
                  (typeof page === "number" && (handlePageChange(page),mobileRef.current.scrollIntoView({ behavior: "smooth" })))
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
                (handlePageChange(Math.min(totalPages, currentPage + 1)),mobileRef.current.scrollIntoView({ behavior: "smooth" }))
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

  const mobileRef = useRef(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-200 space-y-2 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800" ref={mobileRef}>
          Customer Management
        </h2>
        <div className="text-sm text-gray-700">
          Total Customers: {customers.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Customer ID",
                  "Full Name",
                  "Email",
                  "Phone",
                  "Status",
                  "Registered Date",
                  "Address",
                  "Role",
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
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-amber-50/50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPhone(customer.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {formatAddress(customer.address)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {customer.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No customers found</p>
                    <p className="text-sm">
                      Customers will appear here once they register.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4">
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">
                No customers found
              </p>
              <p className="text-sm text-gray-600">
                Customers will appear here once they register.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default CustomerList;
