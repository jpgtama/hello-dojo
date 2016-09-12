package com.evan.test.DelayQueue;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SessionManager {
	
	private DelayQueue<SessionId> sessionQueue = new DelayQueue<>();
	
	private ConcurrentHashMap<Long, Long> sidExpiration = new ConcurrentHashMap<>();
	
	private ExecutorService executorService = Executors.newSingleThreadExecutor();
	
	public SessionManager() {
	}
	
	public void monitor() {
		
		new Thread(new Runnable() {
			
			@Override
			public void run() {
				while (sessionQueue.size() > 0) {
					SessionId sid;
					try {
						sid = sessionQueue.take();
						System.out.println("check session: " + sid.getId());
						
						if (sidExpiration.get(sid.getId()) == null) {
							System.out.println("session exipred: " + sid.getId());
						} else {
							if (sidExpiration.get(sid.getId()) + sid.getDuration() < System.currentTimeMillis()) {
								System.out.println("session exipred: " + sid.getId());
							} else {
								sid.update();
								sessionQueue.add(sid);
							}
						}
						
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					
				}
				
			}
		}).start();
	}
	
	public void addSession(Long id) {
		sessionQueue.add(new SessionId(id));
	}
	
	public void updateSession(Long id) {
		sidExpiration.put(id, System.currentTimeMillis());
	}
	
}
