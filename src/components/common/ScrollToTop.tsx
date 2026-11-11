import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset the scroll position whenever the route or query string changes
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
