const SyncBailHook = require("../SyncBailHook");

describe('SyncBailHook', () => {
    test('it should be called twice', () => {
        const hook = new SyncBailHook();
        const mockCallback = jest.fn(() => { });
        hook.tap('log1', mockCallback);
        hook.tap('log2', mockCallback);
        hook.call();
        expect(mockCallback.mock.calls.length).toBe(2);
    })

    test('mockCallback2 should not be called', () => {
        const hook = new SyncBailHook();
        const mockCallback1 = jest.fn(() => { return 1; });
        const mockCallback2 = jest.fn(() => { });
        hook.tap('log1', mockCallback1);
        hook.tap('log2', mockCallback2);
        hook.call();
        expect(mockCallback2.mock.calls.length).toBe(0);
    })
})

