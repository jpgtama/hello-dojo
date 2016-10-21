package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Quantity {
	private Decimal value ;
	private Code comparator ;
	private String unit ;
	private Uri system ;
	private Code code ;
	/**
	 * @return the value
	 */
	public Decimal getValue() {
		return value;
	}
	/**
	 * @param value the value to set
	 */
	public void setValue(Decimal value) {
		this.value = value;
	}
	/**
	 * @return the comparator
	 */
	public Code getComparator() {
		return comparator;
	}
	/**
	 * @param comparator the comparator to set
	 */
	public void setComparator(Code comparator) {
		this.comparator = comparator;
	}
	/**
	 * @return the unit
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * @param unit the unit to set
	 */
	public void setUnit(String unit) {
		this.unit = unit;
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
	
	
}
