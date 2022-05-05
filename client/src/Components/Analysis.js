import React, { useState } from "react";
import Axios from 'axios';
import './search.css';

function Analysis() {
  const [searchPostList1, setSearchPostList1] = useState([]);
  const [searchPostList2, setSearchPostList2] = useState([]);
  const [userName, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [numOfPost, setnumOfPost] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [NumberOfPost, setNumberOfPost] = useState("");

  const AdvSearch1 = async () => {
    const response = await Axios.post("http://localhost:3001/post/advsearch1", {
      userId: userId,
      userName: userName,
      numOfPost: numOfPost
    });
    setSearchPostList1(response.data)
    document.getElementById('adv1').style.visibility = 'visible';
    document.getElementById('adv2').style.visibility = 'hidden';
    setSearchPostList2([])
  };

  const AdvSearch2 = async () => {
    const response = await Axios.post("http://localhost:3001/post/advsearch2", {
      categoryId: categoryId,
      categoryName: categoryName,
      NumberOfPost: NumberOfPost
    });
    setSearchPostList2(response.data)
    document.getElementById('adv2').style.visibility = 'visible';
    document.getElementById('adv1').style.visibility = 'hidden';
    setSearchPostList1([])
  };

  return (
    <div className="Analysis">
      <div>
        <h1>Top 15 users with most amount of Posts: </h1>
        <button onClick={AdvSearch1}>Search</button>
      </div>

      <div>
        <h1>Number of posts in Meat category with userID greater than 800 and Bakery category with userID less than 200 : </h1>
        <button onClick={AdvSearch2}>Search</button>
      </div>

      <div className="PostListSearch" id="adv1">
        <div class="card-container">
          {searchPostList1.map((val) => {
            return (

              <div className="card">
                <h1>User ID: {val.userId}</h1>
                <h1>User name: {val.userName}</h1>
                <h1>Number of Post: {val.numOfPost}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="PostListAdv1" id='adv2'>
        <div class="card-container">
          {searchPostList2.map((val) => {
            return (
              <div className="card">
                <h1>categoryId: {val.categoryId}</h1>
                <h1>categoryName: {val.categoryName}</h1>
                <h1>NumberOfPost: {val.NumberOfPost}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}


export default Analysis;
