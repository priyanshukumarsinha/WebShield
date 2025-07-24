const axios = require('axios');
const { URL } = require('url');

let phishTankUrls = new Set();
let lastUpdate = null;

/**
 * Updates the PhishTank URL cache from their public feed
 */
const updatePhishTankCache = async () => {
  try {
    console.log('Updating PhishTank cache...');
    const response = await axios.get('https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-domains-ACTIVE.txt', {
      timeout: 30000,
      headers: {
        'User-Agent': 'WebShield Security Scanner/1.0'
      }
    });

    const domains = new Set();
    
    // Parse the text file line by line
    const lines = response.data.split('\n');
    lines.forEach(line => {
      const domain = line.trim().toLowerCase();
      if (domain && !domain.startsWith('#')) {
        domains.add(domain);
      }
    });

    phishTankUrls = domains;
    lastUpdate = new Date();
    console.log(`PhishTank cache updated with ${domains.size} domains`);
  } catch (error) {
    console.error('Failed to update PhishTank cache:', error.message);
    // If this is the first update attempt and it failed, retry after 1 minute
    if (!lastUpdate) {
      console.log('Initial cache update failed, retrying in 1 minute...');
      setTimeout(updatePhishTankCache, 60 * 1000);
    }
  }
};

// Update cache on startup
updatePhishTankCache();

// Update cache every hour
setInterval(updatePhishTankCache, 60 * 60 * 1000);

/**
 * Checks domain against PhishTank public feed
 */
const check = async (domain) => {
  try {
    // Handle case where cache hasn't been initialized
    if (phishTankUrls.size === 0) {
      return {
        phishTankFlagged: false,
        lastUpdate: null,
        error: 'PhishTank cache not yet initialized'
      };
    }

    // Normalize domain
    const normalizedDomain = domain.toLowerCase();
    
    // Check if domain is in our cache
    const phishTankFlagged = phishTankUrls.has(normalizedDomain);

    return { 
      phishTankFlagged,
      lastUpdate: lastUpdate ? lastUpdate.toISOString() : null
    };
  } catch (error) {
    console.error('PhishTank check error:', error.message);
    return { 
      phishTankFlagged: false,
      lastUpdate: null,
      error: `Check Error: ${error.message}`
    };
  }
};

module.exports = { check };