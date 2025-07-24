import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { formatScoreColor, formatScoreBgColor } from '../../utils/formatter';

interface MaliciousScoreProps {
  score: number;
}

const MaliciousScore: React.FC<MaliciousScoreProps> = ({ score }) => {
  const scoreColor = formatScoreColor(score);
  const scoreBgColor = formatScoreBgColor(score);
  
  let riskLevel = 'Low Risk';
  let icon = <Shield className="h-8 w-8 text-green-500" />;
  
  if (score > 25 && score <= 50) {
    riskLevel = 'Medium Risk';
    icon = <Shield className="h-8 w-8 text-amber-500" />;
  } else if (score > 50 && score <= 75) {
    riskLevel = 'High Risk';
    icon = <AlertTriangle className="h-8 w-8 text-orange-500" />;
  } else if (score > 75) {
    riskLevel = 'Critical Risk';
    icon = <AlertTriangle className="h-8 w-8 text-red-500" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Malicious Score</h2>
        {icon}
      </div>
      
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (score / 100) * 283}
                className={scoreColor}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${scoreColor}`}>{score}</span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
          </div>
        </div>
        
        <div className={`text-lg font-semibold ${scoreColor}`}>
          {riskLevel}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className={`${scoreBgColor} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MaliciousScore;