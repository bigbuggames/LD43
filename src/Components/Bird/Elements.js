import styled from 'styled-components';

export const StyledBird = styled.div`
  position: absolute;
  left: ${props => props.x || '250'}px;
  top: ${props => props.y || '510'}px;

  width: 254px;
  height: 328px;
  /* border: 3px dashed lightgreen; */

  transform-origin: top right;
  transform: 
    rotateY(${props => props.mirror ? '180deg' : '0deg' })
    scale(${props => props.scale});

  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  display: block;
`;
