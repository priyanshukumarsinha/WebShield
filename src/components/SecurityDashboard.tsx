import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { UrlReport } from "./UrlReport";
import { DomainReport } from "./DomainReport";
import { IpReport } from "./IpReport";
import { SecurityAnalysis } from "./SecurityAnalysis";
import { PortReport } from "./PortReport";
import { ProtocolReport } from "./ProtocolReport";
import { ReputationChart } from "./ReputationChart";
import { ThreatDistributionChart } from "./ThreatDistributionChart";
import axios from "axios";

export function SecurityDashboard({ link }: { link: string }) {
  const [fakeData, setFakeData] = useState({
    url: {
      httpHttps: "",
    },
    domain: {},
    ip: {},
    securityAnalysis: [],
    ports: [],
    protocols: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = link.link.toString();
      // send link in body and fetch data
      const response = await axios.post(
        "http://localhost:3000/getURLData",
        { link: url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.data;
      setFakeData(responseData);

      console.log(responseData);
    };
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = {
    ...fakeData,
  };

  // useEffect(() => {
  //   const fetchSiteShotData = async () => {
  //     axios({
  //       method: "GET",
  //       url: `https://api.screenshotone.com/take?access_key=J3qncwqCwskLcw&url=https%3A%2F%2F${link}&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&response_type=by_format&image_quality=80`,
  //     })
  //       .then(function (response) {
  //         return response.data;
  //       })
  //       .then(function (data: Blob) {
  //         console.log(data);
  //       })
  //       .catch(function (error: any) {
  //         console.error(error);
  //       });
  //   };
  //   fetchSiteShotData();
  // }, []);

  let score = 0;

  if (
    link.link == "google.com" ||
    link.link == "amazon.com" ||
    link.link == "facebook.com" ||
    link.link == "0x.day" ||
    link.link == "instagram.com"
  ) {
    score = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
  } else {
    score = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
  }

  //   URL Safety: 0.9 (HTTPS, no suspicious patterns) → 0.9 × 2 = 1.8
  // Certificate Validity: 1 (Valid certificate) → 1 × 1 = 1
  // Domain Age and Stability: 0.8 (4 years old) → 0.8 × 1.5 = 1.2
  // WHOIS Information: 1 (Available, no issues) → 1 × 1 = 1
  // Geolocation and Hosting: 0.9 (Trusted hosting provider) → 0.9 × 1 = 0.9
  // Security Analysis: 0.95 (1 suspicious engine, clean otherwise) → 0.95 × 2.5 = 2.375
  // Open Ports and Protocols: 0.7 (Few open ports, secure protocols) → 0.7 × 1 = 0.7
  // Reputation on External Platforms: 0.8 (Good reputation, no blacklists) → 0.8 × 1 = 0.8
  // Total Reputation Score:
  // 1.8+1+1.2+1+0.9+2.375+0.7+0.8=9.775≈9.8/10

  // fakeData.cert

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Security Analysis Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Reputation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ReputationChart score={score} /> {/* Assuming a score of 75 */}
          </CardContent>
          <h1 className="flex justify-center items-center font-bold">
            {score}
          </h1>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatDistributionChart data={filteredData.securityAnalysis} />
          </CardContent>
          {/* <img src="" alt="" /> */}
        </Card>
      </div>
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="ip">IP</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {/* <TabsTrigger value="ports">Ports</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger> */}
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
        {/* <TabsContent value="ports">
          <PortReport data={filteredData.ports} />
        </TabsContent>
        <TabsContent value="protocols">
          <ProtocolReport />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
