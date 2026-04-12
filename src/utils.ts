export function getDateRange(offset: number, count: number): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.push(dateStr);
  }
  return dates;
}

export function getStandardFromDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateStandardDate(date: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
}

export function getDatefromStandard(date: string): Date {
  if (!validateStandardDate(date)) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }

  return new Date(date);
}
