import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container py-16 sm:py-24">
      <div className="max-w-xl">
        <p className="font-display text-[7rem] font-medium leading-none tracking-[-0.05em] text-accent-600 sm:text-[10rem]">
          404
        </p>
        <h1 className="page-title mt-4">Page Not Found</h1>
        <p className="mb-8 mt-3 text-lg text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-outline">
            Browse All Phones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
