package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Id extends SingleString{

	
	public Id() {
		// TODO Auto-generated constructor stub
	}
	
	public Id(String value) {
		super(value);
	}

	
	

}
