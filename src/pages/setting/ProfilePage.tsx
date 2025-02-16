import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  MdEmail,
  MdPhone,
  MdEdit,
  MdCloudUpload,
  MdVerified,
  MdAccessTime,
} from 'react-icons/md';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: 'admin@gmail.com',
    mobile: '1234567890',
    isVerified: true,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png',
    name: 'admin test',
    createdAt: '2025-02-06T16:03:33.025Z',
    updatedAt: '2025-02-07T17:02:20.250Z',
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Profile Overview Card */}
        <div className="md:col-span-4">
          <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-default">
            {/* Profile Header */}
            <div className="relative h-40 w-full rounded-t-sm bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
              <div className="absolute -bottom-12 left-6">
                <div className="relative group">
                  <img
                    src={userData.imageUrl}
                    alt={userData.name}
                    className="h-24 w-24 rounded-full border-4 border-white dark:border-boxdark-2 object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdCloudUpload className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-boxdark-2/90 text-primary hover:bg-white dark:hover:bg-boxdark-2 transition-colors"
                onClick={() => setIsEditing(!isEditing)}
              >
                <MdEdit className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-6 pt-16 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-title-md dark:text-white font-bold">
                  {userData.name}
                </h2>
                {userData.isVerified && (
                  <MdVerified className="w-5 h-5 text-meta-3" />
                )}
              </div>
              <p className="text-sm text-bodydark2 mb-6">Administrator</p>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdEmail className="w-6 h-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-bodydark2">Email Address</p>
                    <p className="font-medium dark:text-white">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdPhone className="w-6 h-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-bodydark2">Phone Number</p>
                    <p className="font-medium dark:text-white">
                      {userData.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdAccessTime className="w-6 h-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-bodydark2">Member Since</p>
                    <p className="font-medium dark:text-white">
                      {new Date(userData.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="md:col-span-8">
          <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-default p-6">
            <h3 className="text-title-md dark:text-white font-semibold mb-6">
              Profile Settings
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={userData.name}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:bg-whiter dark:disabled:bg-boxdark-2"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:bg-whiter dark:disabled:bg-boxdark-2"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={userData.mobile}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:bg-whiter dark:disabled:bg-boxdark-2"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
