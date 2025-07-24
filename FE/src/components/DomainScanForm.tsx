import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface DomainScanFormProps {
  onSubmit: (domain: string) => void;
  isLoading: boolean;
}

const DomainScanForm: React.FC<DomainScanFormProps> = ({ onSubmit, isLoading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim() && !isLoading) {
      onSubmit(domain.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
    >
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain name (e.g., example.com)"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 
                     bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 
                     focus:border-blue-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !domain.trim()}
        className={`${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Scanning...
          </div>
        ) : (
          'Scan'
        )}
      </button>
    </form>
  );
};

export default DomainScanForm;