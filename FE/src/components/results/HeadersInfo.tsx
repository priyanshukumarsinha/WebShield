import React from 'react';
import type { Headers } from '../../types';
import { formatYesNo } from '../../utils/formatter';

interface HeadersInfoProps {
  headers: Headers;
}

const HeadersInfo: React.FC<HeadersInfoProps> = ({ headers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">HTTP Headers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Status Code</p>
          <p className={`font-medium ${
            headers.statusCode >= 200 && headers.statusCode < 300 
              ? 'text-green-600' 
              : headers.statusCode >= 300 && headers.statusCode < 400
                ? 'text-amber-600'
                : 'text-red-600'
          }`}>
            {headers.statusCode}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Server</p>
          <p className="font-medium">{headers.server || 'Not disclosed'}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Cloudflare Ray ID</p>
          <p className="font-medium">{headers.cfRay || 'Not present'}</p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">HTTP Strict Transport Security (HSTS)</p>
          <p className={`font-medium ${headers.hsts ? 'text-green-600' : 'text-red-600'}`}>
            {formatYesNo(headers.hsts)}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Content Security Policy (CSP)</p>
          <p className={`font-medium ${headers.csp ? 'text-green-600' : 'text-red-600'}`}>
            {formatYesNo(headers.csp)}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">X-Frame-Options</p>
          <p className={`font-medium ${headers.xFrameOptions ? 'text-green-600' : 'text-red-600'}`}>
            {formatYesNo(headers.xFrameOptions)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeadersInfo;