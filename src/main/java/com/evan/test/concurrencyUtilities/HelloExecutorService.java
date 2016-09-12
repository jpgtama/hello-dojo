package com.evan.test.concurrencyUtilities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class HelloExecutorService {
	
	public static void main(String[] args) throws InterruptedException, ExecutionException {
		ExecutorService es = Executors.newFixedThreadPool(10);
		
		es.execute(new Runnable() {
			
			@Override
			public void run() {
				try {
					Thread.sleep(1000);
					System.out.println("execute runnable");
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
		
		Future future = es.submit(new Runnable() {
			
			@Override
			public void run() {
				try {
					Thread.sleep(1000);
					System.out.println("submit runnable");
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
		
		System.out.println("future result: " + future.get());
		
		future = es.submit(new Callable<Long>() {
			
			@Override
			public Long call() throws Exception {
				try {
					Thread.sleep(1000);
					System.out.println("submit callable");
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				return 112233L;
			}
		});
		
		System.out.println("future result: " + future.get());
		
		// invoke any
		Set<Callable<String>> invokeAnyCallables = new HashSet<Callable<String>>();
		
		for (int i = 0; i < 100; i++) {
			final int taskId = i;
			invokeAnyCallables.add(new Callable<String>() {
				
				@Override
				public String call() throws Exception {
					System.out.println("invokeAnyCallables: " + taskId);
					return "invokeAnyCallables Task " + taskId;
				}
			});
			
		}
		
		Thread.sleep(1000);
		String result = es.invokeAny(invokeAnyCallables);
		System.out.println("invoke any result: " + result);
		
		// invokeAll
		Set<Callable<String>> invokeAllCallables = new HashSet<Callable<String>>();
		
		for (int i = 0; i < 100; i++) {
			final int taskId = i;
			invokeAllCallables.add(new Callable<String>() {
				
				@Override
				public String call() throws Exception {
					System.out.println("invokeAllCallables: " + taskId);
					return "invokeAllCallables Task " + taskId;
				}
			});
		}
		
		List<Future<String>> futures = es.invokeAll(invokeAllCallables);
		
		for (Future<String> f : futures) {
			System.out.println("invokeAll future resutl: " + f.get());
		}
		
	}
	
}
