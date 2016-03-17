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
 * FILE NAME: WriteExcel.java
 * 
 * CREATED: 2016年3月14日 下午12:41:18
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.servlet.writeexcel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * WriteExcel
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@WebServlet("/excel/poi")
public class UsingPOI extends HttpServlet {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		resp.getOutputStream().println("Hello excel");
	}
	
	/**
	 * generate .xlsx file.
	 * 
	 * Limit: 1,048,576 rows by 16,384 columns
	 * 
	 * The default rows per sheet will be 10k.
	 * 
	 * Data can be appended to file.
	 * 
	 * @param titleRowData
	 * @param data
	 */
	public static void generateXlsx(final List<Object> titleRowData, final List<Object> data) {
		// check rows per sheet
		int rowsPerSheet = 100;
		
		// file path
		String filePath = "C:/Users/310199253/Documents/Philips/CDR/export_data/poi_xssf.xlsx";
		
		try {
			File outputFile = new File(filePath);
			XSSFWorkbook workbook = null;
			if (!outputFile.exists() || outputFile.length() == 0) {
				outputFile.createNewFile();
				workbook = new XSSFWorkbook();
			} else {
				FileInputStream fis = new FileInputStream(outputFile);
				workbook = new XSSFWorkbook(fis);
			}
			
			createSheets(workbook, titleRowData, data, rowsPerSheet);
			
			FileOutputStream out = new FileOutputStream(outputFile);
			workbook.write(out);
			out.close();
			System.out.println("Excel written successfully..");
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * generate .xls file and the maximum rows per sheet is 65536.
	 * 
	 * The default rows per sheet will be 10k.
	 * 
	 * Data can be appended to file.
	 * 
	 * 
	 * @param titleRowData
	 * @param data
	 */
	public static void generateXls(final List<Object> titleRowData, final List<Object> data) {
		// check rows per sheet
		int rowsPerSheet = 100;
		
		// file path
		String filePath = "C:/Users/310199253/Documents/Philips/CDR/export_data/poi_hssf.xls";
		
		try {
			File outputFile = new File(filePath);
			HSSFWorkbook workbook = null;
			if (!outputFile.exists() || outputFile.length() == 0) {
				outputFile.createNewFile();
				workbook = new HSSFWorkbook();
			} else {
				FileInputStream fis = new FileInputStream(outputFile);
				workbook = new HSSFWorkbook(fis);
			}
			
			createSheets(workbook, titleRowData, data, rowsPerSheet);
			
			FileOutputStream out = new FileOutputStream(outputFile);
			workbook.write(out);
			out.close();
			System.out.println("Excel written successfully..");
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * createTitleRow
	 * 
	 * @param sheet
	 * @param titleRow
	 * @param rowNum
	 */
	private static void createTitleRow(Workbook workbook, Sheet sheet, int rowNum, List<Object> titleRowData) {
		// create title row
		Row titleRow = createRow(sheet, rowNum, titleRowData);
		
		// add style
		for (int i = 0; i < titleRow.getLastCellNum(); i++) {
			Cell cell = titleRow.getCell(i);
			Font font = workbook.createFont();
			font.setBoldweight(Font.BOLDWEIGHT_BOLD);
			CellStyle style = workbook.createCellStyle();
			style.setFont(font);
			// style.setFillForegroundColor(HSSFColor.GREY_50_PERCENT.index);
			style.setFillPattern(CellStyle.FINE_DOTS);
			style.setFillBackgroundColor(HSSFColor.LIGHT_GREEN.index);
			// style.setFillForegroundColor(HSSFColor.WHITE.index);
			cell.setCellStyle(style);
		}
		
	}
	
	/**
	 * createRow
	 * 
	 * @param sheet
	 * @param rowNum
	 * @param rowData
	 * @return
	 */
	private static Row createRow(Sheet sheet, int rowNum, List<Object> rowData) {
		Row row = sheet.createRow(rowNum);
		
		// start cell number
		int cellnum = 0;
		
		// create cell
		for (Object obj : rowData) {
			Cell cell = row.createCell(cellnum++);
			
			// set cell value
			if (obj instanceof Date)
				cell.setCellValue((Date) obj);
			else if (obj instanceof Boolean)
				cell.setCellValue((Boolean) obj);
			else if (obj instanceof String)
				cell.setCellValue((String) obj);
			else if (obj instanceof Double)
				cell.setCellValue((Double) obj);
			
		}
		
		// return row
		return row;
	}
	
	private static String getSheetName(int sheetIndex, int defaultDataRowSize, int dataRowsOnSheet) {
		int startNumber = (sheetIndex * defaultDataRowSize) + 1;
		int endNumber = startNumber + dataRowsOnSheet - 1;
		String sheetName = String.format("%s - %s", startNumber, endNumber);
		System.out.println(String.format("%s, %s, %s, %s", sheetIndex, dataRowsOnSheet, startNumber, endNumber));
		
		return sheetName;
	}
	
	private static void createSheets(final Workbook workbook, final List<Object> titleRowData, final List<Object> data, int defaultDataRowSize) {
		
		// get last sheet
		int numberOfSheets = workbook.getNumberOfSheets();
		
		Sheet sheet = null;
		
		if (numberOfSheets > 0) {
			sheet = workbook.getSheetAt(numberOfSheets - 1);
			workbook.setSheetName(numberOfSheets - 1,
					getSheetName(numberOfSheets - 1, defaultDataRowSize, Math.min(defaultDataRowSize, sheet.getPhysicalNumberOfRows() + data.size())));
		} else {
			sheet = workbook.createSheet();
			workbook.setSheetName(0, getSheetName(0, defaultDataRowSize, Math.min(defaultDataRowSize, data.size())));
			createTitleRow(workbook, sheet, 0, titleRowData);
		}
		
		// get sheet index & row index on this sheet
		int sheetIndex = workbook.getSheetIndex(sheet); // point to current sheet
		int rowNum = sheet.getPhysicalNumberOfRows(); // row numbers
		
		// loop data
		int alreadyUsedDataSize = 0;
		while (alreadyUsedDataSize < data.size()) {
			// create new sheet
			if (rowNum >= defaultDataRowSize + 1) {
				sheetIndex++;
				sheet = workbook.createSheet();
				rowNum = 0;
				// create title row
				createTitleRow(workbook, sheet, rowNum++, titleRowData);
				
				// set sheet name
				int leftDataSize = data.size() - alreadyUsedDataSize;
				workbook.setSheetName(sheetIndex, getSheetName(sheetIndex, defaultDataRowSize, Math.min(defaultDataRowSize, leftDataSize)));
			}
			
			// add data row
			Object rawRowData = data.get(alreadyUsedDataSize++);
			List<Object> rowData = null;
			if (rawRowData instanceof ArrayList) {
				rowData = (List<Object>) rawRowData;
			} else if (rawRowData instanceof Object[]) {
				rowData = Arrays.asList((Object[]) rawRowData);
			}
			
			if (rowData != null) {
				createRow(sheet, rowNum++, rowData);
			}
		}
		
	}
	
}
