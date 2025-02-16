import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-toastify';
import { GET_USER_DATA_BYID } from '../../utils/actions/User';
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdRefresh,
  MdVerified,
  MdAccessTime,
  MdPerson,
  MdWork,
  MdLanguage,
  MdDateRange,
} from 'react-icons/md';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await GET_USER_DATA_BYID(id);
        setUser(res?.data?.data || null);
      } catch (error) {
        toast.error('Failed to load user details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin-1.5">
            <MdRefresh className="w-8 h-8 text-primary" />
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!user) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-bodydark dark:text-bodydark1">User not found</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="User Details"
        morePath={[{ path: '/users', title: 'Users' }]}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Enhanced User Profile Card */}
        <div className="md:col-span-4">
          <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-default">
            {/* Profile Header */}
            <div className="relative h-40 w-full rounded-t-sm bg-gradient-to-b from-primary/25 to-primary/10">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <img
                    src={user?.imageUrl}
                    alt={user?.fullName}
                    className="h-24 w-24 rounded-full border-4 border-white dark:border-boxdark-2 object-cover"
                  />
                  {user?.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-meta-3 p-1 rounded-full">
                      <MdVerified className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pt-16 pb-6">
              {/* Name and Status */}
              <div className="text-center mb-6">
                <h2 className="text-title-md dark:text-white font-bold mb-1">
                  {user?.fullName}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                    user?.isVerified
                      ? 'bg-meta-3/10 text-meta-3'
                      : 'bg-meta-1/10 text-meta-1'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {user?.isVerified
                    ? 'Verified Account'
                    : 'Pending Verification'}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdEmail className="w-5 h-5 text-primary dark:text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-bodydark2 mb-0.5">Email</p>
                    <p className="text-sm font-medium dark:text-white">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdPhone className="w-5 h-5 text-primary dark:text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-bodydark2 mb-0.5">Phone</p>
                    <p className="text-sm font-medium dark:text-white">
                      {user?.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdPerson className="w-5 h-5 text-primary dark:text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-bodydark2 mb-0.5">Username</p>
                    <p className="text-sm font-medium dark:text-white">
                      @
                      {user?.username ||
                        user?.fullName.toLowerCase().replace(/\s+/g, '_')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <MdDateRange className="w-5 h-5 text-primary dark:text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-bodydark2 mb-0.5">
                      Member Since
                    </p>
                    <p className="text-sm font-medium dark:text-white">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <h4 className="text-title-sm dark:text-white font-bold mb-1">
                    245
                  </h4>
                  <p className="text-sm text-bodydark2">Total Orders</p>
                </div>
                <div className="text-center p-3 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <h4 className="text-title-sm dark:text-white font-bold mb-1">
                    $12.5k
                  </h4>
                  <p className="text-sm text-bodydark2">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section remains the same */}
        <div className="md:col-span-8">
          <div className="h-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-default p-6">
            {/* Address Section */}
            <div className="mb-8">
              <h3 className="text-title-sm dark:text-white font-semibold mb-4 flex items-center gap-2">
                <MdLocationOn className="w-6 h-6" />
                Address Information
              </h3>
              <div className="text-body dark:text-bodydark2 space-y-2">
                <p>{user?.address.fullAddress}</p>
                <p>
                  {user?.address.city}, {user?.address.state} -{' '}
                  {user?.address.pincode}
                </p>
              </div>
            </div>

            {/* Account Details Section */}
            <div>
              <h3 className="text-title-sm dark:text-white font-semibold mb-4 flex items-center gap-2">
                <MdCalendarToday className="w-6 h-6" />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body dark:text-bodydark2">
                <div className="p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <div className="flex items-center gap-2 mb-1 text-sm text-bodydark2">
                    <MdCalendarToday className="w-4 h-4" />
                    <span>Created At</span>
                  </div>
                  <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <div className="flex items-center gap-2 mb-1 text-sm text-bodydark2">
                    <MdAccessTime className="w-4 h-4" />
                    <span>Last Updated</span>
                  </div>
                  <p>{new Date(user?.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-sm bg-gray-2 dark:bg-boxdark-2">
                  <div className="flex items-center gap-2 mb-1 text-sm text-bodydark2">
                    <MdVerified className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user?.isVerified ? 'bg-meta-3' : 'bg-meta-1'
                      }`}
                    ></span>
                    <span>
                      {user?.isVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDetail;
