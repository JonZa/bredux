import React, { Component } from 'react';

class BrekkieSVG extends Component {
	render() {
		console.log('BrekkieSVG render')
		return (
			<div className="box">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" shapeRendering="geometricPrecision" strokeLinejoin="round">
					<g>
						<path className="bun-top" stroke="#974" strokeWidth="4" fill="#fd8" d="m70,70l140,0c2.761,0 5,2.238 5,5l0,35l-150,0l0,-35c0,-2.762 2.2386,-5 5,-5z"/>
						<polygon className="egg" points="65 120 215 120 215 135 65 135" stroke="#db9" strokeWidth="4" fill="#ffe"/>
						<polygon className="egg" points="110 119 170 119 170 126 110 126" stroke="#fc0" strokeWidth="4" fill="#fc0"/>
						<path className="bacon" strokeWidth="4" stroke="#c74343" fill="#f78f8f" d="m215,159.25l0,-11.01657c-18.74905,0 -18.74905,-3.98342 -37.49844,-3.98342c-18.74971,0 -18.74971,3.98342 -37.49942,3.98342c-18.7507,0 -18.7507,-3.98342 -37.50107,-3.98342c-18.7507,0 -18.75037,3.98342 -37.50107,3.98342l0,11.01657c8.5998,0 12.79552,-0.89123 17.23718,-1.83497c4.9721,-1.05636 10.11332,-2.14845 20.26422,-2.14845c10.15057,0 15.29212,1.09231 20.26422,2.14845c4.44166,0.94374 8.63705,1.83497 17.23718,1.83497c8.59947,0 12.79486,-0.89123 17.23619,-1.83497c4.97177,-1.05636 10.11299,-2.14845 20.26323,-2.14845c10.14992,0 15.29114,1.09231 20.26291,2.14845c4.44066,0.94352 8.63573,1.83497 17.23487,1.83497z" />
						<polygon className="bun-bottom" points="65 170 215 170 215 210 65 210" stroke="#974" strokeWidth="4" fill="#fd8"/>
						<circle className="sesame" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="120"/>
						<circle className="sesame" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="140"/>
						<circle className="sesame" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="160"/>
					</g>
				</svg>
				<div className="loading">{ this.props.loaded } of { this.props.total } loaded</div>
			</div>
		);
	}
}

export default BrekkieSVG;