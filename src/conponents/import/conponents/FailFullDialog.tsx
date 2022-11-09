import React,{useImperativeHandle} from 'react';
import Dialog from '@mui/material/Dialog';

import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ShowTable from '../ShowTable';
import { TransitionProps } from '@mui/material/transitions';

interface Data {
    key: string;
    id: string;
    value:string 
  }

interface  FullDialogProps{
    onRef:any
  }

  interface  errItemProps{
    item:Data;
    errMsg:any
  }

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: FullDialogProps) {
    useImperativeHandle(props.onRef,()=>{
        return{
            handleClickOpen:handleClickOpen
        }
    })

    const [fullOpen,setFullOpen] = React.useState(false)
    const [errItem,setErrItem] = React.useState({item:{key:'',value:'',id:''},errMsg:[]})
    const [tableKeys,setTtableKeys] = React.useState<any[]>([])
    const handleClickOpen = (errItem:errItemProps) => {
        setTtableKeys(Object.keys(errItem.errMsg[0]))
        setErrItem(errItem)
        setFullOpen(true);
    };

    const handleClose = () => {
        setFullOpen(false);
    };

    return (
        <div>
        <Dialog
            fullScreen
        open={fullOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             失败的数据
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
           <ListItem>
            <ListItemText primary={`${errItem?.item?.key}`} secondary={`${errItem?.item?.id}`} />
          </ListItem>
          <ShowTable rows={errItem.errMsg} tableKeys={tableKeys}></ShowTable>
        </List>
      </Dialog>
    </div>
  );
}