import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useState, useMemo,useRef } from "react";

const OrderList = ({ orders, handleApprove,handleShiped, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const transformedOrders = useMemo(
    () =>
      orders.map((order) => ({
        id: order.order_code || `ORD-${order.id}`,
        customer: order.shippingAddress?.name || "Unknown Customer",
        amount: order.total || 0,
        date: order.date ? new Date(order.date).toLocaleDateString() : "N/A",
        status: order.status
          ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
          : "Unknown",
        rawStatus: order.status,
        orderId: order.id, // Keep original ID for backend operations
        items: order.items || [],
        shippingAddress: order.shippingAddress,
        tracking: order.tracking,
      })),
    [orders]
  );

  // Calculate pagination
  const totalPages = Math.ceil(transformedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = useMemo(
    () => transformedOrders.slice(startIndex, endIndex),
    [transformedOrders, startIndex, endIndex]
  );

  // Reset to first page when orders change
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [transformedOrders.length, currentPage, totalPages]);

  const mobileRef = useRef(null);

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
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButton = (order) => {
    if (order.rawStatus === "pending") {
      return (
        <button
          onClick={() => handleApprove(order.orderId)}
          className="text-green-600 hover:text-green-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-green-50 transition text-sm font-medium"
          title="Approve Order"
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Approve
        </button>
      );
    }
     else if (order.rawStatus === "shipped") {
      return (
        <button
          onClick={() => handleShiped(order.orderId)}
          className="text-green-600 hover:text-green-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-green-50 transition text-sm font-medium"
          title="Shipped Order"
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Shipped
        </button>
      );
    }
    return <span className="text-gray-400 text-sm">Processed</span>;
  };

    const getActionButton2 = (order) => {
  
      if (order.rawStatus === "shipped") {
      return (
        <button
          onClick={() => handleShiped(order.orderId)}
          className="text-green-600 hover:text-green-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-green-50 transition text-sm font-medium"
          title="Shipped Order"
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Shipped
        </button>
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mobile Order Card Component
  const OrderCard = ({ order }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4 border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{order.id}</h3>
            <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
          </div>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Customer:</span>
            <span className="text-xs font-medium text-gray-900">
              {order.customer}
            </span>
          </div>

          {order.shippingAddress?.phone && (
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Phone:</span>
              <span className="text-xs text-gray-900">
                {order.shippingAddress.phone}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Items:</span>
            <span className="text-xs font-medium text-gray-900">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Total:</span>
            <span className="text-xs font-semibold text-gray-900">
              ₦{order.amount.toFixed(2)}
            </span>
          </div>
        </div>

        {order.items.length > 0 && (
          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Items:</p>
            <p className="text-xs font-medium text-gray-900 truncate">
              {order.items[0].name}
              {order.items.length > 1 && ` +${order.items.length - 1} more`}
            </p>
          </div>
        )}

        {order.shippingAddress?.address && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Shipping Address:</p>
            <p className="text-xs text-gray-900 line-clamp-2">
              {order.shippingAddress.address}
            </p>
          </div>
        )}

        {order.tracking?.number && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Tracking:</p>
            <div className="text-xs">
              <p className="font-medium text-gray-900">
                {order.tracking.carrier}
              </p>
              <p className="text-gray-600">{order.tracking.number}</p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          {getActionButton(order)}
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
                {Math.min(endIndex, transformedOrders.length)}
              </span>{" "}
              of <span className="font-medium">{transformedOrders.length}</span>{" "}
              results
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
                    typeof page === "number" && (handlePageChange(page), mobileRef.current.scrollIntoView({ behavior: "smooth" }))
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-200 space-y-2 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Order Management
        </h2>
        <div className="text-sm text-gray-700" ref={mobileRef}>
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order Code",
                  "Customer",
                  "Items",
                  "Total Amount",
                  "Order Date",
                  "Status",
                  "Shipping Address",
                  "Tracking",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-amber-50/50 transition"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </div>
                      {order.shippingAddress?.phone && (
                        <div className="text-sm text-gray-500">
                          {order.shippingAddress.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.length} item(s)
                      </div>
                      {order.items.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {order.items[0].name}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{order.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">
                      {order.shippingAddress?.address || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.tracking?.number ? (
                        <div>
                          <div className="font-medium">
                            {order.tracking.carrier}
                          </div>
                          <div className="text-xs">{order.tracking.number}</div>
                        </div>
                      ) : (
                        "Not available"
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {getActionButton(order)}
                      &nbsp;
                      {getActionButton2(order)}

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm">
                      Orders will appear here once customers start purchasing.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4" >
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">
                No orders found
              </p>
              <p className="text-sm text-gray-600">
                Orders will appear here once customers start purchasing.
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

export default OrderList;
