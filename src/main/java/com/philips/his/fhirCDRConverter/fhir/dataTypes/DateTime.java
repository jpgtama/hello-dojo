package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class DateTime extends SingleString{

	
	public DateTime() {
		// TODO Auto-generated constructor stub
	}
	
	public DateTime(String value) {
		super(value);
	}

	
	

}
