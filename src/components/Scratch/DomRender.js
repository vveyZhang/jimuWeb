import _ from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Style from 'to-style';
import stylePropType from 'react-style-proptype';

/*
 * DOMElementRenderer wraps a DOM element, allowing it to be
 * rendered by ''. It's up to the containing component
 * to retain a reference to the element prop, or else it
 * will be garbage collected after unmounting.
 *
 * Props passed to the DOMElementRenderer will be set on the
 * DOM element like it's a normal component.
 */
class DOMElementRenderer extends Component {
    constructor(props) {
        super(props);
        this.setContainer = this.setContainer.bind(this);
    }
    componentDidMount() {
        this.container.appendChild(this.props.domElement);
    }
    componentWillUnmount() {
        this.container.removeChild(this.props.domElement);
    }
    setContainer(c) {
        this.container = c;
    }
    render() {
        // Apply props to the DOM element, so its attributes
        // are updated as if it were a normal component.
        // Look at me, I'm the '' now!

        Object.assign(
            this.props.domElement,
            _.omit(this.props, ['domElement', 'children', 'style'])
        );
        // Convert react style prop to dom element styling.
        if (this.props.style) {
            this.props.domElement.style.cssText = Style.string(this.props.style);
        }
        return <div ref={this.setContainer} />;
    }
}

DOMElementRenderer.propTypes = {
    domElement: PropTypes.instanceOf(Element).isRequired,
    style: stylePropType
};

export default DOMElementRenderer;