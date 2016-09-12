package com.evan.test.sessionLogoutAfterCloseBrowser;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "session", urlPatterns = "/sessionLogoutAfterCloseBrowser/session")
public class SessionServlet extends HttpServlet {
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String sid = req.getParameter("sid");
		
		System.out.println("sid: " + sid);
		
		BufferedReader br = req.getReader();
		
		String line = null;
		
		while ((line = br.readLine()) != null) {
			System.out.println("body: " + line);
		}
		
		resp.getWriter().println("OK");
		
	}
	
}
