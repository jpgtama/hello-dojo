package com.evan.test.sessionLogoutAfterCloseBrowser;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "login", urlPatterns = "/sessionLogoutAfterCloseBrowser/login")
public class LoginServlet extends HttpServlet {
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String name = req.getParameter("name");
		
		String pwd = req.getParameter("pwd");
		
		System.out.println("user: " + name + " login.");
		
		req.getSession().setAttribute("login", true);
		
		// resp.getWriter().println("OK");
		
		resp.sendRedirect("home.html");
		
	}
	
}
