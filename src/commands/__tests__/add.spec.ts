import add from '../add';

describe('add', () => {
  it('add', () => {
    const confMock = {
      set: jest.fn(),
      get() { return ['hello'] }
    };

    // @ts-ignore
    add({ conf: confMock, workspacePath: 'test' });

    expect(confMock.set).toHaveBeenCalledWith("workspaces", [expect.stringContaining('test'), "hello"])
  });
});