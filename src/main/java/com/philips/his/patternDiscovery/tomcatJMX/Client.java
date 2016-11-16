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
 * FILE NAME: Client.java
 * 
 * CREATED: 2016年11月16日 下午1:37:13
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.philips.his.patternDiscovery.tomcatJMX;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import javax.management.JMX;
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;

import org.apache.catalina.Context;

/**
 * Client
 * 
 * 
 * Not working because tomcat reload didn't send any notification back so we can't get the reload status.
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
@Deprecated()
public class Client {
	
	public static void main(String[] args) throws Exception {
		echo("\nCreate an RMI connector client and " + "connect it to the RMI connector server");
		String host = "localhost"; // or some A.B.C.D
		int port = 9999;
		String urlStr = "service:jmx:rmi:///jndi/rmi://" + host + ":" + port + "/jmxrmi";
		JMXServiceURL url = new JMXServiceURL(urlStr);
		JMXConnector jmxc = JMXConnectorFactory.connect(url, null);
		
		MBeanServerConnection mbsc = jmxc.getMBeanServerConnection();
		
		echo("\nDomains:");
		String domains[] = mbsc.getDomains();
		Arrays.sort(domains);
		for (String domain : domains) {
			echo("\tDomain = " + domain);
		}
		
		echo("\nMBeanServer default domain = " + mbsc.getDefaultDomain());
		
		echo("\nMBean count = " + mbsc.getMBeanCount());
		echo("\nQuery MBeanServer MBeans:");
		Set<ObjectName> names = new TreeSet<ObjectName>(mbsc.queryNames(null, null));
		for (ObjectName name : names) {
			echo("\tObjectName = " + name);
		}
		
		// get web module
		ObjectName mbeanName = new ObjectName("Catalina:j2eeType=WebModule,name=//localhost/bigdata,J2EEApplication=none,J2EEServer=none");
		mbsc.addNotificationListener(mbeanName, new ClientListener(), null, null);
		echo("\nAdd notification listener...");
		
		echo("Path: " + mbsc.getAttribute(mbeanName, "path"));
		echo("State Name: " + mbsc.getAttribute(mbeanName, "stateName"));
		// mbsc.invoke(mbeanName, operationName, params, signature);
		
		Context standardContextProxy = JMX.newMBeanProxy(mbsc, mbeanName, Context.class, true);
		standardContextProxy.addLifecycleListener(new MyLifecycleListener());
		echo("begin to reload");
		standardContextProxy.reload();
		// jmxc.close();
		Thread.sleep(1000 * 60 * 2);
	}
	
	private static void echo(Object obj) {
		System.out.println(obj);
	}
}
