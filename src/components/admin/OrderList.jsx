import { CheckCircle } from "lucide-react";

const OrderList = ({ orders, handleApprove }) => {
  // Transform backend data structure to match component expectations
  const transformedOrders = orders.map((order) => ({
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
  }));

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
          className="text-green-600 hover:text-green-800 flex items-center p-2 rounded-full hover:bg-green-50 transition"
          title="Approve Order"
        >
          <CheckCircle className="w-5 h-5 mr-1" /> Approve
        </button>
      );
    }
    return <span className="text-gray-400 text-sm">Processed</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Order Management</h2>
        <div className="sm:text-sm text-xs text-gray-700">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
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
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transformedOrders.length > 0 ? (
              transformedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-amber-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </div>
                    {order.shippingAddress?.phone && (
                      <div className="text-sm text-gray-500">
                        {order.shippingAddress.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {order.shippingAddress?.address || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {getActionButton(order)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
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
    </div>
  );
};

export default OrderList