package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class ContactPoint {
	private String resourceType = "ContactPoint";
	private Code system ;
	private String value ;
	private Code use ;
	private Integer rank ;
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
	 * @return the system
	 */
	public Code getSystem() {
		return system;
	}
	/**
	 * @param system the system to set
	 */
	public void setSystem(Code system) {
		this.system = system;
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
	 * @return the rank
	 */
	public Integer getRank() {
		return rank;
	}
	/**
	 * @param rank the rank to set
	 */
	public void setRank(Integer rank) {
		this.rank = rank;
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
