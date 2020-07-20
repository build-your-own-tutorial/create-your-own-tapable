const SyncLoopHook = require("../SyncLoopHook");

describe('SyncLoopHook', () => {
    test('it should be called 2 times', () => {
        const hook = new SyncLoopHook();
        let index = 0;
        const mockCallback = jest.fn(() => {
            if (index < 1) {
                index++;
                return 'continue';
            }
        });
        hook.tap('log1', mockCallback);
        hook.call();
        expect(mockCallback.mock.calls.length).toBe(2);
    })

    test('log1 should be called twice and log2 should be called after log1 with 3 times', () => {
        const hook = new SyncLoopHook();
        let index = 0;
        const mockCallback1 = jest.fn(() => {
            if (index < 1) {
                index++;
                return 1
            }
        })
        hook.tap('log1', mockCallback1);
        let index2 = 0;
        const mockCallback2 = jest.fn(() => {
            if (index2 < 2) {
                index2++;
                return 1
            }
        })
        hook.tap('log2', mockCallback2);
        hook.call();
        expect(mockCallback1.mock.calls.length).toBe(2);
        expect(mockCallback2.mock.calls.length).toBe(3);
    })
})



// const { SyncLoopHook } = require('tapable');
// const hook = new SyncLoopHook(['x123']);
// let index = 0;
// hook.tap('log1', () => {
//     if (index < 5) {
//         console.log('log1',index);
//         index++;
//         return 1
//     }
// });
// let index2 = 0;
// hook.tap('log2', () => {
//     if (index2 < 3) {
//         console.log('log2',index2);
//         index2++;
//         return 1
//     }
// });
// hook.call();