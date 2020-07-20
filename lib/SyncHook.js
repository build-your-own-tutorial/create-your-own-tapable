function SyncHook() {
    this.callbacks = [];
}

SyncHook.prototype.tap = function (name, callback) {
    this.callbacks.push({ name, callback })
}

SyncHook.prototype.call = function () {
    for (let i = 0; i < this.callbacks.length; i++) {
        const callbackObj = this.callbacks[i];
        callbackObj.callback();
    }
}

module.exports = SyncHook;