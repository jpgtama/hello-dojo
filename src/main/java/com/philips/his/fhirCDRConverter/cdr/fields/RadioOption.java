package com.philips.his.fhirCDRConverter.cdr.fields;

import java.util.List;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class RadioOption {

	
	private String value;
	private String label;
	
	private Boolean predefined;

	
	private List<Field> subs;
	
	
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

	/**
	 * @return the subs
	 */
	public List<Field> getSubs() {
		return subs;
	}

	/**
	 * @param subs the subs to set
	 */
	public void setSubs(List<Field> subs) {
		this.subs = subs;
	}
	
	
	
}
