/**
 * author: evan hu, 
 * 
 * date: 2016 03 24
 */
package com.evan.example.hello_dojo.recite;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;

public class DBUtils {
	
	public static void main(String[] args) throws Exception {
		// get user home folder
		String userHomeFolder = System.getProperty("user.home");
		
		if (userHomeFolder == null) {
			throw new RuntimeException("user home not found.");
		}
		
		//
		File dbFolder = new File(userHomeFolder, "recite/db");
		
		if (!dbFolder.exists()) {
			dbFolder.mkdirs();
		}
		
		//
		String dbLocation = "~/recite/db/test";
		
		Class.forName("org.h2.Driver");
		Connection conn = DriverManager.getConnection("jdbc:h2:" + dbLocation, "sa", "");
		
		System.out.println(conn);
		
		// add application code here
		conn.close();
		
	}
	
}
