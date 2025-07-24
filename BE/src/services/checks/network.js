const dns = require('dns').promises;

/**
 * Performs network reputation checks on a domain
 */
const check = async (domain) => {
  const defaultResponse = {
    ipAddress: null,
    asn: null,
    asName: null,
    country: null,
    rblBlacklisted: false,
    passiveDnsCount: 0
  };

  try {
    let ipAddress = null;
    try {
      const addresses = await dns.resolve4(domain);
      ipAddress = addresses && addresses.length > 0 ? addresses[0] : null;
    } catch (error) {
      return {
        ...defaultResponse,
        error: `DNS Resolution Error: ${error.message}`
      };
    }
    
    if (!ipAddress) {
      return {
        ...defaultResponse,
        error: 'Could not resolve domain to IP address'
      };
    }
    
    const asn = simulateASN(ipAddress);
    const asName = simulateASName(asn);
    const country = simulateCountry(ipAddress);
    const rblBlacklisted = simulateRBLCheck(ipAddress);
    const passiveDnsCount = simulatePassiveDNSCount();
    
    return {
      ipAddress,
      asn,
      asName,
      country,
      rblBlacklisted,
      passiveDnsCount
    };
  } catch (error) {
    return {
      ...defaultResponse,
      error: `Network Check Error: ${error.message}`
    };
  }
};

const simulateASN = (ip) => {
  const firstOctet = parseInt(ip.split('.')[0]);
  return `AS${(firstOctet * 100) + Math.floor(Math.random() * 1000)}`;
};

const simulateASName = (asn) => {
  const asnNames = [
    'Amazon AWS',
    'Google Cloud',
    'Microsoft Corporation',
    'OVH SAS',
    'Digital Ocean',
    'Cloudflare',
    'Linode',
    'Rackspace',
    'Hetzner Online GmbH',
    'HostGator'
  ];
  
  const asnNumber = parseInt(asn.replace('AS', ''));
  const index = asnNumber % asnNames.length;
  return asnNames[index];
};

const simulateCountry = (ip) => {
  const countries = ['US', 'CA', 'UK', 'DE', 'FR', 'JP', 'AU', 'BR', 'IN', 'NL'];
  const firstOctet = parseInt(ip.split('.')[0]);
  const index = firstOctet % countries.length;
  return countries[index];
};

const simulateRBLCheck = (ip) => {
  return Math.random() < 0.05;
};

const simulatePassiveDNSCount = () => {
  return Math.floor(Math.random() * 50) + 1;
};

module.exports = { check };