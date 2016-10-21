package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using= SingleStringSerializer.class)
public class Decimal extends SingleString{

	
	public Decimal() {
		// TODO Auto-generated constructor stub
	}
	
	public Decimal(String value) {
		super(value);
	}

	
	

}
