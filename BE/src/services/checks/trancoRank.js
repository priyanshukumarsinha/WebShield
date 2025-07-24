/**
 * Simulates checking a domain's Tranco rank
 */
const check = async (domain) => {
  try {
    // Simulate a random Tranco rank between 1 and 100,000
    const rank = Math.floor(Math.random() * 100000) + 1;
    
    // Consider domains ranked < 50,000 as trustworthy
    const trustworthy = rank < 50000;
    
    return {
      rank,
      trustworthy
    };
  } catch (error) {
    console.error('Tranco rank check error:', error.message);
    return {
      rank: null,
      trustworthy: false,
      error: `Check Error: ${error.message}`
    };
  }
};

module.exports = { check };