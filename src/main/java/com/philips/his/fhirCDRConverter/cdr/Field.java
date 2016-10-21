package com.philips.his.fhirCDRConverter.cdr;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import com.philips.his.fhirCDRConverter.cdr.fields.BooleanField;
import com.philips.his.fhirCDRConverter.cdr.fields.CheckboxField;
import com.philips.his.fhirCDRConverter.cdr.fields.DateField;
import com.philips.his.fhirCDRConverter.cdr.fields.DateTimeField;
import com.philips.his.fhirCDRConverter.cdr.fields.NumberField;
import com.philips.his.fhirCDRConverter.cdr.fields.RadioField;
import com.philips.his.fhirCDRConverter.cdr.fields.SelectField;
import com.philips.his.fhirCDRConverter.cdr.fields.TextAreaField;
import com.philips.his.fhirCDRConverter.cdr.fields.TextField;



@JsonTypeInfo(use=Id.NAME, include=As.EXISTING_PROPERTY, property="type")
@JsonSubTypes({
	@Type(value= BooleanField.class, name="boolean"),
	@Type(value= CheckboxField.class, name="checkbox"),
	@Type(value= DateField.class, name="date"),
	@Type(value= DateTimeField.class, name="datetime"),
	@Type(value= NumberField.class, name="number"),
	@Type(value= RadioField.class, name="radio"),
	@Type(value= SelectField.class, name="select"),
	@Type(value= TextAreaField.class, name="textarea"),
	@Type(value= TextField.class, name="text")
})
public abstract class Field {

	private String type;
	private String key;
	private String label;
	private String desc;

	private Boolean required;
	private Boolean hidden;
	private Boolean predefined;

	private Object defaultvalue;

	private String permission;
	private String groupby;

	
	public Field() {
		// TODO Auto-generated constructor stub
	}
	
	
	public Field(String type, String key, String label, String desc,
			Boolean required, Boolean hidden, Boolean predefined,
			Object defaultvalue, String permission, String groupby) {
		super();
		this.type = type;
		this.key = key;
		this.label = label;
		this.desc = desc;
		this.required = required;
		this.hidden = hidden;
		this.predefined = predefined;
		this.defaultvalue = defaultvalue;
		this.permission = permission;
		this.groupby = groupby;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the key
	 */
	public String getKey() {
		return key;
	}

	/**
	 * @param key
	 *            the key to set
	 */
	public void setKey(String key) {
		this.key = key;
	}

	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label
	 *            the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * @return the desc
	 */
	public String getDesc() {
		return desc;
	}

	/**
	 * @param desc
	 *            the desc to set
	 */
	public void setDesc(String desc) {
		this.desc = desc;
	}

	/**
	 * @return the required
	 */
	public Boolean getRequired() {
		return required;
	}

	/**
	 * @param required
	 *            the required to set
	 */
	public void setRequired(Boolean required) {
		this.required = required;
	}

	/**
	 * @return the hidden
	 */
	public Boolean getHidden() {
		return hidden;
	}

	/**
	 * @param hidden
	 *            the hidden to set
	 */
	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	/**
	 * @return the predefined
	 */
	public Boolean getPredefined() {
		return predefined;
	}

	/**
	 * @param predefined
	 *            the predefined to set
	 */
	public void setPredefined(Boolean predefined) {
		this.predefined = predefined;
	}

	/**
	 * @return the defaultvalue
	 */
	public Object getDefaultvalue() {
		return defaultvalue;
	}

	/**
	 * @param defaultvalue
	 *            the defaultvalue to set
	 */
	public void setDefaultvalue(Object defaultvalue) {
		this.defaultvalue = defaultvalue;
	}

	/**
	 * @return the permission
	 */
	public String getPermission() {
		return permission;
	}

	/**
	 * @param permission
	 *            the permission to set
	 */
	public void setPermission(String permission) {
		this.permission = permission;
	}

	/**
	 * @return the groupby
	 */
	public String getGroupby() {
		return groupby;
	}

	/**
	 * @param groupby
	 *            the groupby to set
	 */
	public void setGroupby(String groupby) {
		this.groupby = groupby;
	}

}
