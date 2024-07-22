import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Logger } from '../../../src/core/logger/Logger.ts';
import { Console } from 'console';
import { stdout, stderr } from 'process';

describe('Logger', () => {
  let logger;
  let mockConsole;
  const mockIndicator = {
    key: 'test',
    level: 'info',
    color: '#ff0000',
    symbol: '!',
  };
  const defaultConfig = {
    defaults: {
      level: 'info',
      label: '[LOG]',
      colors: {
        log: '#0000ff',
        info: '#00ff00',
        error: '#ff0000',
      },
    },
    indicators: [mockIndicator],
  };
  beforeEach(() => {
    mockConsole = new Console({ stdout, stderr, groupIndentation: 2 });
    vi.spyOn(mockConsole, 'log').mockImplementation(() => {});
    vi.spyOn(mockConsole, 'group').mockImplementation(() => {});
    vi.spyOn(mockConsole, 'groupEnd').mockImplementation(() => {});
    vi.spyOn(mockConsole, 'info').mockImplementation(() => {});
    logger = new Logger(defaultConfig);
    logger['console'] = mockConsole; // Replace console with mocked version
  });
  it('should initialize with default configuration', () => {
    expect(logger['defaults']).toEqual(defaultConfig.defaults);
    expect(logger['i'].keys).toContain('info');
  });

  it('should log a message with group and body', () => {
    const logDetail = {
      head: {
        command: 'testCommand',
      },
      body: [{ key: 'testKey', value: 'testValue' }],
    };

    logger.log(logDetail);

    expect(mockConsole.group).toHaveBeenCalledWith(expect.stringContaining('testCommand'));
    expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('testKey'));
    expect(mockConsole.groupEnd).toHaveBeenCalled();
  });

  it('should update defaults', () => {
    const newDefaults = {
      label: 'NEW_LOG',
    };
    logger.updateDefaults(newDefaults);
    expect(logger['defaults'].label).toBe('NEW_LOG');
  });

  it('should get indicator keys', () => {
    expect(logger.indicatorKeys).toContain('info');
  });

  it('should return the correct indicator string', () => {
    const indicatorStr = logger['getIndicatorStr']('info');
    expect(indicatorStr).toContain('ⓘ');
  });

  it('should create a group head', () => {
    const headDetail = {
      command: 'testCommand',
    };

    const groupHead = logger['createGroupHead'](headDetail);
    expect(groupHead.head).toContain('testCommand');
  });

  it('should write group body', () => {
    const body = [{ key: 'testKey', value: 'testValue' }];
    logger['writeGroupBody'](body, '#00ff00', 'info');
    expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('testKey'));
    expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('testValue'));
  });
});
