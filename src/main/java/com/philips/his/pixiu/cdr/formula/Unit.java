package com.philips.his.pixiu.cdr.formula;

public enum Unit {
	
	YEAR("year"), MONTH("month"), WEEK("week"), DAY("day"), HOUR("hour"), MINUTE("minute"), SECOND("second");
	
	private Unit(String v) {
		this.value = v;
	}
	
	private String value;
	
}
