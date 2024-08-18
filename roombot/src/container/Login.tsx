
import { Box, Button, TextField , useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React, { useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { alpha } from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper } from '@mui/material';

import Topbar from "../components/Topbar.jsx";
import { tokens } from "../utils/theme";
import Header from "../utility/Header";
import { addSuffixToBackendURL } from "../utils/networkUtils";
import {ILoginUser } from '../utils/entitities'

const LoginSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

const LoginUI = () => {
    const isNonMobile = useMediaQuery("(min-width: 768px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [vergessenOpen, setVergessenOpen] = React.useState(false);
    const [wrongPasswordModal, setWrongPasswordModal] = React.useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = React.useState(false);
    const [failModalOpen, setFailModalOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null); 
    const[loggedIn, setLoggedIn] = React.useState(false);
    const navigate = useNavigate();


    const handleVergessenOpen = () => {
        setVergessenOpen(true);
    }

    const handleVergessenClose = () => {
        setVergessenOpen(false);
    }

    
    const checkLogin = (values: any, {setSubmitting}: any) => {
        const user: ILoginUser = {password: values.password, 
            username: values.username
        }
        console.log(user)
        axios.post(addSuffixToBackendURL("auth/login"), user)
        .then((response) => {
            if(response.status === 202){
                const accessToken = response.data.access_token
                localStorage.setItem("accessToken", accessToken)
                setLoggedIn(true)
                navigate("/")
            }
            else{
                setSuccessModalIsOpen(true)
            }
        
        })
        .catch((error) => {
            switch (error.response.status){
                case 401: 
                    setWrongPasswordModal(true);
                    break;
                default:
                    setFailModalOpen(true);
            }

        }
        )
        .finally(() => {
            setSubmitting(false); // Set Formik submitting state to false
        });
        
    }


    return (
        <div>
        <Topbar fixed={true} nutzerrolle={"Admin"} />
        <div className="flex justify-start items-center flex-col h-screen" >
        <div className=" relative w-full h-full bg-white">
        <img src={null} alt="solar panel"
                    className="w-full h-full object-cover"/>
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0">
        
        <Paper elevation={6} 
                            sx={{ 
                                maxWidth: '500px',
                                width: '100%',
                                margin: 'none', 
                                padding: '4rem', 
                                background: alpha('#f5f7fa', 0.8), 
                                borderRadius: '15px', 
                            }}>
        <Header title={"Flat Hutner"} subtitle="Enter Login Data" img={false}/>
        <Formik
    onSubmit={checkLogin}
    initialValues={{
        username: "",
        password: "",
    }}
    validationSchema={LoginSchema}
>
    {({
        values, 
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
    }) => (
        <form onSubmit={handleSubmit}>
            <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"} gap="2rem" sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}>
                <TextField
        fullWidth
        variant="outlined"
        type="text"
        label="Username"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.username}
        name="username"
        error={!!touched.username && !!errors.username}
        helperText={touched.username && errors.username}
        InputLabelProps={{
            style: { color: touched.username && errors.username ? 'red' : `${colors.color1[500]}` }
        }}
        sx={{
            gridColumn: isNonMobile ? "2 / span 2" : "span 4",
            '& .MuiInputBase-input': { 
                color: touched.username && errors.username ? 'red' : `${colors.color1[500]} !important`,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: touched.username && errors.username ? 'red' : `${colors.color1[500]} !important`,
            },
        }}
    />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{
                        style: { color: touched.password && errors.password ? 'red' : `${colors.color1[500]}` }
                    }}
                    sx={{
                        gridColumn: isNonMobile ? "2 / span 2" : "span 4",
                        '& .MuiInputBase-input': { 
                            color: touched.password && errors.password ? 'red' : `${colors.color1[500]} !important`,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: touched.password && errors.password ? 'red' : `${colors.color1[500]} !important`,
                        },
                    }}
                />
                </Box>
                <div className="grid grid-cols-3 gap-4">
                <Box display={"flex"} justifyContent={"center"} mt="20px" >
                    <Button type="button" variant="contained" color="neutral" sx={{
                        borderRadius: "10px",
                    }} onClick={() => navigate("/registration")}>
                        Register
                    </Button>
                </Box>
                <Box display={"flex"} justifyContent={"center"} mt="20px" >
                    <Button type="button" variant="contained" color="neutral" sx={{
                        borderRadius: "10px",
                    }} onClick={(handleVergessenOpen)}>
                        Forgot Password
                    </Button>
                </Box>
                <Box display={"flex"} justifyContent={"center"} mt="20px" >
                    <Button type="submit" variant="contained" sx={{
                        borderRadius: "10px",
                        backgroundColor: colors.color1[400],
                        color: "white"
                    }}>
                        Log in
                    </Button>
                </Box>
                </div>
        </form>
    )}
</Formik>
       </Paper>
        </div>
        </div>
        </div>
        <Dialog open={wrongPasswordModal} onClose={() => setWrongPasswordModal(false)}>
    <DialogTitle>That did not work!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Password and/or username were wrong
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="end" mt="20px">
    <DialogActions>
      <Button onClick={() => setWrongPasswordModal(false)}>Try Again</Button>
    </DialogActions>
    </Box>
  </Dialog>
  <Dialog open={failModalOpen} onClose={() => setFailModalOpen(false)}>
    <DialogTitle>It's not you. It's us!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Something went wrong....
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="end" mt="20px">
    <DialogActions>
      <Button onClick={() => setFailModalOpen(false)}>Contact Support</Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={() => setFailModalOpen(false)}>Try Again</Button>
    </DialogActions>
    </Box>
  </Dialog>
        </div>
    )
}

export default LoginUI;
