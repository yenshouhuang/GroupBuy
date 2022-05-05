import React, { useState } from "react";
import Axios from 'axios';
import './info.css';

function Info() {
  	const [userId, setUserId] = useState("");
  	const [userName, setUserName] = useState("");
  	const [postId, setPostId] = useState("");
  	const [expirationDate, setExpirationDate] = useState("");
  	const [groupLimit, setGroupLimit] = useState("");
  	const [paymentMethod, setPaymentMethod] = useState("");
  	const [productName, setProductName] = useState("");
  	const [storeName, setStoreName] = useState("");
  	const [price, setPrice] = useState("");
  	const [link, setLink] = useState("");
  	const [userInfo, setUserInfo] = useState([]);


  	const searchUser = async () => {
    	const response = await Axios.post("http://localhost:3001/post/search-user/?s=" + userName, {
			userId: userId,
			userName: userName,
    		postId: postId,
    		expirationDate: expirationDate,
    		groupLimit: groupLimit,
    		paymentMethod: paymentMethod,
    		productName: productName,
    		storeName: storeName,
    		price: price,
    		link: link
    	});
    	setUserInfo(response.data)

    	if (response.data.length === 0) {
      		alert("No results!");
      		window.location.reload();
    	}
  	};

	const deletePost = (id) => {
    	Axios.delete(`http://localhost:3001/post/delete/${id}`);
    	window.location.reload();
  	};

  	return (
    <div className="Info">
      	<br></br>
		<div class="search-wrap">
			<input placeholder="Search user name"
        		type="text"
        		name="s"
        		onChange={(e) => {
        	  	setUserName(e.target.value)
        		}}
      		/>
			<button onClick={searchUser}>Search</button>
		</div>


      	<div className="UserInfoSearch">
        	<div class="card-container">
          	{userInfo.map((val) => {
            	return (
              		<div className="card">
			    	<h5>User ID: {val.userId}</h5>
			    	<h5>User name: {val.userName}</h5>
					<h5>Post ID: {val.postId}</h5>
                	<h5>Product name: {val.productName}</h5>
                	<h5>Store Name: {val.storeName}</h5>
                	<h5>Price: {val.price}</h5>
                	<h5>Link: <a href={val.link} target="_blank" rel="noopener noreferrer"> Click me!</a></h5>
                	<h5>Payment Method: {val.paymentMethod}</h5>
                	<h5>Group Limit: {val.groupLimit}</h5>
                	<h5>Expiration Date: {val.expirationDate}</h5>
                	<button onClick={() => {deletePost(val.postId)}}>Delete</button>
              		</div>
            	);
          	})}
        	</div>
      	</div>
    </div>
  )
}

export default Info;
