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
 * FILE NAME: RectGroupManager.java
 * 
 * CREATED: 2016年11月23日 下午4:26:08
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * RectGroupManager
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class RectGroupManager {
	
	private Map<String, RectGroup> groups = new HashMap<String, RectGroup>();
	
	// private List<RectGroup> rectGroupList = new ArrayList<>();
	
	public void addRect(Rect rect) {
		
		List<RectGroup> inGroupList = new ArrayList<>();
		
		// loop group list
		// any rect in a group which near this rect will be the group of this rect
		for (RectGroup group : groups.values()) {
			if (group.isInGroup(rect)) {
				// group.add(rect);
				// isInGroup = true;
				// break;
				inGroupList.add(group);
			}
		}
		
		if (inGroupList.size() == 0) {
			// if not in exist group, then create a new group
			String id = getUniqueId();
			RectGroup g = new RectGroup(id);
			g.add(rect);
			
			groups.put(id, g);
		} else if (inGroupList.size() == 1) {
			// join group
			inGroupList.get(0).add(rect);
		} else {
			// merge groups
			String id = getUniqueId();
			RectGroup mergeGroup = new RectGroup(id);
			for (RectGroup g : inGroupList) {
				mergeGroup.add(g);
				// remove old group
				groups.remove(g.getId());
			}
			
			// join group
			mergeGroup.add(rect);
			
			// add to groups
			groups.put(id, mergeGroup);
		}
		
	}
	
	private String getUniqueId() {
		String id = UUID.randomUUID().toString();
		while (groups.containsKey(id)) {
			id = UUID.randomUUID().toString();
		}
		return id;
	}
	
	public static void main(String[] args) {
		System.out.println(UUID.randomUUID());
	}
	
	public List<Rect> reduceAllGroup() {
		List<Rect> reducedRects = new ArrayList<>();
		
		for (RectGroup g : groups.values()) {
			Rect r = reduceGroup(g);
			reducedRects.add(r);
		}
		
		return reducedRects;
	}
	
	private Rect reduceGroup(RectGroup g) {
		// find out min & max X, min & max Y
		int minX = g.getAllRects().get(0).leftX(), maxX = g.getAllRects().get(0).rightX(), minY = g.getAllRects().get(0).topY(), maxY = g.getAllRects().get(0)
				.bottomY();
		for (Rect r : g.getAllRects()) {
			minX = Math.min(minX, r.leftX());
			maxX = Math.max(maxX, r.rightX());
			minY = Math.min(minY, r.topY());
			maxY = Math.max(maxY, r.bottomY());
		}
		
		return new Rect(minX, minY, maxX - minX, maxY - minY);
	}
	
	public void printGroupList() {
		int i = 0;
		for (RectGroup g : groups.values()) {
			System.out.println(String.format("%s -> %s", ++i, g.toString()));
		}
	}
	
}
