import { describe, it, expect, beforeEach } from 'vitest';
import { IndicatorManager } from '../../../src/core/logger/components/indicators/IndicatorManager.ts';

const mockIndicator = {
  key: 'test',
  level: 'info',
  color: '#ff0000',
  symbol: '!',
};
describe('IndicatorManager', () => {
  let manager;

  beforeEach(() => {
    manager = new IndicatorManager();
  });

  it('should initialize with base indicators', () => {
    expect(manager.keys).toHaveLength(5).toEqual(['neutral', 'success', 'info', 'warn', 'error']);
  });

  it('should create an indicator', () => {
    manager.create(mockIndicator);
    const indicator = manager.read('test');
    expect(indicator.key).toBe('test');
    expect(indicator.level).toBe('info');
    expect(indicator.color).toBe('#ff0000');
    expect(indicator.symbol).toBe('!');
  });

  it('should read an indicator by key', () => {
    manager.create(mockIndicator);
    const indicator = manager.read('test');
    expect(indicator.key).toBe('test');
  });

  it('should throw an error when reading a non-existent indicator', () => {
    expect(() => manager.read('nonExistent')).toThrowError(
      'nonExistent not found in registered indicators.',
    );
  });

  it('should read an indicator by level', () => {
    manager.create(mockIndicator);
    const indicator = manager.readByLevel('info');
    expect(indicator.key).toBe('info');
  });

  it('should throw an error when reading by a non-existent level', () => {
    expect(() => manager.readByLevel('goats')).toThrowError(
      'goats not found in registered indicators.',
    );
  });

  it('should update an indicator', () => {
    manager.create(mockIndicator);
    manager.update('test', { color: '#00ff00' });
    const updatedIndicator = manager.read('test');
    expect(updatedIndicator.color).toBe('#00ff00');
  });

  it('should throw an error when updating a non-existent indicator', () => {
    expect(() => manager.update('nonExistent', { color: '#00ff00' })).toThrowError(
      'nonExistent not found in registered indicators.',
    );
  });

  it('should delete an indicator', () => {
    manager.create(mockIndicator);
    manager.delete('test');
    expect(() => manager.read('test')).toThrowError('test not found in registered indicators.');
  });

  it('should throw an error when deleting a non-existent indicator', () => {
    expect(() => manager.delete('nonExistent')).toThrowError(
      'nonExistent not found in registered indicators.',
    );
  });

  it('should reset all indicators', () => {
    manager.create(mockIndicator);
    manager.reset();
    expect(manager.keys).toHaveLength(0);
  });

  it('should return the correct keys', () => {
    manager.create(mockIndicator);
    expect(manager.keys).toContain('test');
  });
});
