package com.philips.his.pixiu.cdr.formula.parser;

public enum CalcType {
	DATE("date"), MATH("math");
	
	CalcType(String v) {
		this.value = v;
	}
	
	private String value;
}
