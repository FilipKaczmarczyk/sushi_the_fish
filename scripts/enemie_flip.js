
var EnemyFlip = function(game)
{
  this.view = "fish"+ Math.floor(Math.random() * 5 + 1);
  Phaser.Sprite.call(this,Sushi.game,200,200,this.view);
  Sushi.game.add.existing(this);
  Sushi.game.physics.p2.enable(this,false);
  this.anchor.setTo(.5);
  this.scaleE = (Math.random()*0.5 + 0.05);
  this.scale.setTo(this.scaleE);
  resizePolygon("physicsDataEnemiesFlip","physicsDataEnemiesFlipScaled",this.view,this.scaleE);
  this.body.clearShapes();
  this.body.loadPolygon("physicsDataEnemiesFlipScaled",this.view);
  this.speed = 3500/(this.height/2);
  this.reset(-200,Math.random() * 600-this.height*2 + this.height*2);
  this.lifetime = 0;
};

EnemyFlip.prototype = Object.create(Phaser.Sprite.prototype);
EnemyFlip.prototype.constructior = EnemyFlip;

EnemyFlip.prototype.update = function()
{
  this.lifetime ++;
  if(this.lifetime >= 1500)
  {
    this.body.clearShapes();
    this.kill();
  }
  this.body.setZeroVelocity();
  this.body.velocity.x += this.speed ;
}

EnemyFlip.prototype.kill = function()
{
  Phaser.Sprite.prototype.kill.call(this);
}

function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale)
{
  var newData = [];
  var data = Sushi.game.cache.getPhysicsData(originalPhysicsKey, shapeKey);

  for (var i = 0; i < data.length; i++)
  {
    var vertices = [];
    for (var j = 0; j < data[i].shape.length; j += 2)
    {
      vertices[j] = data[i].shape[j] * scale;
      vertices[j+1] = data[i].shape[j+1] * scale;
    }
    newData.push({shape : vertices});
   }
   var item = {};
   item[shapeKey] = newData;
   Sushi.game.load.physics(newPhysicsKey, '', item);
}
