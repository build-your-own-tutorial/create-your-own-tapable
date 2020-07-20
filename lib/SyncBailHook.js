function SyncBailHook() {
    this.callbacks = [];
}

SyncBailHook.prototype.tap = function (name, callback) {
    this.callbacks.push({ name, callback })
}

SyncBailHook.prototype.call = function () {
    for (let i = 0; i < this.callbacks.length; i++) {
        const callbackObj = this.callbacks[i];
        const result = callbackObj.callback();
        if(result) return;
    }
}

module.exports = SyncBailHook;