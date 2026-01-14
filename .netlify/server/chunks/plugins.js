import { Component, createRef, h } from "gridjs";
function isFn(val) {
  return typeof val === "function";
}
class SvelteWrapper extends Component {
  constructor() {
    super(...arguments);
    this.ref = createRef();
    this.instance = null;
  }
  componentDidMount() {
    const { component: Component2, parentElement: _parentElement, parentProps: _parentProps, plugin: _plugin, ...props } = this.props;
    this.instance = new Component2({ target: this.ref.current, props });
  }
  componentDidUpdate() {
    if (isFn(this.instance.set)) {
      this.instance.set(this.props);
    }
  }
  componentWillUnmount() {
    if (isFn(this.instance.destroy)) {
      this.instance.destroy();
    }
  }
  render() {
    return h(this.props.parentElement, { ...this.props.parentProps, ref: this.ref });
  }
}
SvelteWrapper.defaultProps = {
  parentElement: "div",
  parentProps: {}
};
