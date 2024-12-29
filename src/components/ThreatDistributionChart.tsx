import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ThreatData {
  status: string;
}

interface ThreatDistributionChartProps {
  data: ThreatData[];
}

export function ThreatDistributionChart({ data }: ThreatDistributionChartProps) {
  const chartData = [
    { name: 'Clean', value: data.filter(item => item.status === 'Clean').length },
    { name: 'Caution', value: data.filter(item => item.status === 'Caution').length },
    { name: 'Malicious', value: data.filter(item => item.status === 'Malicious').length },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

