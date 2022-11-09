import {get, post} from './index'

interface Data {
  key: string;
  id: string;
  value:string 
}

interface batchImportProps {
  importItem: Data[]
}
interface compareProps {
  id:string
}
interface FormDataProps {
  key?:string
}


function getFormDataApi(data:FormDataProps|undefined){
    return new Promise((resolve, reject) => {
      get('/getFormData',data).then(res => {
        resolve (res);
      },error => {
        reject(error)
      })
    }) 
  }
  function batchImportApi(data:batchImportProps){
    return new Promise((resolve, reject) => {
      post('/batchImport',data).then(res => {
        resolve (res);
      },error => {
        reject(error)
      })
    }) 
  }
  

  function compareApi(data:compareProps){
    return new Promise((resolve, reject) => {
      get('/compare',data).then(res => {
        resolve (res);
      },error => {
        reject(error)
      })
    }) 
  }

  function testApi(){
    return new Promise((resolve, reject) => {
      get('/rs_config/_design/heroes/_view/spell_params').then(res => {
        resolve (res);
      },error => {
        reject(error)
      })
    }) 
  }
  export {
    getFormDataApi,
    batchImportApi,
    compareApi,
    testApi
  }
  