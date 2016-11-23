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
 * FILE NAME: Point.java
 * 
 * CREATED: 2016年11月23日 下午4:55:50
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis.entity;

/**
 * Point
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class Point {
	
	private int x;
	
	private int y;
	
	/**
	 * Point
	 * 
	 * @param x
	 * @param y
	 */
	public Point(int x, int y) {
		super();
		this.x = x;
		this.y = y;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Point) {
			Point other = (Point) obj;
			
			if (this.x == other.x && this.y == other.y) {
				return true;
			}
			
		}
		return false;
	}
	
}
