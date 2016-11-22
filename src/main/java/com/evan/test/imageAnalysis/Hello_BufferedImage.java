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
 * FILE NAME: Hello_BufferedImage.java
 * 
 * CREATED: 2016年11月22日 下午12:42:01
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.text.StrSubstitutor;

/**
 * Hello_BufferedImage
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class Hello_BufferedImage {
	
	public static void main(String[] args) throws Exception {
		
		String srcImageFilePath = "C:/Users/310199253/Pictures/hello_ia/hemoglobin.bmp";
		String binaryImageFilePath = srcImageFilePath + ".binary.bmp";
		String squareImageFilePath = srcImageFilePath + ".square_${squareSize}.bmp";
		
		BufferedImage biSrc = ImageIO.read(new File(srcImageFilePath));
		int srcWidth = biSrc.getHeight(); // 源图宽度
		int srcHeight = biSrc.getWidth(); // 源图高度
		System.out.println("srcWidth:" + srcWidth);
		System.out.println("srcHeight:" + srcHeight);
		
		// zoom out
		// zoomOut(srcImageFile, bi, 1.5f);
		
		// two value
		// binaryImage(bi, srcImageFile + ".binary.bmp");
		
		// check binary image
		// checkBinaryImage(srcImageFile + ".binary.bmp");
		
		// squre
		BufferedImage biBinary = ImageIO.read(new File(binaryImageFilePath));
		square(biBinary, 2, squareImageFilePath);
		square(biBinary, 3, squareImageFilePath);
		square(biBinary, 4, squareImageFilePath);
		square(biBinary, 5, squareImageFilePath);
		square(biBinary, 6, squareImageFilePath);
		square(biBinary, 7, squareImageFilePath);
		square(biBinary, 8, squareImageFilePath);
		square(biBinary, 9, squareImageFilePath);
		
	}
	
	private static void checkBinaryImage(String imageFileName) throws Exception {
		BufferedImage bi = ImageIO.read(new File(imageFileName));
		
		for (int y = 0; y < bi.getHeight(); y++) {
			for (int x = 0; x < bi.getWidth(); x++) {
				Color color = color(bi.getRGB(x, y));
				if (!isWhite(color) && !isBlack(color)) {
					System.out.println(String.format("binary check failed: [%s, %s] -> %s", x, y, color.toString()));
				}
			}
		}
		
	}
	
	private static Color color(int rgb) {
		return new Color(rgb);
	}
	
	private static void binaryImage(BufferedImage bi, String outputFilePath) throws Exception {
		int srcWidth = bi.getWidth(); // 源图宽度
		int srcHeight = bi.getHeight(); // 源图高度
		
		// copy image
		BufferedImage newBi = new BufferedImage(srcWidth, srcHeight, BufferedImage.TYPE_INT_RGB);
		Graphics g = newBi.getGraphics();
		
		// draw two value
		for (int y = 0; y < srcHeight; y++) {
			for (int x = 0; x < srcWidth; x++) {
				
				newBi.setRGB(x, y, isWhite(new Color(bi.getRGB(x, y))) ? Color.WHITE.getRGB() : Color.BLACK.getRGB());
			}
		}
		
		// output
		ImageIO.write(newBi, "BMP", new File(outputFilePath));
		
		// log
		System.out.println("binary image done.");
	}
	
	private static boolean isBlack(Color color) {
		return sameRGB(color, 0);
	}
	
	private static boolean isWhite(Color color) {
		return sameRGB(color, 255);
	}
	
	/**
	 * sameRGB
	 * 
	 * @param color
	 * @return
	 */
	private static boolean sameRGB(Color color, int value) {
		return color.getRed() == value && color.getGreen() == value && color.getBlue() == value;
	}
	
	private static void square(BufferedImage bi, int squareSize, String outputFilePath) throws Exception {
		int srcWidth = bi.getWidth(); // 源图宽度
		int srcHeight = bi.getHeight(); // 源图高度
		
		// formate outputFilePath
		Map<String, Object> replace = new HashMap<>();
		replace.put("squareSize", squareSize);
		StrSubstitutor sub = new StrSubstitutor(replace);
		outputFilePath = sub.replace(outputFilePath);
		
		// copy image
		BufferedImage newBi = new BufferedImage(srcWidth, srcHeight, BufferedImage.TYPE_INT_RGB);
		Graphics g = newBi.getGraphics();
		g.drawImage(bi, 0, 0, null);
		
		// draw rect
		g.setColor(Color.BLUE);
		for (int y = 0; y < srcHeight; y += squareSize) {
			for (int x = 0; x < srcWidth; x += squareSize) {
				
				int rectWidth = Math.min(squareSize, srcWidth - x);
				int rectHeight = Math.min(squareSize, srcHeight - y);
				
				if (isSquareFilled(newBi, x, y, rectWidth, rectHeight)) {
					g.drawRect(x, y, rectWidth, rectHeight);
				}
				
			}
		}
		
		// output
		ImageIO.write(newBi, "BMP", new File(outputFilePath));
		
		// log
		System.out.println("square done.");
	}
	
	private static boolean isSquareFilled(BufferedImage newBi, int x, int y, int rectWidth, int rectHeight) {
		
		final int[] blackCount = new int[] { 0 };
		
		ImageScanCallBack callBack = new ImageScanCallBack() {
			
			@Override
			public void rgb(int rgb) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void color(Color color) {
				if (isBlack(color)) {
					blackCount[0] = blackCount[0] + 1;
				}
				;
				
			}
		};
		
		scanImage(newBi, x, y, rectWidth, rectHeight, callBack);
		
		return blackCount[0] > 0;
	}
	
	private static interface ImageScanCallBack {
		
		void rgb(int rgb);
		
		void color(Color color);
	}
	
	private static void scanImage(BufferedImage bi, int startX, int startY, int width, int height, ImageScanCallBack callback) {
		for (int y = startY; y < startY + height; y++) {
			for (int x = startX; x < startX + width; x++) {
				callback.rgb(bi.getRGB(x, y));
				callback.color(color(bi.getRGB(x, y)));
			}
		}
	}
	
	private static void zoomOut(String srcFilePath, BufferedImage bi, float d) throws IOException {
		int srcWidth = bi.getHeight(); // 源图宽度
		int srcHeight = bi.getWidth(); // 源图高度
		
		int newWidth = Math.round(srcWidth * d);
		int newHeight = Math.round(srcHeight * d);
		
		Image newImage = bi.getScaledInstance(newWidth, newHeight, Image.SCALE_DEFAULT);
		
		BufferedImage newBi = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
		Graphics g = newBi.getGraphics();
		g.drawImage(newImage, 0, 0, null);
		g.dispose();
		
		ImageIO.write(newBi, "BMP", new File(srcFilePath + ".zoomout"));
		
	}
}
