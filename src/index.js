import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<div className="header">
					<h1 className="header__headline header__headline--hashtag">
						brekkieroll
					</h1>
					<a href="https://github.com/JonZa/bredux" className="header__link header__link--github" target="_blank">
						Source
					</a>
				</div>
				<Switch>
					<Route path="/posts/:id" component={ PostsShow } />
					<Route path="/" component={ PostsIndex } />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('.container')
);
