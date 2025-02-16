import React, { ReactNode } from 'react';
import useColorMode from '../hooks/useColorMode';

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main className="flex items-center justify-center h-full">
            <div className="flex items-center mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
