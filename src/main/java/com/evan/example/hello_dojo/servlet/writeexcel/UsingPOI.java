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

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import com.evan.example.hello_dojo.servlet.writeexcel.PaginationUtil.Page;

/**
 * WriteExcel
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@WebServlet("/excel/poi")
public class UsingPOI extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		resp.getOutputStream().println("Hello excel");
	}
	
	public static void generateExcelFileUsingSXSSF(final List<Object> titleRowData, final List<Object> data) {
		// check rows per sheet
		int rowsPerSheet = 100;
		
		SXSSFWorkbook workbook = new SXSSFWorkbook(100);
		workbook.setCompressTempFiles(true);
		
		createSheets(workbook, titleRowData, data, rowsPerSheet);
		
		try {
			FileOutputStream out = new FileOutputStream(new File("C:/Users/310199253/Documents/Philips/CDR/export_data/poi_sxssf.xlsx"));
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
	 * generateExcelFileUsingHSSF, generate .xls file and the maximum rows per sheet is 65536.
	 * 
	 * The default rows per sheet will be 10k.
	 * 
	 * @param data
	 */
	public static void generateExcelFileUsingHSSF(final List<Object> titleRowData, final List<Object> data) {
		// check rows per sheet
		int rowsPerSheet = 100;
		
		final HSSFWorkbook workbook = new HSSFWorkbook();
		
		createSheets(workbook, titleRowData, data, rowsPerSheet);
		
		try {
			FileOutputStream out = new FileOutputStream(new File("C:/Users/310199253/Documents/Philips/CDR/export_data/poi_hssf.xls"));
			workbook.write(out);
			out.close();
			System.out.println("Excel written successfully..");
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	public static void generateExcelFileUsingHSSF_Resume(final List<Object> titleRowData, final List<Object> data) {
		// check rows per sheet
		int rowsPerSheet = 100;
		
		// file path
		String filePath = "C:/Users/310199253/Documents/Philips/CDR/export_data/poi_hssf_resume.xls";
		
		File outputFile = new File(filePath);
		
		// check if file exist
		// if exist, append data to it
		if (outputFile.exists()) {
			try {
				FileInputStream fis = new FileInputStream(outputFile);
				final HSSFWorkbook workbook = new HSSFWorkbook(fis);
				int numberOfSheets = workbook.getNumberOfSheets();
				HSSFSheet sheet = workbook.getSheetAt(numberOfSheets - 1);
				int lastRowNumber = sheet.getLastRowNum();
				System.out.println(lastRowNumber);
				
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		} else {
			// else, create new file
			final HSSFWorkbook workbook = new HSSFWorkbook();
			
			createSheets(workbook, titleRowData, data, rowsPerSheet);
			
			try {
				FileOutputStream out = new FileOutputStream(new File(filePath));
				workbook.write(out);
				out.close();
				System.out.println("Excel written successfully..");
				
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	private static void createSheets(final Workbook workbook, final List<Object> titleRowData, final List<Object> data, int rowsPerSheet) {
		
		// get already exist sheets
		
		PaginationUtil.doPagination(data.size(), rowsPerSheet, new Page() {
			
			@Override
			public void onPage(Long pageNumber, Long startIndex, Long rowsOnPage) {
				// create a new sheet
				Sheet sheet = workbook.createSheet(String.format("%s - %s", startIndex + 1, startIndex + rowsOnPage));
				
				// start row number
				int rownum = 0;
				
				// create title row
				createTitleRow(sheet, rownum++, titleRowData);
				
				// create data rows
				for (int i = startIndex.intValue(); i < startIndex + rowsOnPage; i++) {
					List<Object> rowData = null;
					if (data.get(i) instanceof ArrayList) {
						rowData = (List<Object>) data.get(i);
					} else if (data.get(i) instanceof Object[]) {
						rowData = Arrays.asList((Object[]) data.get(i));
					}
					
					if (rowData != null) {
						createRow(sheet, rownum++, rowData);
					}
				}
				
			}
			
			/**
			 * createTitleRow
			 * 
			 * @param sheet
			 * @param titleRow
			 * @param rowNum
			 */
			private void createTitleRow(Sheet sheet, int rowNum, List<Object> titleRowData) {
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
			private Row createRow(Sheet sheet, int rowNum, List<Object> rowData) {
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
			
		});
		
	}
	
}
