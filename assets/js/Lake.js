import { Application, filters, Sprite, WRAP_MODES, utils } from "pixi.js";
// skip hello log
utils.skipHello();
/**
 * @property {Number} width           - Not required
 * @property {Number} height          - Not required
 * @property {String} displacement    - Required
 * @property {String} surface         - Required
 */
export default class Lake extends Application {
  constructor(props) {
    super({
      width: props.width,
      height: props.height,
      backgroundColor: 0x006b99,
      antialias: true
    });
    this.props = props;
    this.renderer.autoResize = true;

    this.loader
      .add('surface', props.surface)
      .add('displacement', props.displacement)
      .load(this.setup.bind(this))

    // resize canvas on window resize
    // window.addEventListener('resize', this.onResize.bind(this));
  }

  setup() {
    const { surface, displacement } = this.loader.resources;
    // Declare sprites
    const surfaceSprite = new Sprite(surface.texture);
      surfaceSprite.position.x = 0;
      surfaceSprite.position.y = this.props.height - surfaceSprite.height;
    let displacementSprite = new Sprite(displacement.texture);
    // Set wrapmode:
    // {
    //    CLAMP:            The textures uvs are clamped,
    //    REPEAT:           The texture uvs tile and repeat,
    //    MIRRORED_REPEAT:  The texture uvs tile and repeat with mirroring
    // }
    displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
    // Create filter
    const displacementFilter = new filters.DisplacementFilter(displacementSprite);
    displacementFilter.padding = 10;
    // Set position
    displacementSprite.position = surfaceSprite.position;
    // Add surfaceSprite and displacementSprite to stage
    this.stage.addChild(surfaceSprite);
    this.stage.addChild(displacementSprite);
    // Add filter to suerface sprite
    surfaceSprite.filters = [displacementFilter];
    // Replace desplacementfilter scale x|y to change wave level
    displacementFilter.scale.x = 100;
    displacementFilter.scale.y = 50;

    // handle tikcer
    this.ticker.add(() => {
      displacementSprite.x++;
      if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
    });
  }

  onResize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
