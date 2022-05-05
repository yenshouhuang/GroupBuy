import React, { useState} from 'react';
import './Insert.css';
import Axios from 'axios';


function Insert() {
  const [userId, setUserId] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [groupLimit, setGroupLimit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const submitPost = () => {
    Axios.post('http://localhost:3001/post/insert', {
      userId: userId,
      expirationDate: expirationDate,
      groupLimit: groupLimit,
      paymentMethod: paymentMethod,
      categoryId: categoryId,
      productName: productName,
      storeName: storeName,
      price: price,
      link: link
    });

    window.location.reload();
  };

    return (
      <div className="Insert">
        <h1>Create Post</h1>

        {/* <h1>Posts</h1> */}
        <div className="form">
          {/* user id */}
          <label>User Id:</label>
          <input
          type = "text"
          name = "userId"
          onChange={(e) => {
            setUserId(e.target.value)
          }}
          />

          {/* expirationDate */}
          <label>Expiration Date:</label>
          <input
          type = "text"
          name = "expirationDate"
          onChange={(e) => {
            setExpirationDate(e.target.value)
          }}
          />

          {/* groupLimit */}
          <label>Group Limit:</label>
          <input
          type = "number"
          name = "groupLimit"
          onChange={(e) => {
            setGroupLimit(e.target.value)
          }}
          />

          {/* Payment Method */}
          <label>Payment Method:</label>
          <input
          type = "text"
          name = "paymentMethod"
          onChange={(e) => {
            setPaymentMethod(e.target.value)
          }}
          />
          <label>Category Id:</label>
          <label>1.Drink 2.Meat 3.Grocery 4.Seafood</label>
          <label>5.Fruit 6.Snack 7.Vegetable 8.Bakery</label>
          <input
          type = "number"
          name = "categoryId"
          min = "1"
          max = "8"
          onChange={(e) => {
            setCategoryId(e.target.value)
          }}
          />

          {/* Product Name */}
          <label>Product Name:</label>
          <input
          type = "text"
          name = "productName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          />

          {/* store name */}
          <label>Store Name:</label>
          <input
          type = "text"
          name = "storeName"
          onChange={(e) => {
            setStoreName(e.target.value);
          }}
          />

          {/* price */}
          <label>Price:</label>
          <input
          type = "number"
          name = "price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          />

          {/* link */}
          <label>Link:</label>
          <input
          type = "text"
          name = "link"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          />

          <button onClick={submitPost}>Submit</button>
          <br></br>
          <br></br>
        </div>
      </div>
    );
}

export default Insert;
