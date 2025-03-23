import { useState } from 'react';
import profileImage from './assets/profile.png'; // Import the image from assets
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isAgency, setIsAgency] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePic, setProfilePic] = useState(profileImage); // State for profile picture
  const [hasAccount, setHasAccount] = useState(false); // Track if the user has created an account
  const [showCreateAccountButton, setShowCreateAccountButton] = useState(false); // Show Create Account button

  // Regex for name validation (only alphabets and spaces)
  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  // Regex for phone number validation (exactly 10 digits)
  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  // Regex for email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Regex for password validation (allows special characters)
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result); // Set the uploaded image as profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  function showSignup() {
    setCurrentPage("signup");
  }

  function showLogin() {
    setCurrentPage("login");
  }

  function showAccountSettings() {
    setCurrentPage("account-settings");
  }

  function handleLogin() {
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).");
      return;
    }

    // Check if the user has created an account
    if (!hasAccount) {
      alert("Your account doesn’t exist. Please create an account.");
      setShowCreateAccountButton(true); // Show Create Account button
      return;
    }

    // Navigate to Account Settings
    setCurrentPage("account-settings");
  }

  function handleCreateAccount() {
    // Validate Full Name
    if (!fullName || !validateName(fullName)) {
      alert("Full Name should only contain alphabets and spaces.");
      return;
    }

    // Validate Phone Number
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      alert("Phone Number should contain exactly 10 digits.");
      return;
    }

    // Validate Email
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate Password
    if (!password || !validatePassword(password)) {
      alert("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).");
      return;
    }

    // Save user details in state
    setUserDetails({
      fullName,
      email,
      phoneNumber,
      companyName,
      isAgency,
    });

    // Mark that the user has created an account
    setHasAccount(true);

    // Navigate to Account Settings
    showAccountSettings();
  }

  return (
    <div className='app-container'>
      {currentPage === "landing" && (
        <div className='landing-page'>
          <h1>Welcome to PopX</h1>
          <p>Welcome Back Please Login.New User?Please Create Account to use PopX</p>
          <button onClick={showSignup}>Create Account</button>
          <button onClick={showLogin}>Already Registered? Login</button>
        </div>
      )}

      {currentPage === "signup" && (
        <div className='signup-page'>
          <button className="back-button-create-page" onClick={() => setCurrentPage("landing")}></button>
          <h1>Create your PopX account</h1>
          <p>Fill in your details to get started.</p>
          <div className="input-group">
            <legend>Full Name<span className="required-star">*</span></legend>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Marry Doe'
              required
            />
          </div>
          <div className="input-group">
            <legend>Phone number<span className="required-star">*</span></legend>
            <input
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='1234567890'
              maxLength={10}
              required
            />
          </div>
          <div className="input-group">
            <legend>Email address<span className="required-star">*</span></legend>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@domain.com'
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
                placeholder='Password123!'
                required
              />
              <button
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <div className="input-group">
            <legend>Company name</legend>
            <input
              type='text'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder='Your Company'
            />
          </div>
          <div className="input-group agency-group">
            <legend>Are you an Agency?<span className="required-star">*</span></legend>
            <div className="agency-options">
              <label>
                <input
                  type='radio'
                  name='agency'
                  checked={isAgency === true}
                  onChange={() => setIsAgency(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type='radio'
                  name='agency'
                  checked={isAgency === false}
                  onChange={() => setIsAgency(false)}
                />
                No
              </label>
            </div>
          </div>
          <button className="create-account-button" onClick={handleCreateAccount}>Create Account</button>
        </div>
      )}

      {currentPage === "login" && (
        <div className='login-page'>
          <h1>Sign in to your PopX account</h1>
          <p>Enter your credentials below.</p>
          <div className="input-group">
            <legend>Email Address<span className="required-star">*</span></legend>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email address'
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
                placeholder='Enter password'
                required
              />
              <button
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <button className="login-button" onClick={handleLogin}>Login</button>
          {showCreateAccountButton && (
            <button className="create-account-button" onClick={showSignup}>Create Account</button>
          )}
        </div>
      )}

      {currentPage === "account-settings" && (
        <div className='account-settings-page'>
          {/* Header */}
          <div className="header">
            <h1>Account Settings</h1>
          </div>

          {/* Profile Icon and User Info */}
          <div className="profile-section">
            <div className="profile-pic-container">
              <div className="profile-pic">
                <img src={profilePic} alt="Profile" /> {/* Use profilePic state */}
                <button className="camera-icon" onClick={() => document.getElementById('profile-upload').click()}>
                  <span role="img" aria-label="camera">📷</span>
                </button>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePicUpload}
                />
              </div>
            </div>

            {/* User Info */}
            <div className="user-info">
              <p><strong>{userDetails?.fullName || "Marry Doe"}</strong></p>
              <p>{userDetails?.email || "Marry@Gmail.Com"}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="description">
            <p>Phone: {userDetails?.phoneNumber || "N/A"}</p>
            <p>Company: {userDetails?.companyName || "N/A"}</p>
            <p>Agency: {userDetails?.isAgency ? "Yes" : "No"}</p>
          </div>

          {/* Back Button */}
          <button className="back-button" onClick={() => setCurrentPage("landing")}>Back</button>
        </div>
      )}
    </div>
  );
}