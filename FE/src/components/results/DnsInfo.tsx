import React from 'react';
import type { Dns } from '../../types';
import { formatYesNo } from '../../utils/formatter';

interface DnsInfoProps {
  dns: Dns;
}

const DnsInfo: React.FC<DnsInfoProps> = ({ dns }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">DNS Records</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Using Cloudflare Nameservers</p>
          <p className="font-medium">{formatYesNo(dns.usingCloudflareNS)}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">SPF Record</p>
          <p className="font-medium font-mono text-sm bg-gray-50 p-1 rounded">
            {dns.spfRecord || 'None'}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">DMARC Record</p>
          <p className="font-medium font-mono text-sm bg-gray-50 p-1 rounded">
            {dns.dmarcRecord || 'None'}
          </p>
        </div>
        
        <div className="border-b pb-2 md:col-span-2">
          <p className="text-sm text-gray-500">MX Records</p>
          {dns.mxRecords.length > 0 && dns.mxRecords[0].exchange ? (
            <ul className="list-disc pl-5 mt-1">
              {dns.mxRecords.map((record, index) => (
                <li key={index} className="font-medium">
                  {record.exchange} (Priority: {record.priority})
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium">None</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DnsInfo;