import mock from 'mock-fs';
import add from '../add';

const confMock = {
  set: jest.fn(),
  get() { return ['hello'] }
};

describe('add', () => {
  beforeEach(() => {
    mock({
      '/testDir': {
        'testFile.ts': 'dummyContent'
      }
    })
  });

  afterEach(() => {
    mock.restore();
  })


  it('should add if the workspace path is a directory', async () => {
    // @ts-ignore
    await add({ conf: confMock, workspacePath: '/testDir' });

    expect(confMock.set).toHaveBeenCalledWith("workspaces", [expect.stringContaining('testDir'), "hello"])
  });

  it('should throw an error is the workspace does not exits', async () => {
    // @ts-ignore
    expect(add({ conf: confMock, workspacePath: '/nonExitsDir' })).rejects.toThrow(/Given workspace does not exists./);
  });

  it('should throw an error if the workspace is not a directory', async () => {
    // @ts-ignore
    expect(add({ conf: confMock, workspacePath: '/testDir/testFile.ts' })).rejects.toThrow(/Given workspace is not a directory/);
  });
});