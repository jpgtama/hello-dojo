package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Instant extends SingleString{

	
	public Instant() {
		// TODO Auto-generated constructor stub
	}
	
	public Instant(String value) {
		super(value);
	}

	
	

}
