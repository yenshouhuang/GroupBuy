import React, { useState } from 'react';
import Insert from './Insert';
import SearchPost from './Components/search'
import Info from './Components/Info';
import Update from './Components/Update'
import Analysis from './Components/Analysis';
import Navbar from './Components/Navbar';
import Header from "./Header";
import Home from "./Components/Page/Home"
import UserAnalysis from "./Components/UserAnalysis"
import "./App.css";
import Post from './Components/Post';
import Login from './Components/Login/Login';
import useToken from './useToken';

import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';


function App() {
	const { token, setToken } = useToken();

	if (!token) {
		return <Login setToken={setToken} />
	}
	return (
		<Router>
			<div class="page-container">
				<div class="content-wrap">
					<Header />
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/Insert' element={<Insert />} />
						<Route exact path='/Components/Post/:id' element={<Post />} />
						<Route path='/Components/search' element={<SearchPost />} />
						<Route path='/Components/Info' element={<Info />} />
						<Route path='/Components/Update' element={<Update />} />
						<Route path='/Components/Analysis' element={<Analysis />} />
						<Route path='/Components/UserAnalysis' element={<UserAnalysis />} />
					</Routes>

				</div>
			</div>
			<footer>
				<div class="footer">
					<br></br>
					<br></br>
					<p>Author: <a href='https://www.linkedin.com/in/shwu02/' target="_blank" rel="noopener noreferrer">Ken Wu</a>,
						<a href='https://www.linkedin.com/in/jui-ting-ray-chang/' target="_blank" rel="noopener noreferrer">Ray Chang</a>,
						<a href='https://www.linkedin.com/in/thomas-yenshuo-huang/' target="_blank" rel="noopener noreferrer">Thomas Huang</a>,
						<a href='https://www.linkedin.com/in/meg-chia-chien-wu/' target="_blank" rel="noopener noreferrer">Meg Wu</a></p>
					<p><a href="https://illinois.edu/" target="_blank" rel="noopener noreferrer">University of Illinois Urbana-Champaign</a></p>
				</div>
			</footer>
		</Router>
	);
}

export default App;
