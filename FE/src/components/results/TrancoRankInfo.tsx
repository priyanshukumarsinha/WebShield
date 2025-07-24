import React from 'react';
import type { TrancoRank } from '../../types';
import { formatYesNo } from '../../utils/formatter';

interface TrancoRankInfoProps {
  trancoRank: TrancoRank;
}

const TrancoRankInfo: React.FC<TrancoRankInfoProps> = ({ trancoRank }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Domain Reputation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Tranco Rank</p>
          <p className={`font-medium ${
            trancoRank.rank === 0 ? 'text-gray-500' :
            trancoRank.rank > 1000000 ? 'text-red-600' :
            trancoRank.rank > 100000 ? 'text-amber-600' :
            trancoRank.rank > 10000 ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {trancoRank.rank === 0 ? 'Not ranked' : `#${trancoRank.rank.toLocaleString()}`}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Trustworthy</p>
          <p className={`font-medium ${trancoRank.trustworthy ? 'text-green-600' : 'text-red-600'}`}>
            {formatYesNo(trancoRank.trustworthy)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Tranco</strong> is a research-oriented top sites ranking that is robust against 
          manipulation, stable over time, and reproducible. A high Tranco rank indicates 
          the site is popular and well-established.
        </p>
      </div>
    </div>
  );
};

export default TrancoRankInfo;