package com.philips.his.pixiu.cdr.formula;

import java.util.Map;

public abstract class Calc {
	
	public abstract <T> T run(String oneExp, Context ctx);
	
	protected <T> T getData(Map ctx, Object name) {
		return null;
	}
	
}
