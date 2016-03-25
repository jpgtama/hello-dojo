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
 * FILE NAME: PaginationUtil.java
 * 
 * CREATED: 2016年3月15日 上午10:27:03
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.example.hello_dojo.writeexcel;

/**
 * PaginationUtil
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class PaginationUtil {
	
	public static interface Page {
		
		public void onPage(Long pageNumber, Long startIndex, Long rowsOnPage);
	}
	
	public static void doPagination(long totalSize, long sizePerPage, Page page) {
		
		long pageSize = Double.valueOf(Math.ceil(totalSize / (sizePerPage * 1.0))).intValue();
		
		for (long i = 0; i < pageSize; i++) {
			
			long startIndex = i * sizePerPage;
			long rowsOnPage = Math.min(sizePerPage, totalSize - startIndex);
			
			if (page != null) {
				page.onPage(i + 1, startIndex, rowsOnPage);
			} else {
				throw new RuntimeException("call back interface Page is null.");
			}
		}
		
	}
	
}
