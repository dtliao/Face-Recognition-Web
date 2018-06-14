import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ imageUrl, boxes }) => {
	

	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
				{
					boxes.map((box, i) => {
						return (
							<div className='bounding-box'
								 key={i}
								 style={{top: boxes[i].topRow, right: boxes[i].rightCol, 
								 		bottom: boxes[i].bottomRow, left: boxes[i].leftCol}}>
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

export default FaceRecognition;