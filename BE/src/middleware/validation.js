const { parse } = require('tldts');

/**
 * Middleware to validate domain parameter
 */
const validateDomain = (req, res, next) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).json({
      error: {
        message: 'Missing required query parameter: domain',
        example: '/score?domain=example.com'
      }
    });
  }

  // Basic domain validation with more permissive rules
  const parsedDomain = parse(domain.toLowerCase());
  
  // Allow example.com and other test domains
  if (!parsedDomain.domain && !domain.endsWith('.example')) {
    return res.status(400).json({
      error: {
        message: 'Invalid domain format',
        provided: domain
      }
    });
  }

  // Store normalized domain in request object
  req.normalizedDomain = parsedDomain.domain || domain;
  
  next();
};

module.exports = { validateDomain };