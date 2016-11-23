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
 * FILE NAME: Rect.java
 * 
 * CREATED: 2016年11月23日 下午4:16:50
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Rect
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class Rect {
	
	public int x;
	
	public int y;
	
	public int w;
	
	public int h;
	
	public int leftX() {
		return x;
	}
	
	public int rightX() {
		return x + w;
	}
	
	public int topY() {
		return y;
	}
	
	public int bottomY() {
		return y + h;
	}
	
	/**
	 * Rect
	 * 
	 * @param x
	 * @param y
	 * @param w
	 * @param h
	 */
	public Rect(int x, int y, int w, int h) {
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	public List<Point> getPoints() {
		List<Point> ps = new ArrayList<>();
		
		ps.add(new Point(x, y));
		ps.add(new Point(x + w, y));
		ps.add(new Point(x, y + h));
		ps.add(new Point(x + w, y + h));
		
		return ps;
	}
	
	@Override
	public String toString() {
		return String.format("{%s,%s,%s,%s}", x, y, w, h);
	}
}
