// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Winner extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Winner");
    }
  
    init() {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      console.log('hola')
    }
  
    preload() {
      // load 
      this.load.image("sky", "./assets/images/Cielo.png");
     
    }
  
    create() {
      // create game objects
      this.add.image(400,300,"sky").setScale(0.55);
      this.winText=this.add.text(400,300,"¡¡GANASTE!!",{
        fontSize:"90px",
        fontFamily:"Open Sans",
        fill: "#ffffff",
      });
      this.winText.setOrigin(0.5);
     
    }
  
    update() {
      // update game objects
    }
  }
  