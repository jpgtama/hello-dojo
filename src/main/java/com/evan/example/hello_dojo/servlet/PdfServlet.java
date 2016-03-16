package com.evan.example.hello_dojo.servlet;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/pdf")
public class PdfServlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		resp.setContentType("application/pdf");
		
		resp.setHeader("Content-disposition", "inline; filename='javatpoint.pdf'");
		
		// read pdf as byte stream
		// C:/source_code/iscv-portal-doc/ISCV-Portal/general/UI Design/Scheduler/ISCV_Design documentation_Jan 2015.pdf
		String pdfFilePath = "C:/source_code/iscv-portal-doc/ISCV-Portal/general/UI Design/Scheduler/ISCV_Design documentation_Jan 2015.pdf";
		FileInputStream fis = new FileInputStream(pdfFilePath);
		BufferedInputStream bis = new BufferedInputStream(fis);
		
		ServletOutputStream sos = resp.getOutputStream();
		byte[] b = new byte[1024 * 10];
		int size = -1;
		while ((size = bis.read(b)) != -1) {
			sos.write(b, 0, size);
		}
		
	}
	
}
