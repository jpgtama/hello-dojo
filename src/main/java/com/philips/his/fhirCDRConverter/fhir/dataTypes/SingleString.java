package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public abstract class SingleString {
	private String value;

	
	public SingleString() {
		// TODO Auto-generated constructor stub
	}
	
	public SingleString(String value) {
		super();
		this.value = value;
	}

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
	
	
	
}
