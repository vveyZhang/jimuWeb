import { Component } from "react";
class Img extends Component {
  state = {
    srcData: ""
  };
  constructor(props) {
    super(props);
    const { src } = props;
    this.state={
      srcData: src
    };
  }
  componentDidUpdate(perProps) {
    if (perProps.src != this.props.src && this.props.src) {
      const { src } = this.props;
      this.setState({
        srcData: src
      });
    }
  }
  render() {

    const { src, alt, ...props } = this.props;
    const { srcData } = this.state;
    return <img {...props} alt={alt} src={srcData} />;
  }
}

export default Img;
