// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
import { PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO} from "../../utils.js";

export default class Game extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Game");
    }
  
    init() {
      this.shapesRecolected = {
      ["triangulo"]: {count: 0, score: 30},
      [ "cuadrado"]: {count: 0, score: 20},
      ["rombo"]: {count: 0, score: 40},
      };
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      this.isWinner=false;
      this.isGameOver=false;
      this.timer=30;
    }
  
    preload() {
      // cargar fondo, plataforma, formas, jugador
     this.load.image("sky", "./assets/images/Cielo.png");
     this.load.image("plataforma", "./assets/images/platform.png");
     this.load.image("ninja", "./assets/images/Ninja.png");
     this.load.image(TRIANGULO, "./assets/images/Triangulo.png")
     this.load.image(CUADRADO, "./assets/images/Cuadrado.png")
     this.load.image(ROMBO, "./assets/images/Rombo.png")
    }
  
    create() {
      // create los objetos en el juego
      this.add.image(400,300,"sky").setScale(0.55);
      this.player=this.physics.add.sprite(400,480,"ninja");

      //crea grupos estáticos que los aloja en variables 
      this.platforms= this.physics.add.staticGroup();
      this.platforms
      .create(400,550,"plataforma")
      .setScale(2)
      .refreshBody();

      //agrega una física de colision entre dos objetos o grupos
      this.physics.add.collider(this.player, this.platforms)
      
      //agrega las formas en grupos con físicas y los aloja en variables.
      this.shapeGroup=this.physics.add.group();
      
      this.physics.add.collider(this.platforms, this.shapeGroup)
      this.physics.add.overlap(
        this.player, 
        this.shapeGroup,
        this.collectShape,
        null,
        this
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
    this.scoreText=this.add.text(16,65, "Score: "+ this.shapesRecolected[TRIANGULO].score, {
      fontSize: "20px",
      fill:"#000000",
      backgroundColor: "#ffffff",
      fontFamily:"Georgia",
      fontWeight:"bold",

    })

    
    };
  
    
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
    this.shapesRecolected[shapeName].count++;
    console.log(this.shapesRecolected)
      this.scoreText.setText(
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
        this.scene.start("Winner");

      }
      
      
    }
    
    
    addShape(){
      console.log(new Date())
      console.log("Se Crea una figura");
      //get random Shape
    const randomShape=Phaser.Math.RND.pick(SHAPES);
    //get random position
    const randomX=Phaser.Math.RND.between(0,800);
    //add shape to screen
    this.shapeGroup.create(randomX,0,randomShape)
    }
    updateTimer(){
      this.timer--
      console.log(this.timer)
      if (this.timer==0){
        this.isGameOver=true;
      }
      if (this.isGameOver){
        this.scene.start("gameOver")
      }
      this.timerText.setText(
        "Timer: " + this.timer + " "
      )
        
    }
    
    
    }

  