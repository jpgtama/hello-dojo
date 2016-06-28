package com.evan.example.hello_dojo.commonWidget;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.InvalidParameterException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

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
	 * Compare two files located in two different folders, a and b, you need to choose one as a base against which the comparison is made.
	 * 
	 * 
	 * If we choose 'a' as base, then there will be 4 statuses:
	 * 
	 * 'a' and 'b' both exist, but content is same, so the comparison result is 0('b' is not changed)
	 * 
	 * 'a' and 'b' both exist, but content is different, so the comparison result is 2('b' is changed)
	 * 
	 * 'a' exists, 'b' doesn't exist, then the result is -1('b' is removed)
	 * 
	 * 'a' doesn't exist, 'b' exists, then the result is 1('b' is created)
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
	 * 
	 * 
	 * 
	 * @author $Author: $
	 * @version $Revision: $
	 * @since $Date: $
	 */
	private static class FolderSync {
		
		private String fromFolder;
		
		private String toFolder;
		
		public FolderSync() {
			// TODO Auto-generated constructor stub
		}
		
		/**
		 * FolderSync
		 * 
		 * @param fromFolder
		 * @param toFolder
		 */
		public FolderSync(String fromFolder, String toFolder) {
			super();
			setFromFolder(fromFolder);
			setToFolder(toFolder);
		}
		
		/**
		 * get fromFolder
		 * 
		 * @return the fromFolder
		 */
		public String getFromFolder() {
			return fromFolder;
		}
		
		/**
		 * set fromFolder
		 * 
		 * @param fromFolder
		 *            the fromFolder to set
		 */
		public void setFromFolder(String fromFolder) {
			this.fromFolder = fromFolder;
		}
		
		/**
		 * get toFolder
		 * 
		 * @return the toFolder
		 */
		public String getToFolder() {
			return toFolder;
		}
		
		/**
		 * set toFolder
		 * 
		 * @param toFolder
		 *            the toFolder to set
		 */
		public void setToFolder(String toFolder) {
			this.toFolder = toFolder;
		};
		
		private Map<String, FileCompareItem> fileCompareMap;
		
		public void status() {
			fileCompareMap = new LinkedHashMap<>();
			
			// check folder
			if (fromFolder == null || toFolder == null) {
				throw new InvalidParameterException("folder is null.");
			}
			
			File from = new File(fromFolder);
			File to = new File(toFolder);
			
			if (!from.exists() || !to.exists()) {
				throw new InvalidParameterException("folder not found.");
			}
			
			// BFS from folder
			Queue<File> fileQueue = new LinkedList<>();
			fileQueue.add(from);
			
			while (!fileQueue.isEmpty()) {
				File file = fileQueue.remove();
				
				for (File f : file.listFiles()) {
					if (f.isDirectory()) {
						fileQueue.add(f);
					} else {
						// get relative path
						String relativePath = from.toURI().relativize(f.toURI()).getPath();
					}
				}
				
			}
			
		}
		
	}
	
	/**
	 * copy from
	 */
	static String fromFolder = "C:/source_code/ichm-new/app/common-ui/src/main/webapp/app/widget";
	
	/**
	 * copy to
	 */
	static String toFolder = "C:/workspace/scheduler_workspace/hello-dojo/WebContent/js/appWidget/app/widget";
	
	public static void main(String[] args) {
		String folderStr = "C:/source_code/ichm-new/app/common-ui/src/main/webapp/app/widget";
		String relativeFileStr = "tree/Tree.js";
		
		File folder = new File(folderStr);
		File relativeFile = new File(folder, relativeFileStr);
		
		Path folderPath = Paths.get(folderStr);
		Path relativeFilePath = Paths.get(folderStr, relativeFileStr);
		
		// use substring
		System.out.println(relativeFile.getAbsolutePath().substring(folder.getAbsolutePath().length()));
		// output: \tree\Tree.js
		
		// use URI relativize
		System.out.println(folder.toURI().relativize(relativeFile.toURI()).getPath());
		// output: tree/Tree.js
		
		// use Path relativize
		System.out.println(folderPath.relativize(relativeFilePath));
		// output: tree\Tree.js
	}
	
	public static void main_(String[] args) {
		// find out any modified files by comparing files between the two folders
		
		// TODO loop base folder
		
		// TODO loop compare folder
		
		// TODO compare
		
		String file = "tree/Tree.js";
		
		File from = new File(fromFolder);
		File f = new File(from, file);
		
		Path fromPath = Paths.get(fromFolder);
		Path fPath = Paths.get(fromFolder, file);
		
		System.out.println(from.toURI().relativize(f.toURI()).getPath());
		System.out.println(f.getAbsolutePath().substring(from.getAbsolutePath().length()));
		
		System.out.println(fromPath.relativize(fPath));
		
		// try {
		// Paths.get(toFolder, file);
		//
		// FileCompareItem fci = new FileCompareItem();
		//
		// fci.addBaseFile(Paths.get(toFolder, file));
		// fci.addCompareFile(Paths.get(fromFolder, file));
		//
		// System.out.println(fci.result());
		//
		// } catch (NoSuchAlgorithmException | IOException | com.evan.example.hello_dojo.commonWidget.CopyCommonWidget.FileCompareItem.NoItemToCompareException
		// e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		
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
