import React, { useState,useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css'
import Box from '@mui/material/Box';
import ImportItem from './conponents/import/index'
import { Button } from '@mui/material';
import {testApi} from './serve/http'
import axios from 'axios';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function App() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  const test2 = ()=>{
   axios.get('http://wn-server-1:5984/rs_config/heroes2').then(res=>{
    console.log(res)
   })
  }
  const test1 = ()=>{
    testApi().then(res=>{
     console.log(res)
    })
   }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="批量导入" {...a11yProps(0)} />
          <Tab label="新增表单" {...a11yProps(1)} />
          <Tab label="操作日志" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

          <ImportItem/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Button onClick={test1}>本地</Button>
      <Button onClick={test2}>测试</Button>
      </TabPanel>
    </Box>
  );
}