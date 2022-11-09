
import React,{} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FailFullDialog from './FailFullDialog';
import SucFullDialog from './SucFullDialog'
import Button from '@mui/material/Button';

interface ListItemProps {
    resData:any[]
  }
export default function ListItem(props: ListItemProps){
    const {resData} = props
    const sucData =  resData.filter((item:any)=>item.success)
    const errData =  resData.filter((item:any)=>!item.success)
    let failFullRef:any = React.createRef()
    let sucFullRef:any = React.createRef()
    const handleOnClick =(id:string,type:number)=>{
        if(type){
            sucFullRef.current.handleClickOpen(id)
        }else{
            const errDatas = errData.filter((el:any)=>el.item.id===id)
            failFullRef.current.handleClickOpen(errDatas[0])
        }
        
    }
    return (
        <div >
            <FailFullDialog onRef = {failFullRef}></FailFullDialog>
            <SucFullDialog onRef = {sucFullRef}></SucFullDialog>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption> 导入成功<span style={{color:"rgb(76, 175, 80)",margin:5}}>{sucData.length}</span>条,导入失败<span style={{color:"red",margin:5}}>{errData.length}</span>条</caption>
                <TableHead>
                <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">key</TableCell>
                    <TableCell align="center">value</TableCell>
                    <TableCell align="center">结果</TableCell>
                    <TableCell align="center">操作</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {resData.map((row:any) => (
                    <TableRow key={row.item.id}>
                    <TableCell component="th" scope="row">
                        {row.item.id}
                    </TableCell>
                    <TableCell align="center">{row.item.key}</TableCell>
                    <TableCell align="center">{row.item.value}</TableCell>
                    <TableCell align="center">{row.success?<span style={{color:"rgb(76, 175, 80)",margin:5}}>成功</span>:<span style={{color:"red",margin:5}}>失败</span>}</TableCell>
                    <TableCell align="center">{!row.success?<Button color="error" variant="contained" onClick={()=>handleOnClick(row.item.id,0)}>查看详情</Button>:<Button color="success" variant="contained" onClick={()=>handleOnClick(row.item.value,1)}>数据比对</Button>}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
        </div>
    )
}