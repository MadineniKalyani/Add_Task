import React from "react";
import {Button,TextField} from '@mui/material';


const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    
    <tr>
      <td>
        <TextField type="text" required="required"  name="FirstName" value={editFormData.userName} onChange={handleEditFormChange} variant="outlined"/>
      </td>
      <td>
        <TextField type="text" required="required"  name="LastName" value={editFormData.passWord} onChange={handleEditFormChange} variant="outlined" />
      </td>
      
      <td>
        <Button type="submit"  variant="contained" color="primary">Save</Button>
        <Button type="button"  variant="contained" color="primary" onClick={handleCancelClick}> Cancel</Button>
      </td>
    </tr>
   
  );
};

export default EditableRow;