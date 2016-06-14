package com.evan.example.hello_dojo.commonWidget;

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
	 * copy from
	 */
	static String fromFolder = "C:/source_code/ichm-new/app/common-ui/src/main/webapp/app/widget";
	
	/**
	 * copy to
	 */
	static String toFolder = "C:/workspace/scheduler_workspace/hello-dojo/WebContent/js/appWidget/app/widget";
	
	public static void main(String[] args) {
		// find out any modified files by comparing files between the two folders
		
	}
	
}
