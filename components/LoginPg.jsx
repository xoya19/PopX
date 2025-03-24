import React from 'react';
import './index.css';

export default function LoginPg({
  onBack,
  onLogin,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  showCreateAccountButton,
  onSignup
}) {
  return (
    <div className="login-page">
      <button className="back-button-create-page" onClick={onBack}></button>
      <h1>Sign in to your PopX account</h1>
      <p>Enter your credentials below.</p>

      <div className="input-group">
        <legend>Email Address<span className="required-star">*</span></legend>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="input-group">
        <legend>Password<span className="required-star">*</span></legend>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      <button className="login-button" onClick={onLogin}>
        Login
      </button>

      {showCreateAccountButton && (
        <button className="create-account-button" onClick={onSignup}>
          Create Account
        </button>
      )}
    </div>
  );
}