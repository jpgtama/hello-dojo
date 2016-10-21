package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Base64Binary extends SingleString{

	
	public Base64Binary() {
		// TODO Auto-generated constructor stub
	}
	
	public Base64Binary(String value) {
		super(value);
	}

	
	

}
