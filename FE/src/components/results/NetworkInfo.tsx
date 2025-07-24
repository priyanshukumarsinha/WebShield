import React from 'react';
import type { Network } from '../../types';
import { formatYesNo } from '../../utils/formatter';

interface NetworkInfoProps {
  network: Network;
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({ network }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Network Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">IP Address</p>
          <p className="font-medium font-mono">{network.ipAddress}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Country</p>
          <p className="font-medium">{network.country}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">ASN</p>
          <p className="font-medium">{network.asn}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">AS Name</p>
          <p className="font-medium">{network.asName}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">RBL Blacklisted</p>
          <p className={`font-medium ${network.rblBlacklisted ? 'text-red-600' : 'text-green-600'}`}>
            {formatYesNo(network.rblBlacklisted)}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Passive DNS Count</p>
          <p className="font-medium">{network.passiveDnsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkInfo;