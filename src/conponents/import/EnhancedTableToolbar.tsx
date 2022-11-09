
import Toolbar from '@mui/material/Toolbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ListItem from './conponents/ListItem'
import React, { useState,useEffect } from 'react';

import { batchImportApi} from "../../serve/http";


interface Data {
  key: string;
  id: string;
  value:string 
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    selected: Data[];
    emptySelected: () => void;
  }
  
  export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected,selected,emptySelected } = props;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
   
    const [resData,setResData] = React.useState([])
   

    const batchImport = () => {
      setLoading(true);
      batchImportApi({importItem:selected}).then((response:any) => {
        const {data} = response
         
        emptySelected()
        setLoading(false);
        setResData(data)
        setOpen(true);
        })
        .catch((error:any) => {
          console.log(error)
        })
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
    
      <div className='listItem'>
        
        <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
           
            <ListItem resData={resData}></ListItem>
          </DialogContentText>
        </DialogContent>

      </Dialog>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
           已选 {numSelected} 项
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
           暂未选择
          </Typography>
        )}
        <Tooltip title="导入" >
          <span>
          <LoadingButton variant="contained" disabled={!(numSelected >0)} sx={{ width: '100px' }} onClick={batchImport} loading={loading}>
          批量导入
        </LoadingButton>
          </span>
        
          </Tooltip>
      </Toolbar>
      </div>
      
    );
  }
  