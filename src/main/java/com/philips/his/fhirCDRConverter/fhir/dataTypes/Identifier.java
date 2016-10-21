package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Identifier {

	
	private Code use ;
	private  CodeableConcept  type ;
	private Uri system ;
	private String value ;
	private  Period  period ;
	private  Reference  assigner ;
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
	 * @return the type
	 */
	public CodeableConcept getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(CodeableConcept type) {
		this.type = type;
	}
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
	/**
	 * @return the assigner
	 */
	public Reference getAssigner() {
		return assigner;
	}
	/**
	 * @param assigner the assigner to set
	 */
	public void setAssigner(Reference assigner) {
		this.assigner = assigner;
	}
	
	
	
	
}
