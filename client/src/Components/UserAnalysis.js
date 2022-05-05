import React, { useState } from "react";
import Axios from 'axios';
import './UserAnalysisStyle.css';

function UserAnalysis() {
	const [analysisList, setList] = useState([]);
	const [userId, setUserId] = useState("");
	const [MostFreCategory, setMostFreCategory] = useState("");
	const [userEngagement, setuserEngagement] = useState("");

	const UserAnalysisResult = async () => {
		const response = await Axios.get("http://localhost:3001/get/advsearch3", {
			userId: userId,
			MostFreCategory: MostFreCategory,
			userEngagement: userEngagement
		});
		var res = response.data
		setList(res[0])
		console.log(analysisList[0])
	};

	return (
		<div className="UserAnalysis">
			<div>
				<h1>User Analysis: </h1>
				<button onClick={UserAnalysisResult}>Analyze</button>
			</div>

			<div className="UserListSearch">
				<div class="card-container">
					{analysisList.map((val) => {
						return (
							<div className="card4">
								<h3>User ID: {val.userId}</h3>
								<h3>Most Frequent Category: {val.MostFreCategory}</h3>
								<h3>User Engagement: {val.userEngagement}</h3>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	)
}


export default UserAnalysis;
