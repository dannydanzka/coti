/**
 * SVG Mock for Jest
 *
 * Returns a React component that renders a simple div for SVG imports.
 * Handles both default and named exports.
 */

const React = require('react');

const SvgMock = React.forwardRef(function SvgMock(props, ref) {
  return React.createElement('svg', { ...props, 'data-testid': 'svg-mock', ref });
});

module.exports = SvgMock;
module.exports.default = SvgMock;
module.exports.ReactComponent = SvgMock;
