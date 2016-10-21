package com.philips.his.fhirCDRConverter.fhir.dataTypes;

import java.util.List;

public class Extension {

	
	private Uri url;
	
	private List<Extension> extension;
	
	private Integer valueInteger;
	
	private Decimal valueDecimal;
	
	private DateTime valueDateTime;
	
	private Date valueDate;
	
	private Instant valueInstant;
	
	private String valueString;
	
	private Uri valueUri;
	
	private Boolean valueBoolean;
	
	private Code valueCode;
	
	private Base64Binary valueBase64Binary;
	
	private Coding valueCoding;
	
	private CodeableConcept valueCodeableConcept;
	
	private Attachment valueAttachment;
	
	private Identifier valueIdentifier ;
	private Quantity valueQuantity ;
	private Range valueRange ;
	private Period valuePeriod ;
	private Ratio valueRatio ;
	private HumanName valueHumanName ;
	private Address valueAddress ;
	private ContactPoint valueContactPoint ;
	private Schedule valueSchedule ;
	private Reference valueReference ;
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
	 * @return the extension
	 */
	public List<Extension> getExtension() {
		return extension;
	}
	/**
	 * @param extension the extension to set
	 */
	public void setExtension(List<Extension> extension) {
		this.extension = extension;
	}
	/**
	 * @return the valueInteger
	 */
	public Integer getValueInteger() {
		return valueInteger;
	}
	/**
	 * @param valueInteger the valueInteger to set
	 */
	public void setValueInteger(Integer valueInteger) {
		this.valueInteger = valueInteger;
	}
	/**
	 * @return the valueDecimal
	 */
	public Decimal getValueDecimal() {
		return valueDecimal;
	}
	/**
	 * @param valueDecimal the valueDecimal to set
	 */
	public void setValueDecimal(Decimal valueDecimal) {
		this.valueDecimal = valueDecimal;
	}
	/**
	 * @return the valueDateTime
	 */
	public DateTime getValueDateTime() {
		return valueDateTime;
	}
	/**
	 * @param valueDateTime the valueDateTime to set
	 */
	public void setValueDateTime(DateTime valueDateTime) {
		this.valueDateTime = valueDateTime;
	}
	/**
	 * @return the valueDate
	 */
	public Date getValueDate() {
		return valueDate;
	}
	/**
	 * @param valueDate the valueDate to set
	 */
	public void setValueDate(Date valueDate) {
		this.valueDate = valueDate;
	}
	/**
	 * @return the valueInstant
	 */
	public Instant getValueInstant() {
		return valueInstant;
	}
	/**
	 * @param valueInstant the valueInstant to set
	 */
	public void setValueInstant(Instant valueInstant) {
		this.valueInstant = valueInstant;
	}
	/**
	 * @return the valueString
	 */
	public String getValueString() {
		return valueString;
	}
	/**
	 * @param valueString the valueString to set
	 */
	public void setValueString(String valueString) {
		this.valueString = valueString;
	}
	/**
	 * @return the valueUri
	 */
	public Uri getValueUri() {
		return valueUri;
	}
	/**
	 * @param valueUri the valueUri to set
	 */
	public void setValueUri(Uri valueUri) {
		this.valueUri = valueUri;
	}
	/**
	 * @return the valueBoolean
	 */
	public Boolean getValueBoolean() {
		return valueBoolean;
	}
	/**
	 * @param valueBoolean the valueBoolean to set
	 */
	public void setValueBoolean(Boolean valueBoolean) {
		this.valueBoolean = valueBoolean;
	}
	/**
	 * @return the valueCode
	 */
	public Code getValueCode() {
		return valueCode;
	}
	/**
	 * @param valueCode the valueCode to set
	 */
	public void setValueCode(Code valueCode) {
		this.valueCode = valueCode;
	}
	/**
	 * @return the valueBase64Binary
	 */
	public Base64Binary getValueBase64Binary() {
		return valueBase64Binary;
	}
	/**
	 * @param valueBase64Binary the valueBase64Binary to set
	 */
	public void setValueBase64Binary(Base64Binary valueBase64Binary) {
		this.valueBase64Binary = valueBase64Binary;
	}
	/**
	 * @return the valueCoding
	 */
	public Coding getValueCoding() {
		return valueCoding;
	}
	/**
	 * @param valueCoding the valueCoding to set
	 */
	public void setValueCoding(Coding valueCoding) {
		this.valueCoding = valueCoding;
	}
	/**
	 * @return the valueCodeableConcept
	 */
	public CodeableConcept getValueCodeableConcept() {
		return valueCodeableConcept;
	}
	/**
	 * @param valueCodeableConcept the valueCodeableConcept to set
	 */
	public void setValueCodeableConcept(CodeableConcept valueCodeableConcept) {
		this.valueCodeableConcept = valueCodeableConcept;
	}
	/**
	 * @return the valueAttachment
	 */
	public Attachment getValueAttachment() {
		return valueAttachment;
	}
	/**
	 * @param valueAttachment the valueAttachment to set
	 */
	public void setValueAttachment(Attachment valueAttachment) {
		this.valueAttachment = valueAttachment;
	}
	/**
	 * @return the valueIdentifier
	 */
	public Identifier getValueIdentifier() {
		return valueIdentifier;
	}
	/**
	 * @param valueIdentifier the valueIdentifier to set
	 */
	public void setValueIdentifier(Identifier valueIdentifier) {
		this.valueIdentifier = valueIdentifier;
	}
	/**
	 * @return the valueQuantity
	 */
	public Quantity getValueQuantity() {
		return valueQuantity;
	}
	/**
	 * @param valueQuantity the valueQuantity to set
	 */
	public void setValueQuantity(Quantity valueQuantity) {
		this.valueQuantity = valueQuantity;
	}
	/**
	 * @return the valueRange
	 */
	public Range getValueRange() {
		return valueRange;
	}
	/**
	 * @param valueRange the valueRange to set
	 */
	public void setValueRange(Range valueRange) {
		this.valueRange = valueRange;
	}
	/**
	 * @return the valuePeriod
	 */
	public Period getValuePeriod() {
		return valuePeriod;
	}
	/**
	 * @param valuePeriod the valuePeriod to set
	 */
	public void setValuePeriod(Period valuePeriod) {
		this.valuePeriod = valuePeriod;
	}
	/**
	 * @return the valueRatio
	 */
	public Ratio getValueRatio() {
		return valueRatio;
	}
	/**
	 * @param valueRatio the valueRatio to set
	 */
	public void setValueRatio(Ratio valueRatio) {
		this.valueRatio = valueRatio;
	}
	/**
	 * @return the valueHumanName
	 */
	public HumanName getValueHumanName() {
		return valueHumanName;
	}
	/**
	 * @param valueHumanName the valueHumanName to set
	 */
	public void setValueHumanName(HumanName valueHumanName) {
		this.valueHumanName = valueHumanName;
	}
	/**
	 * @return the valueAddress
	 */
	public Address getValueAddress() {
		return valueAddress;
	}
	/**
	 * @param valueAddress the valueAddress to set
	 */
	public void setValueAddress(Address valueAddress) {
		this.valueAddress = valueAddress;
	}
	/**
	 * @return the valueContactPoint
	 */
	public ContactPoint getValueContactPoint() {
		return valueContactPoint;
	}
	/**
	 * @param valueContactPoint the valueContactPoint to set
	 */
	public void setValueContactPoint(ContactPoint valueContactPoint) {
		this.valueContactPoint = valueContactPoint;
	}
	/**
	 * @return the valueSchedule
	 */
	public Schedule getValueSchedule() {
		return valueSchedule;
	}
	/**
	 * @param valueSchedule the valueSchedule to set
	 */
	public void setValueSchedule(Schedule valueSchedule) {
		this.valueSchedule = valueSchedule;
	}
	/**
	 * @return the valueReference
	 */
	public Reference getValueReference() {
		return valueReference;
	}
	/**
	 * @param valueReference the valueReference to set
	 */
	public void setValueReference(Reference valueReference) {
		this.valueReference = valueReference;
	}
	
	
	
}
