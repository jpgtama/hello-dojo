package com.philips.his.pixiu.cdr.formula;

import java.util.Map;

/**
 * 
 * Calculation Context
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class Context {
	
	private Map<String, Object> data;
	
	private Unit unit;
	
	private String expression;
	
	private CalcType calcType;
	
	/**
	 * get data
	 * 
	 * @return the data
	 */
	public Map<String, Object> getData() {
		return data;
	}
	
	/**
	 * set data
	 * 
	 * @param data
	 *            the data to set
	 */
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	
	/**
	 * get unit
	 * 
	 * @return the unit
	 */
	public Unit getUnit() {
		return unit;
	}
	
	/**
	 * set unit
	 * 
	 * @param unit
	 *            the unit to set
	 */
	public void setUnit(Unit unit) {
		this.unit = unit;
	}
	
	/**
	 * get expression
	 * 
	 * @return the expression
	 */
	public String getExpression() {
		return expression;
	}
	
	/**
	 * set expression
	 * 
	 * @param expression
	 *            the expression to set
	 */
	public void setExpression(String expression) {
		this.expression = expression;
	}
	
	/**
	 * get calcType
	 * 
	 * @return the calcType
	 */
	public CalcType getCalcType() {
		return calcType;
	}
	
	/**
	 * set calcType
	 * 
	 * @param calcType
	 *            the calcType to set
	 */
	public void setCalcType(CalcType calcType) {
		this.calcType = calcType;
	}
	
}
