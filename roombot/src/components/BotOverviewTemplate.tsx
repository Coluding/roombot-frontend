import {Box, Typography, useTheme, Divider, useMediaQuery, Dialog,
   DialogTitle, DialogContent, DialogContentText, DialogActions,
  FormControlLabel, Checkbox,
  colors} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import  {tokens}  from "../utils/theme";
import { IBotConfigProps, Status } from "../utils/entitities";

const platformToLink = {
  "kamernet": "https://www.kamernet.nl",
  "wggesucht": "https://www.wg-gesucht.de"
}

const BotTemplate: React.FC<IBotConfigProps> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, SetOpen] = React.useState(false);

    return (
      <>
      <Card sx={{minWidth:"100%", minHeight:"100%", fontFamily: "bold", background: colors.white[500], color: colors.grey[500]}}>
        
       
        <CardContent>
          <Typography gutterBottom sx={{fontFamily: "bold"}} variant={isMobile?  "h3" :  "h2"} component="div">
            {props.title}
          </Typography>
          <Divider sx={{background: colors.grey[700]}}/>
          <Box display={"flex"} marginBottom={"2%"}>
            <Box marginTop={"1%"}>
            </Box>
            </Box>
           
            <Box marginTop={"2%"}>
            <Typography variant={"h3"} sx={{fontFamily: "bold"}}>{`Platform: ${props.platform}`}</Typography>
          </Box>
          <Box marginTop={"2%"}>
            <Typography variant={"h4"}>{`Create date: ${props.create_date}`}</Typography>
          </Box>

          <Divider sx={{marginTop: "1%", background: colors.grey[700]}}/>
          <Box display={"flex"} marginBottom={"2%"}>
        <Box marginTop={"1%"}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.status == Status.active} 
                style={{ color: props.status == Status.active ? 'green' : undefined }}
              />
            }
            label="Active"
          />
        </Box>
      </Box>
        </CardContent>
        <CardActions sx={{
            alignSelf: "flex-end"
        }}>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box>
          <Button size="small"onClick={() => SetOpen(true)
           }>
            <Typography sx ={{color: colors.grey[500]}}
            variant={"body1"}>{`Go to ${props.platform.includes("kamernet") ? " Kamernet" : props.platform.includes("wggesucht") ? "Go to WG-gesucht" : ""}`}</Typography>
            {!isMobile && <ArrowForwardIcon sx={{color: colors.grey[500]}} fontSize="small"/>}
          </Button>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: theme.spacing(1),
          }}>
          </Box>
          </Box>
        </CardActions>
      
      </Card>
      <Dialog
      open={open}
      onClose={() => SetOpen(false)}
      aria-labelledby="success-dialog-title"
      aria-describedby="success-dialog-description"
      >
      <DialogTitle id="success-dialog-title">{"Follow?"}</DialogTitle>
      <DialogContent>
          <DialogContentText id="success-dialog-description">
          {`You will follow an external link to
          ${props.platform.includes("kamernet") ? "Kamernet" : props.platform.includes("wggesucht") ? "WG-gesucht" : ""}.`}
  
                 </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={() => SetOpen(false)} color="primary" autoFocus>
          Close
          </Button>
          <Button onClick={() => window.open(platformToLink[props.platform], "_blank")} color="primary">
          Continue
          </Button>
      </DialogActions>
      </Dialog>
      </>
    );
}

export default BotTemplate;