import {Box,TextField,Button} from '@mui/material';
import { useState,useEffect } from 'react';

function AddEdit({Editlist,setIsEditableBtn,list,setList,validator}) {
   
    const [items,setItems] = useState(Editlist); 
    const [nameError,setNameError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [disable,setDisable] = useState(true);
    const handleEditChange = (event,index) => {
        console.log(index);
        let temp = [...items];
        const {name,value} = event.target;
        temp[index][name] = value;
        setItems(temp)
    }
    const handleEditSave = () => {
        items.forEach((item) => {
            list[item.isIndex] = item;
            delete list.isIndex;
        })
        setList([...list]);
        setIsEditableBtn(false); 
    }
    const handleEditCancel = () => {
        setIsEditableBtn(false);
    }
    useEffect(() => {
        let count = 0;
        items.forEach((item) => {
        if(item.userName.length <3)
            setNameError('username must have atleast 3 characters');
        else if(item.passWord.length < 8)
            setPasswordError('password must have atleast 8 characters');
        else if(item.passWord.length > 12)
            setPasswordError('password should not exceed 12 characters');
        else  count += 1;
        });
        if(count === items.length)
            setDisable(false);
        else setDisable(true);
    },[items]);
    return(
       <> 
       {items.map((item,index) => 
        <>
            <Box id="modal-description" key={index} style={{margin:'20px'}}>
                <TextField style={{marginRight:'20px'}} name="userName" type="text" value={item.userName} onChange={(event) => handleEditChange(event,index)} label="UserName" helperText={item.isUserName ? 'enter a valid username' : ( item.isNameError ? nameError : '')}/>
                <TextField style={{marginRight:'20px'}} name="passWord" type="text" value={item.passWord} onChange={(event) => handleEditChange(event,index)} label="PassWord" helperText={item.isPassWord ? 'enter a valid password' : ( item.isPasswordError ? passwordError : '')}/>
            </Box>
        </>
        )}
        <Button style={{marginRight:'20px',marginTop:'10px'}} disabled={disable} onClick={handleEditSave} variant="contained"  color="success">Save</Button>
        <Button style={{marginTop:'10px'}} onClick={handleEditCancel}   color="secondary" variant="contained">Cancel</Button>
        </>
    )
}

export default AddEdit;