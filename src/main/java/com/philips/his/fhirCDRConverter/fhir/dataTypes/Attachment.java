package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Attachment {

	private Code contentType ;
	private Code language ;
	private Base64Binary data ;
	private Uri url ;
	private Integer size ;
	private Base64Binary hash ;
	private String title ;
	private DateTime creation ;
	/**
	 * @return the contentType
	 */
	public Code getContentType() {
		return contentType;
	}
	/**
	 * @param contentType the contentType to set
	 */
	public void setContentType(Code contentType) {
		this.contentType = contentType;
	}
	/**
	 * @return the language
	 */
	public Code getLanguage() {
		return language;
	}
	/**
	 * @param language the language to set
	 */
	public void setLanguage(Code language) {
		this.language = language;
	}
	/**
	 * @return the data
	 */
	public Base64Binary getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(Base64Binary data) {
		this.data = data;
	}
	/**
	 * @return the url
	 */
	public Uri getUrl() {
		return url;
	}
	/**
	 * @param url the url to set
	 */
	public void setUrl(Uri url) {
		this.url = url;
	}
	/**
	 * @return the size
	 */
	public Integer getSize() {
		return size;
	}
	/**
	 * @param size the size to set
	 */
	public void setSize(Integer size) {
		this.size = size;
	}
	/**
	 * @return the hash
	 */
	public Base64Binary getHash() {
		return hash;
	}
	/**
	 * @param hash the hash to set
	 */
	public void setHash(Base64Binary hash) {
		this.hash = hash;
	}
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the creation
	 */
	public DateTime getCreation() {
		return creation;
	}
	/**
	 * @param creation the creation to set
	 */
	public void setCreation(DateTime creation) {
		this.creation = creation;
	}
	
	
	
}
