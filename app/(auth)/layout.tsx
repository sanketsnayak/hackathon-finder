import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='flex items-center justify-center min-h-screen mx-auto'>
      {children}
    </div>
  );
};

export default AuthLayout;
