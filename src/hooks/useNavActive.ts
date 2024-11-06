import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PAGE_NAMES } from '@/constants/pageName';

export const useNavActive = () => {
  const params = useParams();

  const [activePage, setActivePage] = useState(PAGE_NAMES.HOME.link);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);
  }, [params]);

  const handleClick = (link: string) => {
    setActivePage(link);
  };

  return {
    activePage,
    setActivePage,
    handleClick
  };
};

export default useNavActive;
