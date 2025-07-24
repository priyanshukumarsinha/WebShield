import type { Contribution, Recommendation } from '../types';

export const generateRecommendations = (contributions: Contribution[]): Recommendation[] => {
  return contributions
    .filter(contribution => contribution.weight > 0)
    .map(contribution => {
      const { feature } = contribution;
      
      switch (feature) {
        case 'Domain Age':
          return {
            issue: 'Recently created domain',
            action: 'Consider using an established domain with longer history for improved trust.'
          };
        case 'Missing DMARC':
          return {
            issue: 'Domain missing DMARC record',
            action: 'Add a DMARC record to protect against email spoofing and phishing attacks.'
          };
        case 'Missing HSTS':
          return {
            issue: 'Site missing HSTS header',
            action: 'Enable HTTP Strict Transport Security (HSTS) header to enforce secure connections.'
          };
        case 'Missing CSP':
          return {
            issue: 'Site missing Content Security Policy',
            action: 'Configure Content Security Policy to prevent cross-site scripting (XSS) attacks.'
          };
        case 'Missing X-Frame-Options':
          return {
            issue: 'Site missing X-Frame-Options header',
            action: 'Set X-Frame-Options header to prevent clickjacking attacks.'
          };
        case 'Redirect Chain':
          return {
            issue: 'Long redirect chain',
            action: 'Review redirect chain and reduce to fewer than 3 redirects for better performance and security.'
          };
        case 'Domain Reputation':
          return {
            issue: 'Low Tranco rank',
            action: 'Improve domain reputation through quality backlinks and consistent, trustworthy content.'
          };
        default:
          return {
            issue: feature,
            action: 'Review and address this security issue to improve overall security posture.'
          };
      }
    });
};