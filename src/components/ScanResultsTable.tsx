import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator, StatusType } from "./StatusIndicator";

interface ScanResult {
  engine_name: string;
  method: string;
  category: string;
  result: string;
  confidence: number;
  lastUpdate: string;
}

interface ScanResultsTableProps {
  results: ScanResult[];
  title: string;
}

export function ScanResultsTable({ results, title }: ScanResultsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
              <TableHead>Engine Name</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {result.engine_name}
                </TableCell>
                <TableCell>{result.method}</TableCell>
                <TableCell>{result.category}</TableCell>
                <TableCell>{result.result}</TableCell>
                {/* <TableCell>
                  <StatusIndicator status={result.result} showLabel={false} />
                </TableCell> */}
                <TableCell>
                  {result.result == "clean"
                    ? 100
                    : result.result == "unrated"
                    ? 50
                    : 0}
                  %
                </TableCell>
                <TableCell>{new Date().toUTCString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
