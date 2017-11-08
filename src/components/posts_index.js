import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LazyLoad from 'vanilla-lazyload';
import { fetchPosts, sortPosts } from '../actions';

const myLazyLoad = new LazyLoad({
	data_srcset: 'src',
	class_loading: 'lazy-loading'
});

class PostsIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalBrekkies: 0,
			sorting: false
		}
	}
	componentDidMount() {
		// console.log('PostsIndex componentDidMount')
		this.props.fetchPosts();
	}
	componentDidUpdate() {
		// console.log('PostsIndex componentDidUpdate')
		if (!this.state.totalBrekkies) {
			this.state.totalBrekkies = this.props.posts[0].caption.text.split(' #')[1].split(' ')[0];
			// this.state.totalBrekkies = 7;
		}
		if (this.state.totalBrekkies > this.props.posts.length) {
			this.props.fetchPosts();
		} else if (!this.state.sorting) {
			this.state.sorting = 'score';
			this.props.sortPosts(this.state.sorting);
			myLazyLoad.update()
		}
		this.wiggle();
	}
	wiggle() {
		console.log('PostsIndex wiggle')
		if (!window.scrollY) {
			window.scrollTo(0, 1);
		}
		window.scrollTo(0, 0);
	}
	renderNav() {
		// console.log('PostsIndex renderNav')
		var sortDivClass = 'rolls-sorting' + (!this.state.sorting ? ' rolls-sorting--loading' : '') 
		var dateLink = (this.state.sorting === 'score' ? <Link className="rolls-sorting__link" to="#" onClick={ this.sortClick.bind(this) }>date</Link> : <span className="rolls-sorting__text">date</span>);
		var scoreLink = (this.state.sorting === 'date' ? <Link className="rolls-sorting__link" to="#" onClick={ this.sortClick.bind(this) }>score</Link> : <span className="rolls-sorting__text">score</span>);
		return(
			<div className={ sortDivClass }>
				sorting:
				{ scoreLink }
				{ dateLink }
			</div>
		);
	}
	renderBrekkie() {
		// console.log('PostsIndex renderBrekkie')
		var loadingText = 'Loading';
		if (this.state.totalBrekkies) {
			loadingText = _.keysIn(this.props.posts).length + ' of ' + this.state.totalBrekkies + ' loaded'
		}
		return (
			<div className="roll">
				<svg className="roll__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" shapeRendering="geometricPrecision" strokeLinejoin="round">
					<g>
						<path className="roll__animation roll__animation--top" stroke="#974" strokeWidth="4" fill="#fd8" d="m70,70l140,0c2.761,0 5,2.238 5,5l0,35l-150,0l0,-35c0,-2.762 2.2386,-5 5,-5z"/>
						<circle className="roll__animation roll__animation--top" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="120"/>
						<circle className="roll__animation roll__animation--top" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="140"/>
						<circle className="roll__animation roll__animation--top" fill="#fe9" strokeWidth="2" stroke="#ec7" r="4" cy="80" cx="160"/>
						<polygon className="roll__animation roll__animation--middle-top" points="65 120 215 120 215 135 65 135" stroke="#db9" strokeWidth="4" fill="#ffe"/>
						<polygon className="roll__animation roll__animation--middle-top" points="110 119 170 119 170 126 110 126" stroke="#fc0" strokeWidth="4" fill="#fc0"/>
						<path className="roll__animation roll__animation--middle-bottom" strokeWidth="4" stroke="#c74343" fill="#f78f8f" d="m215,159.25l0,-11.01657c-18.74905,0 -18.74905,-3.98342 -37.49844,-3.98342c-18.74971,0 -18.74971,3.98342 -37.49942,3.98342c-18.7507,0 -18.7507,-3.98342 -37.50107,-3.98342c-18.7507,0 -18.75037,3.98342 -37.50107,3.98342l0,11.01657c8.5998,0 12.79552,-0.89123 17.23718,-1.83497c4.9721,-1.05636 10.11332,-2.14845 20.26422,-2.14845c10.15057,0 15.29212,1.09231 20.26422,2.14845c4.44166,0.94374 8.63705,1.83497 17.23718,1.83497c8.59947,0 12.79486,-0.89123 17.23619,-1.83497c4.97177,-1.05636 10.11299,-2.14845 20.26323,-2.14845c10.14992,0 15.29114,1.09231 20.26291,2.14845c4.44066,0.94352 8.63573,1.83497 17.23487,1.83497z" />
						<polygon className="roll__animation roll__animation--bottom" points="65 170 215 170 215 210 65 210" stroke="#974" strokeWidth="4" fill="#fd8"/>
					</g>
				</svg>
				<div className="roll__text roll__loading">
					{ loadingText }
				</div>
			</div>
		);
	}
	sortClick(event) {
		this.props.sortPosts(event.currentTarget.textContent);
		this.state.sorting = event.currentTarget.textContent;
	}
	renderPosts() {
		// console.log('PostsIndex renderPosts')
		return _.map(
			this.props.posts,
			post => {
				return (
					<a href={ post.link } target="_blank" className="roll" key={ post.id }>
						<img className="roll__img" src={ post.images.thumbnail.url } data-src={ post.images.low_resolution.url } />
						<div className="roll__score">
							{ post.caption.text.split(' ')[2].split('/')[0] }
						</div>
						<div className="roll__text roll__venue">
							{ post.location.name }
						</div>
					</a>
				)
			}
		)
	}
	render() {
		// console.log('PostsIndex render')
		const isLoading = !this.state.totalBrekkies || this.state.totalBrekkies > _.keysIn(this.props.posts).length;
		return(
			<div>
				{ this.renderNav() }
				<div className="rolls-grid">
					{ (isLoading ? this.renderBrekkie() : '') }
					{ this.renderPosts() }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	// console.log('PostsIndex mapStateToProps')
	return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts, sortPosts })(PostsIndex); 