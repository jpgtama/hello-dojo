package com.philips.his.fhirCDRConverter.cdr;

import java.util.List;


public class Section {
	
	private String name;
	
	
	private List<Column> columns;


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
	 * @return the columns
	 */
	public List<Column> getColumns() {
		return columns;
	}


	/**
	 * @param columns the columns to set
	 */
	public void setColumns(List<Column> columns) {
		this.columns = columns;
	}
	
	
	
}
