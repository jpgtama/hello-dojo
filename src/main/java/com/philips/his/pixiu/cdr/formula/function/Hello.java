package com.philips.his.pixiu.cdr.formula.function;

import java.util.Calendar;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Hello {
	
	public static void main(String[] args) {
		Calendar cal = Calendar.getInstance();
		
		Random r = new Random();
		
		cal.set(1995, r.nextInt(13), r.nextInt(28), r.nextInt(24), r.nextInt(60), r.nextInt(60));
		
		System.out.println(cal.getTimeInMillis());
		
		cal.set(2015, r.nextInt(13), r.nextInt(28), r.nextInt(24), r.nextInt(60), r.nextInt(60));
		System.out.println(cal.getTimeInMillis());
		
	}
	
	public static void main_(String[] args) {
		// dateSub(deceasedTime, birthDate, days)
		// birthDate: 822012835846 , deceasedTime: 1433027079846
		
		Pattern p = Pattern.compile("^([a-zA-Z]+)\\s*\\(([a-zA-Z0-9_ \\,]+)\\)$");
		
		String s = "dateSub(deceasedTime, birthDate, days)";
		
		Matcher m = p.matcher(s);
		
		if (m.find()) {
			System.out.println("standard");
			String functionName = m.group(1);
			String param = m.group(2);
			String[] params = param.split("\\,");
			for (int i = 0; i < params.length; i++) {
				params[i] = params[i].trim();
			}
			
		} else {
			System.err.println("not standard");
		}
		
	}
	
}