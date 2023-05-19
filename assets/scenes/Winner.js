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
      this.load.audio("winGame","./assets/images/winGame.mp3");
      this.load.image("restart","./assets/images/keyR.png")
      
     
    }
  
    create() {
      // create game objects
      this.add.image(400,300,"sky").setScale(0.55);
      this.music=this.sound.add("winGame")
      this.music.play({loop:true, volume: 0.5});
      this.winText=this.add.text(400,300,"¡Felicitaciones! ¡Ganaste! ", {
        fontSize:"30px",
        fontFamily:"Open Sans",
        fill: "#ffffff",
      });
      this.winText.setOrigin(0.5);
      this.restartButton=this.add.image(400,400,"restart");
      this.restartButton.setScale(0.1)
                       .setInteractive()
                       .on('pointerdown',()=>this.scene.start("Game"), this.music.play({ loop: false}));
    }
  
    update() {
      // update game objects
    }
  }
  