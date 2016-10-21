/**
 * 
 */
package com.philips.his.fhirCDRConverter.cdr.fields;

import java.util.List;

import com.philips.his.fhirCDRConverter.cdr.Field;

/**
 * @author 310199253
 *
 */
public class SelectField extends Field {

	private String type = "select";
	
	private List<SelectOption> options;

	/**
	 * @return the options
	 */
	public List<SelectOption> getOptions() {
		return options;
	}

	/**
	 * @param options the options to set
	 */
	public void setOptions(List<SelectOption> options) {
		this.options = options;
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
