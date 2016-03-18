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
 * FILE NAME: GetUserList.java
 * 
 * CREATED: 2016年3月18日 上午10:53:48
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.servlet.writeexcel;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * GetUserList
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@WebServlet(urlPatterns = "/excelExport/userName", loadOnStartup = 1)
public class UserNameManager extends HttpServlet {
	
	private static ObjectMapper om = new ObjectMapper();
	
	private static File excelExportFolder;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		URL url = UserNameManager.class.getResource("/excelExport");
		try {
			excelExportFolder = new File(url.toURI());
			System.out.println("excel export folder is : " + excelExportFolder.getAbsolutePath());
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		List<String> userNameList = getNameList();
		
		resp.setStatus(200);
		resp.getOutputStream().println(om.writeValueAsString(userNameList));
		
	}
	
	public static List<String> getNameList() {
		
		List<String> nameList = new ArrayList<>();
		
		try {
			// list all folders under excelExportFolder
			File[] subFolders = excelExportFolder.listFiles(new FileFilter() {
				
				@Override
				public boolean accept(File f) {
					return f.isDirectory();
				}
			});
			
			if (subFolders != null) {
				for (File nameFolder : subFolders) {
					nameList.add(nameFolder.getName());
				}
			}
			
			System.out.println(nameList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return nameList;
		
	}
	
	public static String addExport(String userName) {
		File userFolder = new File(excelExportFolder, userName);
		
		if (!userFolder.exists()) {
			userFolder.mkdirs();
		}
		
		String[] fileList = userFolder.list();
		
		// create new file
		File newExportFile = null;
		if (fileList != null) {
			newExportFile = new File(userFolder, "Export-" + (fileList.length + 1) + ".xlsx");
		} else {
			newExportFile = new File(userFolder, "Export-" + (0 + 1) + ".xlsx");
		}
		
		// copy new file
		
		try {
			Files.copy(Paths.get(UserNameManager.class.getResource("/poi_xssf.xlsx").toURI()), newExportFile.toPath());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return newExportFile.getName();
	}
	
	public static String getExportFileList(String userName) {
		File userFolder = new File(excelExportFolder, userName);
		
		if (userFolder.exists()) {
			String[] fileNameList = userFolder.list();
			
			try {
				return om.writeValueAsString(fileNameList);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			
		}
		
		return "";
	}
	
}
