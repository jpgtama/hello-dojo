package com.evan.test.concurrencyUtilities;

import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class HelloReadWriteLock {
	
	public static void main(String[] args) {
		final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
		
		// read
		for (int i = 0; i < 10; i++) {
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					for (int i = 0; i < 10; i++) {
						try {
							Thread.sleep(1000 * 3);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						System.out.println("try to get read lock..." + Thread.currentThread().getId());
						readWriteLock.readLock().lock();
						System.out.println("I am reading... " + Thread.currentThread().getId());
						
						System.out.println("read end." + Thread.currentThread().getId());
						System.out.println("release read lock" + Thread.currentThread().getId());
						readWriteLock.readLock().unlock();
						
					}
					
				}
			}).start();
		}
		
		// write
		new Thread(new Runnable() {
			
			@Override
			public void run() {
				for (int i = 0; i < 10; i++) {
					try {
						Thread.sleep(1000 * 5);
					} catch (InterruptedException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					System.out.println("try to get write lock..." + Thread.currentThread().getId());
					readWriteLock.writeLock().lock();
					System.out.println("I am writing... " + Thread.currentThread().getId());
					try {
						Thread.sleep(1000 * 5);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					System.out.println("write end." + Thread.currentThread().getId());
					System.out.println("release write lock" + Thread.currentThread().getId());
					readWriteLock.writeLock().unlock();
				}
				
			}
		}).start();
		// for (int i = 0; i < 10; i++) {
		// }
		
	}
}
