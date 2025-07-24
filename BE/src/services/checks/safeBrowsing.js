const axios = require('axios');

/**
 * Checks domain against Google Safe Browsing API
 */
const check = async (domain) => {
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_KEY;
    if (!apiKey) {
      console.warn('Google Safe Browsing API key not configured');
      return { safeBrowsingFlagged: false, error: 'API key not configured' };
    }

    const requestBody = {
      client: {
        clientId: 'webshield',
        clientVersion: '1.0.0'
      },
      threatInfo: {
        threatTypes: [
          'MALWARE',
          'SOCIAL_ENGINEERING',
          'UNWANTED_SOFTWARE',
          'POTENTIALLY_HARMFUL_APPLICATION'
        ],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [
          { url: `http://${domain}` },
          { url: `https://${domain}` }
        ]
      }
    };

    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      requestBody,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      }
    );

    const matches = response.data.matches || [];
    const safeBrowsingFlagged = matches.length > 0;

    return { safeBrowsingFlagged };
  } catch (error) {
    console.error('Google Safe Browsing API error:', error.message);
    return { 
      safeBrowsingFlagged: false, 
      error: `API Error: ${error.message}`
    };
  }
};

module.exports = { check };