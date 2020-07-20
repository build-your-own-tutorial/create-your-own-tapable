const SyncWaterfallHook = require("../SyncWaterfallHook");

describe('SyncWaterfallHook', () => {
    test('it should be called twice', () => {
        const hook = new SyncWaterfallHook();
        const mockCallback = jest.fn(() => { });
        hook.tap('log1', mockCallback);
        hook.tap('log2', mockCallback);
        hook.call();
        expect(mockCallback.mock.calls.length).toBe(2);
    })

    test('mockCallback2 should get mockCallback1\'s result as parameter', () => {
        const hook = new SyncWaterfallHook();
        const mockCallback1 = jest.fn(() => { return 120; });
        const mockCallback2 = jest.fn(() => { });
        hook.tap('log1', mockCallback1);
        hook.tap('log2', mockCallback2);
        hook.call();
        expect(mockCallback1.mock.calls.length).toBe(1);
        expect(mockCallback2.mock.calls.length).toBe(1);
        expect(mockCallback2.mock.calls[0][0]).toBe(120);
    })
})

