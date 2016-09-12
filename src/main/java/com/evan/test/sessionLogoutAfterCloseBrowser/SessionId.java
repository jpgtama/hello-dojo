package com.evan.test.sessionLogoutAfterCloseBrowser;

import java.util.Random;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class SessionId implements Delayed {
	
	private Long id;
	
	private long lastCheckPoint;
	
	private long nextCheckPoint;
	
	private int duration = 1000 * 3;
	
	public void update() {
		this.lastCheckPoint = System.currentTimeMillis();
		
		// this.nextCheckPoint = this.lastCheckPoint + this.duration;
		
		// random for test
		this.duration = new Random().nextInt(5000) + 2000;
		this.nextCheckPoint = this.lastCheckPoint + this.duration;
	}
	
	/**
	 * SessionId
	 * 
	 * @param id
	 */
	public SessionId(Long id) {
		super();
		this.id = id;
		this.update();
		System.out.println(this.toString());
	}
	
	@Override
	public int compareTo(Delayed o) {
		SessionId other = (SessionId) o;
		
		return (int) (this.getNextCheckPoint() - other.getNextCheckPoint());
	}
	
	@Override
	public long getDelay(TimeUnit unit) {
		long diff = this.nextCheckPoint - System.currentTimeMillis();
		return unit.convert(diff, TimeUnit.MILLISECONDS);
	}
	
	/**
	 * get id
	 * 
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * set id
	 * 
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * get lastCheckPoint
	 * 
	 * @return the lastCheckPoint
	 */
	public long getLastCheckPoint() {
		return lastCheckPoint;
	}
	
	/**
	 * set lastCheckPoint
	 * 
	 * @param lastCheckPoint
	 *            the lastCheckPoint to set
	 */
	public void setLastCheckPoint(long lastCheckPoint) {
		this.lastCheckPoint = lastCheckPoint;
	}
	
	/**
	 * get nextCheckPoint
	 * 
	 * @return the nextCheckPoint
	 */
	public long getNextCheckPoint() {
		return nextCheckPoint;
	}
	
	/**
	 * set nextCheckPoint
	 * 
	 * @param nextCheckPoint
	 *            the nextCheckPoint to set
	 */
	public void setNextCheckPoint(long nextCheckPoint) {
		this.nextCheckPoint = nextCheckPoint;
	}
	
	/**
	 * get duration
	 * 
	 * @return the duration
	 */
	public int getDuration() {
		return duration;
	}
	
	/**
	 * set duration
	 * 
	 * @param duration
	 *            the duration to set
	 */
	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "SessionId [id=" + id + ", lastCheckPoint=" + lastCheckPoint + ", nextCheckPoint=" + nextCheckPoint + ", duration=" + duration + "]";
	}
	
}
