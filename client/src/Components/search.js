import React, { useState } from "react";
import Axios from 'axios';
import './search.css';

function SearchPost() {
  const [postId, setPostId] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [groupLimit, setGroupLimit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [productName, setProductName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [searchPostList, setSearchPostList] = useState([]);


  const searchPost = async () => {
    const response = await Axios.post("http://localhost:3001/post/search/?s=" + productName, {
      postId: postId,
      expirationDate: expirationDate,
      groupLimit: groupLimit,
      paymentMethod: paymentMethod,
      productName: productName,
      storeName: storeName,
      price: price,
      link: link
    });
    setSearchPostList(response.data)

    if (response.data.length === 0) {
      alert("No results!");
      window.location.reload();
    }
  };

  return (
    <div className="SearchPost">
      <br></br>
      <div class="search-wrap">
        <input placeholder="Search product name"
          type="text"
          name="s"
          onChange={(e) => {
            setProductName(e.target.value)
          }}
        />
        <button onClick={searchPost}>Search</button>
      </div>

      <div className="PostListSearch">

        <div class="card-container">
          {searchPostList.map((val) => {
            console.log(val)
            return (
              <div className="card2">
                <h5>Product name: {val.productName}</h5>
                <h5>Store Name: {val.storeName}</h5>
                <h5>Price: {val.price}</h5>
                <h5>Link: <a href={`/Components/Post/${val.postId}`} target="_blank" rel="noopener noreferrer"> Click me!</a></h5>
                <h5>Payment Method: {val.paymentMethod}</h5>
                <h5>Group Limit: {val.groupLimit}</h5>
                <h5>Expiration Date: {val.expirationDate}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}


export default SearchPost;
