package com.philips.his.pixiu.cdr.formula.function;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.junit.Assert;
import org.junit.Test;

public class CalculatorTest {
	
	private static String[] randomDateGenerator() {
		String[] ret = new String[4];
		
		Calendar cal = Calendar.getInstance();
		
		Random r = new Random();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd G 'at' HH:mm:ss z");
		
		cal.set(2016, 8, r.nextInt(28), r.nextInt(24), r.nextInt(60), r.nextInt(60));
		ret[0] = sdf.format(cal.getTime());
		ret[1] = cal.getTimeInMillis() + "";
		
		cal.set(2016, 8, r.nextInt(28), r.nextInt(24), r.nextInt(60), r.nextInt(60));
		ret[2] = sdf.format(cal.getTime());
		ret[3] = cal.getTimeInMillis() + "";
		
		return ret;
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 
	 * 1995.07.06 公元 at 14:03:04 CST, 805010584197
	 * 
	 * 
	 * 2015.11.19 公元 at 16:06:37 CST, 1447920397197
	 */
	@Test
	public void testCalc_DateSub_years() {
		
		String formula = "dateSub(deceasedTime, birthDate, years)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 805010584197L);
		data.put("deceasedTime", 1447920397197L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(20, result);
		
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 
	 * 1995.07.06 公元 at 14:03:04 CST, 805010584197
	 * 
	 * 
	 * 2015.11.19 公元 at 16:06:37 CST, 1447920397197
	 */
	@Test
	public void testCalc_DateSub_month() {
		
		String formula = "dateSub(deceasedTime, birthDate, months)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 805010584197L);
		data.put("deceasedTime", 1447920397197L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(244, result);
		
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 2016.02.03 公元 at 18:49:13 CST, 1454496553633
	 * 
	 * 2016.10.21 公元 at 10:32:33 CST, 1477017153633
	 *
	 * 261
	 * 
	 */
	@Test
	public void testCalc_DateSub_days() {
		
		String formula = "dateSub(deceasedTime, birthDate, days)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 1454496553633L);
		data.put("deceasedTime", 1477017153633L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(261, result);
		
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 2016.09.02 公元 at 02:18:16 CST, 1472753896900
	 * 
	 * 2016.09.12 公元 at 21:36:50 CST, 1473687410900
	 * 
	 * 259
	 * 
	 */
	@Test
	public void testCalc_DateSub_hours() {
		
		String formula = "dateSub(deceasedTime, birthDate, hours)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 1472753896900L);
		data.put("deceasedTime", 1473687410900L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(259, result);
		
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 2016.09.02 公元 at 02:18:16 CST, 1472753896900
	 * 
	 * 2016.09.12 公元 at 21:36:50 CST, 1473687410900
	 * 
	 * 259
	 * 
	 */
	@Test
	public void testCalc_DateSub_minutes() {
		
		String formula = "dateSub(deceasedTime, birthDate, minutes)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 1472753896900L);
		data.put("deceasedTime", 1473687410900L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(15558, result);
		
	}
	
	/**
	 * testCalc_DateSub,
	 * 
	 * 2016.09.02 公元 at 02:18:16 CST, 1472753896900
	 * 
	 * 2016.09.12 公元 at 21:36:50 CST, 1473687410900
	 * 
	 * 259
	 * 
	 */
	@Test
	public void testCalc_DateSub_seconds() {
		
		String formula = "dateSub(deceasedTime, birthDate, seconds)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("birthDate", 1472753896900L);
		data.put("deceasedTime", 1473687410900L);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(933514, result);
		
	}
	
	/**
	 * testCalc_NumberAdd,
	 * 
	 * 11
	 * 
	 * 22
	 * 
	 * 33
	 * 
	 */
	@Test
	public void testCalc_NumberAdd() {
		
		String formula = "numberAdd(aa, bb, 2)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("aa", 11.111);
		data.put("bb", 22.222);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(33.33, result.doubleValue(), 0);
		
	}
	
	/**
	 * testCalc_NumberAdd,
	 * 
	 * 11
	 * 
	 * 22
	 * 
	 * 33
	 * 
	 */
	@Test
	public void testCalc_NumberSub() {
		
		String formula = "numberSub(aa, bb, 2)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("aa", 11.111);
		data.put("bb", 22.222);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(-11.11, result.doubleValue(), 0);
		
	}
	
	/**
	 * testCalc_NumberAdd,
	 * 
	 * 11
	 * 
	 * 22
	 * 
	 * 33
	 * 
	 */
	@Test
	public void testCalc_NumberMul() {
		
		String formula = "numberMul(aa, bb, 2)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("aa", 11.111);
		data.put("bb", 22.222);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(246.91, result.doubleValue(), 0);
		
	}
	
	/**
	 * testCalc_NumberAdd,
	 * 
	 * 11
	 * 
	 * 22
	 * 
	 * 33
	 * 
	 */
	@Test
	public void testCalc_NumberDiv() {
		
		String formula = "numberDiv(aa, bb, 2)";
		
		Map<String, Object> data = new HashMap<>();
		
		Calendar cal = Calendar.getInstance();
		
		data.put("aa", 11.111);
		data.put("bb", 22.222);
		
		Number result = Calculator.calculate(formula, data);
		
		Assert.assertEquals(0.5, result.doubleValue(), 0);
		
	}
}