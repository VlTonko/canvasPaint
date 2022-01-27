import React, {Component} from "react"
import './App.scss';


class App extends Component {
  frameCount = 0;
  animationFrameId;

  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      ctx: null,
    }
    this.canvasRef = React.createRef();
  }

  loop = () => {
    this.frameCount++;
    this.animationFrameId = window.requestAnimationFrame(this.loop);
    this.drawWithMove();
  }

  componentDidMount(){
    this.ctx = this.canvasRef.current.getContext("2d");
  }

  componentDidUpdate(){
    this.ctx = this.canvasRef.current.getContext("2d");
    this.loop();

  }

  componentWillUnmount(){
    window.canselAnimationFrame(this.animationFrameId)
  }

  handleMouseMove = (e) => {
    this.setState({      
      x: +(e.clientX - this.canvasRef.current.getBoundingClientRect().x).toFixed(),
      y: +(e.clientY - this.canvasRef.current.getBoundingClientRect().y)
    });
    console.log(
      this.state.x, this.state.y,
    )};

  draw = () => {
    this.ctx.fillStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.fillRect(20,20,20,20);
  }

  drawWithMove = () => {
    this.ctx.fillStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.fillRect(this.state.x, this.state.y, 20, 20)
  }

  render(){
    return(
      <div>
          <canvas 
          ref={this.canvasRef} 
          width={300} height={300} 
          onMouseMove={this.handleMouseMove}></canvas>
      </div>

    )
  }
}
export default App;
