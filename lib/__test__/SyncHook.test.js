const SyncHook = require("../SyncHook");
const hook = new SyncHook();

const mockCallback = jest.fn(() => { });

hook.tap('log1', mockCallback);
hook.tap('log2', mockCallback);
hook.call();
describe('SyncHook', () => {
    test('it should be called twice', () => {
        expect(mockCallback.mock.calls.length).toBe(2);
    })
})

