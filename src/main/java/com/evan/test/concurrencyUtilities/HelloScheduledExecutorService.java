package com.evan.test.concurrencyUtilities;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class HelloScheduledExecutorService {
	
	public static void main(String[] args) {
		ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(5);
		
		for (int i = 0; i < 30; i++) {
			
			System.out.println("try to add task " + i);
			
			scheduledExecutorService.schedule(new Runnable() {
				
				@Override
				public void run() {
					System.out.println("scheduled executor service run !");
				}
			}, 10, TimeUnit.SECONDS);
			
			System.out.println("done");
			
		}
		
		scheduledExecutorService.shutdown();
		
	}
	
}
