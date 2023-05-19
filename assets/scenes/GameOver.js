// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/



export default class GameOver extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("gameOver");
    }
  
    init() {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
    }
  
    preload() {
      // load assets
      this.load.audio ("gameOver", "./assets/images/gameOver.mp3");
      this.load.image("restart","./assets/images/keyR.png")
      
     
    }
  
    create() {
      // create game objects
      this.music=this.sound.add ("gameOver");
      this.music.play({ loop: true, volume: 0.5 });
      this.loseText=this.add.text(400,300,"GAME OVER",{
        fontSize:"90px",
        fontFamily:"Open Sans",
        fill: "#ffffff",
      });
      this.loseText.setOrigin(0.5);
     this.restartButton=this.add.image(400,400,"restart")
     this.restartButton.setScale(0.1)
                       .setInteractive()
                       .on('pointerdown',()=>this.scene.start("Game"), this.music.play({ loop: false}));
  
    }
  
    update() {
      // update game objects
   
    
  }

}

  