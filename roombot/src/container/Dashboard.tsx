// eslint-disable-next-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../utils/theme.js";

import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import BotDashboard from "../components/BotOverviewDashboard";
import BotConfigurationComp from "../components/BotConfiguration.js";
import BotConfiguratiKamernetSpeconComp from "../components/specific_configurations/KamernetConfig";

const Dashboard = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: "flex", height: "100vh", marginTop: "64px" }}>
            <Sidebar />
            <div style={{ flex: 1, overflowY: "auto" }}>
                <Topbar fixed={true} nutzerrolle={"Admin"} />
                <Routes>
                    <Route path="/" element={<BotDashboard />} />
                    <Route path="/new-bot" element={<BotConfigurationComp />} />
                    <Route path="/kamernet" element={<BotConfiguratiKamernetSpeconComp firstFormValues={null}/>} />
                </Routes>
            </div>
        </div>
    </ThemeProvider>
</ColorModeContext.Provider>

  );
};

export default Dashboard;
