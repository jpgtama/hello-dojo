package com.evan.test.concurrencyUtilities;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class HelloLock {
	
	public static void main(String[] args) {
		
		final Lock lock = new ReentrantLock();
		
		for (int i = 0; i < 10; i++) {
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					
					System.out.println("Try to get the lock..." + Thread.currentThread().getId());
					
					lock.lock();
					
					System.out.println("I got the lock, " + Thread.currentThread().getId());
					
					try {
						System.out.println("begin to do the work..." + Thread.currentThread().getId());
						Thread.sleep(1000 * 5);
						System.out.println("work is done." + Thread.currentThread().getId());
						System.out.println("release lock..." + Thread.currentThread().getId());
						lock.unlock();
						System.out.println("lock released." + Thread.currentThread().getId());
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
			}).start();
			
		}
		
	}
	
}
