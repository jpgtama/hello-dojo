package com.philips.his.fhirCDRConverter.cdr;

import java.util.List;


public class Column {
	
	private String name;
	
	private List<Field> fields;


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
	 * @return the fields
	 */
	public List<Field> getFields() {
		return fields;
	}


	/**
	 * @param fields the fields to set
	 */
	public void setFields(List<Field> fields) {
		this.fields = fields;
	}
	
	
}
