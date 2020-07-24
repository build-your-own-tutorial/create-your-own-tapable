function AsyncParallelHook() {
    this.asyncCallbacks = [];
}

AsyncParallelHook.prototype.tapAsync = function (name, callback) {
    this.asyncCallbacks.push({ name, callback })
}

AsyncParallelHook.prototype.callAsync = function (done) {
    let i = 0;
    const callResolve = () => {
        i++;
        if (i === this.asyncCallbacks.length) {
            done()
        }
    }
    this.asyncCallbacks.forEach(asyncCallbackObj => {
        asyncCallbackObj.callback(callResolve);
    })
}

AsyncParallelHook.prototype.tapPromise = function (name, callback) {
    this.asyncCallbacks.push({ name, callback })
}

AsyncParallelHook.prototype.promise = function () {
    console.log('promise11');
    return new Promise((resolve, reject) => {
        let i = 0;
        this.asyncCallbacks.forEach(asyncCallbackObj => {
            asyncCallbackObj.callback().then(() => {
                i++;
                console.log(i);
                if (i === this.asyncCallbacks.length) {
                    resolve()
                }
            });
        })
    })
}

module.exports = AsyncParallelHook