"use strict";

var j = require("johnny-five");

var circuito = new j.Board();
var led, motor, celda;
var turno = 0;
circuito.on("ready", prender);

function prender() {
  var config = {
    pin: "A0",
    freq: 50
  };
  celda = new j.Sensor(config);
  led = new j.Led(13);
  led.on();
  motor = new j.Motor(9);
  motor.to(90);
  ondear();
}

function ondear() {
  var luz = celda.value;

  if (luz > 800) {
    if (turno) {
      turno = 0;
      motor.to(70);
    }
  } else {
    turno = 1;
    motor.to(110);
  }

  setTimeout(ondear, 1000);
}