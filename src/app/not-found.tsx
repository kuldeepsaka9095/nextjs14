import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="text-center pt-5 mt-5">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p className="lead">Could not find the requested resource.</p>
            <Link href="/" className="btn btn-custom">Go to Home</Link>
        </div>
    );
};

export default NotFound;
