import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import ChangePassword from './change-pass';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Image from 'next/image';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const tabs = ['Overview', 'Edit Profile', 'Settings', 'Change Password'];

  const defaultFields = {
    name: '',
    email: '',
    about: '',
    company: '',
    job: '',
    country: '',
    address: '',
    phone: '',
    image: '',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setEditedData(parsedUser);
    } catch (err) {
      console.error('Invalid user in localStorage', err);
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(`${process.env.NEXT_PUBLIC_API_BASE}/profile/update-profile`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/user-profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) throw new Error('Failed to fetch user data');
  
        const data = await response.json();
        setUserData(data);
        setEditedData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ✅ This is critical!
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    if (settingsSaved) {
      const timer = setTimeout(() => setSettingsSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [settingsSaved]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editedData.name || !editedData.email) {
      alert('Name and Email are required');
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
      }

      const updated = await response.json();
      const completeUpdated = { ...defaultFields, ...updated };

      setUserData(completeUpdated);
      setEditedData(completeUpdated);
      localStorage.setItem('user', JSON.stringify(completeUpdated));
      setSettingsSaved(true);
    } catch (err) {
      console.error('Update error:', err.message);
      alert('Profile update failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setEditedData({ ...editedData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleDeleteImage = async () => {
    if (!window.confirm('Are you sure you want to delete your profile image?')) {
      return;
    }
  
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/delete-profile-image`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
  
      // Update local state
      setEditedData({ ...editedData, image: '' });
      setUserData({ ...userData, image: '' });
      
      // Update localStorage
      const updatedUser = { ...userData, image: '' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      alert('Profile image deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete profile image');
    } finally {
      setSaving(false);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="about-section">
            <h3>About</h3>
            <p>{userData?.about || 'No description provided.'}</p>
            <p><strong>Full Name:</strong> {userData?.name}</p>
            <p><strong>Company:</strong> {userData?.company || 'N/A'}</p>
            <p><strong>Job:</strong> {userData?.job || 'N/A'}</p>
            <p><strong>Country:</strong> {userData?.country || 'N/A'}</p>
            <p><strong>Address:</strong> {userData?.address || 'N/A'}</p>
            <p><strong>Phone:</strong> {userData?.phone || 'N/A'}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
          </div>
        );

      case 'Edit Profile':
        return (
          <form className="edit-profile-form" onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label>Profile Image</label>
              <div className="profile-image-container">
                <Image
  src={editedData.image || '/image.png'}
  alt="Profile"
  width={120} // customize as needed
  height={120}
  className="profile-image"
  style={{ objectFit: 'cover', borderRadius: '50%' }}
/>

                {editedData.image && (
            <button
              type="button"
              className="delete-btn"
              onClick={handleDeleteImage}
              disabled={saving}
              style={{
                marginLeft: '10px',
                marginTop: '5px',
                background: '#333',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {saving ? 'Deleting...' : <FaTrash size={14} />}
            </button>
          )}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>

            {[
              { label: 'Full Name', key: 'name' },
              { label: 'About', key: 'about', isTextArea: true },
              { label: 'Company', key: 'company' },
              { label: 'Job', key: 'job' },
              { label: 'Country', key: 'country' },
              { label: 'Address', key: 'address' },
              { label: 'Phone', key: 'phone' },
              { label: 'Email', key: 'email' },
            ].map(({ label, key, isTextArea }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                {isTextArea ? (
                  <textarea
                    value={editedData[key] || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, [key]: e.target.value })
                    }
                  />
                ) : (
                  <input
                    type="text"
                    value={editedData[key] || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, [key]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {settingsSaved && <p className="success-message">Profile Saved!</p>}
          </form>
        );

      case 'Settings':
        return (
          <form
            className="settings-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSettingsSaved(true);
            }}
          >
            <h3>Settings</h3>
            {[
              { label: 'Enable Notifications', checked: true },
              { label: 'Private Profile' },
              { label: 'Show Online Status', checked: true },
            ].map(({ label, checked }, idx) => (
              <div className="form-group" key={idx}>
                <label>{label}</label>
                <input type="checkbox" defaultChecked={checked} />
              </div>
            ))}
            <div className="form-group">
              <label>Language</label>
              <select defaultValue="English">
                {['English', 'Spanish', 'French', 'German'].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select defaultValue="UTC">
                {['UTC', 'PST', 'EST', 'CST'].map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="save-btn">
              Save Settings
            </button>
            {settingsSaved && (
              <p className="success-message">Settings Saved!</p>
            )}
          </form>
        );

      case 'Change Password':
        return <ChangePassword setActiveTab={setActiveTab} />;

      default:
        return null;
    }
  };

  if (loading || !userData || !editedData) {
    return (
      <div className="profile-container">
        <Header />
        <div className="loading-section">
        {loading && <Loader />}
        </div>
        <Footer />
      </div>
    );
  }  

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <div className="profile-card">
          <img
            src={userData.image || '/image.png'}
            alt="Profile"
            className="profile-image"
            style={{ cursor: 'pointer' }}
            title="Click to refresh profile from DB"
          />
          <h2>{userData.name || 'No Name'}</h2>
          <p>{userData.job || 'No Job Title'}</p>
          <div style={{ textAlign: 'right' }}>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="profile-details">
          <div className="tabs">
            {tabs.map((tab) => (
              <span
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
          {renderTab()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
