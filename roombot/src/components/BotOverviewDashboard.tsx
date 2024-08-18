import { Box, useTheme, Divider, Typography,Chip,  TextField, Grow, Paper, Autocomplete , useMediaQuery } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import { useEffect } from "react";

import  {tokens}  from "../utils/theme";
import BotTemplate from "./BotOverviewTemplate";
import {addSuffixToBackendURL} from "../utils/networkUtils";
import { Platform } from "../utils/entitities";
import { IBotConfigProps } from "../utils/entitities";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const availablePlatforms: Platform[] = Object.keys(Platform) as Platform[];



const BotDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userID, setUserID] = useState<number>(0);
    const [botData, setBotData] = useState<IBotConfigProps[]>([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [categories, setCategories] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [filteredBots, setFilteredBots] = useState<IBotConfigProps[]>([]);
    
    // get bot data
    useEffect(() => {
      axios.get(addSuffixToBackendURL("bot/get-bot-configs"), 
      {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
              .then((response) => {
                console.log(response.data)
                setBotData(response.data)
                setFilteredBots(response.data)})
                .catch((error) => {
                  console.log(error)});
                }
    , [])

    useEffect(() => {
        if (categories.length === 0) {
            setFilteredBots(botData);
        } else {
            setFilteredBots(
                botData.filter((data) =>
              categories.some((platform) =>
                data.platform === platform.valueOf(),
              ),
            ),
          );
        }
      }, [categories]);
    
      useEffect(() => {
        if (categories.length === 0 && titles.length === 0) {
            setFilteredBots(botData);
        } else {
            setFilteredBots(
            botData.filter((bot) =>
              (titles.length === 0 || titles.some(title => bot.title === title)),
            ),
          );
        }
      }, [titles])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        setCategories(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleChangeTitle = (event: any, newValue: any) => {
        event
        setTitles(newValue);
      }
    
    

    return (
        <Box display={"flex"} flexDirection={"column"}
        sx={{
            justifyContent: "center",
            padding: theme.spacing(2),
            textAlign: "center",
        }}>
              <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            fontWeight: "bold",
            padding: 2,
            }}>
                
            </Box>
            <Box display={"flex"} justifyContent={"space-evenly"} 
            sx={{
                backgroundColor: "white",
    
            }}>
               <FormControl sx={{ m: 2, width: "50%", background:colors.color1[400] }}>
       
               <Autocomplete
  multiple
  id="filter-category"
  options={filteredBots.map((bot) => bot.title)}
  getOptionLabel={(option) => option}
  value={titles}
  onChange={handleChangeTitle}
  filterSelectedOptions
  renderTags={(value, getTagProps) =>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', overflowX: 'auto' }}>
      {value.map((option, index) => (
        <Chip
          variant="outlined"
          label={option}
          {...getTagProps({ index })}
          // Adjust the Chip style as needed, considering the container's new behavior
          style={{ fontSize: '0.875rem', height: 'auto', maxWidth: '100%' }}
        />
      ))}
    </div>
  }
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search title"
      placeholder="Search title"
    />
  )}
/>
      </FormControl>
            <FormControl sx={{ m: 2, width: "50%", background:colors.color1[400] }}>
        <InputLabel id="demo-multiple-name-label">Filter platform</InputLabel>
        <Select
          labelId="filter.category"
          id="filter-category"
          multiple
          value={categories}
          onChange={handleChange}
          input={<OutlinedInput label="Filter category" />}
          MenuProps={MenuProps}
        >
          {availablePlatforms.map((name) => (
            <MenuItem
              key={name}
              value={name}
              
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Box>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: theme.spacing(2),
            }}>
            {filteredBots.map((bot) => (
                <>
                               <Grow in={true} timeout={1000}>
                <Paper elevation={5} sx={{
                    ":hover": {
                        background: "lightgray",
                    },
                    cursor: "pointer",
                    display: "flex",
                    gridColumn: (isMobile || isTablet) ? "span 6" : "span 3",
                    gridRow: "span 1",
                 
                    alignItems: "start",
                    justifyContent:"start",
                    borderRadius: "15px",
                    // make it a bit transparent
                    background: "rgba(255, 255, 255, 0.9)",
                }}>
                <BotTemplate {...bot} />
                </Paper>
                </Grow> 
                </>
            ))}
            </Box>
        </Box>
    )
}

export default BotDashboard