/****************************************************************************
 * $Id: philipscicodetemplates.xml 276 2012-12-26 02:16:03Z wei.hu $
 ****************************************************************************
 *                         Philips Medical Systems
 *                © 2010 Koninklijke Philips Electronics N.V.
 *
 * All rights are reserved. Reproduction in whole or in part is
 * prohibited without the written consent of the copyright owner.
 *
 *
 * FILE NAME: DataSource.java
 * 
 * CREATED: 2016年3月14日 下午2:31:27
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.servlet.writeexcel;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * DataSource
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class DataSource {
	
	public static void main(String[] args) throws Exception {
		// load def
		String def = new String(Files.readAllBytes(Paths.get(DataSource.class.getResource("/patient-def.json").toURI())));
		
		// load data
		String data = new String(Files.readAllBytes(Paths.get(DataSource.class.getResource("/patient-data.json").toURI())));
		
		// load js function
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("JavaScript");
		
		InputStream is = DataSource.class.getResourceAsStream("/functions.js");
		InputStreamReader isr = new InputStreamReader(is);
		
		engine.eval(isr);
		
		Invocable inv = (Invocable) engine;
		
		String result = (String) inv.invokeFunction("getExcelDataSource", def, data); // This one works.
		System.out.println(result);
		
		ObjectMapper om = new ObjectMapper();
		Map resultMap = om.readValue(result, Map.class);
		
		System.out.println(resultMap);
		
		List<Object> excelTitle = (List<Object>) resultMap.get("title");
		List<Object> excelData = (List<Object>) resultMap.get("data");
		
		//
		// List<Object[]> testingData = new ArrayList<>();
		// for (Object[] d : resultArray) {
		// testingData.add(d);
		// }
		
		// 1000 K
		for (int i = 0; i < 1 * 1000; i++) {
			Object[] d = new Object[] { "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello",
					"Hello", "Hello" };
			excelData.add(d);
		}
		
		// UsingPOI.generateExcelFileUsingSXSSF(excelTitle, excelData);
		// UsingPOI.generateExcelFileUsingHSSF(excelTitle, excelData);
		UsingPOI.generateExcelFileUsingHSSF_Resume(excelTitle, excelData);
		
	}
}
