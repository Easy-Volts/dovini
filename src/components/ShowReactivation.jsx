import React from 'react'
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

const ShowReactivation = ({ showReactivationModal, setShowReactivationModal }) => {
  const navigate = useNavigate()

  const handleReactivate = () => {
    setShowReactivationModal(false);
    navigate('/account-activation');
  };

  const handleClose = () => {
    setShowReactivationModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!showReactivationModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Brand Colors */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-6 text-center relative">
          <ShieldCheck className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Security Verification Required</h3>
          <p className="text-red-100">For your protection</p>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
            type="button"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Account Reactivation Required
            </h4>
            <p className="text-gray-600 leading-relaxed">
              For security reasons, your account has been temporarily deactivated after the profile update.
              To continue using your account, please verify your identity and reactivate it.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleReactivate}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
              style={{ pointerEvents: 'auto' }}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Reactivate Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              type="button"
              style={{ pointerEvents: 'auto' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowReactivation