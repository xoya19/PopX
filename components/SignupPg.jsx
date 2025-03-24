import React from 'react';
import './index.css';

export default function SignupPg({
    onBack,
    onCreateAccount,
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    companyName,
    setCompanyName,
    isAgency,
    setIsAgency
}) {
    return (
        <div className="signup-page">
            <button className="back-button-create-page" onClick={onBack}></button>
            <h1>Create your PopX account</h1>
            <p>Fill in your details to get started.</p>

            <div className="input-group">
                <legend>Full Name<span className="required-star">*</span></legend>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marry Doe"
                    required
                />
            </div>

            <div className="input-group">
                <legend>Phone number<span className="required-star">*</span></legend>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="1234567890"
                    maxLength={10}
                    required
                />
            </div>

            <div className="input-group">
                <legend>Email address<span className="required-star">*</span></legend>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    required
                />
            </div>

            <div className="input-group">
                <legend>Password<span className="required-star">*</span></legend>
                <div className="password-input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password123!"
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

            <div className="input-group">
                <legend>Company name</legend>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your Company"
                />
            </div>

            <div className="input-group agency-group">
                <legend>Are you an Agency?<span className="required-star">*</span></legend>
                <div className="agency-options">
                    <label>
                        <input
                            type="radio"
                            name="agency"
                            checked={isAgency === true}
                            onChange={() => setIsAgency(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="agency"
                            checked={isAgency === false}
                            onChange={() => setIsAgency(false)}
                        />
                        No
                    </label>
                </div>
            </div>

            <button
                className="create-account-button"
                onClick={(e) => {
                    e.preventDefault();
                    onCreateAccount();
                }}
            >
                Create Account
            </button>
        </div>
    );
}