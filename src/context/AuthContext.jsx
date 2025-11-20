import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import InactivityModal from "../components/InactivityModal";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      signup: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      logout: (callback) => {
        console.log("AuthProvider not available");
        if (callback) callback();
      },
      updateProfile: () => {},
      addAddress: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      updateAddress: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      deleteAddress: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      setUser: () => {},
      sendOTP: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      verifyOTP: () =>
        Promise.resolve({
          success: false,
          error: "AuthProvider not available",
        }),
      showInactivityModal: false,
      countdownTime: 30,
      cancelLogout: () => {},
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showActivationPrompt, setShowActivationPrompt] = useState(false);
  const [fullUser, setFullUser] = useState(null);

  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [countdownTime, setCountdownTime] = useState(30);

  const refreshUserData = async (userData, token) => {
    if (!userData || !userData.id) {
      console.log("No user ID available for profile refresh");
      return userData;
    }

    try {
      console.log("Refreshing user data with ID:", userData.id);
      const profileResponse = await fetch(
        `https://api.dovinigears.ng/me?user_id=${userData.user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log("Profile refresh response:", profileData);

        if (profileData.success && profileData.data) {
          const refreshedUserData = {
            ...profileData.data,
            token: token,
          };

          const normalizedUserData = {
            ...refreshedUserData,
            name:
              refreshedUserData.full_name ||
              refreshedUserData.name ||
              refreshedUserData.email,
            full_name:
              refreshedUserData.full_name ||
              refreshedUserData.name ||
              refreshedUserData.email,
          };

          console.log("Updated user data:", normalizedUserData);
          setUser(normalizedUserData);
          localStorage.setItem(
            "dovini_user",
            JSON.stringify(normalizedUserData)
          );
          return normalizedUserData;
        }
      } else {
        console.log(
          "Profile refresh failed with status:",
          profileResponse.status
        );
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
    return userData;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("dovini_token");
    const storedUser = localStorage.getItem("dovini_user");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log("Loaded user data from storage:", userData);

        if (!userData || !userData.id) {
          console.log(
            "Invalid user data detected - missing ID. Cleaning up..."
          );
          localStorage.removeItem("dovini_token");
          localStorage.removeItem("dovini_user");
          setUser(null);
          setIsLoading(false);
          return;
        }

        setUser(userData);

        refreshUserData(userData, storedToken);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("dovini_token");
        localStorage.removeItem("dovini_user");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.dovinigears.ng/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data;
      try {
        data = await response.json();
        console.log("Login response data:", data);
      } catch (parseError) {
        console.error("Failed to parse login response JSON:", parseError);
        const textResponse = await response.text();
        console.log("Raw login response text:", textResponse);
        return { success: false, error: "Server returned invalid response" };
      }

      if (!data.success) {
        if (data.error && data.error.toLowerCase().includes("not active")) {
          setShowActivationPrompt(true);
          return {
            success: false,
            error:
              "Account is not active. Please verify your email to activate your account.",
          };
        }
        return { success: false, error: data.error || "Login failed" };
      }

      if (data.data && data.data.is_active === false) {
        return {
          success: false,
          error:
            "User is not active. Please verify your email to activate your account.",
        };
      }

      const { token, ...userData } = data.data;

      const actualUserData = userData.user || userData;
      const userId = actualUserData.id;

      let completeUserData = actualUserData;
      try {
        const profileResponse = await fetch(
          `https://api.dovinigears.ng/me?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log("/me endpoint response:", profileData);

          if (profileData.success && profileData.data) {
            setFullUser(profileData.data);
            completeUserData = {
              ...profileData.data,
              token: token,
            };
          }
        }
      } catch (profileError) {
        console.error("Error fetching user profile:", profileError);
        completeUserData = {
          ...actualUserData,
          token: token,
        };
      }

      const normalizedUserData = {
        ...completeUserData,
        name:
          completeUserData.full_name ||
          completeUserData.name ||
          completeUserData.email,
        full_name:
          completeUserData.full_name ||
          completeUserData.name ||
          completeUserData.email,
      };

      console.log("Final normalized user data:", normalizedUserData);

      localStorage.setItem("dovini_token", token);
      localStorage.setItem("dovini_user", JSON.stringify(normalizedUserData));

      setUser(normalizedUserData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      if (error.message.includes("fetch")) {
        return {
          success: false,
          error:
            "Unable to connect to server. Please check your internet connection.",
        };
      }
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, phone) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.dovinigears.ng/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          full_name: name,
          phone,
          password,
        }),
      });

      let data;
      try {
        data = await response.json();
        console.log("Signup response data:", data);
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError);
        const textResponse = await response.text();
        console.log("Raw response text:", textResponse);
        return { success: false, error: "Server returned invalid response" };
      }

      if (!data.success) {
        return { success: false, error: data.error || "Signup failed" };
      }

      return {
        success: true,
        message: "Account created successfully! Please activate your account.",
      };
    } catch (error) {
      console.error("Signup error:", error);
      if (error.message.includes("fetch")) {
        return {
          success: false,
          error:
            "Unable to connect to server. Please check your internet connection.",
        };
      }
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logoutCallbackRef = useRef(null);

const setLogoutCallback = (callback) => {
  logoutCallbackRef.current = callback;
};

  const logout = (callback) => {
    setUser(null);
    localStorage.removeItem("dovini_token");
    localStorage.removeItem("dovini_user");

    localStorage.removeItem(`dovini-wishlist-user-${user?.id}`);

    if (callback) {
      callback();
    }
      else if (logoutCallbackRef.current) logoutCallbackRef.current();

  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("dovini_user", JSON.stringify(updatedUser));
    }
  };

  const addAddress = async (addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const newAddress = {
        id: Date.now(),
        ...addressData,
        isDefault: user.shippingAddresses?.length === 0,
      };

      const updatedUser = {
        ...user,
        shippingAddresses: [...(user.shippingAddresses || []), newAddress],
      };

      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem("dovini_user", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses =
        user.shippingAddresses?.map((addr) =>
          addr.id === addressId ? { ...addr, ...addressData } : addr
        ) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses,
      };

      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem("dovini_user", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteAddress = async (addressId) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses =
        user.shippingAddresses?.filter((addr) => addr.id !== addressId) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses,
      };

      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem("dovini_user", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendOTP = async (email) => {
    setIsLoading(true);
    try {
      const loginCheckResponse = await fetch(
        "https://api.dovinigears.ng/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: "dummy_password_for_otp_check",
          }),
        }
      );

      let loginCheckData;
      try {
        loginCheckData = await loginCheckResponse.json();
        console.log("Login check response data:", loginCheckData);
      } catch (parseError) {
        console.error("Failed to parse login check response JSON:", parseError);
        return { success: false, error: "Server returned invalid response" };
      }

      if (!loginCheckData.success) {
        if (
          loginCheckData.error &&
          loginCheckData.error.toLowerCase().includes("not active")
        ) {
          console.log(loginCheckData);
          return {
            success: false,
            error:
              "User is not active. Please verify your email to activate your account.",
          };
        } else if (
          loginCheckData.error &&
          (loginCheckData.error.toLowerCase().includes("not found") ||
            loginCheckData.error.toLowerCase().includes("invalid email"))
        ) {
          return {
            success: false,
            error: "No account found with this email address.",
          };
        }
      }

      const response = await fetch("https://api.dovinigears.ng/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await response.json();
        console.log("Send OTP response data:", data);
      } catch (parseError) {
        console.error("Failed to parse send OTP response JSON:", parseError);
        const textResponse = await response.text();
        console.log("Raw send OTP response text:", textResponse);
        return { success: false, error: "Server returned invalid response" };
      }

      if (!data.success) {
        return { success: false, error: data.error || "Failed to send OTP" };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Send OTP error:", error);
      if (error.message.includes("fetch")) {
        return {
          success: false,
          error:
            "Unable to connect to server. Please check your internet connection.",
        };
      }
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email, otp, purpose = "login") => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.dovinigears.ng/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, purpose }),
      });

      let data;
      try {
        data = await response.json();
        console.log("Verify OTP response data:", data);
      } catch (parseError) {
        console.error("Failed to parse verify OTP response JSON:", parseError);
        const textResponse = await response.text();
        console.log("Raw verify OTP response text:", textResponse);
        return { success: false, error: "Server returned invalid response" };
      }

      if (!data.success) {
        return { success: false, error: data.error || "Invalid OTP" };
      }

      if (purpose === "activation") {
        return {
          success: true,
          data: {
            ...data.data,
            message: "Account activated successfully!",
          },
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Verify OTP error:", error);
      if (error.message.includes("fetch")) {
        return {
          success: false,
          error:
            "Unable to connect to server. Please check your internet connection.",
        };
      }
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const checkAccountStatus = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.dovinigears.ng/check-account-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        try {
          const loginResponse = await fetch(
            "https://api.dovinigears.ng/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: "dummy_password_check",
              }),
            }
          );

          const loginData = await loginResponse.json();

          if (loginData.error && loginData.error.includes("not active")) {
            return {
              success: true,
              data: {
                exists: true,
                is_active: false,
              },
            };
          } else if (
            loginData.error &&
            (loginData.error.includes("Invalid email") ||
              loginData.error.includes("not found"))
          ) {
            return {
              success: true,
              data: {
                exists: false,
                is_active: false,
              },
            };
          } else {
            return {
              success: true,
              data: {
                exists: true,
                is_active: true,
              },
            };
          }
        } catch (loginError) {
          console.error("Alternative check also failed:", loginError);
          return { success: true, data: { exists: true, is_active: true } };
        }
      }

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          data: {
            exists: data.data.exists,
            is_active: data.data.is_active,
          },
        };
      } else {
        return { success: true, data: { exists: true, is_active: true } };
      }
    } catch (error) {
      console.error("Check account status error:", error);

      return { success: true, data: { exists: true, is_active: true } };
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.dovinigears.ng/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        return { success: false, error: "Server returned invalid response" };
      }

      if (!data.success) {
        if (data.error && data.error.toLowerCase().includes("not active")) {
          return {
            success: false,
            error:
              "User is not active. Please verify your email to activate your account.",
          };
        }
        return { success: false, error: data.error || "Login failed" };
      }

      if (data.data && data.data.is_active === false) {
        return {
          success: false,
          error:
            "User is not active. Please verify your email to activate your account.",
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Password validation error:", error);
      if (error.message.includes("fetch")) {
        return {
          success: false,
          error:
            "Unable to connect to server. Please check your internet connection.",
        };
      }
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const inactivityTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const INACTIVITY_LIMIT = 5 * 60 * 1000;
  const COUNTDOWN_START = 30;

  const startInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    clearInterval(countdownIntervalRef.current);

    setShowInactivityModal(false);
    setCountdownTime(COUNTDOWN_START);

    inactivityTimerRef.current = setTimeout(() => {
      setShowInactivityModal(true);
      startCountdown();
    }, INACTIVITY_LIMIT - COUNTDOWN_START * 1000);
  };

const nav = useNavigate()


  const startCountdown = () => {
    setIsCountdownActive(true);
    clearInterval(countdownIntervalRef.current);

    countdownIntervalRef.current = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          setIsCountdownActive(false);
          logout();
          setShowInactivityModal(false)
          nav('/login')
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelLogout = () => {
    clearInterval(countdownIntervalRef.current);
    setIsCountdownActive(false);
    setShowInactivityModal(false);
    startInactivityTimer();
  };

  const handleUserActivity = () => {
    if (!user) return;

    if (isCountdownActive || showInactivityModal) return;

    startInactivityTimer();
  };

  useEffect(() => {
    if (!user) return;

    startInactivityTimer();

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((e) =>
      document.addEventListener(e, handleUserActivity, true)
    );

    return () => {
      events.forEach((e) =>
        document.removeEventListener(e, handleUserActivity, true)
      );
      clearTimeout(inactivityTimerRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, [user]);

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    fullUser,
    updateAddress,
    deleteAddress,
    setLogoutCallback,
    setUser,
    sendOTP,
    verifyOTP,
    checkAccountStatus,
    setShowActivationPrompt,
    validatePassword,
    showActivationPrompt,
    showInactivityModal,
    countdownTime,
    cancelLogout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <InactivityModal
        isOpen={showInactivityModal}
        countdownTime={countdownTime}
        onCancel={cancelLogout}
        userName={user?.name?.split(" ")[0] || "User"}
      />
    </AuthContext.Provider>
  );
};
