import React from "react";
import useToken from '../../useToken';
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";
import "./nav.css";


function logout() {
	window.localStorage.clear();
	window.location.reload();
}

const Navbar = () => {
	const { token, setToken } = useToken();

	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
					<NavLink to="/Insert" activeStyle>
						Post
					</NavLink>
					<NavLink to='/Components/search' activeStyle>
						Search
					</NavLink>
					<NavLink to="/Components/Info" activeStyle>
						Personal Info
					</NavLink>
					<NavLink to="/Components/Update" activeStyle>
						Edit
					</NavLink>
					<NavLink to="/Components/Analysis" activeStyle>
						Analysis
					</NavLink>
					<NavLink to="/Components/UserAnalysis" activeStyle>
						User Analysis
					</NavLink>

					<div class='userid'>
						User ID: {token.split(" ")[1]}
					</div>


					<button class='btn3' onClick={logout}>Logout</button>




				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
