const safeBrowsingService = require('./checks/safeBrowsing');
const phishTankService = require('./checks/phishTank');
const whoisService = require('./checks/whois');
const dnsService = require('./checks/dns');
const tlsService = require('./checks/tls');
const headersService = require('./checks/headers');
const networkService = require('./checks/network');
const threatFeedsService = require('./checks/threatFeeds');
const heuristicsService = require('./checks/heuristics');
const { calculateScore } = require('./scoring');
const virusTotalService = require('./checks/virusTotal');
const trancoRankService = require('./checks/trancoRank');


/**
 * Main domain scanning service that orchestrates all security checks
 */
const scanDomain = async (domain) => {
  console.log(`Starting comprehensive scan for domain: ${domain}`);
  
  try {
    // Run all checks in parallel
    // const [
    //   safeBrowsing,
    //   phishTank,
    //   whois,
    //   dns,
    //   tls,
    //   headers,
    //   network,
    //   threatFeeds,
    //   heuristics
    // ] = await Promise.all([
    //   safeBrowsingService.check(domain),
    //   phishTankService.check(domain),
    //   whoisService.check(domain),
    //   dnsService.check(domain),
    //   tlsService.check(domain),
    //   headersService.check(domain),
    //   networkService.check(domain),
    //   threatFeedsService.check(domain),
    //   heuristicsService.check(domain)
    // ]);

    const [
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
] = await Promise.all([
  safeBrowsingService.check(domain),
  phishTankService.check(domain),
  whoisService.check(domain),
  dnsService.check(domain),
  tlsService.check(domain),
  headersService.check(domain),
  networkService.check(domain),
  threatFeedsService.check(domain),
  heuristicsService.check(domain),
  virusTotalService.check(domain),
  trancoRankService.check(domain)
]);


    // Calculate score and contributions
    // const { maliciousScore, contributions } = calculateScore({
    //   safeBrowsing,
    //   phishTank,
    //   whois,
    //   dns,
    //   tls,
    //   headers,
    //   network,
    //   threatFeeds,
    //   heuristics
    // });
    const { maliciousScore, contributions } = calculateScore({
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
});


    // Build final response
    // const result = {
    //   domain,
    //   maliciousScore,
    //   contributions,
    //   whois,
    //   dns,
    //   tls,
    //   headers,
    //   network,
    //   threatFeeds,
    //   heuristics,
    //   timestamps: {
    //     scannedAt: new Date().toISOString()
    //   }
    // };
    const result = {
  domain,
  maliciousScore,
  contributions,
  whois,
  dns,
  tls,
  headers,
  network,
  threatFeeds,
  heuristics,
  virusTotal,
  trancoRank,
  timestamps: {
    scannedAt: new Date().toISOString()
  }
};


    return result;
  } catch (error) {
    console.error(`Error scanning domain ${domain}:`, error);
    throw error;
  }
};

module.exports = {
  scanDomain
};