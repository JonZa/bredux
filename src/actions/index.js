import fetchJsonp from 'fetch-jsonp';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const SORT_POSTS = 'sort_posts';

var IG_FEED = 'https://api.instagram.com/v1/users/30926429/media/recent?access_token=30926429.1677ed0.a057e3c9af9041ee8e24e07cf9cf2aad';

export function fetchPosts() {
	// console.log('actions fetchPosts')
	const request = fetchJsonp(
		IG_FEED
	).then(
		function(data) {
			data.json().then(
				function(json) {
					IG_FEED = json.pagination.next_url;
				}
			);
			return data.json();
		}
	);
	return {
		type: FETCH_POSTS,
		payload: request
	}
}

export function sortPosts(criteria) {
	// console.log('actions sortPosts')
	return {
		type: SORT_POSTS,
		criteria: criteria
	}
}

export function fetchPost(id) {
	// const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
	// return {
	// 	type: FETCH_POST,
	// 	payload: request
	// }
}