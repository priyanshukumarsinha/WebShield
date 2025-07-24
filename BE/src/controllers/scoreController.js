const domainScanner = require('../services/domainScanner');

/**
 * Controller for the /score endpoint
 */
const getDomainScore = async (req, res, next) => {
  try {
    const domain = req.normalizedDomain;
    console.log(`Processing domain scan request for: ${domain}`);
    
    const result = await domainScanner.scanDomain(domain);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDomainScore
};