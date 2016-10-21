package com.philips.his.fhirCDRConverter.cdr.fields;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class NumberField extends Field{

	private String type = "number";
	
	private Integer max;
	private Integer min;
	private Integer decimals;
	/**
	 * @return the max
	 */
	public Integer getMax() {
		return max;
	}
	/**
	 * @param max the max to set
	 */
	public void setMax(Integer max) {
		this.max = max;
	}
	/**
	 * @return the min
	 */
	public Integer getMin() {
		return min;
	}
	/**
	 * @param min the min to set
	 */
	public void setMin(Integer min) {
		this.min = min;
	}
	/**
	 * @return the decimals
	 */
	public Integer getDecimals() {
		return decimals;
	}
	/**
	 * @param decimals the decimals to set
	 */
	public void setDecimals(Integer decimals) {
		this.decimals = decimals;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	
	
}
