package com.philips.his.fhirCDRConverter.cdr.fields;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class TextAreaField extends Field{

	private String type = "textarea";
	
	private Integer maxlength;
	
	private Integer rows;

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
	 * @return the rows
	 */
	public Integer getRows() {
		return rows;
	}

	/**
	 * @param rows the rows to set
	 */
	public void setRows(Integer rows) {
		this.rows = rows;
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
