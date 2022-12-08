import * as React from 'react';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OrderTable from './OrderTable';
import {useNavigate} from "react-router-dom"
import{getAllOrders, deleteOrder} from "./../services/OrderService"

function MyOrders() {

  const [data, setData] = useState([]);

  useEffect(() => {
    var orders = getAllOrders();
    orders.then((response) => {
        return response.json();
      })
      .then(data => {
        setData(data);
      });

  }, []);

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/add_edit");
  };
  
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        My Orders
      </Typography>
      <Button onClick={handleClick} variant="contained">
        New Order
      </Button>
      <OrderTable data={data} navigate={navigate} deleteOrder={deleteOrder}/>
      
    </div>
  );
}

export default MyOrders;
