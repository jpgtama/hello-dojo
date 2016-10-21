package com.philips.his.fhirCDRConverter.cdr.fields;

import com.philips.his.fhirCDRConverter.cdr.Field;

public class BooleanField extends Field {

	private String type = "boolean";


	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

}
