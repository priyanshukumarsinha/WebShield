import React from 'react';
import type { Timestamps } from '../../types';
import { formatDate } from '../../utils/formatter';

interface TimestampInfoProps {
  timestamps: Timestamps;
}

const TimestampInfo: React.FC<TimestampInfoProps> = ({ timestamps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Scan Information</h2>
      
      <div className="border-b pb-2">
        <p className="text-sm text-gray-500">Scanned At</p>
        <p className="font-medium">{formatDate(timestamps.scannedAt)}</p>
      </div>
    </div>
  );
};

export default TimestampInfo;