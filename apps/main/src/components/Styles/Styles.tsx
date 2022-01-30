import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
  *,
  :after,
  :before {
    box-sizing: border-box
  }
  html {
    height: 100%
  }
  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: SFProText, Arial, sans-serif;
    background: #202e3b;
    color: #fff
  }
  #root {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    max-width: 720px;
    min-width: 320px;
    margin-left: auto;
    margin-right: auto;
    background: #253545
  }
  .swiper-button-disabled {
    opacity: .5
  }
  .swiper-pagination {
    width: 100vw !important;
    max-width: 720px;
    left: 50% !important;
    transform: translateX(-50%);
  }
`;

export default Styles;
