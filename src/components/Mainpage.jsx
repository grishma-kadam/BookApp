import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl ,InputAdornment,InputLabel,OutlinedInput,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import { dataAction } from '../store/data';
import classes from './styles.module.css'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Mainpage() {


  const status=useSelector(state=>state.status)
  const dispatch=useDispatch()
    const getData=async ()=>{
      try{
      const response=await axios.get('http://localhost:8000/books/')
      console.log(response)
  
      if(response.status==200){
      return response.data
      }
      return 'Could not load data'
    }catch(err){
      return err.message
    }
  }
  
    useEffect(()=>{
      const get=async()=>{
        const res= await getData()
        
        if (typeof(res)!='string'){
          dispatch(dataAction.fetchData(res))
        }
        console.log(res)
      }
      get()
    },[status])
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'name', headerName: 'Book name', width: 400 },
    { field: 'author', headerName: 'Author', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
    },
    {
      field: 'ISBN',
      headerName: 'ISBN',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
    {
      field:'delete',
      headerName:'Delete',
      width:90,
      renderCell:(cellValues)=>{
        console.log(cellValues.id)
        return <button className={classes.d_button} onClick={()=>deleteData(cellValues.id)}>Delete</button>
      }
    },
    {
      field:'edit',
      headerName:'Edit',
      width:90,
      renderCell:(cellValues)=>{
        console.log(cellValues.id)
        return <Link to={`edit-${cellValues.id}`}><button className={classes.e_button} >Edit</button></Link>
      }
    },
  ];

  const deleteData=async(id)=>{
    console.log('called')
    try{
      const res=await axios.delete(`http://localhost:8000/books/${id}`)
      if(res.status!==404){
        dispatch(dataAction.actionData())
      }
    }
    catch(e){
      console.log(e.message)
    }
    
  }
  const books=useSelector(state=>state.books)
  const [data,setData]=useState([...books])


  useEffect(() => {
   setData([...books])
  }, [books]);
 
  
  
  console.log(data)
  const [search,setSearch]=useState()
  const handleClick=(e)=>{
  e.preventDefault()
setData([...books])
  if(search!=""){
 setData(prevData=>prevData.filter(p=>p.name.toLowerCase().includes(search )|| p.author.toLowerCase().includes(search)))
  }
  else{
    setData([...books])
  }
  }

  return (

    <div style={{ height: '80vh', width: '100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
          <InputLabel >Search By Name or Author</InputLabel>
          <OutlinedInput
            onChange={(e)=>setSearch(e.target.value.toLowerCase())}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                 onClick={handleClick}
                  edge="end"
                  
                >
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
            }
           
          />
        </FormControl>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
      style={{width:'100%'}}
        getRowId={(row) => row._id}
      />
    </div>
  );
}