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
    url: {},
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

  useEffect(() => {
    const fetchSiteShotData = async () => {
      axios({
        method: "GET",
        url: `https://api.screenshotone.com/take?access_key=J3qncwqCwskLcw&url=https%3A%2F%2F${link}&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&response_type=by_format&image_quality=80`,
      })
        .then(function (response) {
          return response.data;
        }).then(function (data: Blob) {
          console.log(data);
        })
        .catch(function (error: any) {
          console.error(error);
        });
    };
    fetchSiteShotData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Security Analysis Dashboard</h1>
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
          {/* <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatDistributionChart data={filteredData.securityAnalysis} />
          </CardContent> */}
          <img src="" alt="" />
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
