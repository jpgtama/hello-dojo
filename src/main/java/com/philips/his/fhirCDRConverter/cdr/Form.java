package com.philips.his.fhirCDRConverter.cdr;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;


public class Form {
	
	private String name;
	
	
	private List<Page> pages;


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
	 * @return the pages
	 */
	public List<Page> getPages() {
		return pages;
	}


	/**
	 * @param pages the pages to set
	 */
	public void setPages(List<Page> pages) {
		this.pages = pages;
	}
	
	
	public static void main(String[] args) throws IOException {
		
		byte[] bytes =  Files.readAllBytes(new File("c:/Temp/pci_form_def.json").toPath());
		
		String data = new String(bytes, "utf-8");
		
		System.out.println(data);
		
		ObjectMapper mapper = new ObjectMapper();
		
		Form form =  mapper.readValue(data, Form.class);
		
		System.out.println(form);
		
		System.out.println("==================================================");
		
		
		System.out.println(mapper.writeValueAsString(form));
		
		
	}
}
