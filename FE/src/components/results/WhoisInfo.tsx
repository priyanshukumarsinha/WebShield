import React from 'react';
import type { Whois } from '../../types';
import { formatDate } from '../../utils/formatter';

interface WhoisInfoProps {
  whois: Whois;
}

const WhoisInfo: React.FC<WhoisInfoProps> = ({ whois }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">WHOIS Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Registrar</p>
          <p className="font-medium">{whois.registrar || 'Not Available'}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Domain Age</p>
          <p className="font-medium">{whois.ageDays} days</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Creation Date</p>
          <p className="font-medium">{formatDate(whois.creationDate)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Updated Date</p>
          <p className="font-medium">{formatDate(whois.updatedDate)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Expiration Date</p>
          <p className="font-medium">{formatDate(whois.expirationDate)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">{whois.status.length ? whois.status.join(', ') : 'None'}</p>
        </div>
        
        <div className="border-b pb-2 md:col-span-2">
          <p className="text-sm text-gray-500">Name Servers</p>
          <p className="font-medium">
            {whois.nameServers.length 
              ? whois.nameServers.join(', ') 
              : 'None'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoisInfo;