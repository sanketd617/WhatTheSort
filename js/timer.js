function Timer(view) {
    this.seconds = 0;
    this.minutes = 0;
    this.view = view;
    this.interval = null;
}

Timer.prototype.start = function () {
    const self = this;
    function increment() {
        self.seconds = (self.seconds + 1) % 60;
        if(self.seconds === 0) {
            self.minutes += 1;
        }

        self.updateView();
    }

    this.interval = setInterval(increment, 1000);
};

Timer.prototype.updateView = function () {
    this.view.innerHTML = (this.minutes > 9 ? this.minutes : "0" + this.minutes)
        + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
};

Timer.prototype.clear = function () {
    clearInterval(this.interval);
};
