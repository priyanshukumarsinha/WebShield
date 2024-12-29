import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIndicator, StatusType } from "./StatusIndicator"

interface PortData {
  port: number
  service: string
  status: StatusType
  riskLevel: string
}

interface PortReportProps {
  data: PortData[]
}

export function PortReport({ data }: PortReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Port Report</CardTitle>
        <div className="flex gap-4 pt-2">
          <StatusIndicator status="Harmless" />
          <StatusIndicator status="Suspicious" />
          <StatusIndicator status="Malicious" />
          <StatusIndicator status="Undetected" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Port</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.port}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell>
                  <StatusIndicator status={item.status} showLabel={false} />
                </TableCell>
                <TableCell>{item.riskLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

