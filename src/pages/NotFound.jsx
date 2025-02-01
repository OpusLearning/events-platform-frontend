import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container text-center mt-5" role="main">
      <header>
        <h1 className="display-1 text-danger" role="banner">404</h1>
      </header>
      <section>
        <p className="lead">Sorry, the page you are looking for does not exist.</p>
        <p>Please check the URL or return to the homepage.</p>
      </section>
      <section>
        <Link to="/" className="btn btn-primary" aria-label="Return to Home">
          Return Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
