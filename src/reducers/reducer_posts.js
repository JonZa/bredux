import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, SORT_POSTS } from '../actions';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_POSTS:
			// console.log('reducer FETCH_POSTS')
			let filtered = _.filter(
				action.payload.data,
				function(el) {
					return el.caption && el.caption.text.indexOf('#brekkieroll') > -1
				}
			);
			return state.concat(filtered);
		case SORT_POSTS:
			// console.log('reducer SORT_POSTS')
			let sorted = _.sortBy(
				state,
				function(el) {
					if (action.criteria === 'date') {
						return Number(el.created_time);
					} else {
						return Number(el.caption.text.split(' ')[2].split('/')[0]);
					}
				}
			);
			return sorted.reverse();
		case FETCH_POST:
			return { ...state, [action.payload.data.id]: action.payload.data }
		default:
			return state;
	}
}