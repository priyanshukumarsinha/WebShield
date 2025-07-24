import React from 'react';
import type { VirusTotal } from '../../types';

interface VirusTotalInfoProps {
  virusTotal: VirusTotal;
}

const VirusTotalInfo: React.FC<VirusTotalInfoProps> = ({ virusTotal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">VirusTotal Analysis</h2>
      
      {virusTotal.enginesFlagged === 0 ? (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                No security vendors flagged this domain as malicious
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {virusTotal.enginesFlagged} security {virusTotal.enginesFlagged === 1 ? 'vendor' : 'vendors'} flagged this domain as malicious
              </p>
            </div>
          </div>
        </div>
      )}
      
      {virusTotal.engines.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">Flagged by:</p>
          <ul className="list-disc pl-5">
            {virusTotal.engines.map((engine, index) => (
              <li key={index} className="text-sm text-gray-600">{engine}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VirusTotalInfo;