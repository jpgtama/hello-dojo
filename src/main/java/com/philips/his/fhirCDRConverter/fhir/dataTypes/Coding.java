package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Coding {

	private Uri system;

	private String version;
	
	private Code code;
	
	private String display;
	
	private boolean userSelected;

	/**
	 * @return the system
	 */
	public Uri getSystem() {
		return system;
	}

	/**
	 * @param system the system to set
	 */
	public void setSystem(Uri system) {
		this.system = system;
	}

	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the code
	 */
	public Code getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(Code code) {
		this.code = code;
	}

	/**
	 * @return the display
	 */
	public String getDisplay() {
		return display;
	}

	/**
	 * @param display the display to set
	 */
	public void setDisplay(String display) {
		this.display = display;
	}

	/**
	 * @return the userSelected
	 */
	public boolean isUserSelected() {
		return userSelected;
	}

	/**
	 * @param userSelected the userSelected to set
	 */
	public void setUserSelected(boolean userSelected) {
		this.userSelected = userSelected;
	}
	
	
	
	
}
