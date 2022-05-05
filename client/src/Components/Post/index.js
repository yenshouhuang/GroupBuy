import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './Post.css';
import { useParams } from "react-router-dom";
import useToken from '../../useToken';

const PostComponent = (props) => {
  //post ID
  const {id} = useParams()
  const { token, setToken } = useToken();

  //Post State
  const [state,setState] = useState({

    })
    console.log(state)
    useEffect(()=> {
      if (id)
      Axios.get("http://localhost:3001/post/" + id, {
    }).then((response)=>{
      setState(response.data?.[0])
    }).catch((err)=>{
      console.error(err)
    })
    },[id])

  //Group State
  const [groupState, setGroupState] = useState([])
  console.log(groupState)

  useEffect(()=> {
      if (id)
      Axios.get("http://localhost:3001/post/group/" + id, {
    }).then((response)=>{
      console.log({response})
      setGroupState(response.data?response.data:[])
    }).catch((err)=>{
      console.error(err)
    })
    },[id])

  const var_item = groupState?.map((item,index)=> {
    return (
      <li key={index}> {item.userName} </li>
      )
    })
    console.log(var_item)

 // Join function
 const join = () => {
  console.log(token)
  console.log('----------------------')
  Axios.post("http://localhost:3001/post/join/", {userId: token.split(" ")[1], postId:id
  }).then((response)=>{
    console.log({response})
    if (typeof window==="undefine") return
        window.location= "/Components/Post/" + id
  }).catch((err)=>{
    console.error(err)
  })
 }


 //Leave Function
  // "http://localhost:3001/post/join/?postId=" + id + '&userId=' + token.split(" ")[1]
  const leave = () => {
    console.log(id, token)
    Axios.delete(`http://localhost:3001/post/leave/${id}/${token.split(" ")[1]}`).then((response)=>{
      console.log({response})
      if (typeof window==="undefine") return
          window.location= "/Components/Post/" + id
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className="card3">
      <h1>{`${state.storeName} ${state.productName}`}</h1>
        <div>
          <h3>Initiator: {state.userName}</h3>
          <h3>Phone Number: {state.phoneNumber}</h3>
          <h3>Price: {state.price}</h3>
          <h3>Payment:{state.paymentMethod} </h3>
          <h3>Group Limit: {state.groupLimit} </h3>
          <h3>Link: <a href={state.link} target="_blank" rel="noopener noreferrer"> Click me!</a></h3>
        </div>
        <div>
          <h3>Current Group Member</h3>
          <ol>
            {groupState?.length ? var_item : null }
          </ol>
        </div>
        <div>
          <h3>Average Price: </h3>
          <h5> ${(state.price/groupState?.length).toFixed(2)} / person</h5>
        </div>
        <div>
          <button onClick = {join} >Join Group</button>
          <button onClick = {leave}>Leave Group</button>
        </div>
      </div>
  )
}


export default PostComponent;
