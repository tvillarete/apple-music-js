import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';

const SvgContainer = styled.span`
   display: inline-block;
   width: ${props => props.size}px;
   height: ${props => props.size}px;
   color: ${props => props.color};
   stroke-width: ${props => props.strokeWidth};
`;

const Icon = props => (
   <SvgContainer
      className={props.className}
      size={props.size}
      onClick={props.onClick}
      color={props.color}
      strokeWidth={props.strokeWidth}
      dangerouslySetInnerHTML={{
         __html: feather.icons[props.name].toSvg({
            width: '100%',
            height: '100%',
            'stroke-width': 'inherit',
         }),
      }}
   />
);

Icon.propTypes = {
   /** Icon name. See the complete list of icons at https://feathericons.com */
   name: PropTypes.string.isRequired,
   /** Set class name of containing element. */
   className: PropTypes.string,
   /** Any legal CSS color value for the stroke color */
   color: PropTypes.string,
   /** Width and height of the icon in pixels */
   size: PropTypes.number,
   /** Stroke width of the icon in pixels */
   strokeWidth: PropTypes.number,
};

Icon.defaultProps = {
   className: '',
   color: 'currentColor',
   size: 24,
   strokeWidth: 2,
};

export default Icon;
