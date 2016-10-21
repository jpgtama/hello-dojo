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
public class RadioField extends Field{

	private String type = "radio";
	
	private List<RadioOption> options;
	
	private String optionsmodule;
	


	/**
	 * @return the options
	 */
	public List<RadioOption> getOptions() {
		return options;
	}

	/**
	 * @param options the options to set
	 */
	public void setOptions(List<RadioOption> options) {
		this.options = options;
	}

	/**
	 * @return the optionsmodule
	 */
	public String getOptionsmodule() {
		return optionsmodule;
	}

	/**
	 * @param optionsmodule the optionsmodule to set
	 */
	public void setOptionsmodule(String optionsmodule) {
		this.optionsmodule = optionsmodule;
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
