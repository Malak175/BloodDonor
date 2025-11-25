// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من الحقول
    if (!formData.username || !formData.email || !formData.password || !formData.age) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(dispatch, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: Number(formData.age),
      });

      // نجاح التسجيل
      toast.success("Account created successfully! Redirecting to login...");
      
      // ننتظر ثانيتين ثم نروح للوجين
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error(error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">

          {/* الصورة */}
          <div className="hidden lg:flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/WhatsApp Image 2025-11-01 at 20.08.39_f4d36964.jpg')" }}>
            <div className="bg-black bg-opacity-40 w-full h-full flex items-center justify-center">
              <h1 className="text-white text-5xl font-bold">Blood Donation System</h1>
            </div>
          </div>

          {/* النموذج */}
          <div className="p-8 lg:p-12">
            <h2 className="text-4xl font-bold text-center text-red-700 mb-8">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input type="text" name="username" value={formData.username} onChange={handleChange}
                placeholder="Username" required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition" />

              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Email" required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition" />

              <input type="password" name="password" value={formData.password} onChange={handleChange}
                placeholder="Password" required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition" />

              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                placeholder="Confirm Password" required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition" />

              <select name="gender" value={formData.gender} onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input type="number" name="age" value={formData.age} onChange={handleChange}
                placeholder="Age" min="18" max="70" required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition" />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-xl transition transform hover:scale-105 disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-bold hover:underline">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;