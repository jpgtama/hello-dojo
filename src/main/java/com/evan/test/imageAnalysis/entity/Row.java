package com.evan.test.imageAnalysis.entity;

import java.awt.image.BufferedImage;

public class Row {
	
	private int startX;
	
	private int startY;
	
	private int endY;
	
	private BufferedImage bi;
	
	/**
	 * Row
	 * 
	 * @param startX
	 * @param startY
	 * @param endY
	 * @param bi
	 */
	public Row(int startX, int startY, int endY, BufferedImage bi) {
		super();
		this.startX = startX;
		this.startY = startY;
		this.endY = endY;
		this.bi = bi;
	}
	
	/**
	 * get startX
	 * 
	 * @return the startX
	 */
	public int getStartX() {
		return startX;
	}
	
	/**
	 * set startX
	 * 
	 * @param startX
	 *            the startX to set
	 */
	public void setStartX(int startX) {
		this.startX = startX;
	}
	
	/**
	 * get startY
	 * 
	 * @return the startY
	 */
	public int getStartY() {
		return startY;
	}
	
	/**
	 * set startY
	 * 
	 * @param startY
	 *            the startY to set
	 */
	public void setStartY(int startY) {
		this.startY = startY;
	}
	
	/**
	 * get endY
	 * 
	 * @return the endY
	 */
	public int getEndY() {
		return endY;
	}
	
	/**
	 * set endY
	 * 
	 * @param endY
	 *            the endY to set
	 */
	public void setEndY(int endY) {
		this.endY = endY;
	}
	
	/**
	 * get bi
	 * 
	 * @return the bi
	 */
	public BufferedImage getBi() {
		return bi;
	}
	
	/**
	 * set bi
	 * 
	 * @param bi
	 *            the bi to set
	 */
	public void setBi(BufferedImage bi) {
		this.bi = bi;
	}
	
}
