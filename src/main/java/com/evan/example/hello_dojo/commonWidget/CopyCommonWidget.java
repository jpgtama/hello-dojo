package com.evan.example.hello_dojo.commonWidget;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.xml.bind.DatatypeConverter;

/**
 * 
 * This class will copy the common widgets in the ichm-app-common-ui project(under the folder: app/widget/) to hello-dojo project.
 * 
 * The main purpose is to keep sync between these two projects.
 * 
 * It will only copy any modified files.
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class CopyCommonWidget {
	
	/**
	 * 
	 * for comparing two files located in two different folders, a and b, you need to choose one as a base against which the comparison is made.
	 * 
	 * 
	 * If we choose a as base, then there will be 4 statuses:
	 * 
	 * a and b both exist, but content is same, so the comparison result is b is changed, 0
	 * 
	 * a and b both exist, but content is different, so the comparison result is b is changed, 2
	 * 
	 * a exists, b doesn't exist, then the result is b is removed, -1
	 * 
	 * a doesn't exist, b exists, then the result is b is created, 1
	 * 
	 * 
	 * So for this class, we will have below methods:
	 * 
	 * addBaseFile - which add the base file, use full file path as parameter
	 * 
	 * addCompareFile - which add the file to be compared, use full file path as parameter
	 * 
	 * result - get comparison result, values = -1, 0, 1, 2
	 * 
	 * 
	 * @author $Author: $
	 * @version $Revision: $
	 * @since $Date: $
	 */
	private static class FileCompareItem {
		
		/**
		 * 
		 * exception thrown when there is no file to compare, e.g. no base file and not compare file
		 * 
		 * @author $Author: $
		 * @version $Revision: $
		 * @since $Date: $
		 */
		public static class NoItemToCompareException extends Exception {
			
			public NoItemToCompareException() {
				super();
			}
			
			public NoItemToCompareException(String message) {
				super(message);
			}
		}
		
		private Path baseFileFullPath;
		
		private Path compareFileFullPath;
		
		public void addBaseFile(Path fileFullPath) {
			this.baseFileFullPath = fileFullPath;
		}
		
		public void addCompareFile(Path fileFullPath) {
			this.compareFileFullPath = fileFullPath;
		}
		
		/**
		 * this method will return result according to comparison of two files' SHA
		 * 
		 * @return
		 * @throws NoItemToCompareException
		 * @throws IOException
		 * @throws NoSuchAlgorithmException
		 */
		public Integer result() throws NoItemToCompareException, NoSuchAlgorithmException, IOException {
			
			if (baseFileFullPath == null && compareFileFullPath == null) {
				throw new NoItemToCompareException("base file and compare file both not found.");
			} else if (baseFileFullPath != null && compareFileFullPath == null) {
				return -1;
			} else if (baseFileFullPath == null && compareFileFullPath != null) {
				return 1;
			} else if (checksum(baseFileFullPath).equals(checksum(compareFileFullPath))) {
				return 0;
			} else {
				return 2;
			}
			
		}
		
		/**
		 * helper function to calculate SHA of a file
		 * 
		 * @param fileFullPath
		 * @return
		 * @throws NoSuchAlgorithmException
		 * @throws IOException
		 */
		private static String checksum(Path fileFullPath) throws NoSuchAlgorithmException, IOException {
			byte[] buffer = new byte[8192];
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			
			try (InputStream is = Files.newInputStream(fileFullPath); DigestInputStream dis = new DigestInputStream(is, md)) {
				while (dis.read(buffer) != -1)
					;
			}
			
			return DatatypeConverter.printHexBinary(md.digest());
		}
		
	};
	
	/**
	 * copy from
	 */
	static String fromFolder = "C:/source_code/ichm-new/app/common-ui/src/main/webapp/app/widget";
	
	/**
	 * copy to
	 */
	static String toFolder = "C:/workspace/scheduler_workspace/hello-dojo/WebContent/js/appWidget/app/widget";
	
	public static void main(String[] args) {
		// find out any modified files by comparing files between the two folders
		
		// TODO loop base folder
		
		// TODO loop compare folder
		
		// TODO compare
		
		String file = "tree/Tree.js";
		
		try {
			Paths.get(toFolder, file);
			
			FileCompareItem fci = new FileCompareItem();
			
			fci.addBaseFile(Paths.get(toFolder, file));
			fci.addCompareFile(Paths.get(fromFolder, file));
			
			System.out.println(fci.result());
			
		} catch (NoSuchAlgorithmException | IOException | com.evan.example.hello_dojo.commonWidget.CopyCommonWidget.FileCompareItem.NoItemToCompareException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	private static String checksum(InputStream is) throws NoSuchAlgorithmException, IOException {
		byte[] buffer = new byte[8192];
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		
		try (DigestInputStream dis = new DigestInputStream(is, md)) {
			while (dis.read(buffer) != -1)
				;
		}
		
		return DatatypeConverter.printHexBinary(md.digest());
	}
	
}
