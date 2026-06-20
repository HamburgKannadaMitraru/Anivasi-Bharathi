/**
 * Calendar Helper Utilities
 */

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Get days for a monthly calendar grid (Monday-based week)
 * Returns an array of objects: { date: Date, isCurrentMonth: boolean, dateString: 'YYYY-MM-DD' }
 */
export const getMonthGrid = (year, month) => {
  const grid = [];
  
  // First day of target month
  const firstDayOfMonth = new Date(year, month, 1);
  // Get weekday (0 = Sun, 1 = Mon, ..., 6 = Sat)
  let startDayOfWeek = firstDayOfMonth.getDay();
  // Adjust to Mon-based (0 = Mon, 1 = Tue, ..., 6 = Sun)
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  
  // Total days in target month
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  // Padding from previous month
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthTotalDays = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const d = new Date(prevMonthYear, prevMonth, day);
    grid.push({
      date: d,
      isCurrentMonth: false,
      dateString: formatDateString(d)
    });
  }
  
  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const d = new Date(year, month, day);
    grid.push({
      date: d,
      isCurrentMonth: true,
      dateString: formatDateString(d)
    });
  }
  
  // Padding from next month to complete 6 rows (42 cells)
  const remainingCells = 42 - grid.length;
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  
  for (let day = 1; day <= remainingCells; day++) {
    const d = new Date(nextMonthYear, nextMonth, day);
    grid.push({
      date: d,
      isCurrentMonth: false,
      dateString: formatDateString(d)
    });
  }
  
  return grid;
};

/**
 * Format a Date object to 'YYYY-MM-DD' string local timezone
 */
export const formatDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * Format date for friendly reading (e.g. 'June 21, 2026')
 */
export const formatFriendlyDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date range for events spanning multiple days or single day
 */
export const formatEventTime = (startTime, endTime) => {
  if (!startTime) return '';
  if (!endTime) return startTime;
  return `${startTime} - ${endTime}`;
};
