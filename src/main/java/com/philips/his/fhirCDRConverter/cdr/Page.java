package com.philips.his.fhirCDRConverter.cdr;

import java.util.List;


public class Page {
	private String name;
	
	
	private List<Section> sections;


	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}


	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}


	/**
	 * @return the sections
	 */
	public List<Section> getSections() {
		return sections;
	}


	/**
	 * @param sections the sections to set
	 */
	public void setSections(List<Section> sections) {
		this.sections = sections;
	}
	
	
}
