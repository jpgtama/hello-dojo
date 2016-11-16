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
 * FILE NAME: ClientListener.java
 * 
 * CREATED: 2016年11月16日 下午1:37:41
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.philips.his.patternDiscovery.tomcatJMX;

import javax.management.Notification;
import javax.management.NotificationListener;

/**
 * ClientListener
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class ClientListener implements NotificationListener {
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.management.NotificationListener#handleNotification(javax.management.Notification, java.lang.Object)
	 */
	@Override
	public void handleNotification(Notification notification, Object handback) {
		// TODO Auto-generated method stub
		echo("\nReceived notification:");
		echo("\tClassName: " + notification.getClass().getName());
		echo("\tSource: " + notification.getSource());
		echo("\tType: " + notification.getType());
		echo("\tMessage: " + notification.getMessage());
		
		echo("\nClass: " + notification.getClass());
		
		// if (notification instanceof AttributeChangeNotification) {
		// AttributeChangeNotification acn = (AttributeChangeNotification) notification;
		// echo("\tAttributeName: " + acn.getAttributeName());
		// echo("\tAttributeType: " + acn.getAttributeType());
		// echo("\tNewValue: " + acn.getNewValue());
		// echo("\tOldValue: " + acn.getOldValue());
		// }
	}
	
	private void echo(Object obj) {
		System.out.println("============Listener:  " + obj);
	}
	
}
