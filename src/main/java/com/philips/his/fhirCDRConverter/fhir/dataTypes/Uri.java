package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Uri extends SingleString{

	
	public Uri() {
		// TODO Auto-generated constructor stub
	}
	
	public Uri(String value) {
		super(value);
	}

	
	

}
