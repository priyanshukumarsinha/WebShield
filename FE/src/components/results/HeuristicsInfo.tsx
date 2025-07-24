import React from 'react';
import type { Heuristics } from '../../types';

interface HeuristicsInfoProps {
  heuristics: Heuristics;
}

const HeuristicsInfo: React.FC<HeuristicsInfoProps> = ({ heuristics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Heuristics Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">JS Obfuscation Score</p>
          <p className={`font-medium ${
            parseFloat(heuristics.jsObfuscationScore) > 0.5 ? 'text-red-600' : 
            parseFloat(heuristics.jsObfuscationScore) > 0.2 ? 'text-amber-600' : 
            'text-green-600'}`}>
            {heuristics.jsObfuscationScore}
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Redirect Chain Length</p>
          <p className={`font-medium ${
            heuristics.redirectChainLength > 3 ? 'text-red-600' : 
            heuristics.redirectChainLength > 1 ? 'text-amber-600' : 
            'text-green-600'}`}>
            {heuristics.redirectChainLength} redirects
          </p>
        </div>
        
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">External Form Destinations</p>
          <p className={`font-medium ${
            heuristics.externalFormDestinations > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {heuristics.externalFormDestinations}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeuristicsInfo;