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
 * FILE NAME: CalcMD5OfFile.java
 * 
 * CREATED: 2016年11月17日 下午4:21:45
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.md5OfFile;

import java.io.File;
import java.nio.file.Files;

/**
 * CalcMD5OfFile
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class CalcMD5OfFile {
	
	public static void main(String[] args) throws Exception {
		
		File sourceFile = new File("C:\\Developer_Programs\\eclipse.zip");
		
		// FileInputStream fis = new FileInputStream(sourceFile);
		// String md5 = org.apache.commons.codec.digest.DigestUtils.md5Hex(fis);
		// System.out.println(md5);
		// fis.close();
		
		// copy files
		File destFile = new File("C:\\Developer_Programs\\eclipse_copy.zip");
		
		Files.copy(sourceFile.toPath(), destFile.toPath());
		
		System.out.println("copy done.");
		
	}
}
