package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Range {

	
	private Quantity  low ;
	private Quantity  high ;
	/**
	 * @return the low
	 */
	public Quantity getLow() {
		return low;
	}
	/**
	 * @param low the low to set
	 */
	public void setLow(Quantity low) {
		this.low = low;
	}
	/**
	 * @return the high
	 */
	public Quantity getHigh() {
		return high;
	}
	/**
	 * @param high the high to set
	 */
	public void setHigh(Quantity high) {
		this.high = high;
	}
	
	
	
}
