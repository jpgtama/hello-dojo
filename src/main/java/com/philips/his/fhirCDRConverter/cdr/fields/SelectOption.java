package com.philips.his.fhirCDRConverter.cdr.fields;

import java.util.List;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class SelectOption {

	
	private String value;
	private String label;
	
	private Boolean predefined;

	
	
	
	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * @return the predefined
	 */
	public Boolean getPredefined() {
		return predefined;
	}

	/**
	 * @param predefined the predefined to set
	 */
	public void setPredefined(Boolean predefined) {
		this.predefined = predefined;
	}

	
	
	
}
