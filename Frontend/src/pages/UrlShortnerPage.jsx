import React from 'react';
import UrlForm from '../components/UrlForm';

const UrlShortnerPage = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
      <UrlForm />
    </div>
  );
};

export default UrlShortnerPage;