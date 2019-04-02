"use strict";

var Sushi = Sushi  || {};

var config =
{
  width: 800,
  height: 600,
  renderer: Phaser.CANVAS
}

Sushi.game = new Phaser.Game(config);

Sushi.game.state.add("preload", Sushi.preload);
Sushi.game.state.add("gameplay", Sushi.gameplay);
Sushi.game.state.add("win", Sushi.win);
Sushi.game.state.add("lose", Sushi.lose);

Sushi.game.state.start("preload");
