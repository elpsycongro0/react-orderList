import * as React from 'react';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function OrderTable(props) {
  const [open, setOpen] = useState(false);
  const [focusOrderId, setFocusOrderId] = useState("");
  
  
  const hadleEditOder = (reg) => {
    props.navigate("/add_edit/?id="+reg.id);
  };
  const handleOpen = (id) => {
    setFocusOrderId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    console.log(focusOrderId);
    let deleteOrderRequest = props.deleteOrder(focusOrderId);
    deleteOrderRequest.then((response) => {
      console.log(response.status)
      return response.json();
    })
    .then(responseData => {
      console.log(responseData);
      window.location.reload(false);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Order#</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>#Products</TableCell>
            <TableCell>Final Price</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.orderNum}</TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >{row.numProducts}</TableCell>
              <TableCell >{row.finalPrice}</TableCell>
              <TableCell >
              <Button variant="contained" onClick={()=>hadleEditOder(row)} >Edit</Button>{" "}
              <Button variant="contained" onClick={()=>handleOpen(row.id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              DELETE ORDER?
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
            </FormControl>
          </Box>
        </Modal>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
