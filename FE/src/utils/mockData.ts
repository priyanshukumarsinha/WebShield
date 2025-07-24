import type { ScanResult } from '../types';

export const EXAMPLE_COM_DATA: ScanResult = {
  maliciousScore: 58,
  contributions: [
    { feature: "Domain Age", description: "Recently created domain (0 days)", weight: 20 },
    { feature: "Missing DMARC", description: "Domain missing DMARC record", weight: 5 },
    { feature: "Missing HSTS", description: "Site missing HTTP Strict Transport Security header", weight: 5 },
    { feature: "Missing CSP", description: "Site missing Content Security Policy header", weight: 5 },
    { feature: "Missing X-Frame-Options", description: "Site missing X-Frame-Options header", weight: 3 },
    { feature: "Redirect Chain", description: "Long redirect chain (4 redirects)", weight: 10 },
    { feature: "Domain Reputation", description: "Low Tranco rank (69287)", weight: 10 }
  ],
  whois: {
    registrar: null,
    creationDate: null,
    updatedDate: null,
    expirationDate: null,
    nameServers: [],
    status: [],
    ageDays: 0
  },
  dns: {
    usingCloudflareNS: false,
    mxRecords: [{ exchange: "", priority: 0 }],
    spfRecord: "v=spf1 -all",
    dmarcRecord: null
  },
  tls: {
    issuer: "DigiCert Inc",
    validFrom: "2025-01-15T00:00:00.000Z",
    validTo: "2026-01-15T23:59:59.000Z",
    daysToExpiry: 254,
    tlsVersion: "TLSv1.3",
    ciphers: ["TLS_AES_256_GCM_SHA384"],
    ctLogEntries: 5
  },
  headers: {
    server: null,
    cfRay: null,
    hsts: false,
    csp: false,
    xFrameOptions: false,
    statusCode: 200
  },
  network: {
    ipAddress: "23.215.0.136",
    asn: "AS2937",
    asName: "Rackspace",
    country: "DE",
    rblBlacklisted: false,
    passiveDnsCount: 40
  },
  threatFeeds: {
    phishTank: false,
    openPhish: false,
    urlHaus: false
  },
  heuristics: {
    jsObfuscationScore: "0.03",
    redirectChainLength: 4,
    externalFormDestinations: 0
  },
  virusTotal: {
    enginesFlagged: 0,
    engines: []
  },
  trancoRank: {
    rank: 69287,
    trustworthy: false
  },
  timestamps: {
    scannedAt: "2025-05-06T06:50:09.072Z"
  }
};