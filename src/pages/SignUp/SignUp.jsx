import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { IoIosContact } from 'react-icons/io';
import { MdOutlineMail, MdLock } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!values.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(values.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', values);
      setSuccessMessage('Sent successfully! Please check your email.');
      
      // Clear form after successful submission
      setTimeout(() => {
        setValues({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
        setSuccessMessage('');
      }, 3000);
    } else {
      setErrors(formErrors);
    }
  };

  const handleCancel = () => {
    navigate('/signin');
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
          Create Your <span className={styles.highlight}>Account</span>
        </h1>

        {/* Full Name */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <IoIosContact className={styles.labelIcon} />
            <label htmlFor="name">Full Name:</label>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={values.name}
            onChange={handleChanges}
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

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
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <BsTelephone className={styles.labelIcon} />
            <label htmlFor="phone">Phone Number:</label>
          </div>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone Number"
            value={values.phone}
            onChange={handleChanges}
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
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
            className={errors.password ? styles.inputError : ''}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <MdLock className={styles.labelIcon} />
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Your Password"
            value={values.confirmPassword}
            onChange={handleChanges}
            className={errors.confirmPassword ? styles.inputError : ''}
          />
          {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>

        {/* Sign In Link */}
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
