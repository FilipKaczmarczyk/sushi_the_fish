"use strict";

var Sushi = Sushi || {};

Sushi.win = function(game){};

Sushi.win.prototype =
{
  init: function(points)
  {
    this.point = points;
  },
  preload: function(points)
  {
    this.backgroundImage = this.add.sprite(0,0,"ocean");
    this.scoreFont = "25px Arial";
    this.scoreLabel = this.game.add.text(400, 300, "Wygrałeś grę, uzyskując: "+this.point +" punktów", {font: this.scoreFont, fill: "#fff"});
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.align = 'center';
  },
  create: function()
  {
    Sushi.button = this.game.add.button(this.game.world.centerX-(Sushi.button.width)/2, 380, 'menu', this.actionOnClick, this);
    Sushi.button.scale.setTo(0.4, 0.4);
  },
  actionOnClick: function()
  {
    Sushi.game.state.start("preload");
  }
};
