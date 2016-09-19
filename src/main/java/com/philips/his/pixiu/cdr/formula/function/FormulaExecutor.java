package com.philips.his.pixiu.cdr.formula.function;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.philips.his.pixiu.cdr.formula.function.Formulas.DateTimeUnit;

public class FormulaExecutor {
	
	private static void checkData(Map<String, Object> data, String[] params, int dataCount) {
		for (int i = 0; i < dataCount; i++) {
			if (data.get(params[i]) == null) {
				throw new IllegalArgumentException(String.format("the key '%s' is not found in data", params[i]));
			}
		}
	}
	
	private static void checkParameterLength(String[] params, int plen) {
		if (params.length != plen) {
			throw new IllegalArgumentException("the arguments size must be 3");
		}
	}
	
	public static Number calculate(String formula, Map<String, Object> data) {
		
		if (formula == null) {
			throw new IllegalArgumentException("formula is null");
		}
		
		Pattern p = Pattern.compile("^([a-zA-Z]+)\\s*\\(([a-zA-Z0-9_ \\,]+)\\)$");
		
		Matcher m = p.matcher(formula);
		
		if (m.find()) {
			String functionName = m.group(1);
			
			String param = m.group(2);
			String[] params = param.split("\\,");
			for (int i = 0; i < params.length; i++) {
				params[i] = params[i].trim();
			}
			
			if (functionName.startsWith("date")) {
				return calculateDate(functionName, params, data);
			} else if (functionName.startsWith("number")) {
				return calculateNumber(functionName, params, data);
			} else {
				throw new RuntimeException(String.format("no such function: %s", functionName));
			}
			
		} else {
			throw new IllegalArgumentException("not standard formula");
		}
		
	}
	
	private static Number calculateDate(String functionName, String[] params, Map<String, Object> data) {
		checkParameterLength(params, 3);
		checkData(data, params, 2);
		
		String p1 = params[0];
		String p2 = params[1];
		String p3 = params[2];
		
		DateTimeUnit unit = null;
		
		try {
			unit = DateTimeUnit.valueOf(p3.toUpperCase());
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("unit is not found: " + p3);
		}
		
		// call
		return Formulas.dateSub((long) data.get(p1), (long) data.get(p2), unit);
	}
	
	private static Number calculateNumber(String functionName, String[] params, Map<String, Object> data) {
		checkParameterLength(params, 3);
		checkData(data, params, 2);
		
		Integer decimals = null;
		try {
			decimals = Integer.valueOf(params[2]);
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException(String.format("decimals is not a number format: %s", params[2]));
		}
		
		Number d1 = convertNumberType(data, params[0]);
		Number d2 = convertNumberType(data, params[1]);
		
		if ("numberAdd".equalsIgnoreCase(functionName)) {
			return Formulas.numberAdd(d1, d2, decimals);
		} else if ("numberSub".equalsIgnoreCase(functionName)) {
			return Formulas.numberSub(d1, d2, decimals);
		} else if ("numberMul".equalsIgnoreCase(functionName)) {
			return Formulas.numberMul(d1, d2, decimals);
		} else if ("numberDiv".equalsIgnoreCase(functionName)) {
			return Formulas.numberDiv(d1, d2, decimals);
		} else {
			throw new RuntimeException(String.format("no such function: %s", functionName));
		}
	}
	
	/**
	 * convertNumberType
	 * 
	 * @param params
	 * @param data
	 */
	private static Number convertNumberType(Map<String, Object> data, String key) {
		Number result;
		Object obj = data.get(key);
		
		if (obj instanceof Integer) {
			result = (Integer) obj;
		} else if (obj instanceof Long) {
			result = (Long) obj;
		} else if (obj instanceof Float) {
			result = (Float) obj;
		} else if (obj instanceof Double) {
			result = (Double) obj;
		} else {
			throw new IllegalArgumentException(String.format("not number format for data %s", key));
		}
		
		return result;
	}
	
}