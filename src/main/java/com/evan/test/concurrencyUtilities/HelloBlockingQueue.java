package com.evan.test.concurrencyUtilities;

import java.util.Random;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class HelloBlockingQueue {
	
	public static void main(String[] args) {
		
		// blocking queue
		final BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(10);
		
		ExecutorService es = Executors.newFixedThreadPool(2);
		
		// produce
		es.execute(new Runnable() {
			
			@Override
			public void run() {
				for (int i = 0; i < 1000; i++) {
					try {
						System.out.println("begin to produced string");
						String s = "Hello" + new Random().nextLong();
						blockingQueue.put(s);
						System.out.println("produced string: " + s);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		});
		
		// consume
		es.execute(new Runnable() {
			
			@Override
			public void run() {
				while (true) {
					try {
						Thread.sleep(1000 * 5);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					try {
						String s = blockingQueue.take();
						System.out.println("consume: " + s);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				
			}
		});
		
	}
}
