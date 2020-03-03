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
  it('prints error message on console if unknown property is passed', () => {
    setConfig({
      conf: confMock,
      property: 'unkown',
      value: 'dummyValue'
    });
    expect(console.error).toHaveBeenCalledWith(new Error('Unknown property unkown'))
  });
  it('prints error message on console if invalid value is passed for valid property', () => {
    setConfig({
      conf: confMock,
      property: 'editor',
      value: 'dummyValue'
    });
    expect(console.error).toHaveBeenCalledWith(new Error('Unknown editor dummyValue'))
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
