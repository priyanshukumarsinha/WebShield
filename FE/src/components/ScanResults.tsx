import React from 'react';
import type { ScanResult, Recommendation } from '../types';
import MaliciousScore from './results/MaliciousScore';
import ContributionsTable from './results/ContributionsTable';
import WhoisInfo from './results/WhoisInfo';
import DnsInfo from './results/DnsInfo';
import TlsInfo from './results/TlsInfo';
import HeadersInfo from './results/HeadersInfo';
import NetworkInfo from './results/NetworkInfo';
import ThreatFeedsInfo from './results/ThreatFeedsInfo';
import HeuristicsInfo from './results/HeuristicsInfo';
import VirusTotalInfo from './results/VirusTotalInfo';
import TrancoRankInfo from './results/TrancoRankInfo';
import TimestampInfo from './results/TimestampInfo';
import Recommendations from './results/Recommendations';

interface ScanResultsProps {
  result: ScanResult;
  recommendations: Recommendation[];
}

const ScanResults: React.FC<ScanResultsProps> = ({ result, recommendations }) => {
  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <MaliciousScore score={result.maliciousScore} />
        </div>
        
        <div className="lg:col-span-2">
          <ContributionsTable contributions={result.contributions} />
        </div>
        
        <WhoisInfo whois={result.whois} />
        <DnsInfo dns={result.dns} />
        
        <TlsInfo tls={result.tls} />
        <HeadersInfo headers={result.headers} />
        
        <NetworkInfo network={result.network} />
        <ThreatFeedsInfo threatFeeds={result.threatFeeds} />
        
        <HeuristicsInfo heuristics={result.heuristics} />
        <VirusTotalInfo virusTotal={result.virusTotal} />
        
        <TrancoRankInfo trancoRank={result.trancoRank} />
        <TimestampInfo timestamps={result.timestamps} />
        
        <div className="lg:col-span-2">
          <Recommendations recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default ScanResults;