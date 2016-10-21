package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Period {
	private DateTime start ;
	private DateTime end ;
	/**
	 * @return the start
	 */
	public DateTime getStart() {
		return start;
	}
	/**
	 * @param start the start to set
	 */
	public void setStart(DateTime start) {
		this.start = start;
	}
	/**
	 * @return the end
	 */
	public DateTime getEnd() {
		return end;
	}
	/**
	 * @param end the end to set
	 */
	public void setEnd(DateTime end) {
		this.end = end;
	}
	
	
	
}
