package com.philips.his.fhirCDRConverter.cdr.fields;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class TextField extends Field {

	private String type = "text";
	
	private Integer maxlength;

	/**
	 * @return the maxlength
	 */
	public Integer getMaxlength() {
		return maxlength;
	}

	/**
	 * @param maxlength the maxlength to set
	 */
	public void setMaxlength(Integer maxlength) {
		this.maxlength = maxlength;
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
