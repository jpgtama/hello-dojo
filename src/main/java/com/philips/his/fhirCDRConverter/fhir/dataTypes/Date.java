package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Date extends SingleString{

	
	public Date() {
		// TODO Auto-generated constructor stub
	}
	
	public Date(String value) {
		super(value);
	}

	
	

}
