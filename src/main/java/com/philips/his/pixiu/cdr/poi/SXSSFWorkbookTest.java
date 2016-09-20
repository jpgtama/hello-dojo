package com.philips.his.pixiu.cdr.poi;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.util.Stack;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class SXSSFWorkbookTest {
	
	public static void main_(String[] args) throws Exception {
		
		BufferedWriter bw = new BufferedWriter(new FileWriter("c:/temp/test.txt"));
		
		StringBuffer sb = new StringBuffer();
		
		for (int i = 0; i < 10485; i++) {
			
			for (int j = 0; j < 16384; j++) {
				sb.append('[').append(i).append('-').append(j).append(']').append(",");
			}
			
			bw.write(sb.toString());
			bw.write("\n");
			sb.delete(0, sb.length());
			
			if (i != 0 && i % 1000 == 0) {
				System.out.println("Begin to flush...");
				bw.flush();
				System.out.println("End to flush");
			}
			
		}
		
		bw.flush();
		bw.close();
		
		// System.out.println(getColumnNumberRef(16384));
		
		// System.out.println((char) (2 + '0'));
		
	}
	
	private static String getColumnNumberRef(int number) {
		
		Stack<Integer> stack = new Stack<Integer>();
		stack.push(number);
		
		while (true) {
			int n = stack.pop();
			
			if (n > 26) {
				int remainder = n % 26;
				int quotient = n / 26;
				stack.push(remainder);
				stack.push(quotient);
			} else {
				stack.push(n);
				break;
			}
		}
		
		StringBuffer sb = new StringBuffer();
		
		while (stack.size() > 0) {
			int n = stack.pop();
			
			char c = '0';
			
			// if (n >= 10) {
			// c = (char) (n - 10 + 'A');
			// } else {
			// c = (char) (n + '0');
			// }
			
			if (n == 0) {
				c = 'A';
			} else {
				c = (char) (n + 'A');
				
			}
			
			sb.append(c);
		}
		
		return sb.toString();
	}
	
	private static void calculateColumnNumberRef(Stack<Integer> stack) {
		
		int n = stack.pop();
		
		if (n > 15) {
			int remainder = n % 15;
			int quotient = n / 15;
			stack.push(remainder);
			stack.push(quotient);
		} else {
			
		}
		
	}
	
	public static void main(String[] args) throws Exception {
		OPCPackage pkg = OPCPackage.open(new File("c:/temp/sxssf.xlsx"));
		
		XSSFWorkbook workbook = new XSSFWorkbook(pkg);
		
		SXSSFWorkbook wb = new SXSSFWorkbook(workbook, 20, true);
		
		pkg.close();
		
	}
	
	public static void main__(String[] args) throws Exception {
		SXSSFWorkbook wb = new SXSSFWorkbook(20);
		Sheet sh = wb.createSheet();
		for (int rownum = 0; rownum < 1048; rownum++) {
			Row row = sh.createRow(rownum);
			for (int cellnum = 0; cellnum < 16384; cellnum++) {
				Cell cell = row.createCell(cellnum);
				String address = new CellReference(cell).formatAsString();
				cell.setCellValue(address);
			}
			
			// manually control how rows are flushed to disk
			if (rownum != 0 && rownum % 10 == 0) {
				System.out.println("begin to flush...");
				((SXSSFSheet) sh).flushRows(10); // retain 100 last rows and flush all others
				System.out.println("end to flush...");
				
				// ((SXSSFSheet)sh).flushRows() is a shortcut for ((SXSSFSheet)sh).flushRows(0),
				// this method flushes all rows
			}
			
		}
		
		FileOutputStream out = new FileOutputStream("c:/temp/sxssf.xlsx");
		wb.write(out);
		out.close();
		
		// dispose of temporary files backing this workbook on disk
		wb.dispose();
	}
}
