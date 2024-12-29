import { ScanResultsTable } from "./ScanResultsTable";

const mockResults = [
  {
    engineName: "VirusTotal",
    method: "Blacklist",
    category: "Harmless",
    result: "Undetected" as const,
    confidence: 90,
    lastUpdate: "2024-12-28",
  },
  {
    engineName: "Fortinet",
    method: "Heuristic",
    category: "Malware",
    result: "Malicious" as const,
    confidence: 95,
    lastUpdate: "2024-12-27",
  },
  {
    engineName: "Sophos",
    method: "Blacklist",
    category: "Phishing",
    result: "Malicious" as const,
    confidence: 80,
    lastUpdate: "2024-12-26",
  },
];

interface SecurityAnalysisProps {
  data: { engine: string; category: string; result: string; status: string }[];
}

export function SecurityAnalysis(data: SecurityAnalysisProps) {
  return <ScanResultsTable results={mockResults} title="Security Analysis" />;
}
