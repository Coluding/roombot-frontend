import { Box, IconButton, Typography, useTheme} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import { useContext} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import useMediaQuery from '@mui/material/useMediaQuery';

import {ColorModeContext, tokens} from "../utils/theme";


const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid #ddd',
        backgroundColor: theme.palette.background.default,
        color: "#386641",
        borderRadius: 4,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
        // Add other styling as needed
    },
    option: {
        '&:hover': {
            backgroundColor: "#707274", // Styling for hover stater state
        },

    }
}));


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const classes = useStyles(theme);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const fixed = true;
    const isNonMobile = useMediaQuery(theme.breakpoints.up("md"));

    console.log(classes)

    const search = true;



    return (
        <Box display="flex" justifyContent="space-between" p={2}
             sx = {fixed ? {
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 right: 0,
                 zIndex: 1100,
                 backgroundColor: colors.color1[400],
             } :  {backgroundColor: colors.color1[400]}}
        >
            <Box display="flex" alignItems="center" gap={isNonMobile? "10%" : "2%"}>
                <Box 
                sx={{cursor:"pointer"}}>
                   <Typography variant="h1">
                    RoomBot
                     </Typography>

                </Box>
                <Box
                    display="flex"
                    backgroundColor={theme.palette.background.default}

                    borderRadius="3px"
                    sx={{
                        '& .MuiInputBase-input': {
                            color: `${colors.color1[500]} !important`,
                        },

                        "& .MuiInputLabel-root": {
                            color: `${colors.color1[500]} !important`,
                        },

                        }
                    }

                >
                </Box>
            </Box>

           <Box display="flex">
           {search && (
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}

                </IconButton>
           )}
                <IconButton>
                    <QuestionMarkIcon />
                </IconButton>
                {search && (
                    <IconButton>
                    <PersonOutlinedIcon onClick={() => navigate("/profile")}/>
                </IconButton>
                )
}
                <IconButton>
                    <LogoutIcon onClick={() => {
                        navigate("/login")

                    }}/>
                </IconButton>
            </Box>
            
        </Box>
    );
};

export default Topbar;
