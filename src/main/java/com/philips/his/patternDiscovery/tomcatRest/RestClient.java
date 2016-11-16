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
 * FILE NAME: RestClient.java
 * 
 * CREATED: 2016年11月16日 下午3:49:27
 *
 * ORIGINAL AUTHOR(S): 310199253
 *
 ***************************************************************************/
package com.philips.his.patternDiscovery.tomcatRest;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.apache.cxf.jaxrs.client.WebClient;

/**
 * RestClient
 * 
 * @author $Author: $
 * @version $Revision: $
 * @since $Date: $
 */
public class RestClient {
	
	public static void main(String[] args) throws Exception {
		WebClient webClient = WebClient.create("http://localhost:9090/manager/text");
		
		// Replace 'user' and 'password' by the actual values
		String authorizationHeader = "Basic " + org.apache.cxf.common.util.Base64Utility.encode("admin:admin".getBytes());
		webClient.header("Authorization", authorizationHeader);
		
		// list
		webClient.path("list");
		
		checkResponse(webClient);
		
		// redeploy
		webClient.reset();
		webClient.resetQuery();
		webClient.header("Authorization", authorizationHeader);
		webClient.path("reload");
		webClient.query("path", "/bigdata");
		
		checkResponse(webClient);
	}
	
	/**
	 * checkResponse
	 * 
	 * @param webClient
	 * @throws Exception
	 * @throws IOException
	 */
	private static void checkResponse(WebClient webClient) throws Exception, IOException {
		System.out.println("uri: " + webClient.getCurrentURI());
		
		Response response = webClient.get();
		
		int status = response.getStatus();
		
		System.out.println(" status: " + status);
		
		if (status != 200) {
			throw new Exception("status is not 200, " + status);
		}
		
		String content = IOUtils.toString((InputStream) response.getEntity(), StandardCharsets.UTF_8);
		
		System.out.println(content);
	}
	
}
