import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
  ${Reset}
  
  * {
    box-sizing: border-box;
    
  }
  
  body {
    
  }

  a {
    color: black;
    cursor: pointer;
  }

`;
export default GlobalStyle;
