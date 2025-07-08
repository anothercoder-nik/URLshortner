import React from 'react';
import UrlForm from '../components/UrlForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">One Link. Endless Reach.</h1>
      <UrlForm/>
    </div>
  </div>
  );
};

export default Home;
