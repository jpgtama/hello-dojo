package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Ratio {
	private Quantity numerator ;
	private Quantity denominator ;
	/**
	 * @return the numerator
	 */
	public Quantity getNumerator() {
		return numerator;
	}
	/**
	 * @param numerator the numerator to set
	 */
	public void setNumerator(Quantity numerator) {
		this.numerator = numerator;
	}
	/**
	 * @return the denominator
	 */
	public Quantity getDenominator() {
		return denominator;
	}
	/**
	 * @param denominator the denominator to set
	 */
	public void setDenominator(Quantity denominator) {
		this.denominator = denominator;
	}
	
	
}
