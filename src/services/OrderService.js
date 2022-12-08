export function getAllOrders() {
  try{
    const response = fetch('http://34.95.2.169:8080/order/api/all');
    return response;
  }catch(error) {
    return [];
  }
}

export function getOrderById(id) {
  try{
    const response = fetch('http://34.95.2.169:8080/order/api/find/'+id);
    return response;
  }catch(error) {
    return [];
  }
}

export function setOrder(orderJson) {
  const url = 'http://34.95.2.169:8080/order/api/save/'
  const response = fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(orderJson) // body data type must match "Content-Type" header
  });
  return response;
}

export function deleteOrder(id) {
  try{
    const response = fetch('http://34.95.2.169:8080/order/api/delete/'+id);
    return response;
  }catch(error) {
    return [];
  }
}

export function getAllProducts() {
  try{
    const response = fetch('http://34.95.2.169:8080/product/api/all');
    return response;
  }catch(error) {
    return [];
  }
}