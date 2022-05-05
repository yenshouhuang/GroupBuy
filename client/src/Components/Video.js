import React from 'react';
import './VideoStyle.css';
import { Link } from 'react-router-dom';

import video from '../assets/video-2.mp4';

const Video = () => {
	return (
		<div className='hero'>
			<video autoPlay loop muted id='video'>
				<source src={video} type='video/mp4' />
			</video>
			<div className='content'>
				<h1>Group Buy</h1>
				<h3>CS 411</h3>
				<div class='btn'>
					<Link to='/Insert' >CREATE POST</Link>
				</div>
			</div>
		</div>
	)
}

export default Video;
