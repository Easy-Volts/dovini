import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      signup: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      logout: () => {},
      updateProfile: () => {},
      addAddress: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      updateAddress: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      deleteAddress: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      setUser: () => {},
      sendOTP: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
      verifyOTP: () => Promise.resolve({ success: false, error: 'AuthProvider not available' }),
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and user data on app load
    const storedToken = localStorage.getItem('dovini_token');
    const storedUser = localStorage.getItem('dovini_user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('dovini_token');
        localStorage.removeItem('dovini_user');
      }
    }
    setIsLoading(false);
  }, []);

const login = async (email, password) => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Log the response for debugging
    console.log('Login response status:', response.status);
    console.log('Login response headers:', response.headers);

    let data;
    try {
      data = await response.json();
      console.log('Login response data:', data);
    } catch (parseError) {
      console.error('Failed to parse login response JSON:', parseError);
      const textResponse = await response.text();
      console.log('Raw login response text:', textResponse);
      return { success: false, error: 'Server returned invalid response' };
    }

    if (!data.success) {
      // Check if the error indicates inactive account
      if (data.error && data.error.toLowerCase().includes('not active')) {
        return { success: false, error: 'User is not active. Please verify your email to activate your account.' };
      }
      return { success: false, error: data.error || 'Login failed' };
    }

    // Check if user is inactive
    if (data.data && data.data.is_active === false) {
      return { success: false, error: 'User is not active. Please verify your email to activate your account.' };
    }

    // Store token and user data
    const { token, ...userData } = data.data;
    localStorage.setItem('dovini_token', token);
    localStorage.setItem('dovini_user', JSON.stringify(userData));

    setUser(userData);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    // Check if it's a CORS or network error
    if (error.message.includes('fetch')) {
      return { success: false, error: 'Unable to connect to server. Please check your internet connection.' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  } finally {
    setIsLoading(false);
  }
};


 const signup = async (name, email, password, phone) => {
 setIsLoading(true);
 try {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      full_name: name,
      phone,
      password,
    }),
  });

  console.log('Signup response status:', response.status);
  console.log('Signup response headers:', response.headers);

  let data;
  try {
    data = await response.json();
    console.log('Signup response data:', data);
  } catch (parseError) {
    console.error('Failed to parse response JSON:', parseError);
    const textResponse = await response.text();
    console.log('Raw response text:', textResponse);
    return { success: false, error: 'Server returned invalid response' };
  }

  if (!data.success) {
    return { success: false, error: data.error || 'Signup failed' };
  }

  
  
  return {
    success: true,
    message: 'Account created successfully! Please activate your account.'
  };
} catch (error) {
  console.error('Signup error:', error);
  if (error.message.includes('fetch')) {
    return { success: false, error: 'Unable to connect to server. Please check your internet connection.' };
  }
  return { success: false, error: 'Network error. Please try again.' };
} finally {
  setIsLoading(false);
}
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('dovini_token');
    localStorage.removeItem('dovini_user');
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
    }
  };

  const addAddress = async (addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const newAddress = {
        id: Date.now(),
        ...addressData,
        isDefault: user.shippingAddresses?.length === 0 // First address is default
      };

      const updatedUser = {
        ...user,
        shippingAddresses: [...(user.shippingAddresses || []), newAddress]
      };

      // Update JSON server
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses = user.shippingAddresses?.map(addr =>
        addr.id === addressId ? { ...addr, ...addressData } : addr
      ) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses
      };

      // Update JSON server
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteAddress = async (addressId) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses = user.shippingAddresses?.filter(addr => addr.id !== addressId) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses
      };

      // Update JSON server
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendOTP = async (email) => {
    setIsLoading(true);
    try {
      // First check if account exists and is active by making a dummy login call
      // This validates the account status before sending OTP
      const loginCheckResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: 'dummy_password_for_otp_check'
        }),
      });

      let loginCheckData;
      try {
        loginCheckData = await loginCheckResponse.json();
        console.log('Login check response data:', loginCheckData);
      } catch (parseError) {
        console.error('Failed to parse login check response JSON:', parseError);
        return { success: false, error: 'Server returned invalid response' };
      }

      // Check account status based on the login response
      if (!loginCheckData.success) {
        // If the error indicates account is not active
        if (loginCheckData.error && loginCheckData.error.toLowerCase().includes('not active')) {
          return { success: false, error: 'User is not active. Please verify your email to activate your account.' };
        }
        // If the error indicates account doesn't exist
        else if (loginCheckData.error && (loginCheckData.error.toLowerCase().includes('not found') || loginCheckData.error.toLowerCase().includes('invalid email'))) {
          return { success: false, error: 'No account found with this email address.' };
        }
        // For other login errors (like wrong password), it means account exists and is active
      }

      // If we get here, the account exists and is active, proceed to send OTP
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Send OTP response status:', response.status);
      console.log('Send OTP response headers:', response.headers);

      let data;
      try {
        data = await response.json();
        console.log('Send OTP response data:', data);
      } catch (parseError) {
        console.error('Failed to parse send OTP response JSON:', parseError);
        const textResponse = await response.text();
        console.log('Raw send OTP response text:', textResponse);
        return { success: false, error: 'Server returned invalid response' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Failed to send OTP' };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Send OTP error:', error);
      // Check if it's a CORS or network error
      if (error.message.includes('fetch')) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection.' };
      }
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email, otp, purpose = 'login') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, purpose }),
      });

      console.log('Verify OTP response status:', response.status);
      console.log('Verify OTP response headers:', response.headers);

      let data;
      try {
        data = await response.json();
        console.log('Verify OTP response data:', data);
      } catch (parseError) {
        console.error('Failed to parse verify OTP response JSON:', parseError);
        const textResponse = await response.text();
        console.log('Raw verify OTP response text:', textResponse);
        return { success: false, error: 'Server returned invalid response' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Invalid OTP' };
      }

      // If this is account activation, return success with message
      if (purpose === 'activation') {
        return {
          success: true,
          data: {
            ...data.data,
            message: 'Account activated successfully!'
          }
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Verify OTP error:', error);
      // Check if it's a CORS or network error
      if (error.message.includes('fetch')) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection.' };
      }
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const checkAccountStatus = async (email) => {
    setIsLoading(true);
    try {
      // Use the existing login endpoint to check if account exists and is active
      // We'll make a "dummy" login attempt with empty password to just check account status
      const response = await fetch('/api/check-account-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // If the endpoint doesn't exist, we'll try an alternative approach
      if (!response.ok) {
        console.log('check-account-status endpoint not available, trying alternative method');
        
        // Alternative: Try to call the existing login API with dummy credentials
        // This will give us information about whether the account exists and is active
        try {
          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: 'dummy_password_check'
            }),
          });

          const loginData = await loginResponse.json();
          
          if (loginData.error && loginData.error.includes('not active')) {
            // Account exists but is not active
            return {
              success: true,
              data: {
                exists: true,
                is_active: false
              }
            };
          } else if (loginData.error && (loginData.error.includes('Invalid email') || loginData.error.includes('not found'))) {
            // Account doesn't exist
            return {
              success: true,
              data: {
                exists: false,
                is_active: false
              }
            };
          } else {
            // Account exists and is active (got different error like invalid password)
            return {
              success: true,
              data: {
                exists: true,
                is_active: true
              }
            };
          }
        } catch (loginError) {
          console.error('Alternative check also failed:', loginError);
          // If we can't check status, assume account exists and let OTP attempt handle validation
          return { success: true, data: { exists: true, is_active: true } };
        }
      }

      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: {
            exists: data.data.exists,
            is_active: data.data.is_active
          }
        };
      } else {
        // If the API call failed, assume account exists and let OTP attempt handle validation
        return { success: true, data: { exists: true, is_active: true } };
      }
    } catch (error) {
      console.error('Check account status error:', error);
      // If we can't check status (server down), assume account exists and let OTP attempt handle validation
      return { success: true, data: { exists: true, is_active: true } };
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        return { success: false, error: 'Server returned invalid response' };
      }

      if (!data.success) {
        // Check if the error indicates inactive account
        if (data.error && data.error.toLowerCase().includes('not active')) {
          return { success: false, error: 'User is not active. Please verify your email to activate your account.' };
        }
        return { success: false, error: data.error || 'Login failed' };
      }

      // Check if user is inactive
      if (data.data && data.data.is_active === false) {
        return { success: false, error: 'User is not active. Please verify your email to activate your account.' };
      }

      // Password is valid, but don't store tokens or sign in
      return { success: true };
    } catch (error) {
      console.error('Password validation error:', error);
      if (error.message.includes('fetch')) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection.' };
      }
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setUser,
    sendOTP,
    verifyOTP,
    checkAccountStatus,
    validatePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};