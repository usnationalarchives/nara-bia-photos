import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scroll from '@threespot/freeze-scroll';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scroll.unfreeze();
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
