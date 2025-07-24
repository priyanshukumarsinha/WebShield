import React from 'react';
import type { Tls } from '../../types';
import { formatDate } from '../../utils/formatter';

interface TlsInfoProps {
  tls: Tls;
}

const TlsInfo: React.FC<TlsInfoProps> = ({ tls }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">TLS Certificate</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Issuer</p>
          <p className="font-medium">{tls.issuer}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Valid From</p>
          <p className="font-medium">{formatDate(tls.validFrom)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Valid To</p>
          <p className="font-medium">{formatDate(tls.validTo)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Days Until Expiry</p>
          <p className={`font-medium ${
            tls.daysToExpiry < 30 ? 'text-red-600' : 
            tls.daysToExpiry < 90 ? 'text-amber-600' : 
            'text-green-600'}`}>
            {tls.daysToExpiry} days
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">TLS Version</p>
          <p className="font-medium">{tls.tlsVersion}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">CT Log Entries</p>
          <p className="font-medium">{tls.ctLogEntries}</p>
        </div>
        
        <div className="border-b pb-2 md:col-span-2">
          <p className="text-sm text-gray-500">Ciphers</p>
          <div className="font-medium font-mono text-sm bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
            {tls.ciphers.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TlsInfo;