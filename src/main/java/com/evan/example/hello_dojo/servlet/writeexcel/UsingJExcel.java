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
 * FILE NAME: UsingJExcel.java
 * 
 * CREATED: 2016年3月14日 下午1:15:47
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.servlet.writeexcel;

import java.io.File;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

/**
 * UsingJExcel
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@WebServlet("/excel/jexcel")
public class UsingJExcel extends HttpServlet {
	
	public static void main(String[] args) throws Exception {
		WritableWorkbook wworkbook;
		wworkbook = Workbook.createWorkbook(new File("C:/Users/310199253/Documents/Philips/CDR/export_data/jexcel.xls"));
		WritableSheet wsheet = wworkbook.createSheet("First Sheet", 0);
		Label label = new Label(0, 2, "A label record");
		wsheet.addCell(label);
		Number number = new Number(3, 4, 3.1459);
		wsheet.addCell(number);
		wworkbook.write();
		wworkbook.close();
		
		Workbook workbook = Workbook.getWorkbook(new File("C:/Users/310199253/Documents/Philips/CDR/export_data/jexcel.xls"));
		Sheet sheet = workbook.getSheet(0);
		Cell cell1 = sheet.getCell(0, 2);
		System.out.println(cell1.getContents());
		Cell cell2 = sheet.getCell(3, 4);
		System.out.println(cell2.getContents());
		workbook.close();
	}
}
