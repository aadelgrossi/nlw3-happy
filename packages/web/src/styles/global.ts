import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  body, input, button, textarea {
    font: 600 18px Nunito, sans-serif;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:visited, a:hover, a:active {
    color: inherit;
  }

  a:focus, button:focus {
    outline: none;
  }
`
