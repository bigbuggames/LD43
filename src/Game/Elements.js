import styled, { keyframes } from "styled-components";
import { withAssets } from "Engine/AssetLoader";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Screen = styled.div`
  width: 1920px;
  height: 1080px;
  transform: scale(0.7);
  overflow: hidden;
  background-color: #d46c32;
  animation: ${fadeIn} 4s ease-in;
`;

export const Foreground = withAssets(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.assets.images["foreground"].locator});
`);

export const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid tomato;
  background-color: papayawhip;
  margin: 10px 10px;
`;
