const dns = require('dns').promises;

/**
 * Performs DNS checks for a domain
 */
const check = async (domain) => {
  try {
    // Run all DNS queries in parallel
    const [nameservers, mxRecords, txtRecords] = await Promise.all([
      resolveSafely(dns.resolveNs, domain),
      resolveSafely(dns.resolveMx, domain),
      resolveSafely(dns.resolveTxt, domain)
    ]);

    // Check if using Cloudflare nameservers
    const usingCloudflareNS = checkCloudflareNS(nameservers);
    
    //----------------------------------------
    
    //----------------------------------------
    
    // Extract SPF and DMARC records from TXT records
    // const { spfRecord, dmarcRecord } = extractDnsRecords(txtRecords, domain);
    const { spfRecord, dmarcRecord } = await extractDnsRecords(txtRecords, domain);


    return {
      usingCloudflareNS,
      mxRecords: normalizeMxRecords(mxRecords),
      spfRecord,
      dmarcRecord
    };
  } catch (error) {
    console.error('DNS check error:', error.message);
    return {
      usingCloudflareNS: false,
      mxRecords: [],
      spfRecord: null,
      dmarcRecord: null,
      error: `DNS Error: ${error.message}`
    };
  }
};

/**
 * Safely resolves DNS records, returning empty array on error
 */
const resolveSafely = async (resolveFunction, domain) => {
  try {
    return await resolveFunction(domain);
  } catch (error) {
    // Return empty array on failure (NXDOMAIN, etc.)
    return [];
  }
};

/**
 * Checks if any nameserver is a Cloudflare nameserver
 */
const checkCloudflareNS = (nameservers) => {
  if (!nameservers || nameservers.length === 0) return false;
  
  return nameservers.some(ns => 
    ns.toLowerCase().endsWith('.cloudflare.com')
  );
};

const extractDnsRecords = async (txtRecords, domain) => {
  let spfRecord = null;
  let dmarcRecord = null;

  if (txtRecords && txtRecords.length > 0) {
    // Find SPF record
    for (const record of txtRecords) {
      const recordStr = record.join('');
      if (recordStr.toLowerCase().startsWith('v=spf1 ')) {
        spfRecord = recordStr;
        break;
      }
    }
  }

  // Check for DMARC record at _dmarc subdomain
  try {
    const dmarcTxt = await resolveSafely(dns.resolveTxt, `_dmarc.${domain}`);
    for (const record of dmarcTxt) {
      const recordStr = record.join('');
      if (recordStr.toLowerCase().startsWith('v=dmarc1')) {
        dmarcRecord = recordStr;
        break;
      }
    }
  } catch (error) {
    // Ignore DMARC resolution errors
  }

  return { spfRecord, dmarcRecord };
};


/**
 * Normalizes MX records to a simple array of { exchange, priority }
 */
const normalizeMxRecords = (mxRecords) => {
  if (!mxRecords || !Array.isArray(mxRecords)) return [];
  
  return mxRecords.map(mx => ({
    exchange: mx.exchange,
    priority: mx.priority
  }));
};

module.exports = { check };
