import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ product }) {
  const location = useLocation();

  // origin page (category / home / search)
  const from = location.state?.from;

  // build base breadcrumb
  const crumbs = [{ label: 'Home', path: '/' }];

  // if we know where user came from
  if (from) {
    const formattedFrom = from.replace('/', '').replace(/-/g, ' ').trim();

    crumbs.push({
      label: formattedFrom || 'Back',
      path: from,
    });
  }

  // product page (current)
  if (product) {
    crumbs.push({
      label: product.name,
      path: null,
    });
  }

  return (
    <nav className='flex items-center gap-2 text-sm text-black mb-6'>
      {crumbs.map((crumb, index) => (
        <div key={index} className='flex items-center gap-2'>
          {crumb.path ? (
            <Link
              to={crumb.path}
              className='hover:text-black/80 transition capitalize'>
              {crumb.label}
            </Link>
          ) : (
            <span className='text-black font-medium capitalize'>
              {crumb.label}
            </span>
          )}

          {index !== crumbs.length - 1 && (
            <ChevronRight size={14} className='text-black' />
          )}
        </div>
      ))}
    </nav>
  );
}
