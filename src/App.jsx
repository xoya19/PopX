import { useState } from 'react';
import WelcomePg from '../components/Welc-Pg';
import LoginPg from '../components/LoginPg';
import SignupPg from '../components/SignupPg';
import AccSettnPg from '../components/SettnPg';
import profileImage from './assets/profile.png'; 
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
      {currentPage === "landing" && <WelcomePg onSignup={showSignup} onLogin={showLogin} />}

      {currentPage === "signup" && (
        <SignupPg
          onBack={() => setCurrentPage("landing")}
          onCreateAccount={handleCreateAccount} // Changed from showAccountSettings
          fullName={fullName}
          setFullName={setFullName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          companyName={companyName}
          setCompanyName={setCompanyName}
          isAgency={isAgency}
          setIsAgency={setIsAgency}
        />
      )}

      {currentPage === "login" && (
        <LoginPg
          onBack={() => setCurrentPage("landing")}
          onLogin={handleLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showCreateAccountButton={showCreateAccountButton}
          onSignup={showSignup}
        />
      )}

      {currentPage === "account-settings" && (
        <AccSettnPg
          userDetails={userDetails}
          profilePic={profilePic}
          onBack={() => setCurrentPage("landing")}
          onProfilePicChange={handleProfilePicUpload}
        />
      )}
    </div>
  )
}