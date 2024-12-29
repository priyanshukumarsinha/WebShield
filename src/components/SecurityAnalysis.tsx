import { ScanResultsTable } from './ScanResultsTable'

const mockResults = [
  {
    engineName: 'VirusTotal',
    method: 'Blacklist',
    category: 'Harmless',
    result: 'Undetected' as const,
    confidence: 90,
    lastUpdate: '2024-12-28',
  },
  {
    engineName: 'Fortinet',
    method: 'Heuristic',
    category: 'Malware',
    result: 'Malicious' as const,
    confidence: 95,
    lastUpdate: '2024-12-27',
  },
  {
    engineName: 'Sophos',
    method: 'Blacklist',
    category: 'Phishing',
    result: 'Malicious' as const,
    confidence: 80,
    lastUpdate: '2024-12-26',
  },
]

export function SecurityAnalysis() {
  return <ScanResultsTable results={mockResults} title="Security Analysis" />
}

