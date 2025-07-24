export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatScoreColor = (score: number): string => {
  if (score <= 25) return 'text-green-500';
  if (score <= 50) return 'text-amber-500';
  if (score <= 75) return 'text-orange-500';
  return 'text-red-500';
};

export const formatScoreBgColor = (score: number): string => {
  if (score <= 25) return 'bg-green-500';
  if (score <= 50) return 'bg-amber-500';
  if (score <= 75) return 'bg-orange-500';
  return 'bg-red-500';
};

export const formatYesNo = (value: boolean): string => {
  return value ? 'Yes' : 'No';
};

export const formatListItems = (items: string[]): string => {
  if (!items.length) return 'None';
  return items.join(', ');
};