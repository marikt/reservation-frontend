export class YearMonth {
  public year: number;
  public month: number;

  public static toYearMonth(now: Date): YearMonth {
    return new YearMonth(now.getFullYear(), now.getMonth() + 1); // getMonth() returns 0-11, so add 1 for 1-12
  }
  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }

  public minusMonth(): YearMonth {
    if (this.month === 1) {
      return new YearMonth(this.year - 1, 12); // If month is January, move to December of the previous year
    }
    return new YearMonth(this.year, this.month - 1); // Otherwise, just subtract one month
  }

  public plusMonths(months: number): YearMonth {
    if (months < 1 || months > 12) {
      throw new Error('Months must be between 1 and 10');
    }
    const totalMonths = this.month + months;
    const newYear = this.year + Math.floor((totalMonths - 1) / 12);
    let newMonth = totalMonths % 12;
    if (newMonth === 0) {
      newMonth = 12;
    }
    return new YearMonth(newYear, newMonth);
  }

  toString(): string {
    const monthStr = this.month < 10 ? `0${this.month}` : `${this.month}`; // Add leading zero if month is single digit
    return `${this.year}-${monthStr}`;
  }
}
