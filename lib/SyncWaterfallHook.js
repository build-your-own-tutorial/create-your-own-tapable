function SyncBailHook() {
    this.callbacks = [];
}

SyncBailHook.prototype.tap = function (name, callback) {
    this.callbacks.push({ name, callback })
}

SyncBailHook.prototype.call = function () {
    let lastResult;
    for (let i = 0; i < this.callbacks.length; i++) {
        const callbackObj = this.callbacks[i];
        lastResult = callbackObj.callback(lastResult);
    }
}

module.exports = SyncBailHook;