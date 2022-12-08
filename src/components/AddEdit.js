import * as React from 'react';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProductTable from './ProductTable';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useSearchParams, useNavigate } from "react-router-dom";

import{getOrderById, getAllProducts, setOrder} from "./../services/OrderService"

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}


const currentDateAsString = () =>{
  return new Date().toISOString().split('T')[0]
}

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

function AddEdit(){
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id")
  // open close modal
  const [open, setOpen] = useState(false);
  // order data
  const [data, setData] = useState({
    "orderNum":"",
    "date":currentDateAsString(),
    "numProducts": 0,
    "finalPrice": 0,
    "productList":[], 
  });
  // product.getAll()
  const [productData, setProductData] = useState([]);
  // handle add/edit form
  const [addedProduct, setAddedProduct] = useState("");
  const [addedProductQty, setAddedProductQty] = useState(0);
  const [entryIdxFocus, setEntryIdxFocus] = useState(-1);
  // get data from API
  useEffect(() => {
    var products = getAllProducts(id);
    if(id){
      var orders = getOrderById(id);
      orders.then((response) => {
          return response.json();
        })
        .then(data => {
          setData(data);
        });
    } 
    products.then((response) => {
      return response.json();
    })
    .then(data => {
      setProductData(data);
    });
  
  }, []);
  
  const forceUpdate = useForceUpdate();

  // fields in add/edit product modal
  const handleProductChange = (event) => setAddedProduct(event.target.value);
  const handleProductQtyChange = (event) => setAddedProductQty(event.target.value);
  const handleProductModalSubmit = () => {
    if(entryIdxFocus<0){
      handleAddProduct();
    } else{
      handleEditProductEntry();
    }
  };
  const handleAddProduct = () => {
    let newOrderData = data;
    let newProductEntry = productData.find(({ id }) => id === addedProduct);
    newProductEntry.quantity = Number(addedProductQty);
    newOrderData.numProducts = data.numProducts + newProductEntry.quantity;
    newOrderData.finalPrice = data.finalPrice + newProductEntry.quantity*newProductEntry.price;
    newOrderData.productList.push(newProductEntry);
    console.log(newOrderData);
    setData(newOrderData);
    handleClose();
  };
  const handleEditProductEntry = () => {
    let newOrderData = data;
    let newProductEntry = productData.find(({ id }) => id === addedProduct);
    newProductEntry.quantity = Number(addedProductQty);
    newOrderData.productList[entryIdxFocus] = newProductEntry
    newOrderData.numProducts = newOrderData.productList.reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0);
    
    newOrderData.finalPrice = newOrderData.productList.reduce((accumulator, object) => {
      return accumulator + object.quantity * object.price;
    }, 0);
    setData(newOrderData);
    handleClose();
  };
  const handleDeleteProductEntry = () => {
    console.log(0);
    let newOrderData = data;
    console.log(data);
    newOrderData.productList.splice(0, 1); 
    newOrderData.numProducts = newOrderData.productList.reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0);
    newOrderData.finalPrice = newOrderData.productList.reduce((accumulator, object) => {
      return accumulator + object.quantity * object.price;
    }, 0);

    setData(newOrderData);
    forceUpdate();
  };
  const handleOpenAdd = () => {
    setAddedProduct("")
    setAddedProductQty(0)
    setEntryIdxFocus(-1)
    setOpen(true);
  }
  const handleOpenEdit = (entryIdxtoEdit) => {
    setAddedProduct(data.productList[entryIdxtoEdit].id)
    setAddedProductQty(data.productList[entryIdxtoEdit].quantity)
    setEntryIdxFocus(entryIdxtoEdit)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  

  const handleSaveOrder = () => {
    let saveOrderRequest = setOrder(data);
    saveOrderRequest.then((response) => {
      console.log(response.status)
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
    navigate("/");
  };

  return(
    <div>
      
      <Typography variant="h2" gutterBottom>
        {id ? 'Edit' : 'Add'}
      </Typography>
      
      <TextField
        disabled
        label="Order#"
        value={data.orderNum}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        disabled
        label="Date"
        value={data.date}
        type="date"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        disabled
        label="#Products"
        value={data.numProducts}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        disabled
        label="Final price"
        value={data.finalPrice}
        InputProps={{
          readOnly: true,
        }}
      />
      <br/>
      <Button onClick={handleOpenAdd} variant="contained">
        Add New Product
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Producto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Producto"
              value={addedProduct}
              onChange={handleProductChange}
            >
              {productData.map((row) => (
                <MenuItem value={row.id} key={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Quantity"
              type="number"
              value={addedProductQty}
              onChange={handleProductQtyChange}
            />
            <Button onClick={handleProductModalSubmit} variant="contained">
              Confirm/Save
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <br/>
      <ProductTable data={data.productList} handleOpenEdit={handleOpenEdit} handleDeleteProductEntry={handleDeleteProductEntry}/>
      <br/>
      <Button onClick={handleSaveOrder} variant="contained">
        Save Order
      </Button>
    </div>
  );
}

export default AddEdit;