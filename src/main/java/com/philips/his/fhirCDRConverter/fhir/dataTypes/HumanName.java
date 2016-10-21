package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class HumanName {
	private String resourceType = "HumanName";
	private Code use ;
	private String text ;
	private String family ;
	private String given ;
	private String prefix ;
	private String suffix ;
	private Period period ;
	
	
	/**
	 * @return the resourceType
	 */
	public String getResourceType() {
		return resourceType;
	}
	/**
	 * @param resourceType the resourceType to set
	 */
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	/**
	 * @return the use
	 */
	public Code getUse() {
		return use;
	}
	/**
	 * @param use the use to set
	 */
	public void setUse(Code use) {
		this.use = use;
	}
	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}
	/**
	 * @param text the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}
	/**
	 * @return the family
	 */
	public String getFamily() {
		return family;
	}
	/**
	 * @param family the family to set
	 */
	public void setFamily(String family) {
		this.family = family;
	}
	/**
	 * @return the given
	 */
	public String getGiven() {
		return given;
	}
	/**
	 * @param given the given to set
	 */
	public void setGiven(String given) {
		this.given = given;
	}
	/**
	 * @return the prefix
	 */
	public String getPrefix() {
		return prefix;
	}
	/**
	 * @param prefix the prefix to set
	 */
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	/**
	 * @return the suffix
	 */
	public String getSuffix() {
		return suffix;
	}
	/**
	 * @param suffix the suffix to set
	 */
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	/**
	 * @return the period
	 */
	public Period getPeriod() {
		return period;
	}
	/**
	 * @param period the period to set
	 */
	public void setPeriod(Period period) {
		this.period = period;
	}
	
	
	
	
}
