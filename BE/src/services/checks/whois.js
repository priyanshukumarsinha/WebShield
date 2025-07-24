const whoisJson = require('whois-json');

/**
 * Retrieves and normalizes WHOIS information for a domain
 */
const check = async (domain) => {
  try {
    // Fetch WHOIS data
    const whoisData = await whoisJson(domain);
    
    // Normalize dates
    const creationDate = normalizeDate(whoisData.creationDate);
    const updatedDate = normalizeDate(whoisData.updatedDate);
    const expirationDate = normalizeDate(whoisData.expirationDate);
    
    // Calculate domain age in days
    const ageDays = creationDate 
      ? Math.floor((new Date() - creationDate) / (1000 * 60 * 60 * 24))
      : null;
    
    // Extract name servers
    const nameServers = extractNameServers(whoisData);
    
    // Extract status
    const status = extractStatus(whoisData);
    
    return {
      registrar: whoisData.registrar || null,
      creationDate: creationDate ? creationDate.toISOString() : null,
      updatedDate: updatedDate ? updatedDate.toISOString() : null,
      expirationDate: expirationDate ? expirationDate.toISOString() : null,
      nameServers,
      status,
      ageDays: ageDays || 0
    };
  } catch (error) {
    console.error('WHOIS error:', error.message);
    return {
      registrar: null,
      creationDate: null,
      updatedDate: null,
      expirationDate: null,
      nameServers: [],
      status: [],
      ageDays: 0,
      error: `WHOIS Error: ${error.message}`
    };
  }
};

/**
 * Normalizes various date formats to JavaScript Date
 */
const normalizeDate = (dateStr) => {
  if (!dateStr) return null;
  
  // Handle array of dates
  if (Array.isArray(dateStr)) {
    dateStr = dateStr[0];
  }
  
  // Try to parse the date
  try {
    return new Date(dateStr);
  } catch (e) {
    console.warn(`Could not parse date: ${dateStr}`);
    return null;
  }
};

/**
 * Extracts name servers from WHOIS data
 */
const extractNameServers = (whoisData) => {
  if (!whoisData) return [];
  
  // Different formats from different registrars
  let nameServers = whoisData.nameServers || 
                   whoisData.nserver || 
                   whoisData['name server'] ||
                   whoisData.nameserver;
  
  if (!nameServers) return [];
  
  // Convert to array if it's a string
  if (typeof nameServers === 'string') {
    nameServers = [nameServers];
  }
  
  // Clean and lowercase
  return nameServers.map(ns => 
    ns.toLowerCase().trim().replace(/\s+\d+\.\d+\.\d+\.\d+$/, '')
  );
};

/**
 * Extracts domain status from WHOIS data
 */
const extractStatus = (whoisData) => {
  if (!whoisData) return [];
  
  let status = whoisData.status || whoisData.domainStatus || [];
  
  if (!status) return [];
  
  // Convert to array if it's a string
  if (typeof status === 'string') {
    status = [status];
  }
  
  return status.map(s => s.trim());
};

module.exports = { check };