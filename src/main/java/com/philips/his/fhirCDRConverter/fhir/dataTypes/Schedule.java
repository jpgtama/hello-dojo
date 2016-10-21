package com.philips.his.fhirCDRConverter.fhir.dataTypes;

public class Schedule {
	private String resourceType ="Schedule";
	private Identifier identifier ;
	private CodeableConcept type ;
	private Reference actor ;
	private Period planningHorizon ;
	private String comment ;
	/**
	 * @return the resourceType
	 */
	public String getResourceType() {
		return resourceType;
	}
	/**
	 * @param resourceType the resourceType to set
	 */
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	/**
	 * @return the identifier
	 */
	public Identifier getIdentifier() {
		return identifier;
	}
	/**
	 * @param identifier the identifier to set
	 */
	public void setIdentifier(Identifier identifier) {
		this.identifier = identifier;
	}
	/**
	 * @return the type
	 */
	public CodeableConcept getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(CodeableConcept type) {
		this.type = type;
	}
	/**
	 * @return the actor
	 */
	public Reference getActor() {
		return actor;
	}
	/**
	 * @param actor the actor to set
	 */
	public void setActor(Reference actor) {
		this.actor = actor;
	}
	/**
	 * @return the planningHorizon
	 */
	public Period getPlanningHorizon() {
		return planningHorizon;
	}
	/**
	 * @param planningHorizon the planningHorizon to set
	 */
	public void setPlanningHorizon(Period planningHorizon) {
		this.planningHorizon = planningHorizon;
	}
	/**
	 * @return the comment
	 */
	public String getComment() {
		return comment;
	}
	/**
	 * @param comment the comment to set
	 */
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
	
}
