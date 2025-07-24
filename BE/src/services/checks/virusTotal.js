// src/services/checks/virusTotal.js
const axios = require('axios');

/**
 * Checks a domain against the VirusTotal v3 API using the scan→analysis flow.
 * Returns an object with:
 *  - enginesFlagged: number of engines that marked it malicious
 *  - engines: array of engine names that flagged it
 *  - error: optional error message if something went wrong
 */
async function check(domain) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    console.warn('VirusTotal API key not configured');
    return {
      enginesFlagged: 0,
      engines: [],
      error: 'API key not configured',
    };
  }

  const headers = {
    'x-apikey': apiKey,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    // Step 1: Submit the URL for scanning
    const urlToScan = `https://${domain}`;
    const scanResponse = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      new URLSearchParams({ url: urlToScan }),
      { headers }
    );
    // console.log("scanResponse: ", scanResponse.data.data);
    const analysisId = scanResponse.data.data.id;
    // console.log(analysisId);
    if (!analysisId) {
      throw new Error('No analysis ID returned from scan endpoint');
    }

    // Step 2: Poll or directly fetch the analysis result
    // Note: For simplicity, we do a single fetch. In production, you might
    // poll until the analysis is complete or use the "item" link to fetch URL report.
    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;
    console.log("analysing ...");
    
    const analysisResponse = await axios.get(analysisUrl, { headers: {accept: 'application/json', 'x-apikey': apiKey} });
    

    const results = analysisResponse.data.data.attributes.results;
    // console.log(analysisResponse.data.data.attributes);
    if (!results) {
      throw new Error('No results in analysis response');
    }

    // Collect engines that flagged the URL as malicious
    const maliciousEngines = Object.entries(results)
      .filter(([_, entry]) => entry.category === 'malicious' || entry.category === 'suspicious')
      .map(([engine]) => engine);

    return {
      enginesFlagged: maliciousEngines.length,
      engines: maliciousEngines,
    };
  } catch (err) {
    console.error('VirusTotal API error:', err.message);
    return {
      enginesFlagged: 0,
      engines: [],
      error: `API Error: ${err.message}`,
    };
  }
}

module.exports = { check };