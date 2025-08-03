import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UserUrls from '../components/UserUrls';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user, isGuest } = useSelector((state) => state.auth);
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
                {isGuest 
                  ? "You're in guest mode. Your URLs will be temporary and won't be saved permanently."
                  : "Manage your shortened URLs and create new ones"
                }
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <div className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium">
                {user?.email}
              </div>
              {isGuest && (
                <div className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm font-medium">
                  Guest Mode
                </div>
              )}
            </div>
          </div>
          
          {/* Guest Mode Notice */}
          {isGuest && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Guest Mode Active
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      You're using the app in guest mode. Your shortened URLs will work temporarily but won't be permanently saved. 
                      To save your URLs permanently, please create an account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                {isGuest ? 'Recent URLs' : 'Manage URLs'}
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
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {isGuest ? 'Your Recent URLs' : 'Your Shortened URLs'}
                </h2>
                {isGuest && (
                  <p className="text-sm text-gray-600 mb-4">
                    These are your recent URLs created in guest mode. They will be cleared when you exit guest mode.
                  </p>
                )}
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
