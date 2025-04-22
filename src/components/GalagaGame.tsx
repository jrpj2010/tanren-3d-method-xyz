'use client';
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  create() { this.scene.start('PreloadScene'); }
}

class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }
  preload() {
    const g = this.add.graphics();
    // player ship texture
    g.fillStyle(0xffffff, 1).beginPath().moveTo(0, 40).lineTo(20, 0).lineTo(40, 40).closePath().fillPath();
    g.generateTexture('player', 40, 40);
    g.clear();
    // bullet texture
    g.fillStyle(0xffff00, 1).fillRect(0, 0, 4, 10);
    g.generateTexture('bullet', 4, 10);
    g.clear();
    // enemy texture
    g.fillStyle(0xff0000, 1).fillRect(0, 0, 30, 20);
    g.lineStyle(2, 0xffffff, 1).strokeRect(0, 0, 30, 20);
    g.generateTexture('enemy', 30, 20);
    g.clear();
    // star for background
    g.fillStyle(0xffffff, 0.5).fillCircle(2, 2, 2);
    g.generateTexture('star', 4, 4);
    g.clear();
  }
  create() { this.scene.start('GameScene'); }
}

class GameScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private lastFired = 0;
  private score = 0;
  private enemies!: Phaser.Physics.Arcade.Group;

  constructor() { super('GameScene'); }

  create() {
    // starfield background
    this.add.particles('star').createEmitter({
      x: { min: 0, max: 800 },
      y: 0,
      lifespan: { min: 2000, max: 4000 },
      speedY: { min: 50, max: 100 },
      scale: { start: 0.5, end: 0 },
      quantity: 2,
      blendMode: 'ADD'
    });
    this.cameras.main.setBackgroundColor('#000');
    // player
    this.player = this.physics.add.sprite(400, 550, 'player');
    this.player.setCollideWorldBounds(true);
    // input
    this.cursors = this.input.keyboard.createCursorKeys();
    // bullets group
    const bullets = this.physics.add.group();
    // enemies grid
    this.enemies = this.physics.add.group();
    const cols = 10, rows = 4;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const e = this.enemies.create(80 + x * 60, 80 + y * 50, 'enemy') as Phaser.Physics.Arcade.Sprite;
        e.setImmovable(true);
      }
    }
    // collision handling
    this.physics.add.overlap(bullets, this.enemies, (b, e) => {
      b.destroy(); e.destroy(); this.score += 10;
      const txt = this.children.getByName('scoreText') as Phaser.GameObjects.Text;
      txt.setText(`Score: ${this.score}`);
    });
    // score display
    this.add.text(16, 16, 'Score: 0', { fontSize: '20px', color: '#fff' }).setName('scoreText');
    // world bounds kill for bullets
    this.physics.world.on('worldbounds', (body: any) => {
      if (body.gameObject && body.gameObject.texture.key === 'bullet') {
        body.gameObject.destroy();
      }
    });
  }

  update(time: number) {
    if (!this.player || !this.cursors) return;
    const speed = 300;
    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    else this.player.setVelocityX(0);
    // shooting
    if (this.cursors.space.isDown && time > this.lastFired) {
      const bullet = this.physics.add.sprite(this.player.x, this.player.y - 20, 'bullet');
      bullet.setVelocityY(-400);
      bullet.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;
      this.lastFired = time + 500;
    }
    // enemies movement & descend
    let moveDown = false;
    (this.enemies.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(enemy => {
      enemy.x += 0.5 * this.game.loop.delta;
      if (enemy.x > 770 || enemy.x < 30) moveDown = true;
    });
    if (moveDown) {
      (this.enemies.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(enemy => {
        enemy.y += 10;
      });
    }
  }
}

export default function GalagaGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game>();
  useEffect(() => {
    if (!containerRef.current) return;
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
        parent: containerRef.current,
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, PreloadScene, GameScene],
      });
    }
    return () => gameRef.current?.destroy(true);
  }, []);
  return <div ref={containerRef} className="w-full h-full" />;
}
