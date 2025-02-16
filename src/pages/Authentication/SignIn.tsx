import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../images/logo/logo.svg';
import AuthLayout from '../../layout/AuthLayout';
import SideImg from '../../images/auth/sideImage.svg';
import EmailIcon from '../../images/auth/EmailIcon';
import LockIcon from '../../images/auth/LockIcon';
import { useFormik } from 'formik';
import InputField from '../../components/utils/InputField';
import { AuthSchema } from '../../utils/validationSchema';
import { HANDLE_LOGIN } from '../../utils/actions/Auth';
import Button from '../../components/Button/Button';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let res = await HANDLE_LOGIN(values);
        if (res?.status === 200) {
          localStorage.setItem('adminToken', res?.data?.data?.token);
          toast.success(res?.data?.message || 'Login successful');
          navigate('/');
        } else {
          toast.error(res?.data?.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            'An error occurred. Please try again.',
        );
      }
      setSubmitting(false);
    },
  });

  return (
    <AuthLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="h-14 block" src={Logo} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                Safeguarding Your Tomorrow, Today. Experience Peace of Mind with
                us.
              </p>
              <span className="mt-15 inline-block">
                <img src={SideImg} alt="" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Admin
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <InputField
                  type="text"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  handleChagne={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  icon={<EmailIcon />}
                  placeholder="Enter your email"
                />
                <InputField
                  type="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  handleChagne={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  icon={<LockIcon />}
                  placeholder="Enter your password"
                />
                <div className="mb-5">
                  <Button
                    type="submit"
                    loading={formik.isSubmitting}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
