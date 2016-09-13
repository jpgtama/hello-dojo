package com.philips.his.pixiu.cdr.formula.function;

import java.math.BigDecimal;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Hours;
import org.joda.time.Minutes;
import org.joda.time.Months;
import org.joda.time.Seconds;
import org.joda.time.Weeks;
import org.joda.time.Years;

public class Formulas {
	
	public static enum DateTimeUnit {
		SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS;
	}
	
	/**
	 * 
	 * dateSub
	 * 
	 * @param d1
	 * @param d2
	 * @return
	 */
	public static int dateSub(long d1, long d2, DateTimeUnit unit) {
		
		DateTime start = new DateTime(d2);
		DateTime end = new DateTime(d1);
		
		switch (unit) {
			case YEARS:
				int years = Years.yearsBetween(start, end).getYears();
				return years;
			case MONTHS:
				int months = Months.monthsBetween(start, end).getMonths();
				return months;
			case WEEKS:
				int weeks = Weeks.weeksBetween(start, end).getWeeks();
				return weeks;
			case DAYS:
				int days = Days.daysBetween(start.withTimeAtStartOfDay(), end.withTimeAtStartOfDay()).getDays();
				return days;
			case HOURS:
				int hours = Hours.hoursBetween(start, end).getHours();
				return hours;
			case MINUTES:
				int minutes = Minutes.minutesBetween(start, end).getMinutes();
				return minutes;
			case SECONDS:
				int seconds = Seconds.secondsBetween(start, end).getSeconds();
				return seconds;
			default:
				throw new RuntimeException("No other unit");
		}
	}
	
	public static Number numberAdd(Number n1, Number n2, int decimals) {
		if (decimals > 0) {
			double result = n1.doubleValue() + n2.doubleValue();
			return new BigDecimal(result).setScale(decimals, BigDecimal.ROUND_HALF_UP).doubleValue();
		} else {
			return n1.longValue() + n2.longValue();
		}
	}
	
	public static Number numberSub(Number n1, Number n2, int decimals) {
		if (decimals > 0) {
			double result = n1.doubleValue() - n2.doubleValue();
			return new BigDecimal(result).setScale(decimals, BigDecimal.ROUND_HALF_UP).doubleValue();
		} else {
			return n1.longValue() - n2.longValue();
		}
	}
	
	public static Number numberMul(Number n1, Number n2, int decimals) {
		if (decimals > 0) {
			double result = n1.doubleValue() * n2.doubleValue();
			return new BigDecimal(result).setScale(decimals, BigDecimal.ROUND_HALF_UP).doubleValue();
		} else {
			return n1.longValue() * n2.longValue();
		}
	}
	
	public static Number numberDiv(Number n1, Number n2, int decimals) {
		if (n2.longValue() == 0) {
			throw new IllegalArgumentException("Can't be divided by 0");
		}
		
		if (decimals > 0) {
			double result = n1.doubleValue() / n2.doubleValue();
			return new BigDecimal(result).setScale(decimals, BigDecimal.ROUND_HALF_UP).doubleValue();
		} else {
			return n1.longValue() / n2.longValue();
		}
	}
	
}