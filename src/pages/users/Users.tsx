import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableView from '../../components/Tables/TableView';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBox from '../../components/SearchBox';
import { AiOutlineEye } from 'react-icons/ai';
import { GET_ALL_USER } from '../../utils/actions/User';

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const columns = [
    {
      id: 'Image',
      label: 'Image',
      rander: (item) => (
        <img
          src={item.imageUrl}
          alt={item.fullName}
          className="h-16 w-16 object-cover rounded"
        />
      ),
    },
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'mobile', label: 'Mobile' },
    {
      id: 'address',
      label: 'Address',
      rander: (item) => `${item.address.city}, ${item.address.state}`,
    },
    {
      id: 'action',
      label: 'Action',
      rander: (item) => (
        <button onClick={() => navigate(`/users/view/${item._id}`)}>
          <AiOutlineEye size={20} />
        </button>
      ),
    },
  ];

  const handlePagination = (currentPage) =>
    getAllUsers(currentPage, pagination.limit, search);

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    getAllUsers(1, newLimit, search);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    getAllUsers(1, pagination.limit, value);
  };

  const getAllUsers = async (page, limit, query) => {
    try {
      setIsLoading(true);
      const res = await GET_ALL_USER(page, limit, query);
      console.log(res, 'checkRes');
      setData(res?.data?.data?.data || []);
      setPagination({
        total: res?.data?.data?.pagination?.total || 0,
        page: res?.data?.data?.pagination?.page || 1,
        limit: res?.data?.data?.pagination?.limit || 10,
      });
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers(1, pagination.limit, '');
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <SearchBox handleChange={handleSearchChange} />
        </div>
      </div>
      <TableView
        rows={data}
        columns={columns}
        count={pagination.total}
        handlePagination={handlePagination}
        handleLimitChange={handleLimitChange}
        initialLimit={pagination.limit}
        isLoading={isLoading}
      />
    </DefaultLayout>
  );
};

export default Users;
