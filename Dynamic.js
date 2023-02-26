import React, { useState ,useEffect} from "react";
import {TextField,Button,Table,Container,TableBody,TableHead,TableRow,TableCell,TableContainer,Paper,Select,Modal,Checkbox,Box,MenuItem, List} from "@mui/material"
import {Visibility,VisibilityOff}  from "@mui/icons-material";
import { Form } from "react-bootstrap";
import  EditableRow from "./Edit";
// import AddEdit from "./AddEdit";

 
function Add() {


  const [inputList, setInputList] = useState([]);
  const [usersData,setUsersData] = useState([]);
   const [nameError,setNameError] = useState('');
   const [passwordError,setPasswordError] = useState('');
    const [Users,SetUsers] =useState('');
  const[list,setList] = useState([]);
  const [editContactId, setEditContactId] = useState(null);

  const[view,setview] =useState(false);
//   const [editPage,setEditPage] = useState([]);
//   const [isEditableBtn,setIsEditableBtn] = useState(false);

 const[selects,setSelects]=useState();

 const [disable, setDisable] = useState(true);
 const statuses = ["Accepted","Pending","Rejected"];
 const codes= ['AC','PD','RJ'];
 const [editFormData, setEditFormData] = useState({
    userName: "",
    passWord: ""
  
  });


 const validator = (eve,temp,index,inputList) => {
  let validTemp = [...temp];
  let existing = inputList.some((ele) => ele.userName === validTemp[index]["userName"]);
 
  return {existing,validTemp}
}


useEffect(() => {
  let count = 0;
  inputList.forEach((item) => {
  if(item.userName.length <3)
      setNameError('username must have atleast 3 characters');
  else if(item.passWord.length < 8)
      setPasswordError('password must have atleast 8 characters');
  else if(item.passWord.length > 12)
      setPasswordError('password should not exceed 12 characters');
  else  count += 1;
  });
  if(count === inputList.length)
      setDisable(false);
  else setDisable(true);
},[inputList]);
        

  const handleAdd=()=>{
    // const abc=[...inputList,[]];
    inputList.push({isEditable:false,userName:'',passWord:'',isUserName:false,isPassword:false,isNameError:false,isPasswordError:false,isViewable:-1,isStatus:null});
  
    setInputList([...inputList]);
 
};


 const handleInputChange =(e,index)=>{ 
  setDisable(false);
  const{name,value}=e.target;
  let temp=[...inputList];
  temp[index][name]=value;
  setInputList(temp);
 }

const handleSelect = (event,li) => {
  let t = [...list];
  let index = t.indexOf(li);
  setSelects(selects)
  setSelects(event.target.value);
  let ind = statuses.indexOf(event.target.value);
  let scode = codes[ind];
  let temp = [...list]
  temp[index]["isStatus"] = scode;
}

  const handleSubmit=()=>{ 
    setList([...list,...inputList]);
    setUsersData([...usersData,...inputList])
    setInputList([]);
  }

  const Accepted=() =>{
      SetUsers(true); 
      let temp = [...usersData]
      let filtered = temp.filter((item) => item.isStatus === 'AC');
      setList(filtered);
                                                                             
  }
  const Pending=() =>{
    SetUsers(true); 
    let temp = [...usersData]
    let filtered = temp.filter((item) => item.isStatus === 'PD');
    setList(filtered);                                                                                   
}
const Rejected=() =>{
  SetUsers(true); 
  let temp = [...usersData]
      let filtered = temp.filter((item) => item.isStatus==='RJ');
      setList(filtered);                                                                                   
}
const handleAllUsers=() =>{
  SetUsers(true); 
  let temp = [...usersData]
   setList(temp)                                                                               
}
  
  

  const handleView = (index) => {
    setview(!view);
    let v = [...list];
    if(!view)
    v[index].isViewable = index;
    else v[index].isViewable = -1;
    setList([...v]);
}
const handleCheck = (index) => {
  let temp = [...list]
  temp[index]["isEditable"] = !temp[index]["isEditable"];
  if(temp[index]["isEditable"]){
      temp[index]["isIndex"] = index;
  }
  else {
     delete temp[index]["isIndex"] ;
  }
  setList(temp);
  
}

const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
     userName: editFormData.userName,
    passWord:editFormData.passWord
    };

    const newContacts = [...list];

    const index = list.findIndex((contact) => list.id === editContactId);

    newContacts[index] = editedContact;

    setList(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, list) => {
    event.preventDefault();
    setEditContactId(list);

    const formValues = {
      userName: list.userName,
    
     passWord: list.passWord
    
    };
    
      setEditFormData(formValues);
    

  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

 

// const handleEdit = () => {
//   setIsEditableBtn(!isEditableBtn);
//   let temp = [...list]
//   let filtered = temp.filter((item) => item.isEditable );
//   setEditPage(filtered);
//   console.log('edit page: ',filtered)
// }
  
  const handleRemove = (index) => {
    console.log(inputList);
    const temp = [...inputList];
    temp.splice(index, 1);

    setInputList([...temp]);
  };

  const handleDeleteClick = (index) => {
    const arr = [...list];
    arr.splice(index, 1);
    setList([...arr  ]);
    console.log(arr);
  };

  

  const handleReset = (index) => {
    const list = [...inputList];
    list[index].userName = '';
    list[index].passWord= '';
   setInputList(list);
  };

  const handleResetAll=()=>{
    for(let i = 0;i<inputList.length;i++){
      inputList[i].userName = '';
      inputList[i].passWord = '';
    }
    setInputList([...inputList]);
  }

 

  return (
    <>
    

     <> { <> <Button  variant="contained" color="success" onClick={()=>handleAdd()}>Add</Button> &nbsp;&nbsp;</>}<br></br><br></br><br></br>&nbsp;&nbsp;
    <>  {list.length > 0 ? (<><Button variant="contained" color="primary" onClick={handleAllUsers}>All users</Button>&nbsp;&nbsp;
                 <Button variant="contained" onClick={Accepted} color="primary" >Accepted</Button>&nbsp;&nbsp;
                 <Button variant="contained"  onClick={Pending}  color="primary">Pennding</Button>&nbsp;&nbsp;
                 <Button variant="contained"   onClick={Rejected} color="primary" >Rejected</Button></>):''} </> 
      </>
      <>
      {inputList.length > 0 ? (<>
      {inputList.map(( a,ind) => { 
        return (
          
            <Form onSubmit={handleSubmit} >
            <Box style={{margin:'20px'}}>
            <TextField type="text"  style={{ marginRight:30  }}   required ="required"  name="userName" placeholder="userName" value={a.userName} onChange={(e) => {handleInputChange(e,ind)}} />&nbsp;&nbsp;
            < TextField type="passWord"   style={{ marginRight:30  }} required ="required"  name="passWord" placeholder="passWord" value={a.passWord}  onChange={(e) => {handleInputChange(e,ind)}} />  &nbsp;&nbsp;&nbsp;&nbsp;          
          
            <Button variant="contained" color="error" style={{marginRight:"25px"}} onClick={() => handleRemove(ind)} >Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary" onClick={() => handleReset(ind)}>Reset</Button> 
            </Box>
            {/* <Button variant="contained" color="primary" input type="reset" >Reset!</Button> */}
          
              </Form>
        );
      })}
        
      <div > 
      <div><br></br>
					{disable ?  (
					<Button disabled align="right"  variant="contained"  color="primary"  onClick={handleSubmit}>submit</Button>) : (
					<Button align="right"  variant="contained"  color="primary"  onClick={handleSubmit}>submit</Button>
					)}&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;
				
            {/* <Button  variant="contained"  color="primary" onClick={handleSubmit}>submit</Button > */}
            <Button variant="contained" color="secondary"  onClick={handleResetAll}>Reset all</Button> 
           
            </div>
      </div>   </>) :''}
    
      {((list.length > 0 && inputList.length === 0 )|| Users )?
    <form onSubmit={handleEditFormSubmit}>
      <TableContainer component={Paper}>&nbsp;&nbsp;&nbsp;&nbsp;
        <Container>
       
            <Table   aria-label="simple table"> 
          <TableHead>
           <TableRow style={{"marginTop":"30px","textAlign":"centre",padding:"20px" }}>
           <TableCell style={{fontSize:'23px',padding:"10px"  }}  align="centre" >Select</TableCell>
           <TableCell style={{fontSize:'23px',padding:"10px" }} align="centre"   >User Name</TableCell>
            <TableCell style={{fontSize:'23px',padding:"10px"    }}align="centre">Pass Word</TableCell>
            
              </TableRow>
          </TableHead>
          <TableBody> 
        
            { list.map((a,ind) => {
              let index =codes.indexOf(a.isStatus)
              let Selectedvalue =  statuses[index]
                   
            return(
             <TableRow  style={{marginTop:'3%',alignContent:"center" ,}}  >
              
               <TableCell><Checkbox checked={list.isEditable } onChange={() => handleCheck(ind)}/></TableCell>
              
              <TableCell style={{margin:'20px',color: a.isStatus === 'RJ' ? 'red' : (a.isStatus === 'PD' ? 'orange' : (a.isStatus === 'AC' ? 'green' : '')) }} align="centre">{a.userName} </TableCell>
              {view && a.isViewable === ind ? <TableCell>{a.passWord}</TableCell> : <TableCell >*******</TableCell>}
            <TableCell >{ !(a.isViewable === ind) ? <Button variant="contained" color="primary"  startIcon={<Visibility/>} onClick={() => handleView(ind)}>View</Button>:<Button variant="contained" color="primary" startIcon={<VisibilityOff/>} onClick={() => handleView(ind)} >Hide</Button>}&nbsp;&nbsp;&nbsp;&nbsp;
            
             <Button variant="contained" color="error"  onClick={() => handleDeleteClick(ind)}>Delete</Button></TableCell>
               <TableCell><Select style={{marginTop:'3%',alignContent:"center" ,}} value={Selectedvalue } onChange={(e) => handleSelect(e,a)}>
               
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select></TableCell>
             
            </TableRow> )}
                     
            )}
          </TableBody>  
          {/* <Button type="button"  variant="contained" color="primary" onClick={(event) => handleEditClick(event, list)> Edit </Button> */}
          <TableRow><Button variant="contained" onClick={handleEditClick}>Edit</Button></TableRow> 
      
          {
            list.map((list) => {
                if(editContactId === list){
                      <EditableRow
                    handleEditClick={handleEditClick}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                   
                }
            })
          }

         
          </Table>   
        </Container>
      
        </TableContainer> 
        </form>: '' }
       
        {/* {
                isEditableBtn ? 
                
                <Modal open={true} ><Box style={{marginTop:'3%',margin:"25%",padding:'20px',width:"650Px",height:"25%",alignContent:"center" ,backgroundColor:"white"}}><AddEdit Editlist={editPage} setIsEditableBtn={setIsEditableBtn} list={list} setList={setList} validator={validator} /></Box></Modal>
                 : ''
            } */}
      </> 
    </>
    
  );
    }
export default  Add;