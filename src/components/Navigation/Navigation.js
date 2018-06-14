import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

		if (isSignedIn) {
			return (
				<nav className='tr'>
					<p onClick={() => onRouteChange('signout')} className='fw6 black f3 link dim pa3 pointer pr4'> Sign Out</p>
				</nav>
			);
		} else {
			return (
				<nav className='flex justify-end'>
					<p onClick={() => onRouteChange('signin')} className='fw6 f3 link dim black pa3 pointer'> Sign In </p>
					<p onClick={() => onRouteChange('register')} className='fw6 f3 link dim black pa3 pointer pr4'> Register </p>
				</nav>
			);
		}
}

export default Navigation
