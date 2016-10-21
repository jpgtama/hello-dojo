package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import java.util.List;

public class Meta {

	private Id versionId; 
	private Instant lastUpdated;
	
	private List<Uri> profile;
	
	private List<Coding> security;
	
	private List<Coding> tag;

	/**
	 * @return the versionId
	 */
	public Id getVersionId() {
		return versionId;
	}

	/**
	 * @param versionId the versionId to set
	 */
	public void setVersionId(Id versionId) {
		this.versionId = versionId;
	}

	/**
	 * @return the lastUpdated
	 */
	public Instant getLastUpdated() {
		return lastUpdated;
	}

	/**
	 * @param lastUpdated the lastUpdated to set
	 */
	public void setLastUpdated(Instant lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	/**
	 * @return the profile
	 */
	public List<Uri> getProfile() {
		return profile;
	}

	/**
	 * @param profile the profile to set
	 */
	public void setProfile(List<Uri> profile) {
		this.profile = profile;
	}

	/**
	 * @return the security
	 */
	public List<Coding> getSecurity() {
		return security;
	}

	/**
	 * @param security the security to set
	 */
	public void setSecurity(List<Coding> security) {
		this.security = security;
	}

	/**
	 * @return the tag
	 */
	public List<Coding> getTag() {
		return tag;
	}

	/**
	 * @param tag the tag to set
	 */
	public void setTag(List<Coding> tag) {
		this.tag = tag;
	}
	
	
	
}
