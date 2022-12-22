import { Button, TextField, Typography,Alert } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { dataAction } from '../store/data'
import { useParams ,useNavigate} from 'react-router-dom'

const Add = () => {
  const date=new Date()
  const fur=date.getDate()
  date.setDate(fur)
  const defaultVal=date.toLocaleDateString('en-CA')

  const {id}=useParams()

  const navigate=useNavigate()

  let initialState={name:"",
  author:"",
  date:defaultVal,
  price:"",
  isbn:""}
  const [data,setData]=useState(initialState)
  const [type,setType]=useState('Add')
  useEffect(()=>{

    const getData=async(id)=>{
      try{
      const res=await axios.get(`http://localhost:8000/books/${id}`)
      if(res.status==200){
        console.log(res.data)
        setData({
          name:res.data.name,
          author:res.data.author,
          price:res.data.price,
          isbn:res.data.ISBN,
          date:res.data.dateOfPublish.slice(0,10)
        })
      }
    }catch(err){
        console.log(err.message)
      }
        // initialState.name=
        // initialState.author=res.data.author
        // initialState.date=res.data.date
        // initialState.price=res.data.price
        // initialState.isbn=res.data.isbn

        console.log(initialState)
      }

    
    if(id!=='add'){
        getData(id.slice(5))
        setType('Edit')
    }
    
     
    
  },[])

 

  const dispatch=useDispatch()
  
  const [message,setMessage]=useState(null)
  const [valid,setValid]=useState({
    name:true,
    author:true,
    isbn:true
  })
  const onChangeData=(e)=>{
    
    setData(prevData=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))

  }

  const postData=async(data)=>{
    let response
    if(type=='Add'){
    try{
     response= await axios.post("http://localhost:8000/books",{...data})
     console.log(response)
     return response
    }catch(err){
      return err
    }
  }else{
    try{
      response= await axios.patch(`http://localhost:8000/books/${id.slice(5)}`,data)
      console.log(response)
      return response
     }catch(err){
       return err
     }
  }
    
  }
  
  const submitHandler=async(e)=>{
e.preventDefault()
    if(data.name===""){
      setValid(prevValid=>({...prevValid,name:false}))
      return
    }
    else if(data.name!==""){
      setValid(prevValid=>({...prevValid,name:true}))
    }
    if(data.author===""){
      setValid(prevValid=>({...prevValid,author:false}))
      return
    } 
    else if(data.author!==""){
      setValid(prevValid=>({...prevValid,author:true}))
    }
    if( data.isbn===""){
      setValid(prevValid=>({...prevValid,isbn:false}))
      return;
    }

      const response=await postData(data)
    
      if(!response.status){
        setMessage(false)
      }
      else{
        if(response.status===201 || response.status==200){
          setMessage(true)
          alert('Data was submitted Successfully')
          dispatch(dataAction.actionData())
          navigate('/')
        }
        else{
          setMessage(false)
        }
      }
   

  }


  return (
    <div>
       
      <form onSubmit={submitHandler}>
        <Box display={"flex"} flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent="center" margin="auto" marginTop={6} padding={3}
        boxShadow="2px 2px 3px #cccccc" borderRadius={2}
        sx={{":hover":{
          boxShadow:"10px 10px 10px #cccccc"
        }}}>
          <Typography>Add Book</Typography>
          <TextField variant="outlined"  label='Book' type="text" fullWidth margin='normal'  value={data.name} name="name" onChange={onChangeData}   error={!valid.name}  helperText={ !valid.name && "Book name required"}/>
          <TextField variant="outlined" label='Author' type="text" fullWidth margin='normal' value={data.author} name="author" onChange={onChangeData} error={!valid.author} helperText={ !valid.author && "Author name required"}/>
          <TextField variant="outlined" label='Date of Publish' type="date" fullWidth margin='normal' value={data.date} name="date" onChange={onChangeData}/>
          <TextField variant="outlined" label='Price' type="number" fullWidth margin='normal' value={data.price} name="price" onChange={onChangeData}/>
          <TextField variant="outlined" label='ISBN' type="text" fullWidth margin='normal' value={data.isbn} name="isbn" onChange={onChangeData} error={!valid.isbn} helperText={ !valid.isbn && "ISBN required"}/>

          <Button type="submit" disabled={message==true?true:false}>{type=='Add'?'Add':'Edit'}</Button>
        </Box>
      </form>
      {message &&<Alert  severity="success" sx={{ width: '100%' }}>
          Submitted Successfully!!!
  </Alert>}
         {message==false &&<Alert  severity="error" sx={{ width: '100%'}}>
          Something went wrong!!!
        </Alert>}
    </div>
  )
}

export default Add
