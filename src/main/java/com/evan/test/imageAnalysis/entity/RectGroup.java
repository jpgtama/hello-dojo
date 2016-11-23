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
 * FILE NAME: RectGroup.java
 * 
 * CREATED: 2016年11月23日 下午5:04:02
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * RectGroup
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class RectGroup {
	
	private String id;
	
	private List<Rect> rects = new ArrayList<>();
	
	/**
	 * get id
	 * 
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	
	/**
	 * set id
	 * 
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	
	/**
	 * RectGroup
	 * 
	 * @param id
	 */
	public RectGroup(String id) {
		super();
		this.id = id;
	}
	
	public boolean isInGroup(Rect rect) {
		for (Rect r : rects) {
			if (isNear(r, rect)) {
				return true;
			}
		}
		return false;
	}
	
	public void add(Rect r) {
		rects.add(r);
	}
	
	public void add(RectGroup g) {
		rects.addAll(g.getAllRects());
	}
	
	public List<Rect> getAllRects() {
		return this.rects;
	}
	
	@Override
	public String toString() {
		
		return rects.toString();
	}
	
	private boolean isNear(Rect r, Rect rect) {
		// at least one point is the same
		for (Point p1 : r.getPoints()) {
			for (Point p2 : rect.getPoints()) {
				if (p1.equals(p2)) {
					return true;
				}
			}
		}
		return false;
	}
}
