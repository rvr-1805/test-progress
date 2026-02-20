// Login.jsx
import React, { useState, useEffect } from "react";

const Login = () => {
  /* -------------------- State -------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  /* -------------------- Validation -------------------- */
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- Fake API -------------------- */
  const loginApi = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@example.com" && password === "admin123") {
          resolve({ role: "admin", token: "fake-jwt-token" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1500);
    });

  /* -------------------- Handlers -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await loginApi();

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("authToken", res.token);
      setStatus("Login successful ✅ Redirecting...");
    } catch (err) {
      setStatus(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  /* -------------------- UI -------------------- */
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <div style={styles.passwordBox}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                style={styles.toggleBtn}
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}
          </div>

          <div style={styles.options}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <span style={styles.forgot}>Forgot password?</span>
          </div>

          <button type="submit" disabled={loading} style={styles.loginBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {status && (
          <p
            style={{
              ...styles.status,
              color: status.includes("successful") ? "green" : "red",
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

/* -------------------- Styles -------------------- */
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7",
  },
  card: {
    width: "380px",
    padding: "26px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  },
  field: {
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
  },
  passwordBox: {
    display: "flex",
    gap: "8px",
  },
  toggleBtn: {
    padding: "6px 10px",
    cursor: "pointer",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    fontSize: "14px",
  },
  forgot: {
    cursor: "pointer",
    color: "#4f46e5",
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  status: {
    marginTop: "14px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Login;
