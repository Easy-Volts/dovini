import React from 'react'

const AdminLoadingSPinner = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Beautiful Brand-Colored Loading Spinner */}
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-24 h-24 border-4 border-red-200 rounded-full animate-spin border-t-red-600"></div>
            
            {/* Middle Ring */}
            <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-red-500 border-r-red-500 rounded-full animate-spin animation-delay-150"></div>
            
            {/* Inner Ring */}
            <div className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-t-red-400 border-b-red-400 rounded-full animate-spin animation-delay-300"></div>
            
            {/* Center Dot */}
            <div className="absolute top-8 left-8 w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-pulse shadow-lg"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 w-24 h-24 bg-red-500 rounded-full opacity-20 animate-ping"></div>
          </div>
          
          {/* Loading Text with Brand Colors */}
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent animate-pulse">
              Loading Admin Dashboard
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              <span className="inline-block animate-bounce">•</span>
              <span className="inline-block animate-bounce animation-delay-100">•</span>
              <span className="inline-block animate-bounce animation-delay-200">•</span>
              <span className="ml-2">Please wait while we prepare your dashboard</span>
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '0.8s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default AdminLoadingSPinner