import PropTypes from 'prop-types';
import invariant from 'invariant';

import { h, Component } from 'preact';

import { _getClassName as getClassName } from 'jsxstyle';

export default function makePreactStyleComponentClass(
  displayName,
  defaultProps,
  tagName
) {
  tagName = tagName || 'div';
  invariant(
    typeof displayName === 'string' && displayName !== '',
    'makePreactStyleComponentClass expects param 1 to be a valid displayName'
  );

  class Style extends Component {
    constructor(props) {
      super(props);
      this.component = props.component || tagName;
      this.className = getClassName(props, props.class);
    }

    componentWillReceiveProps(props) {
      this.component = props.component || tagName;
      this.className = getClassName(props, props.class);
    }

    render({ style, props, children }) {
      return h(
        this.component,
        Object.assign({}, props, {
          class: this.className,
          style,
        }),
        children
      );
    }
  }

  Style.propTypes = {
    class: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
    ]),
    mediaQueries: PropTypes.object,
    props: PropTypes.object,
    style: PropTypes.object,
  };

  Style.defaultProps = defaultProps;
  Style.displayName = displayName;

  return Style;
}