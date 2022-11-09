
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface  ShowTableProps{
    rows:any[],
    tableKeys:string[],
    
  }
export default function ShowTable(props: ShowTableProps) {
const {rows,tableKeys} = props
return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
     <TableRow>
         {
             tableKeys.map((key,index)=>(
                 <TableCell key={index}>{key}</TableCell>
                 ))
         }
     </TableRow>
     </TableHead>
     <TableBody>
     {rows?.map((row,index) => (
         <TableRow
         key={index}
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
             {
                 tableKeys?.map((key,i)=>(
                 <TableCell component="th" scope="row"  key={`${index}-${i}`}>
                      {row[key]}
                 </TableCell> 
                 ))
             }
         </TableRow>
     ))}
     </TableBody>
 </Table>
 </TableContainer>
)


}
