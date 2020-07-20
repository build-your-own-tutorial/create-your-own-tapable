function SyncLoopHook() {
    this.callbacks = [];
}

SyncLoopHook.prototype.tap = function (name, callback) {
    this.callbacks.push({ name, callback })
}

SyncLoopHook.prototype.call = function () {
    let result;
    for (let i = 0; i < this.callbacks.length; i++) {
        const callbackObj = this.callbacks[i];
        result = callbackObj.callback();
        while (typeof result !== 'undefined') {
            result = callbackObj.callback();
        }
    }
}

module.exports = SyncLoopHook;