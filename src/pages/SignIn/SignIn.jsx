import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { MdOutlineMail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", { ...values, rememberMe });
      setSuccessMessage("Sent successfully! Please check your email.");

      // Simulate successful login
      setTimeout(() => {
        setSuccessMessage("");
        // Navigate to home or dashboard
        navigate("/");
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page or show modal
    console.log("Forgot password clicked");
  };

  return (
    <div className={styles.formContainer}>
      {successMessage && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✓</span>
          {successMessage}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.headingWord}>
          Welcome <span className={styles.highlight}>Back</span>
        </h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        {/* Email */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <MdOutlineMail className={styles.labelIcon} />
            <label htmlFor="email">Email Address:</label>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={values.email}
            onChange={handleChanges}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <MdLock className={styles.labelIcon} />
            <label htmlFor="password">Password:</label>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={values.password}
            onChange={handleChanges}
            className={errors.password ? styles.inputError : ""}
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkbox}
            />
            Remember me
          </label>
          <button
            type="button"
            className={styles.forgotPassword}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        {/* Sign Up Link */}
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleSignUp}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
