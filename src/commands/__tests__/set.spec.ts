import Conf from 'conf';
import setConfig from '../set';

// @ts-ignore
jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('setConfig', () => {
  let confMock = {} as unknown as Conf;
  let originalConsole;
  beforeEach(() => {
    originalConsole = console;
    console = {
      error: jest.fn()
    } as unknown as Console;
    confMock = {
      set: jest.fn()
    } as unknown as Conf;
  });
  afterEach(() => {
    console = originalConsole;
  })
  it('should throw if unknown property is passed', () => {
    expect(() => setConfig({
      conf: confMock,
      property: 'unknown',
      value: 'dummyValue'
    })).toThrow(/unknown config is not supported./);
  });

  it('should throw if invalid value is passed for valid property', () => {
    expect(() => setConfig({
      conf: confMock,
      property: 'editor',
      value: 'dummyValue'
    })).toThrow(/dummyValue is not supported/)
  });

  it('calls conf set with valid value', () => {
    setConfig({
      conf: confMock,
      property: 'editor',
      value: 'atom'
    });
    expect(confMock.set).toHaveBeenCalledWith("editor", "atom");
  });
});
