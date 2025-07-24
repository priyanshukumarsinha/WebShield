import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import DomainScanForm from './components/DomainScanForm';
import ScanResults from './components/ScanResults';
import type { ScanResult, Recommendation } from './types';
import { generateRecommendations } from './utils/recommendationGenerator';
import { EXAMPLE_COM_DATA } from './utils/mockData';

function App() {
  const [domain, setDomain] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load saved scan data when the app loads
  useEffect(() => {
    const savedScan = localStorage.getItem('lastScan');
    if (savedScan) {
      try {
        const parsedScan = JSON.parse(savedScan) as ScanResult;
        setScanResult(parsedScan);
        setDomain(parsedScan ? 'example.com' : '');
        if (parsedScan) {
          setRecommendations(generateRecommendations(parsedScan.contributions));
        }
      } catch (err) {
        console.error('Error parsing saved scan data', err);
      }
    }
  }, []);

  const handleScan = async (domainToScan: string) => {
    setIsLoading(true);
    setError(null);
    setDomain(domainToScan);

    try {
      // For demo purposes using mock data for example.com
      if (domainToScan === 'example.com') {
        setTimeout(() => {
          setScanResult(EXAMPLE_COM_DATA);
          setRecommendations(generateRecommendations(EXAMPLE_COM_DATA.contributions));
          localStorage.setItem('lastScan', JSON.stringify(EXAMPLE_COM_DATA));
          setIsLoading(false);
        }, 1500);
        return;
      }

      // Real API call for other domains
      const response = await fetch(`http://localhost:3000/score?domain=${encodeURIComponent(domainToScan)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json() as ScanResult;
      setScanResult(data);
      setRecommendations(generateRecommendations(data.contributions));
      localStorage.setItem('lastScan', JSON.stringify(data));
    } catch (err) {
      console.error('Error scanning domain', err);
      setError('Failed to scan domain. Please check if the backend is running at http://localhost:3000.');
      setScanResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <ShieldAlert className="h-10 w-10 text-white mr-3" />
            <h1 className="text-4xl font-bold text-white">WebShield</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Comprehensive security analysis for web domains
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Domain Security Scanner</h2>
            <DomainScanForm onSubmit={handleScan} isLoading={isLoading} />
            
            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-4 text-lg text-gray-600">Scanning {domain}...</span>
            </div>
          )}

          {!isLoading && scanResult && domain && (
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  Results for: <span className="ml-2 text-blue-600">{domain}</span>
                </h2>
                <p className="text-gray-600">
                  Scanned at: {new Date(scanResult.timestamps.scannedAt).toLocaleString()}
                </p>
              </div>
              
              <ScanResults 
                result={scanResult} 
                recommendations={recommendations}
              />
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-auto py-6 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            WebShield &copy; {new Date().getFullYear()} - Advanced Domain Security Analysis
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;