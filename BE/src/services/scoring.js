/**
 * Calculates the malicious score based on all checks
 */
const calculateScore = (results) => {
  const {
    safeBrowsing,
    phishTank,
    whois,
    dns,
    tls,
    headers,
    network,
    threatFeeds,
    heuristics,
    virusTotal,
    trancoRank
  } = results;

  const contributions = [];

  // Google Safe Browsing
  if (safeBrowsing.safeBrowsingFlagged) {
    contributions.push({
      feature: 'Google Safe Browsing',
      description: 'Domain flagged by Google Safe Browsing',
      weight: 50
    });
  }

  // PhishTank (public feed)
  if (phishTank.phishTankFlagged) {
    contributions.push({
      feature: 'PhishTank (public feed)',
      description: 'Domain found in PhishTank verified list',
      weight: 30
    });
  }

  // Domain Age
  if (typeof whois.ageDays === 'number' && whois.ageDays >= 0 && whois.ageDays < 60) {
    contributions.push({
      feature: 'Domain Age',
      description: `Recently created domain (${whois.ageDays} days)`,
      weight: 20
    });
  }

  // Cloudflare NS
  if (dns.usingCloudflareNS) {
    contributions.push({
      feature: 'Cloudflare NS',
      description: 'Domain using Cloudflare nameservers',
      weight: 10
    });
  }

  // SPF Record
  if (!dns.spfRecord) {
    contributions.push({
      feature: 'Missing SPF',
      description: 'Domain missing SPF record',
      weight: 5
    });
  }

  // DMARC Record
  if (!dns.dmarcRecord) {
    contributions.push({
      feature: 'Missing DMARC',
      description: 'Domain missing DMARC record',
      weight: 5
    });
  }

  // TLS Certificate
 if (typeof tls.daysToExpiry === 'number' && tls.daysToExpiry >= 0 && tls.daysToExpiry < 7) {
    contributions.push({
      feature: 'SSL Expiry',
      description: `SSL certificate expires soon (${tls.daysToExpiry} days)`,
      weight: 15
    });
  }

  // Security Headers
  if (!headers.hsts) {
    contributions.push({
      feature: 'Missing HSTS',
      description: 'Site missing HTTP Strict Transport Security header',
      weight: 5
    });
  }

  if (!headers.csp) {
    contributions.push({
      feature: 'Missing CSP',
      description: 'Site missing Content Security Policy header',
      weight: 5
    });
  }

  if (!headers.xFrameOptions) {
    contributions.push({
      feature: 'Missing X-Frame-Options',
      description: 'Site missing X-Frame-Options header',
      weight: 3
    });
  }

  // Network reputation
  if (network.rblBlacklisted) {
    contributions.push({
      feature: 'IP Blacklisted',
      description: 'Domain IP address is blacklisted',
      weight: 20
    });
  }

  // JS Obfuscation
  
 if (typeof heuristics.jsObfuscationScore === 'number' && heuristics.jsObfuscationScore > 0.5){
    contributions.push({
      feature: 'JS Obfuscation',
      description: `High JavaScript obfuscation score (${heuristics.jsObfuscationScore})`,
      weight: 15
    });
  }

  // Redirect Chain
  if (heuristics.redirectChainLength > 3) {
    contributions.push({
      feature: 'Redirect Chain',
      description: `Long redirect chain (${heuristics.redirectChainLength} redirects)`,
      weight: 10
    });
  }

  // External Form Destinations
  if (heuristics.externalFormDestinations > 0) {
    contributions.push({
      feature: 'External Forms',
      description: `Forms submit to external domains (${heuristics.externalFormDestinations} destinations)`,
      weight: 15
    });
  }

  // VirusTotal Detection
  if (virusTotal && virusTotal.enginesFlagged > 0) {
    contributions.push({
      feature: 'VirusTotal Detection',
      description: `Flagged by ${virusTotal.enginesFlagged} security engines`,
      weight: 25
    });
  }

  // Tranco Rank
  if (trancoRank && trancoRank.rank !== null) {
    if (!trancoRank.trustworthy) {
      contributions.push({
        feature: 'Domain Reputation',
        description: `Low Tranco rank (${trancoRank.rank})`,
        weight: 10
      });
    }
  }

  // Calculate total score
  const maliciousScore = contributions.reduce((total, item) => total + item.weight, 0);

  return { maliciousScore, contributions };
};

module.exports = {
  calculateScore
};
