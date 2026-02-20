// Authentication.jsx
import React, { useState } from "react";

const Authentication = () => {
  const [mode, setMode] = useState("login"); // login | register
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  /* -------------------- Helpers -------------------- */

  const resetState = () => {
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setMessage("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    resetState();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------- Validation -------------------- */

  const validate = () => {
    const newErrors = {};

    if (mode === "register" && !form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "register") {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- Fake API -------------------- */

  const fakeApiCall = () =>
    new Promise((resolve) => setTimeout(resolve, 1500));

  /* -------------------- Submit -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);
    try {
      await fakeApiCall();

      if (mode === "login") {
        setMessage("Login successful 🎉");
      } else {
        setMessage("Registration successful ✅ You can now login.");
      }

      resetState();
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>{mode === "login" ? "Admin Login" : "Admin Registration"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          {mode === "register" && (
            <div style={styles.field}>
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
          )}

          <div style={styles.field}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <div style={styles.passwordBox}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="******"
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

          {mode === "register" && (
            <div style={styles.field}>
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="******"
              />
              {errors.confirmPassword && (
                <span style={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.switch}>
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => switchMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => switchMode("login")}>Login</span>
            </>
          )}
        </div>
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
    background: "#f4f4f4",
  },
  card: {
    width: "360px",
    padding: "24px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  field: {
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
  },
  passwordBox: {
    display: "flex",
    gap: "6px",
  },
  toggleBtn: {
    padding: "6px 10px",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  message: {
    marginTop: "12px",
    textAlign: "center",
    color: "green",
  },
  switch: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Authentication;
