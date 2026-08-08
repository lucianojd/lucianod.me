export function getDateRange(offset: number, count: number): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();

    const offsetDays = offset * count + i;
    date.setDate(today.getDate() - offsetDays);

    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

export function getStandardFromDate(date: Date | string): string {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else {
    return date;
  }
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
