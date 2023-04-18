// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Game");
    }
  
    init() {
      let shapesRecolected = [
        {type: "Triangulo", count: 0},
        {type: "Cuadrado", count: 0},
        {type: "Rombo", count: 0}
      ]
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
    }
  
    preload() {
      // cargar fondo, plataforma, formas, jugador
     this.load.image("sky", "./assets/images/Cielo.png");
     this.load.image("plataforma", "./assets/images/platform.png");
     this.load.image("ninja", "./assets/images/Ninja.png");
     this.load.image("triangulo", "./assets/images/Triangulo.png")
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

      //agrega una física de colision entre dos objetos
      this.physics.add.collider(this.player, this.platforms)
      
      //agrega las formas en grupos y los aloja en variables.
      this.shapeGroup=this.physics.add.group();
      this.shapeGroup
      .create(400,0,"triangulo");
      this.physics.add.collider(this.platforms, this.shapeGroup)
      this.physics.add.overlap(
        this.player, 
        this.shapeGroup,
        this.collectShape,
        null,
        this
        )


    };
  
    
    update() {
      // update game objects
    }
    collectShape(player,shape){
      console.log("figura recolectada");
      shape.disableBody(true,true);

    }
    }

  