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
 * FILE NAME: ExportManager.java
 * 
 * CREATED: 2016年3月18日 下午3:12:37
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.servlet.writeexcel;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * ExportManager
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@WebServlet("/excelExport/export")
public class ExportManager extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// get user name
		String userName = req.getParameter("userName");
		
		if (userName != null && userName.trim().length() > 0) {
			String fileName = UserNameManager.addExport(userName);
			resp.setStatus(200);
			
			resp.getOutputStream().println(UserNameManager.getExportFileList(userName));
			resp.getOutputStream().flush();
		} else {
			resp.setStatus(400);
		}
		
	}
	
}
