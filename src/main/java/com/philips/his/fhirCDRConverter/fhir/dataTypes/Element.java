package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import java.util.List;

public class Element {

	
	private Id id;
	
	private List<Extension> extension;

	/**
	 * @return the id
	 */
	public Id getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Id id) {
		this.id = id;
	}

	/**
	 * @return the extension
	 */
	public List<Extension> getExtension() {
		return extension;
	}

	/**
	 * @param extension the extension to set
	 */
	public void setExtension(List<Extension> extension) {
		this.extension = extension;
	}
	
	
	
	
}
