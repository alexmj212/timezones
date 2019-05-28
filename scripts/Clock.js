class Clock {

    constructor(element) {
        this.element = element;
    }

    clock = {
        radius: 0
    }

    secondHand = {
        position: 0,
        dposition: 0.10472,
        x: 0,
        y: 0
    }
    minuteHand = {
        position: 0,
        dposition: 0.10472,
        dminposition: 0.00174533,
        x: 0,
        y: 0
    }
    hourHand = {
        position: 0,
        dposition: 0.523599,
        x: 0,
        y: 0
    }

    getRadius() {
        var radius = this.element.querySelector('.clock').getBoundingClientRect().width / 2;
        this.setClockCenter(radius);
        return radius;
    }

    setClockCenter(radius) {
        var offset = this.element.querySelector('.second-hand').clientWidth / 2 + 1;
        this.clock['center'] = { x: (radius - offset), y: (radius - offset) };
        this.setTicks(radius);
        return radius;
    }

    setSeconds() {

        // grab second hand element
        var secondHandElement = this.element.querySelector('.second-hand');

        // set time
        var date = new Date();
        this.element.querySelector('.time').innerHTML = date.toLocaleTimeString();

        // increment radian position
        this.secondHand.position += this.secondHand.dposition;

        // set x
        secondHandElement.style.top = this.secondHand.x = this.clock.center.x + (this.getRadius() * Math.sin(this.secondHand.position)) + 'px';

        // set y
        secondHandElement.style.left = this.secondHand.y = this.clock.center.y + (this.getRadius() * Math.cos(this.secondHand.position)) + 'px';

        if (date.getSeconds() === 0) {
            this.setMinutes();
        }

        if (date.getMinutes() === 0 && date.getSeconds() === 0) {
            this.setHours();
        }

    }

    setMinutes() {

        // grab minute hand element
        var minuteHandElement = this.element.querySelector('.minute-hand-container');

        // increment radian position
        this.minuteHand.position += this.minuteHand.dposition;

        // set rotation
        minuteHandElement.style.transform = 'rotate(' + (this.minuteHand.position + 1.5 * Math.PI) + 'rad)';

    }

    setHours() {

        // grab hour hand element
        var hourHandElement = this.element.querySelector('.hour-hand-container');

        // increment radian position
        this.hourHand.position += this.hourHand.dposition;

        // set rotation
        hourHandElement.style.transform = 'rotate(' + (this.hourHand.position + 1.5 * Math.PI) + 'rad)';

    }

    setTicks(radius) {

        // grab hour hand element
        var tickElement = this.element.querySelector('.tick');

        // set x
        tickElement.style.top = this.clock.center.x + (radius * Math.sin(((-1) * Math.PI) / 2)) + tickElement.getBoundingClientRect().width + 2 + 'px';

        // set y
        tickElement.style.left = this.clock.center.y + (radius * Math.cos(Math.PI / 2)) + tickElement.getBoundingClientRect().width + 1 + 'px';

    }

    initialize() {
        var date = new Date();

        this.secondHand.position = (this.secondHand.dposition * (date.getSeconds() - 1)) - 90 * Math.PI / 180;
        this.minuteHand.position = (this.minuteHand.dposition * (date.getMinutes() - 1)) - 90 * Math.PI / 180;
        this.hourHand.position = (this.hourHand.dposition * (date.getHours() - 1)) - 90 * Math.PI / 180;

        this.setClockCenter();
        this.setSeconds();
        this.setMinutes();
        this.setHours();
        this.setTicks();

        // tick tock
        setInterval(this.setSeconds.bind(this), 1000);
    }
}