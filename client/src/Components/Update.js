import React, { useState } from 'react';
import Axios from 'axios';
import './Update.css';

function Update() {
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [groupLimit, setGroupLimit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const updatePost = () => {
    Axios.post('http://localhost:3001/post/update', {
      postId: postId,
      userId: userId,
      expirationDate: expirationDate,
      groupLimit: groupLimit,
      paymentMethod: paymentMethod
    });

    // if (response.data.length === 0) {
    //   alert("No posts to edit!");
    // }

    window.location.reload();
  };

    return (
      <div className="Update">
        <h1>Update Information</h1>

        {/* <h1>Posts</h1> */}
        <div className="form">
          {/* post id */}
          <label>Post Id:</label>
          <input
          type = "text"
          name = "postId"
          onChange={(e) => {
            setPostId(e.target.value);
          }}
          />

          {/* User ID */}
          <label>User Id:</label>
          <input
          type = "text"
          name = "userId"
          onChange={(e) => {
            setUserId(e.target.value)
          }}
          />

          {/* Expiration Date */}
          <label>Expiration Date:</label>
          <input
          type = "text"
          name = "expirationDate"
          onChange={(e) => {
            setExpirationDate(e.target.value)
          }}
          />

          {/* Group Limit */}
          <label>Group Limit:</label>
          <input
          type = "text"
          name = "groupLimit"
          onChange={(e) => {
            setGroupLimit(e.target.value)
          }}
          />

          {/* Pay Method */}
          <label>Payment Method:</label>
          <input
          type = "text"
          name = "paymentMethod"
          onChange={(e) => {
            setPaymentMethod(e.target.value)
          }}
          />

          <button onClick={updatePost}>Update</button>
        </div>
      </div>
    );
  }

export default Update;
