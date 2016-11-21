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
 * FILE NAME: Hello_ImageAnalysis.java
 * 
 * CREATED: 2016年11月21日 上午10:33:24
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.evan.test.imageAnalysis;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

import com.evan.test.imageAnalysis.entity.Row;

/**
 * Hello_ImageAnalysis
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class Hello_ImageAnalysis {
	
	public static void main(String[] args) throws Exception {
		
		String srcImageFile = "C:/Users/310199253/Pictures/hello_ia/hemoglobin.bmp";
		
		BufferedImage bi = ImageIO.read(new File(srcImageFile));
		int srcWidth = bi.getHeight(); // 源图宽度
		int srcHeight = bi.getWidth(); // 源图高度
		System.out.println("srcWidth:" + srcWidth);
		System.out.println("srcHeight:" + srcHeight);
		
		// get color
		
		for (int y = 0; y < 15; y++) {
			for (int x = 0; x < 10; x++) {
				Color color = new Color(bi.getRGB(x, y));
				System.out.print(isBlack(color));
			}
			System.out.println();
		}
		
		// get rows
		int startX = 10;
		int state = 0; // 0 - in white, 1 - in black,
		Row currentRow = null;
		for (int y = 0; y < srcHeight; y++) {
			Color color = new Color(bi.getRGB(startX, y));
			if (isBlack(color)) {
				state = 1;
			} else {
				if (state == 1) {
					currentRow = new Row(startX, y, 0, bi);
				}
			}
		}
		
	}
	
	private static boolean isBlack(Color color) {
		return color.getRed() < 10;
	}
	
	private static String rgbString(Color color) {
		return String.format("%s, %s, %s", color.getRed(), color.getGreen(), color.getBlue());
	}
	
	// TODO
	private static void row_start() {
		
		enter_black();
		
		enter_black();
		
		enter_black(); // TODO look ahead 1
		
	}
	
	private static void enter_black() {
		// TODO Auto-generated method stub
		
	}
	
	private static void row_end() {
		
	}
	
}
