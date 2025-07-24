export interface ScanResult {
  maliciousScore: number;
  contributions: Contribution[];
  whois: Whois;
  dns: Dns;
  tls: Tls;
  headers: Headers;
  network: Network;
  threatFeeds: ThreatFeeds;
  heuristics: Heuristics;
  virusTotal: VirusTotal;
  trancoRank: TrancoRank;
  timestamps: Timestamps;
}

export interface Contribution {
  feature: string;
  description: string;
  weight: number;
}

export interface Whois {
  registrar: string | null;
  creationDate: string | null;
  updatedDate: string | null;
  expirationDate: string | null;
  nameServers: string[];
  status: string[];
  ageDays: number;
}

export interface Dns {
  usingCloudflareNS: boolean;
  mxRecords: MxRecord[];
  spfRecord: string;
  dmarcRecord: string | null;
}

export interface MxRecord {
  exchange: string;
  priority: number;
}

export interface Tls {
  issuer: string;
  validFrom: string;
  validTo: string;
  daysToExpiry: number;
  tlsVersion: string;
  ciphers: string[];
  ctLogEntries: number;
}

export interface Headers {
  server: string | null;
  cfRay: string | null;
  hsts: boolean;
  csp: boolean;
  xFrameOptions: boolean;
  statusCode: number;
}

export interface Network {
  ipAddress: string;
  asn: string;
  asName: string;
  country: string;
  rblBlacklisted: boolean;
  passiveDnsCount: number;
}

export interface ThreatFeeds {
  phishTank: boolean;
  openPhish: boolean;
  urlHaus: boolean;
}

export interface Heuristics {
  jsObfuscationScore: string;
  redirectChainLength: number;
  externalFormDestinations: number;
}

export interface VirusTotal {
  enginesFlagged: number;
  engines: string[];
}

export interface TrancoRank {
  rank: number;
  trustworthy: boolean;
}

export interface Timestamps {
  scannedAt: string;
}

export interface Recommendation {
  issue: string;
  action: string;
}