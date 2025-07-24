const axios = require('axios');

/**
 * Checks HTTP security headers for a domain
 */
const check = async (domain) => {
  const defaultResponse = {
    server: null,
    cfRay: null,
    hsts: false,
    csp: false,
    xFrameOptions: false,
    referrerPolicy: null,
    hasSecureReferrerPolicy: false,
    statusCode: null
  };

  try {
    const response = await axios.get(`https://${domain}`, {
      timeout: 5000,
      validateStatus: () => true,
      maxRedirects: 5,
      headers: {
        'User-Agent': 'WebShield Security Scanner/1.0'
      }
    });
    
    const headers = response.headers;
    
    const referrerPolicy = headers['referrer-policy'];
    const secureReferrerPolicies = [
      'no-referrer',
      'strict-origin',
      'strict-origin-when-cross-origin',
      'same-origin',
      'no-referrer-when-downgrade'
    ];
    const hasSecureReferrerPolicy = referrerPolicy && 
      secureReferrerPolicies.includes(referrerPolicy.toLowerCase());
    
    return {
      ...defaultResponse,
      server: headers['server'] || null,
      cfRay: headers['cf-ray'] || null,
      hsts: Boolean(headers['strict-transport-security']),
      csp: Boolean(headers['content-security-policy']),
      xFrameOptions: Boolean(headers['x-frame-options']),
      referrerPolicy,
      hasSecureReferrerPolicy,
      statusCode: response.status
    };
  } catch (error) {
    return {
      ...defaultResponse,
      error: `Request Error: ${error.message}`
    };
  }
};

module.exports = { check };