import  { Component } from "react";
class Img extends Component {
  state = {
    srcData: ""
  };
  componentDidMount() {
    const { src } = this.props;
    this.setState({
      srcData: src
    });
  }
  render() {
    const { src, alt, ...props } = this.props;
    const { srcData } = this.state;
    return <img {...props} alt={alt} src={srcData} />;
  }
}

export default Img;
