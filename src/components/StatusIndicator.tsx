import { Check, AlertCircle, XCircle, Circle } from 'lucide-react';

export type StatusType = 'Harmless' | 'Suspicious' | 'Malicious' | 'Undetected' | 'Safe' | 'Trusted' | 'Valid' | 'Caution' | 'Clean' | 'Risky';

interface StatusIndicatorProps {
  status: StatusType;
  showLabel?: boolean;
}

export function StatusIndicator({ status, showLabel = true }: StatusIndicatorProps) {
  const config = {
    Harmless: {
      icon: Check,
      className: "text-green-500",
      background: "bg-green-50",
    },
    Safe: {
      icon: Check,
      className: "text-green-500",
      background: "bg-green-50",
    },
    Trusted: {
      icon: Check,
      className: "text-green-500",
      background: "bg-green-50",
    },
    Valid: {
      icon: Check,
      className: "text-green-500",
      background: "bg-green-50",
    },
    Clean: {
      icon: Check,
      className: "text-green-500",
      background: "bg-green-50",
    },
    Suspicious: {
      icon: AlertCircle,
      className: "text-yellow-500",
      background: "bg-yellow-50",
    },
    Caution: {
      icon: AlertCircle,
      className: "text-yellow-500",
      background: "bg-yellow-50",
    },
    Risky: {
      icon: AlertCircle,
      className: "text-yellow-500",
      background: "bg-yellow-50",
    },
    Malicious: {
      icon: XCircle,
      className: "text-red-500",
      background: "bg-red-50",
    },
    Undetected: {
      icon: Circle,
      className: "text-gray-500",
      background: "bg-gray-50",
    },
  };

  if (!config[status]) {
    console.error(`Invalid status: ${status}`);
    return null;
  }

  console.log(config[status].icon);
  const { icon: Icon, className, background } = config[status];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${background}`}>
      <Icon className={`h-4 w-4 ${className}`} />
      {showLabel && <span className={`text-sm font-medium ${className}`}>{status}</span>}
    </div>
  );
}

