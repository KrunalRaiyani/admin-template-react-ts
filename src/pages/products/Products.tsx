import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableView from '../../components/Tables/TableView';
import EditIcon from '../../images/icon/EditIcon';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../images/icon/DeleteIcon';
import Swal from 'sweetalert2';
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '../../utils/actions/Products';
import { toast } from 'react-toastify';
import SearchBox from '../../components/SearchBox';

const Products = () => {
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
      rander: (item: any) => (
        <img
          src={item.images?.[0]}
          alt={item.name}
          className="h-16 w-16 object-cover rounded"
        />
      ),
    },
    { id: 'name', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'price', label: 'Price', rander: (item: any) => `$${item.price}` },
    {
      id: 'action',
      label: 'Action',
      rander: (item: any) => (
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/products/update/${item._id}`)}>
            <EditIcon />
          </button>
          <button onClick={() => handleDeleteProduct(item._id)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const handlePagination = (currentPage: any) => {
    getAllProducts(currentPage, pagination.limit, search);
  };

  const handleLimitChange = (newLimit: any) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    getAllProducts(1, newLimit, search);
  };

  const handleSearchChange = (value: any) => {
    setSearch(value);
    getAllProducts(1, pagination.limit, value);
  };

  const handleDeleteProduct = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await DELETE_PRODUCT(id);
          getAllProducts(1, pagination.limit, search);
          toast.success(
            response?.data?.message || 'Product deleted successfully',
          );
        } catch (error) {
          toast.error('Failed to delete product');
        }
      }
    });
  };

  const getAllProducts = async (page: any, limit: any, query: any) => {
    try {
      setIsLoading(true);
      const res = await GET_ALL_PRODUCTS(page, limit, query);
      setData(res?.data?.data?.result || []);
      setPagination({
        total: res?.data?.data?.pagination?.total || 0,
        page: res?.data?.data?.pagination?.page || 1,
        limit: res?.data?.data?.pagination?.limit || 10,
      });
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(1, pagination.limit, '');
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <SearchBox handleChange={handleSearchChange} />
        </div>
        <button
          className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          onClick={() => navigate('/products/add')}
        >
          Add Product
        </button>
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

export default Products;
