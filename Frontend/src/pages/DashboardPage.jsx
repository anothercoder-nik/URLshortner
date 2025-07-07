import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UserUrls from '../components/UserUrls';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('create');
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your shortened URLs and create new ones
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('create')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeTab === 'create'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Create URL
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeTab === 'manage'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage URLs
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'create' ? (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create a New Short URL</h2>
                <UrlForm />
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Shortened URLs</h2>
                <UserUrls />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
