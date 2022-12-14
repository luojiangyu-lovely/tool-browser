import React,{useImperativeHandle} from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { compareApi} from "../../../serve/http";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import MyTable from './MyTable';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TransitionProps } from '@mui/material/transitions';
import diff from 'arr-diff'

interface  FullDialogProps{
    onRef:any
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
    const [dataBefore,setDataBefore] = React.useState<any[]>([])
    const [dataNow,setDataNow] = React.useState<any[]>([])
    const [tableBefKeys,setTableBefKeys] = React.useState<any[]>([])
    const [tableNowKeys,setTableNowKeys] = React.useState<any[]>([])
    const handleClickOpen = (id:string) => {
        compareApi({id}).then((res:any)=>{
            let dataBefore = res.dataBefore.rows
            let dataNow = res.dataNow.rows
            let tableBefKeys = Object.keys(res?.dataBefore?.rows[0])
            let tableNowKeys = Object.keys(res?.dataNow?.rows[0])
            let befAddkeys = diff(tableNowKeys,tableBefKeys)
            let nowAddkeys = diff(tableBefKeys,tableNowKeys)
            tableBefKeys = tableBefKeys.concat(befAddkeys)
            tableNowKeys = tableNowKeys.concat(nowAddkeys)
            let objBef:any = {}
            let objBefArr:any[] = []
            let objNow:any = {}
            let objNowArr:any[] = []
            tableBefKeys.forEach((el:string)=>{
              objBef[el] =' '
            })
            tableNowKeys.forEach((el:string)=>{
              objNow[el] =' '
            })
            for(var i = 0;i<Math.abs(dataBefore.length-dataNow.length);i++){
              objBefArr.push(objBef)
              objNowArr.push(objNow)
            }
            if(dataBefore.length>dataNow.length){
                dataNow = dataNow.concat(objNowArr)
            }else if(dataBefore.length<dataNow.length){
                dataBefore = dataBefore.concat(objBefArr)
            }
            setDataBefore(dataBefore)
            setDataNow(dataNow)
            setTableBefKeys(tableBefKeys)
            setTableNowKeys(tableNowKeys)
            
           setTimeout(() => {
            var t1:any = document.getElementById('table1');
            var t2:any = document.getElementById('table2');
            var tRows = t1.rows.length;
            var tCells = t1.rows[1].cells.length;
           for(var i=1; i<tRows; i++){
               for(var p=0; p<tCells; p++){
                   if(t1.rows[i].cells[p].innerHTML !== t2.rows[i].cells[p].innerHTML){
                       t2.rows[i].cells[p].style.backgroundColor = 'rgb(245 115 115)';
                       t2.rows[i].cells[p].style.fontWeight = 600;
                       t1.rows[i].cells[p].style.backgroundColor = 'rgb(167 253 167)';
                   }
               }
           }
           }, 100);
          })
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
             ????????????
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">????????????????????????</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={false}
      >
        <FormControlLabel value={true} control={<Radio />} label="???" />
        <FormControlLabel value={false} control={<Radio />} label="???" />
      
      </RadioGroup>
    </FormControl>
        <div style={{display:'flex'}}>
            <div style={{borderRight:'5px solid #555',width:'50%',display:'flex',flexDirection:"column"}} key='dataBefore'>
                <h1 style={{textAlign:'center'}}>????????????</h1>
                <div style={{overflowX:'auto'}}>
                  <MyTable rows={dataBefore} tableKeys={tableBefKeys} id='table1' rowKey='table1' ></MyTable>
                </div>
            </div>
            <div style={{borderLeft:'5px solid #555',width:'50%',display:'flex',flexDirection:"column"}} key='dataNow'>
                <h1 style={{textAlign:'center'}}>????????????</h1>
                <div style={{overflowX:'auto'}}>
                    <MyTable rows={dataNow} tableKeys={tableNowKeys} id='table2' rowKey='table2'></MyTable>
                </div>
            </div>
           
        </div>
          
        </List>
      </Dialog>
    </div>
  );
}