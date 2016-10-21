package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class SingleStringSerializer extends JsonSerializer<SingleString>{

	@Override
	public void serialize(SingleString value, JsonGenerator gen,
			SerializerProvider serializers) throws IOException,
			JsonProcessingException {
		gen.writeString(value.getValue());
	}
	
	
}