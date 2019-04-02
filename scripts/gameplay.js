"use strict";

var Sushi = Sushi || {};

Sushi.gameplay = function(game){};

Sushi.gameplay.prototype =
{
  preload: function()
  {

  },
  create: function()
  {
    Sushi.game.physics.startSystem(Phaser.Physics.P2JS);
    Sushi.game.physics.p2.setImpactEvents(true);
    this.pCG = this.game.physics.p2.createCollisionGroup();
    Sushi.game.physics.p2.updateBoundsCollisionGroup();
    this.eCG = this.game.physics.p2.createCollisionGroup();
    this.backgroundImage = this.add.sprite(0,0,"ocean");
    this.scale = 0.2;
    this.timer = 0;
    this.createPlayer();
    this.createScore();
    this.enemiesGroup = Sushi.game.add.group();
  },
  update: function()
  {
    
    if(this.level == 8){
      Sushi.game.state.start("win", true, false, this.point);
    }
    this.movePlayer();
    this.player.body.setCollisionGroup(this.pCG);
    this.player.body.collides(this.eCG,this.collideEnemy,this);
    if(this.player.height > 200)
    {
      this.scale = 0.2;
      this.grow();
      this.level ++;
      this.levelLabel.text = "Level: " + this.level;
      this.enemiesGroup.forEachAlive(function (c)
      { 
          if(c != null)
            c.kill(); 
      });
    }
    this.timer++;
    if(this.timer >= 100-(this.level*10))
    {
      this.time.events.add((Math.random()*1500 + 800)/this.level,this.createEnemies,this);
      this.timer=0;
    }
  },
  createPlayer: function()
  {
    this.player = this.game.add.sprite(400,300,"fish");
    this.game.physics.p2.enable(this.player,false);
    this.physicData = "physicsData";
    this.physicDataFlip = "physicsDataFlip";
    this.physicsDataScaled = "physicsDataScaled";
    this.physicDataFlipScaled = "physicsDataFlipScaled";
    this.physcicDataEniemies = "physicsDataEnemies";
    this.physcicDataEniemiesFlip = "physcicDataEniemiesFlip";
    this.physcicDataEniemiesScaled = "physicsDataEnemiesScaled";
    this.physcicDataEniemiesFlipScaled = "physicsDataEnemiesFlipScaled";
    this.player.direction = "left";
    this.player.body.clearShapes();
    this.player.body.loadPolygon(this.physicData, "fish");
    this.player.scale.setTo(this.scale);
    this.player.body.collideWorldBounds=true;
    this.player.body.setCollisionGroup(this.pCG);
    this.player.body.collides(this.eCG,this.collideEnemy,this);
    this.grow();

  },
  createEnemies: function()
  {
    this.lottery = Math.floor((Math.random() * 2) + 1);
    if(this.lottery == 1)
    {
      var enemy = new Enemy(Sushi.game);
      this.enemiesGroup.add(enemy);
      enemy.body.collideWorldBounds=false;
      enemy.body.setCollisionGroup(this.eCG);
      enemy.body.collides([this.pCG]);
    }
    else{
      var enemyFlip = new EnemyFlip(Sushi.game);
      this.enemiesGroup.add(enemyFlip);
      enemyFlip.body.collideWorldBounds=false;
      enemyFlip.body.setCollisionGroup(this.eCG);
      enemyFlip.body.collides([this.pCG]);
      enemyFlip.scale.x *= -1;
    }
  },
  movePlayer: function()
  {
    if(this.player.body.rotation != 0)
    {
      this.player.body.rotation = 0
    }
    this.player.body.setZeroVelocity();
    if (Sushi.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      this.player.body.velocity.x -= 100;
      if(this.player.direction == "right")
      {
        this.player.scale.x *= -1;
        this.player.body.clearShapes();
        this.player.body.loadPolygon(this.physicsDataScaled, "fish");
        this.player.direction = "left";
      }
    }
    else if (Sushi.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      this.player.body.velocity.x += 100;
      if(this.player.direction == "left")
      {
        this.player.body.clearShapes();
        this.player.body.loadPolygon(this.physicDataFlipScaled, "fish");
        this.player.scale.x *= -1;
        this.player.direction = "right";
      }
    }
    if (Sushi.game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      this.player.body.velocity.y -= 100;
    }
    else if (Sushi.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      this.player.body.velocity.y += 100;
    }
  },
  grow: function()
  {
     this.scale += 0.01;
     resizePolygon(this.physicData, this.physicsDataScaled, "fish", this.scale);
     resizePolygon(this.physicDataFlip, this.physicDataFlipScaled, "fish", this.scale);
     if(this.player.direction == "right")
     {
       this.player.scale.setTo(this.scale, this.scale);
       this.player.body.clearShapes();
       this.player.body.loadPolygon(this.physicDataFlipScaled, "fish");
       this.player.scale.x *= -1;
     }
     else
     {
       this.player.scale.setTo(this.scale, this.scale);
       this.player.body.clearShapes();
       this.player.body.loadPolygon(this.physicsDataScaled, "fish");
     }
  },
  collideEnemy: function(a,b)
  {
    if (Math.floor(a.sprite.height) >= Math.floor(b.sprite.height))
    {
      this.point += Math.floor(b.sprite.height);
      this.scoreLabel.text = "Score: " + this.point;
      this.grow();
      b.sprite.kill();
    }
   else
    {
      Sushi.game.state.start("lose", true, false, this.point);
    }
  },
  createScore: function()
  {
    this.scoreFont = "25px Arial";
    this.levelFont = "40px Arial";
    this.point = 0;
    this.level = 1;
    this.scoreLabel = this.game.add.text(80, 20, "Score: "+this.point, {font: this.scoreFont, fill: "#fff"});
    this.levelLabel = this.game.add.text(380, 25, "Level: "+this.level, {font: this.levelFont, fill: "#fff"});
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.align = 'center';
    this.levelLabel.anchor.setTo(0.5, 0.5);
    this.levelLabel.align = 'center';
  }
};
