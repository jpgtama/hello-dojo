package com.philips.his.fhirCDRConverter.fhir.resource;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.philips.his.fhirCDRConverter.fhir.dataTypes.Id;

public class Resource {

	private Id id;
	
	
	
	/**
	 * @return the id
	 */
	public Id getId() {
		return id;
	}



	/**
	 * @param id the id to set
	 */
	public void setId(Id id) {
		this.id = id;
	}



	public static void main(String[] args) throws IOException {
		ObjectMapper om = new ObjectMapper();
		
		Resource res = new Resource();
		res.id = new Id();
		res.id.setValue("hello");
		
		String data = om.writeValueAsString(res);
		
		System.out.println(data);
		
		System.out.println("=============================================");
		
		
		Resource newRes = om.readValue(data, Resource.class);
		
		System.out.println(newRes);
		
		
		
	}
	
	
}
