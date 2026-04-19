import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const loggedInUser = await authService.login(email, password);

      if (!loggedInUser) {
        setError("Email atau password salah");
        return;
      }

      login(loggedInUser);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      
      <div className="bg-white w-full max-w-[400px] p-8 sm:p-10 rounded-[1rem] shadow-[0_2px_40px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Selamat Datang
          </h1>
        </div>

        {/* FORM INPUTS */}
        <div className="space-y-3">
          
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all tracking-wide"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          
        </div>

        {error && (
          <p className="text-center text-xs text-red-500 font-medium mt-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-4 bg-black text-white rounded-full py-3.5 text-sm font-semibold hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;