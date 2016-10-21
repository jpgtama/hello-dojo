package com.philips.his.fhirCDRConverter.cdr.fields;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class DateTimeField extends Field {

	private String type = "datetime";
	
	
	private String[] pattern;



	/**
	 * @return the pattern
	 */
	public String[] getPattern() {
		return pattern;
	}

	/**
	 * @param pattern the pattern to set
	 */
	public void setPattern(String[] pattern) {
		this.pattern = pattern;
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
