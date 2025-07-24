import React from 'react';
import type { Recommendation } from '../../types';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
      
      <div className="divide-y divide-gray-200">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="py-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-medium text-gray-900">{recommendation.issue}</h3>
                <p className="mt-1 text-sm text-gray-600">{recommendation.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;