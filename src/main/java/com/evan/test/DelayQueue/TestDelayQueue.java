package com.evan.test.DelayQueue;

public class TestDelayQueue {
	
	public static void main(String[] args) throws InterruptedException {
		
		// final DelayQueue<SessionId> delayQueue = new DelayQueue<>();
		
		SessionManager sm = new SessionManager();
		
		for (int i = 0; i < 10; i++) {
			sm.addSession(Long.valueOf(i));
		}
		
		sm.monitor();
		
		// SessionId sid = null;
		// while ((sid = delayQueue.take()) != null) {
		// System.out.println("there is a session expired: " + sid.getId());
		// }
		
		// new Thread(new Runnable() {
		//
		// @Override
		// public void run() {
		// while (delayQueue.size() > 0) {
		// SessionId sid;
		// try {
		// sid = delayQueue.take();
		// System.out.println("there is a session expired: " + sid.getId());
		// } catch (InterruptedException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		//
		// }
		//
		// }
		// }).start();
		
		for (int i = 0; i < 120; i++) {
			sm.updateSession(5L);
			Thread.sleep(1000);
		}
		
	}
	
}
