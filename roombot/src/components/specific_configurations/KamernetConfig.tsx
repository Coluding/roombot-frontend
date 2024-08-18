import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, 
    Select, FormControl, InputLabel, FormHelperText} from "@mui/material";


import { tokens } from "../../utils/theme";
import Header from "../../utility/Header";
import {PlatformSpecific, KamernetStatus, BotConfiguration, FinalKamernetBotConfig } from "../../utils/entitities";
import { addSuffixToBackendURL } from "../../utils/networkUtils";

type PlatformSpecificWithExtras = PlatformSpecific & Record<string, any>;


export const kamernetValueMapper = (values: PlatformSpecificWithExtras) : PlatformSpecific => {
    return {
        location: values.location,
        max_price: values.max_price,
        min_size: values.min_size,
        max_size: values.max_size,
        min_rooms: values.min_rooms,
        max_rooms: values.max_rooms,
        radius: values.radius,
        gender: values.gender,
        age: values.age,
        status: values.status,  
    }
  }

  interface KamernetConfigProps {
    firstFormValues: BotConfiguration | null;
  }
  
const BotConfiguratiKamernetSpeconComp: React.FC<KamernetConfigProps> = (firstFormValues) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  const [successDialogOpen, setSuccessDialogOpen] = React.useState<boolean>(false);
  const [failModalOpen, setFailModalOpen] = React.useState<boolean>(false);

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate("/");
  }

  const handleFailDialogClose = () => {
    setFailModalOpen(false);
  }


  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createBot = (values: any ) => {
    console.log(".....................")
    const specificConfig = kamernetValueMapper(values);
    const finalConfig = {...firstFormValues.firstFormValues, ...specificConfig}; 
          console.log(finalConfig);
          axios.post(addSuffixToBackendURL('bot/create-bot'), finalConfig,
        {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`} })
          .then((response) => {
              console.log(response);
              setSuccessDialogOpen(true);
          }).catch((error) => {
              if (error.response.status === 401){
                  console.log("Unauthorized");
                  alert("Unauthorized. Please log in again.");
                  navigate("/login")
              }
              console.log(error.message);
              setFailModalOpen(true);
          })
              
              
      }
    
  

  return (
    <>
    <Box m="20px">
      <Header title="Kamernet" subtitle="Specific configuration for Kamernet"/>
      <Formik
        onSubmit={createBot}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between"
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            > 
            {Object.keys(initialValues).map((key) => (
            keyToTypeMapper[key] === "select" ?
            <FormControl fullWidth error={!!touched[key] && !!errors[key] }
                sx={{
                  gridColumn: "span 2",
                  '& .MuiSvgIcon-root': { 
                      color: touched[key] && errors[key] ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiSelect-outlined': { 
                    color: touched[key] && errors[key] ? 'red' : `${colors.color1[500]} !important`,
                },
                '& .MuiFormLabel-root': { 
                  color: touched[key]&& errors[key] ? 'red' : `${colors.color1[500]} !important`,
              },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched[key] && errors[key]   ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              >
                <InputLabel>{keyLabelMapping[key]}</InputLabel>
                <Select
                value={values[key]}
                onChange={handleChange}
                inputProps={{
                  name: key,
                }}
              >
                {
                    Object.values(KamernetStatus).map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))
                }
              </Select>
              {touched[key] && errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
            </FormControl> : // Fixed typo here as well from <div>ghello<div/> to <div>hello</div>
            <TextField key={key} label={keyLabelMapping[key]} value={values[key]} fullWidth variant="outlined" type={keyToTypeMapper[key] as "text" | "number" | "select"} onBlur={handleBlur} onChange={handleChange} name={key} error={!!touched[key] && !!errors[key]} helperText={touched[key] && errors[key]} InputLabelProps={{ style: { color: touched[key] && errors[key] ? 'red' : `${colors.color1[500]}` } }} sx={{ gridColumn: "span 2", '& .MuiInputBase-input': { color: touched[key] && errors[key] ? 'red' : `${colors.color1[500]} !important`, }, '& .MuiOutlinedInput-notchedOutline': { borderColor: touched[key] && errors[key] ? 'red' : `${colors.color1[500]} !important`, } }} />
            ))}
                
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="button" sx={{background: colors.color4[700], color: theme.palette.background.default}} 
                onClick={() => {window.location.href = "/"}}
                variant="contained">
               Quit
              </Button>
              <Button
                  type="submit"
                  sx={{ background: colors.color1[400], color: theme.palette.background.default }}
                  variant="contained"
                >
                  Create bot
                </Button>
            </Box>
            
          </form>
        )}
      </Formik>
      <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
    <DialogTitle>Sucess</DialogTitle>
    <DialogContent>
      <DialogContentText>
        The bot was successfully created. You can now see the bot in the overview dashboard.
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="space-between" mt="20px">
    <DialogActions>
      <Button onClick={handleSuccessDialogClose}>Quit</Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={handleSuccessDialogClose}>Proceed</Button>
    </DialogActions>
    </Box>
  </Dialog>
  <Dialog open={failModalOpen} onClose={handleFailDialogClose}>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText>
        There was an error creating the bot. Please try again. If the error persists, please contact the support.
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="space-between" mt="20px">
    <DialogActions>
      <Button onClick={handleFailDialogClose}>Quit</Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={handleFailDialogClose}>Proceed</Button>
    </DialogActions>
    </Box>
  </Dialog>
    </Box>
  </>
  
  );
};


    const checkoutSchema = yup.object({ 
        location: yup.string().required("Location is required"),
        max_price: yup.number().required("Max price is required"),
        min_size: yup.number().nullable(),
        max_size: yup.number().nullable(),
        min_rooms: yup.number().nullable(),
        max_rooms: yup.number().nullable(),
        radius: yup.number().nullable(),
        gender: yup.string().required("Gender is required"),
        age: yup.number(),
        status: yup.string().oneOf(Object.values(KamernetStatus)).required(),
    })

    const keyLabelMapping = {
        location: "Location",
        max_price: "Max Price",
        min_size: "Min Size",
        max_size: "Max Size",
        min_rooms: "Min Rooms",
        max_rooms: "Max Rooms",
        radius: "Max Distance in km",
        age: "Age",
        gender: "Gender",
        status: "Status",
    }

    const initialValues: PlatformSpecific = {
      location: null,
      max_price: null,
        min_size: null,
        max_size: null,
        min_rooms: null,
        max_rooms: null,
        radius: null,
        gender: null,
        age: null,
        status: KamernetStatus.working_student,
    }

    const keyToTypeMapper = {
        max_price: "number",
        min_size: "number",
        max_size: "number",
        min_rooms: "number",
        max_rooms: "number",
        radius: "number",
        age : "number",
        status: "select",
        gender: "text",
        
    }

export default BotConfiguratiKamernetSpeconComp;