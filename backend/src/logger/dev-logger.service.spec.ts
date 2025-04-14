import { DevLogger } from './dev-logger.service';

describe('DevLogger', () => {
  let devLoggerService: DevLogger;

  beforeEach(() => {
    devLoggerService = new DevLogger();
  });

  it('.log() should call log method of the service', () => {
    const mockTextConsole =
      '[Nest] 12345  - 08.04.2025, 20:18:50     LOG [DevLogger]';
    jest
      .spyOn(devLoggerService, 'log')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.log('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.error() should call error method of the service', () => {
    const mockTextConsole =
      '[Nest] 23456  - 08.04.2025, 20:18:50   ERROR [DevLogger]';
    jest
      .spyOn(devLoggerService, 'error')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.error('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.debug() should call debug method of the service', () => {
    const mockTextConsole =
      '[Nest] 34567  - 08.04.2025, 20:18:50   DEBUG [DevLogger]';
    jest
      .spyOn(devLoggerService, 'debug')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.debug('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.fatal() should call fatal method of the service', () => {
    const mockTextConsole =
      '[Nest] 45678  - 08.04.2025, 20:18:50   FATAL [DevLogger]';
    jest
      .spyOn(devLoggerService, 'fatal')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.fatal('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });
});
