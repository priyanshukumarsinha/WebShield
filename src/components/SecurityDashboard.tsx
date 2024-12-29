import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlReport } from "./UrlReport";
import { DomainReport } from "./DomainReport";
import { IpReport } from "./IpReport";
import { SecurityAnalysis } from "./SecurityAnalysis";
import { PortReport } from "./PortReport";
import { ProtocolReport } from "./ProtocolReport";
import { ReputationChart } from "./ReputationChart";
import { ThreatDistributionChart } from "./ThreatDistributionChart";

// Fake data (you would replace this with real data from your API)
const fakeData = {
  url: {
    url: "cloud.solutionplanets.com",
    ipAddress: "103.14.99.1",
    asn: "396904",
    geolocation: "India (IN)",
    domainAge: "1 Year",
    httpHttps: "HTTPS",
    certificateValidity: "Valid until 2024-09-13",
    lastAnalysisDate: "2024-07-12",
    virusTotalAnalysis: "No Malicious Content Detected",
    reputation: "Neutral",
  },
  domain: {
    registrar: "Let's Encrypt",
    whoisRegistrantInfo: "Trunkoz Technologies Pvt Ltd",
    whoisAdminContact: "hostmaster@trunkoz.com",
    whoisAbuseContact: "alliance@qualispace.com",
    domainCreationDate: "2023-06-15",
    domainExpirationDate: "2024-06-15",
    whoisAvailability: "Yes",
  },
  ip: {
    ipAddress: "103.14.99.1",
    isp: "Trunkoz Technologies Pvt Ltd",
    region: "Asia Pacific (APNIC)",
    portScan: "No open malicious ports detected",
    threatsDetected: "None",
  },
  securityAnalysis: [
    {
      engine: "Viettel Threat Intelligence",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "VIPRE",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "Webroot",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "ZeroCERT",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "Zvelo",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "Xcitium Verdict Cloud",
      category: "Blacklist",
      result: "Undetected",
      status: "Caution",
    },
    {
      engine: "VirusTotal Results",
      category: "Clean",
      result: "Undetected",
      status: "Clean",
    },
  ],
  ports: [
    {
      port: 80,
      service: "HTTP",
      riskLevel: "Low Risk",
    },
    {
      port: 443,
      service: "HTTPS",
      riskLevel: "Secure",
    },
    {
      port: 21,
      service: "FTP",
      riskLevel: "Safe",
    },
    {
      port: 22,
      service: "SSH",
      riskLevel: "Risky",
    },
  ],
  protocols: [
    {
      protocol: "TLS 1.2",
      status: "Active",
      securityRating: "Secure",
      recommendation: "None",
    },
    {
      protocol: "TLS 1.0",
      status: "Inactive",
      securityRating: "Weak",
      recommendation: "Upgrade to TLS 1.2",
    },
    {
      protocol: "SSH",
      status: "Active",
      securityRating: "Risky",
      recommendation: "Close/Limit Access",
    },
  ],
};

export function SecurityDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = {
    ...fakeData,
    securityAnalysis: fakeData.securityAnalysis.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Security Analysis Dashboard</h1>
      {/* <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Reputation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ReputationChart score={75} /> {/* Assuming a score of 75 */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatDistributionChart data={filteredData.securityAnalysis} />
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="ip">IP</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="ports">Ports</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <UrlReport data={filteredData.url} />
        </TabsContent>
        <TabsContent value="domain">
          <DomainReport data={filteredData.domain} />
        </TabsContent>
        <TabsContent value="ip">
          <IpReport data={filteredData.ip} />
        </TabsContent>
        <TabsContent value="security">
          <SecurityAnalysis data={filteredData.securityAnalysis} />
        </TabsContent>
        <TabsContent value="ports">
          <PortReport data={filteredData.ports} />
        </TabsContent>
        <TabsContent value="protocols">
          <ProtocolReport data={filteredData.protocols} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
