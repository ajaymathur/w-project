jest.mock('enquirer');

import Conf from 'conf'
import config from '../config';

describe('Config', () => {
  describe('list command', () => {
    let originalConsole;
    beforeEach(() => {
      originalConsole = console;
      console = {
        log: jest.fn()
      } as unknown as Console;
    });
    afterEach(() => {
      console = originalConsole;
    })
    it('should print the full config with console log', async () => {
      let confMock = {
        get: jest.fn().mockImplementation((property) => {
          if (property === 'editor') {
            return 'code';
          }
          if (property === 'workspaces') {
            return ['testing']
          }
        })
      } as unknown as Conf;

      await config({
        conf: confMock,
        args: ['list']
      });
      expect(console.log).toHaveBeenCalledTimes(4);
      expect(console.log).toHaveBeenNthCalledWith(2, 'code');
      expect(console.log).toHaveBeenNthCalledWith(4, 'testing')  
    })
  })
});
