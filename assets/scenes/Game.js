// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
import {PLAYER_MOVEMENTS,SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO, BOMBA, POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START } from "../../utils.js";

export default class Game extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Game");
    }
     // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
    init() {
      this.shapesRecolected = {
      ["triangulo"]: {count: 0, score: 10},
      ["cuadrado"]: {count: 0, score: 20},
      ["rombo"]: {count: 0, score: 15},
      ["bomba"]:{count: 0, score: 10},
      };
      this.isWinner=false;
      this.isGameOver=false;
      this.timer=30;
      this.recolect=0;
      
    }
  
    preload() {
      // cargar fondo, plataforma, formas, jugador
     this.load.image("sky", "./assets/images/Cielo.png");
     this.load.image("plataforma", "./assets/images/platform.png");
     this.load.image("ninja", "./assets/images/Ninja.png");
     this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
     this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
     this.load.image(ROMBO, "./assets/images/Rombo.png");
     this.load.image(BOMBA, "./assets/images/bomb.png");
     this.load.audio("music", "./assets/images/backgroundMusic.mp3");
    }
  
    create() {
      // create los objetos en el juego
      this.music = this.sound.add("music");
      this.music.play({ loop: true, volume: 0.5 });

      this.add.image(400,300,"sky")
      .setScale(0.55);
      this.player=this.physics.add.sprite(400,480,"ninja");

      //crea grupos estáticos que los aloja en variables 
      this.platforms= this.physics.add.staticGroup();
      this.platforms
      .create(400,550,"plataforma")
      .setScale(2)
      .refreshBody();
      this.platforms
      .create(250,300,"plataforma")
      .refreshBody();

      //agrega una física de colision entre dos objetos o grupos
      this.physics.add.collider(this.player, this.platforms)
      
      //agrega las formas en grupos con físicas y los aloja en variables.
      this.shapeGroup=this.physics.add.group();
      
      this.physics.add.collider(this.platforms, this.shapeGroup)
      this.physics.add.overlap(
        this.shapeGroup,
        this.platforms,
        this.reduce,
        null,
        this
      );
      this.physics.add.overlap(
        this.player, 
        this.shapeGroup,
        this.collectShape,
        null,
        this,
        );

        //Agrega un imput de teclado y lo aloja en una variable 
      this.cursors=this.input.keyboard.createCursorKeys();

        //crear eventos para agregar las formas. 
        this.time.addEvent({
          delay:SHAPE_DELAY,
          callback: this.addShape,
          callbackScope: this,
          loop: true, 
        });
      //agregar texto fijo en la pantalla
    this.countText=this.add.text(16,16,"T:0 // C : 0 // R:0",{
      fontSize: "20px",
      fill:"#000000",
      backgroundColor: "#ffffff",
      fontFamily:"Georgia",
      fontWeight:"bold",
      
    });
  
//Evento del contador
    this.time.addEvent({
      delay:1000,
      callback: this.updateTimer,
      callbackScope:this,
      loop: true,
    });

    this.timerText=this.add.text(16, 40,"Timer: " + this.timer,{
      fontSize: "20px",
      fill:"#000000",
      backgroundColor: "#ffffff",
      fontFamily:"Georgia",
      fontWeight:"bold",
      
    });
    //evento del recolector
    this.time.addEvent({
      delay:1000,
      callback: this.updateRecolect,
      callbackScope:this,
      loop: true,
    });
    this.scoreText=this.add.text(16,65, "Score: "+ this.recolect, {
      fontSize: "20px",
      fill:"#000000",
      backgroundColor: "#ffffff",
      fontFamily:"Georgia",
      fontWeight:"bold",

    });

   
    }
    ;
  
    
    update() {
      // update game objects
      //movimiento con teclado
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(PLAYER_MOVEMENTS.x);
      }
      else {
        this.player.setVelocityX(0);
      }
      if (this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
      }
    }
    
    //funcion callback 
    collectShape(player,shape){
      console.log("figura recolectada");
      shape.disableBody(true,true);
      const shapeName=shape.texture.key;
      const percentage = shape.getData(POINTS_PERCENTAGE);
      const scoreNow = this.shapesRecolected[shapeName].score * percentage;
      this.score += scoreNow;
    this.shapesRecolected[shapeName].count++;
    console.log(this.shapesRecolected)
      this.countText.setText(
        "T: "+ 
        this.shapesRecolected[TRIANGULO].count +
        "// C: "+
        this.shapesRecolected[CUADRADO].count +
        "// R: "+
        this.shapesRecolected[ROMBO].count
      );
     
      if (
        this.shapesRecolected[TRIANGULO].count>=2 &&
        this.shapesRecolected[CUADRADO].count>=2 &&
        this.shapesRecolected[ROMBO].count>=2
      ) {
        this.isWinner=true;
      }

      if (this.isWinner){
        this.music.stop();
        this.scene.start("Winner");
       
        ;

      }
      
      
    }

    reduce(shape, platform){
      const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;
      console.log(shape.texture.key, newPercentage);
      shape.setData(POINTS_PERCENTAGE, newPercentage);
      if (newPercentage <= 0) {
        shape.disableBody(true, true);
        return;
      }
  
      // show text
      const text = this.add.text(shape.body.position.x+10, shape.body.position.y, "- 25%", {
        fontSize: "22px",
        fontStyle: "bold",
        fill: "red",
      });
      setTimeout(() => {
        text.destroy();
      }, 200);
    }
    
    
 addShape(){
      console.log("Se Crea una figura");
      //get random Shape
    const randomShape=Phaser.Math.RND.pick(SHAPES);
    //get random position
    const randomX=Phaser.Math.RND.between(0,800);
    //add shape to screen
    this.shapeGroup.create(randomX,0,randomShape)
    .setCircle(32, 0, 0)
    .setBounce(0.8)
    .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);
    }
 updateTimer(){
      this.timer--
      console.log(this.timer)
      if (this.timer==0){
        this.isGameOver=true;
      }
      if (this.isGameOver){
        this.music.stop()
        this.scene.start("gameOver");
        
      }
      this.timerText.setText(
        "Timer: " + this.timer + " "
      )
        
    }
  updateRecolect(){
  this.puntosT = this.shapesRecolected[TRIANGULO].count * this.shapesRecolected[TRIANGULO].score;
  this.puntosC = this.shapesRecolected[CUADRADO].count * this.shapesRecolected[CUADRADO].score;
  this.puntosR = this.shapesRecolected[ROMBO].count * this.shapesRecolected[ROMBO].score;
  this.puntosB=this.shapesRecolected[BOMBA].count*this.shapesRecolected[BOMBA].score;
  this.recolect = this.puntosT + this.puntosC + this.puntosR - this.puntosB;
  console.log("puntos " + this.recolect);
  this.scoreText.setText("Score: "+ this.recolect,)
  if (this.recolect>=100){
    this.music.stop()
    this.scene.start("Winner")
  }
 };
} ;   