/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const WithAuthProvider = <T extends object>(Component: FC<T>) => {
  return (props: T) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('auth');

      if (!accessToken) {
        router.push('/sign-in');
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default WithAuthProvider;
