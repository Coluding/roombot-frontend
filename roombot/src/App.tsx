import {Routes, Route} from "react-router-dom";
import {ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./utils/theme"

import Dashboard from './container/Dashboard'
import Login from './container/Login'

const App = () => {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>
      <CssBaseline/>

    <Routes>
    <Route path="/*" element={<Dashboard/>}/>
    <Route path="/login" element={<Login/>}/>
</Routes>
</ThemeProvider>
        </ColorModeContext.Provider>
  )

}

export default App
