import { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import loadProjectUrl from '../../utils/loadProject'
import DOMElementRenderer from './DomRender'
import Debounce from 'lodash-decorators/debounce'
import VM from 'scratch-vm'
import styles from './index.less'
import playIcon from "../../assets/icon--green-flag.svg";
import stopIcon from "../../assets/icon--stop-all.svg";
import fullIcon from "../../assets/icon--fullscreen.svg";
import unfullIcon from "../../assets/icon--unfullscreen.svg";
const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu/';
const PROJECT_SERVER = 'https://cdn.projects.scratch.mit.edu/';
const getProjectUrl = function (asset) {
  const assetIdParts = asset.assetId.split('.');
  const assetUrlParts = [PROJECT_SERVER, 'internalapi/project/', assetIdParts[0], '/get/'];
  if (assetIdParts[1]) {
    assetUrlParts.push(assetIdParts[1]);
  }
  return assetUrlParts.join('');
};
const getAssetUrl = function (asset) {
  const assetUrlParts = [
    ASSET_SERVER,
    'internalapi/asset/',
    asset.assetId,
    '.',
    asset.dataFormat,
    '/get/'
  ];
  return assetUrlParts.join('');
}
export default class Scratch extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.canvas = document.createElement('canvas');
    this.state = {
      isfull: false
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `./scratch/vendor.js`;
    document.body.appendChild(script);
    let script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = `./scratch/scratch-svg-renderer.js`;
    document.body.appendChild(script2);
  }
  componentDidMount() {
    this.runScratch()
  }
  runScratch = () => {
    
    if (!window.ScratchStorage || !window.ScratchSVGRenderer) {
      setTimeout(() => {
        this.runScratch()
      }, 1000);
    } else {
      this.runBenchmark();
    }
  }
  runBenchmark = function () {
    // Lots of global variables to make debugging easier
    // Instantiate the this.vm.
    this.vm = new VM()
    this.vm.setTurboMode(true);
    const storage = new window.ScratchStorage(); /* global ScratchStorage */
    const AssetType = storage.AssetType;
    storage.addWebSource([AssetType.Project], getProjectUrl);
    storage.addWebSource([AssetType.ImageVector, AssetType.ImageBitmap, AssetType.Sound], getAssetUrl);
    this.vm.attachStorage(storage);
    // Instantiate the renderer and connect it to the this.vm.
    const renderer = new window.ScratchRender(this.canvas);
    this.vm.attachRenderer(renderer);
    const audioEngine = new window.AudioEngine();
    this.vm.attachAudioEngine(audioEngine);
    /* global ScratchSVGRenderer */
    this.vm.attachV2SVGAdapter(new window.ScratchSVGRenderer.SVGRenderer());
    this.vm.attachV2BitmapAdapter(new window.ScratchSVGRenderer.BitmapAdapter());
    loadProjectUrl(this.props.url).then(arrarBuffer => {
      this.vm.loadProject(arrarBuffer)
      this.vm.start();
    });
    // Run threads

  };
  handlerStart = () => {
    this.vm.greenFlag()
  }
  handlerStop = () => {
    this.vm.stopAll()
  }
  _mousemove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const coordinates = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      canvasWidth: rect.width,
      canvasHeight: rect.height
    };
    this.vm.postIOData('mouse', coordinates);
  }
  _mousedown = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const data = {
      isDown: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      canvasWidth: rect.width,
      canvasHeight: rect.height
    };
    this.vm.postIOData('mouse', data);
    e.preventDefault();
  }
  _mouseup = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const data = {
      isDown: false,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      canvasWidth: rect.width,
      canvasHeight: rect.height
    };
    this.vm.postIOData('mouse', data);
    e.preventDefault();
  }
  _keydown = (e) => {
    if (e.target !== document && e.target !== document.body) {
      return;
    }
    this.props.this.vm.postIOData('keyboard', {
      keyCode: e.keyCode,
      isDown: true
    });
    e.preventDefault();
  }
  _keyup = (e) => {
    this.props.this.vm.postIOData('keyboard', {
      keyCode: e.keyCode,
      isDown: false
    });
    // E.g., prevent scroll.
    if (e.target !== document && e.target !== document.body) {
      e.preventDefault();
    }
  }
  attachEvent = () => {
    document.addEventListener('mousemove', this._mousemove);
    document.addEventListener('keydown', this._keydown);
    document.addEventListener('keyup', this._keyup);
    this.canvas.addEventListener('mousedown', this._mousedown);
    this.canvas.addEventListener('mouseup', this._mouseup);
  }
  componentWillUnmount = () => {
    document.removeEventListener('mousemove', this._mousemove);
    document.removeEventListener('keydown', this._keydown);
    document.removeEventListener('keyup', this._keyup);
    this.canvas.removeEventListener('mousedown', this._mousedown);
    this.canvas.removeEventListener('mouseup', this._mouseup);
  }
  @Debounce(300)
  handlerFull = () => {
    this.setState({
      isfull: !this.state.isfull
    })
  }

  render() {
    const { isfull } = this.state;
    return (
      <div className={classNames(styles.projectContainer, isfull && styles.projectFull)} >
        <div className={styles.project}>
          <div className={styles.projectTools}>
            <img src={playIcon} className={styles.play} onClick={this.handlerStart} alt="运行" title="运行" />
            <img src={stopIcon} className={styles.stop} onClick={this.handlerStop} alt="停止" title="停止" />
            {!isfull ? (
              <img src={fullIcon} onClick={this.handlerFull} className={styles.full} alt="全屏" title="全屏" />
            ) : (
                <img
                  src={unfullIcon}
                  className={styles.unfull}
                  onClick={this.handlerFull}
                  title="退出"
                  alt="退出"
                />
              )}
          </div>
          <DOMElementRenderer
            className={classNames(
              styles.projectCanvas,
            )}
            domElement={this.canvas}
          />
        </div>
      </div>
    )
  }
}
