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
 * FILE NAME: MyLifecycleListener.java
 * 
 * CREATED: 2016年11月16日 下午3:14:16
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.philips.his.patternDiscovery.tomcatJMX;

import java.io.Serializable;

import org.apache.catalina.LifecycleEvent;
import org.apache.catalina.LifecycleListener;

/**
 * MyLifecycleListener
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class MyLifecycleListener implements LifecycleListener, Serializable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.catalina.LifecycleListener#lifecycleEvent(org.apache.catalina.LifecycleEvent)
	 */
	@Override
	public void lifecycleEvent(LifecycleEvent evt) {
		// TODO Auto-generated method stub
		System.out.println("LifecycleListener ============" + evt);
	}
	
}
