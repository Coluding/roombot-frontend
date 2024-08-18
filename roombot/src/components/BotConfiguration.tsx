import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, 
    Select, FormControl, InputLabel, FormHelperText} from "@mui/material";


import { tokens } from "../utils/theme";
import Header from "../utility/Header";
import { BotConfiguration, Platform, PlatformSpecific, KamernetSpecific, FinalKamernetBotConfig } from "../utils/entitities";
import BotConfiguratiKamernetSpeconComp, {kamernetValueMapper} from "./specific_configurations/KamernetConfig";
import {addSuffixToBackendURL} from "../utils/networkUtils"


const basicValueExtractor = (values: BotConfiguration) : BotConfiguration => {
  return {
      platform: values.platform,
      title: values.title,
      apikey: values.apikey,
      email: values.email,
      password: values.password,
      end_date: values.end_date,
      search_interval: values.search_interval,
      system_message: values.system_message,
  }
}

const BotConfigurationComp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [understood, setUnderstood] = React.useState(false);
  const [understoodMsg, setUnderstoodMsg] = React.useState(false)
  const [kamernetSpecific, setKamernetSpecific] = React.useState<boolean>(false);
  const [initialConfig, setInitialConfig] = React.useState<boolean>(true);
  const [msgDialog, setMsgDialogOpen] = React.useState<boolean>(false);
  const [failModalOpen, setFailModalOpen] = React.useState<boolean>(false);
  const [firstFormValues, setFirstFormValues] = React.useState<BotConfiguration | null>(null);


  const handleDialogOpen = () => {
    if (!understood) {
        setDialogOpen(true)
    }
  };

  const handleMsgDialogOpen = () => {
    if (!understoodMsg) {
        setMsgDialogOpen(true)
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setUnderstood(true);
  };

  const handleMsgDialogClose = () => {
    setMsgDialogOpen(false)
    setUnderstoodMsg(true)
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitMock = (values: any) => {
    console.log(values);
    console.log("_--------------------------------------")
    if (initialConfig) {
    switch (values.platform) {
        case Platform.kamernet:
            setKamernetSpecific(true);
            break;
        default: console.log("No specific configuration needed");
    }
    setInitialConfig(false);
    setFirstFormValues(values);
    }
    else {
      setInitialConfig(true);
    }
  }

  return (
    <>
    <Box m="20px">
      <Header title="Configuration" subtitle="Configure your bot here"/>
      <Formik
        onSubmit={submitMock}
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
               <FormControl fullWidth error={!!touched.platform && !!errors.platform }
                sx={{
                  gridColumn: "span 2",
                  '& .MuiSvgIcon-root': { 
                      color: touched.platform && errors.platform ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiSelect-outlined': { 
                    color: touched.platform && errors.platform ? 'red' : `${colors.color1[500]} !important`,
                },
                '& .MuiFormLabel-root': { 
                  color: touched.platform && errors.platform ? 'red' : `${colors.color1[500]} !important`,
              },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.platform && errors.platform   ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              >
                <InputLabel>Select platform</InputLabel>
                <Select
                value={values.platform}
                onChange={handleChange}
                inputProps={{
                  name: 'platform',
                }}
              >
                <MenuItem value={Platform.kamernet}>kamernet</MenuItem>
                <MenuItem value={Platform.wgg}>wg-gesucht</MenuItem>
              </Select>
              {touched.platform && errors.platform && <FormHelperText>{errors.platform}</FormHelperText>}
            </FormControl>
            <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Search interval"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.search_interval}
                name="search_interval"
                error={!!touched.search_interval && !!errors.search_interval}
                helperText={touched.search_interval && errors.search_interval}
                InputLabelProps={{
                  style: { color: touched.search_interval && errors.search_interval ? 'red' : `${colors.color1[500]}` }
              }}
              sx={{
                  gridColumn: "span 2",
                  '& .MuiInputBase-input': { 
                      color: touched.search_interval && errors.search_interval ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.search_interval && errors.search_interval ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="API-Key"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apikey}
                name="apikey"
                error={!!touched.apikey && !!errors.apikey}
                helperText={touched.apikey && errors.apikey}
                InputLabelProps={{
                  style: { color: touched.apikey && errors.apikey ? 'red' : `${colors.color1[500]}` }
              }}
              sx={{
                  gridColumn: "span 2",
                  '& .MuiInputBase-input': { 
                      color: touched.apikey && errors.apikey ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.apikey && errors.apikey ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="E-Mail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                InputLabelProps={{
                  style: { color: touched.email && errors.email ? 'red' : `${colors.color1[500]}` }
              }}
              sx={{
                  gridColumn: "span 2",
                  '& .MuiInputBase-input': { 
                      color: touched.email && errors.email ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.email && errors.email ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password for platform"
                onBlur={handleBlur}
                onClick={handleDialogOpen}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputLabelProps={{
                  style: { color: touched.password && errors.password ? 'red' : `${colors.color1[500]}` }
              }}
              sx={{
                  gridColumn: "span 2",
                  '& .MuiInputBase-input': { 
                      color: touched.password && errors.password ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.password && errors.password ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="How long should the room be free?"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.end_date}
                name="end_date"
                error={!!touched.end_date && !!errors.end_date}
                helperText={touched.end_date && errors.end_date}
                InputLabelProps={{
                  style: { color: touched.end_date && errors.end_date ? 'red' : `${colors.color1[500]}` ,
                  opacity: values.end_date ? 1 : 0}
                  
              }}
              sx={{
                  gridColumn: "span 2",
                  '& .MuiInputBase-input': { 
                      color: touched.end_date && errors.end_date ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.end_date && errors.end_date   ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Title for the bot configuration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                InputLabelProps={{
                  style: { color: touched.title && errors.title ? 'red' : `${colors.color1[500]}` }
              }}
              sx={{
                  gridColumn: "span 4",
                  '& .MuiInputBase-input': { 
                      color: touched.title && errors.title ? 'red' : `${colors.color1[500]} !important`,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.title && errors.title ? 'red' : `${colors.color1[500]} !important`,
                  },
              }}
              />
              <TextField
  fullWidth
  variant="outlined"
  type="text"
  label="System message"
  onBlur={handleBlur}
  onChange={handleChange}
  onClick={handleMsgDialogOpen}
  value={values.system_message}
  name="system_message"
  error={!!touched.system_message && !!errors.system_message}
  helperText={touched.system_message && errors.system_message}
  multiline
  rows={10} 
  InputLabelProps={{
    style: { color: touched.system_message && errors.system_message ? 'red' : `${colors.color1[500]}` }
  }}
  sx={{
    gridColumn: "span 4", // Spans the entire width
    '& .MuiInputBase-input': {
      color: touched.system_message && errors.system_message ? 'red' : `${colors.color1[500]} !important`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: touched.system_message && errors.system_message ? 'red' : `${colors.color1[500]} !important`,
    },
  }}
/>

            </Box>
            {initialConfig &&
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" sx={{background: colors.color4[700], color: theme.palette.background.default}} variant="contained">
               Quit
              </Button>
              <Button type="submit" sx={{background: colors.color1[400], color: theme.palette.background.default}} variant="contained">
               Confirm
              </Button>
            </Box>
    }
          </form>
        )}
      </Formik>
      {kamernetSpecific && (<BotConfiguratiKamernetSpeconComp firstFormValues={firstFormValues}/>)}

    </Box>
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
    <DialogTitle>Privacy Information</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please make sure that you do not use password that you use for other services. We are not responsible for any data breaches.
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="space-between" mt="20px">
    <DialogActions>
      <Button onClick={handleDialogClose}>Disagree</Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={handleDialogClose}>Understood</Button>
    </DialogActions>
    </Box>
  </Dialog>
  <Dialog open={msgDialog} onClose={handleMsgDialogClose}>
    <DialogTitle>System Message</DialogTitle>
    <DialogContent>
      <DialogContentText>
        The one shown here is a pre-written system message. You can orientate yourself using this message, but please rewrite it. It should ontain all the information the bot should have to write good messages that suit you.
      </DialogContentText>
    </DialogContent>
    <Box display="flex" justifyContent="end" mt="20px">
    <DialogActions>
      <Button onClick={handleMsgDialogClose}>Understood</Button>
    </DialogActions>
    </Box>
  </Dialog>
  
  </>
  
  );
};

const initialValues: BotConfiguration = {
  platform: null,
  title: '',
  apikey: '',
  email: '',
  password: '',
  end_date: '',
  search_interval: 600,
  system_message: "Starting in September 2024, I will be a student at the University of Amsterdam. I am urgently seeking a room to live in Amsterdam. I prefer a room in a shared apartment with other students.\nI am a friendly and open-minded person eager to meet new people. You will help me craft messages to landlords that reflect their specific offers and my personality.\nI will provide a typical message, and you will adapt it accordingly. Additionally, you will assist me in finding the best offers and scheduling viewings.\nPlease use simple language, keep messages concise and be on point. Do not focus too much on details like the address or the price. Instead, focus on my personality and adaptability.\nAlways mention my adaptability and respectfulness and put emphasis on that.\nAvoid asking for direct views unless video meetings are possible.\nMention that I work as a machine learning engineer at a consulting company as a working student to finance my studies.\nAlways mention my hobbies (basketball, sports, cooking, meeting new people, having great talks). However, sometimes you will need to put more emphasis on them and sometimes less depending on the offer.\nIf needed, mention that I am a non-smoker and in case roommates are smokers, I have no problem with that.\nMention that I am in general a person that is very clean and enjoys quietness and is very respectful of other people's privacy.\nHere is my current message for reference:\n\n---\nHi {name}! \nI am Lukas, 25 years old. I will start my master's degree in Artificial Intelligence at the University of Amsterdam in September. Therefore, I am in urgent need of a room.\nA little about me: I play basketball and enjoy sports. I have lived in shared flats for the past five years, making me an experienced roommate. I am tidy, clean, and enjoy quietness, but I also love engaging in interesting conversations and having a good time at home.\nI am respectful and adaptable with no high expectations, so I am confident we will get along well.\nI work as a machine learning engineer at a consulting company as a working student to finance my studies.\nI would love to hear from you and get to know you better.\n---\nUse this message as a base and adjust it to fit the specific offer"
}

        const checkoutSchema = yup.object({
        email: yup.string().email('E-mail is not valid').required('E-mail is required'),
        title: yup.string().required('Title is required'),
        password: yup.string().required('Password is required'),
        apikey: yup.string().required('API key is required'),
        platform: yup.string().oneOf(Object.values(Platform), 'Platform is not valid').required('Platform is required'),
        end_date: yup.date().required('End date is required'),
        search_interval: yup.number().required('Search interval is required').min(60, 'Search interval must be at least 60 or use another subscription').max(3600, 'Search interval must be at most 3600'),
        system_message: yup.string().required('System message is required').notOneOf([initialValues.system_message], "You have to enter your own message here and not use the predefined!"),
    })

 

export default BotConfigurationComp;