"use strict";

var Sushi = Sushi || {};

Sushi.preload = function(game){};

Sushi.preload.prototype =
{
  init: function()
  {
    this.game.input.maxPointers = 1;
    this.game.stage.disableVisibilityChange = true;
    this.game.renderer.renderSession.roundPixels = true;
  },
  preload: function()
  {
    this.load.image("ocean","sprites/ocean.png");
    this.load.image("fish","sprites/fish.png");
    this.load.image("fish1","sprites/fish1.png");
    this.load.image("fish2","sprites/fish2.png");
    this.load.image("fish3","sprites/fish3.png");
    this.load.image("fish4","sprites/fish4.png");
    this.load.image("fish5","sprites/fish5.png");
    this.load.image("fish6","sprites/fish6.png");
    this.load.image('button',"sprites/button.png",160,94);
    this.load.image('menu',"sprites/menu.png",200,75);
    this.load.image('logo',"sprites/logo.png");
    this.load.physics("physicsDataEnemies","sprites/enemies.json");
    this.load.physics("physicsDataEnemiesFlip","sprites/enemies_flip.json");
    this.load.physics("physicsData","sprites/fish.json");
    this.load.physics("physicsDataFlip","sprites/fish_flip.json");
  //  this.load.physics("physicsDataScaled","sprites/fish_scaled.json");
  //  this.load.physics("physicsDataFlipScaled","sprites/fish_flip_scaled.json");
  },
  create: function()
  {
    Sushi.background = this.game.add.tileSprite(0, 0, 800, 600, 'ocean');
    Sushi.button = this.game.add.button(this.game.world.centerX-90, 380, 'button', this.actionOnClick, this);
    Sushi.logo = this.game.add.sprite(this.game.world.centerX-320, 180, 'logo');
  },
  actionOnClick: function()
  {
    Sushi.game.state.start("gameplay");
  }
};
