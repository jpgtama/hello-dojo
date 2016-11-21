package com.evan.test.imageAnalysis.entity;

import java.awt.Point;
import java.awt.image.BufferedImage;

public class Cell {
	
	private BufferedImage bi;
	
	private Point leftTop;
	
	private Point rightTop;
	
	private Point leftBottom;
	
	private Point rightBottom;
	
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
	
	/**
	 * get leftTop
	 * 
	 * @return the leftTop
	 */
	public Point getLeftTop() {
		return leftTop;
	}
	
	/**
	 * set leftTop
	 * 
	 * @param leftTop
	 *            the leftTop to set
	 */
	public void setLeftTop(Point leftTop) {
		this.leftTop = leftTop;
	}
	
	/**
	 * get rightTop
	 * 
	 * @return the rightTop
	 */
	public Point getRightTop() {
		return rightTop;
	}
	
	/**
	 * set rightTop
	 * 
	 * @param rightTop
	 *            the rightTop to set
	 */
	public void setRightTop(Point rightTop) {
		this.rightTop = rightTop;
	}
	
	/**
	 * get leftBottom
	 * 
	 * @return the leftBottom
	 */
	public Point getLeftBottom() {
		return leftBottom;
	}
	
	/**
	 * set leftBottom
	 * 
	 * @param leftBottom
	 *            the leftBottom to set
	 */
	public void setLeftBottom(Point leftBottom) {
		this.leftBottom = leftBottom;
	}
	
	/**
	 * get rightBottom
	 * 
	 * @return the rightBottom
	 */
	public Point getRightBottom() {
		return rightBottom;
	}
	
	/**
	 * set rightBottom
	 * 
	 * @param rightBottom
	 *            the rightBottom to set
	 */
	public void setRightBottom(Point rightBottom) {
		this.rightBottom = rightBottom;
	}
	
	/**
	 * Cell
	 * 
	 * @param bi
	 * @param leftTop
	 * @param rightTop
	 * @param leftBottom
	 * @param rightBottom
	 */
	public Cell(BufferedImage bi, Point leftTop, Point rightTop, Point leftBottom, Point rightBottom) {
		super();
		this.bi = bi;
		this.leftTop = leftTop;
		this.rightTop = rightTop;
		this.leftBottom = leftBottom;
		this.rightBottom = rightBottom;
	}
	
}
