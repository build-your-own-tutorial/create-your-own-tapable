const AsyncParallelHook = require('../AsyncParallelHook');

describe('AsyncParallelHook', () => {
    test('tapAsync', () => {
        jest.useFakeTimers();
        const hook = new AsyncParallelHook();
        const mockCallback1 = jest.fn((cb) => {
            setTimeout(() => {
                cb()
            }, 10);
        });
        const mockCallback2 = jest.fn((cb) => {
            setTimeout(() => {
                cb()
            }, 20);
        });
        const mockCallback3 = jest.fn();
        hook.tapAsync('tapAsync1', mockCallback1);
        hook.tapAsync('tapAsync2', mockCallback2);

        jest.advanceTimersByTime(20);

        hook.callAsync(mockCallback3);
        expect(mockCallback1).toHaveBeenCalledBefore(mockCallback2);
        expect(mockCallback2).toHaveBeenCalledBefore(mockCallback3);
    })
})

describe('AsyncParallelHook', () => {
    test('tapPromise', async () => {
        expect.assertions(1);
        const hook = new AsyncParallelHook();
        hook.tapPromise('tapPromise1', () => {
            return new Promise((resolve, reject) => {
                console.log('tapPromise1');
                resolve()
            })
        });
        hook.tapPromise('tapPromise2', () => {
            return new Promise((resolve, reject) => {
                console.log('tapPromise2');
                resolve()
            })
        });
        const mockCallback3 = jest.fn();
        await hook.promise().then(mockCallback3);
        expect(mockCallback3).toHaveBeenCalledTimes(1);
    })
})
