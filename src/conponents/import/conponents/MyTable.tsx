
interface  ShowTableProps{
    rows:any[],
    tableKeys:string[],
    id:string,
    rowKey:string
  }
export default function MyTable(props: ShowTableProps) {
const {rows,tableKeys,id,rowKey} = props
return (
    <table border={1} cellSpacing={0} cellPadding="10"  style={{fontSize:12}} >
        <thead >
        <tr style={{height:42}}>
        {
             tableKeys.map((key,index)=>(
                <th key={`${rowKey}-th-${index}`} >{key}</th>
                 ))
         }
           
        </tr> 
        </thead>
        <tbody id={id}>
        {
            rows.map((row,index)=>(<tr style={{height:42,textAlign:'center'}} key={`${rowKey}-${index}`}>
                {
             tableKeys.map((key,i)=>(
                <td key={`${rowKey}-${index}-${i}`}>{row[key]}</td>
                 ))
         }
            </tr>))
        }
        </tbody>
 </table>
)


}

    


