import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
    BrowserRouter as Router,
  } from "react-router-dom";
  import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const theme = extendTheme({ 
  components :{
    Heading : {
      baseStyle : {
        fontFamily: 'Rubik Microbe'   }
    }
 }
 })


root.render(
  <ChakraProvider theme={theme}>
    <Router>
    <App />
    </Router>
    </ChakraProvider>
)


reportWebVitals()
