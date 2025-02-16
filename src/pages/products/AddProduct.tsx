import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  FiUploadCloud,
  FiDollarSign,
  FiBox,
  FiFileText,
  FiTag,
  FiX,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ADD_PRODUCT } from '../../utils/actions/Products';
import { TextField } from '../../components/TextField/TextField';
import { SelectDropdown } from '../../components/Dropdowns/SelectDropdown';
import Button from '../../components/Button/Button';
import { ProductSchema } from '../../utils/validationSchema';
import { uploadImageAPI } from '../../utils/actions/ImageUpload';

const categoryOptions = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Kids', value: 'kids' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Footwear', value: 'footwear' },
  { label: 'Sportswear', value: 'sportswear' },
  { label: 'Outerwear', value: 'outerwear' },
  { label: 'Formal Wear', value: 'formal_wear' },
  { label: 'Casual Wear', value: 'casual_wear' },
  { label: 'Ethnic Wear', value: 'ethnic_wear' },
];

const AddProduct = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      images: [],
      price: '',
      category: '',
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const imageFormData = new FormData();

        if (values.images.length > 0) {
          values.images.forEach((file) => imageFormData.append('images', file));
        }

        const uploadImages = await uploadImageAPI(imageFormData);

        if (uploadImages.status === 200) {
          const sendObj = {
            ...values,
            images: uploadImages?.data?.data,
          };

          const response = await ADD_PRODUCT(sendObj);
          console.log(response, 'uploadImages');
          if (response?.status === 200) {
            toast.success(
              response?.data?.message || 'Product added successfully',
            );
            navigate('/products');
          } else {
            toast.error(response?.data?.message || 'Something want wrong');
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to add product');
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log(formik.values, 'errors');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    formik.setFieldValue('images', [...formik.values.images, ...files]);
  };

  const removeImage = (indexToRemove) => {
    const newImages = formik.values.images.filter(
      (_, index) => index !== indexToRemove,
    );
    formik.setFieldValue('images', newImages);
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Add Product"
        morePath={[{ path: '/products', title: 'Products' }]}
      />
      <div className="mx-auto p-4 bg-white dark:bg-boxdark rounded-lg shadow-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <TextField
                name="name"
                label="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                required
                icon={
                  <FiBox className="absolute left-4 top-4 text-gray-400 dark:text-bodydark2" />
                }
              />
            </div>

            <div className="relative">
              <TextField
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && formik.errors.description}
                required
                icon={
                  <FiFileText className="absolute left-4 top-4 text-gray-400 dark:text-bodydark2" />
                }
              />
            </div>

            <div className="relative">
              <TextField
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && formik.errors.price}
                required
                icon={
                  <FiDollarSign className="absolute left-4 top-4 text-gray-400 dark:text-bodydark2" />
                }
              />
            </div>

            <div className="relative">
              <SelectDropdown
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={(value) => formik.setFieldValue('category', value)}
                onBlur={formik.handleBlur}
                error={formik.touched.category && formik.errors.category}
                options={categoryOptions}
                icon={
                  <FiTag className="absolute left-4 top-4 text-gray-400 dark:text-bodydark2" />
                }
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="border-2 border-dashed border-stroke dark:border-form-strokedark rounded-lg p-6 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer">
              <div
                className="flex flex-col items-center space-y-4"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <FiUploadCloud className="w-12 h-12 text-gray-400 dark:text-bodydark2" />
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Upload Product Images
                  </p>
                  <p className="text-sm text-body dark:text-bodydark2">
                    Drag and drop files here or click to browse
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              {formik.values.images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formik.values.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={'image'}
                        className="w-full h-52 object-contain rounded-lg shadow-4"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-danger rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                      <p className="mt-1 text-xs text-body dark:text-bodydark2 truncate">
                        {image.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddProduct;
