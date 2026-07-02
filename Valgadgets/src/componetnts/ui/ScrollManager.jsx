import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map();

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // PUSH | POP | REPLACE
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;

    // ✅ SAVE scroll position before leaving page
    return () => {
      scrollPositions.set(prevPath.current, window.scrollY);
      prevPath.current = currentPath;
    };
  }, [location.pathname]);

  useEffect(() => {
    const savedPosition = scrollPositions.get(location.pathname);

    if (navType === 'POP' && savedPosition !== undefined) {
      // 🔙 BACK BUTTON → restore position
      window.scrollTo({
        top: savedPosition,
        behavior: 'instant',
      });
    } else {
      // 🆕 NEW PAGE → scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }, [location.pathname, navType]);

  return null;
}
