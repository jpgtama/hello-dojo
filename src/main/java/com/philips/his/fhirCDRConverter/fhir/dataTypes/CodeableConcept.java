package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import java.util.List;

public class CodeableConcept {

	private String text;
	
	private List<Coding> coding;

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
	 * @return the coding
	 */
	public List<Coding> getCoding() {
		return coding;
	}

	/**
	 * @param coding the coding to set
	 */
	public void setCoding(List<Coding> coding) {
		this.coding = coding;
	}
	
	
	
	
}
