import React from 'react';
import './index.css';

export default function AccountSettingsPg({
  userDetails,
  profilePic,
  onBack,
  onProfilePicChange
}) {
  return (
    <div className='account-settings-page'>
      {/* Header */}
      <div className="header">
        <h1>Account Settings</h1>
      </div>

      {/* Profile Icon and User Info */}
      <div className="profile-section">
        <div className="profile-pic-container">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" />
            <button 
              className="camera-icon" 
              onClick={() => document.getElementById('profile-upload').click()}
            >
              <span role="img" aria-label="camera">📷</span>
            </button>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onProfilePicChange}
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
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}