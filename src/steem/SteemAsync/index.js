let steem = require('steem');
const SteemAsync = {

	readPostGeneral(tag, getBy, limit) {
		return new Promise ((resolve, reject) => {
			let response;

			const query = {
				tag: `${tag}`,
				limit: limit
			};

			switch(getBy) {
				case 'Trending':
					steem.api.getDiscussionsByTrending(query, (err, result) => {
						if(err)
							reject(err)
						else
							resolve(result);
					});
					break;
				case 'Created':
					steem.api.getDiscussionsByCreated(query, (err, result) => {
						if(err)
							reject(err)
						else
							resolve(result);
					});
					break;
				case 'Hot':
					steem.api.getDiscussionsByHot(query, (err, result) => {
						if(err)
							reject(err)
						else
							resolve(result);
					});
					break;
				case 'Promoted':
					steem.api.getDiscussionsByPromoted(query, (err, result) => {
						if(err)
							reject(err)
						else
							resolve(result);
					});
					break;
				default:
					return null;
			}
		})
	},

	getDiscussionsByBlog(username, limit) {
		return new Promise((resolve, reject) => {
				const query = {
					"limit":limit,
					"tag": `${username}`
				}
				steem.api.getDiscussionsByBlog(query, (err, result) => {
		  	if(err)
					reject(err)
				else
				{
					resolve(result)
				}
			});
		})
	},

	getFollowCount(username) {
		return new Promise((resolve, reject) => {
			steem.api.getFollowCount(username, (err, result) => {
				if(err)
					reject(err)
				else
					resolve(result)
			});
		});
	},

	getFollowing(username, limit) {
		return new Promise((resolve, reject) => {
			steem.api.getFollowing(username, 'a', 'blog', limit, (err, result) => {
				if(err)
					reject(err)
				else
					resolve(result)
			});
		})
	},

	getFollowers(username, limit) {
		return new Promise((resolve, reject) => {
			steem.api.getFollowers(username, 'a', 'blog', limit, (err, result) => {
				if(err)
					reject(err)
				else
					resolve(result)
			});
		})
	},

	getUserAccount(username) {
		return new Promise((resolve, reject) => {
			steem.api.getAccounts([username], function(err, result) {
  			if(err)
					reject(err)
				else
					resolve(result)
			});
		})
	},

	getPost(author, permlink) {
		return new Promise((resolve, reject) => {
			steem.api.getContent(author, permlink, function(err, result) {
  			if(err)
					reject(err)
				else
					resolve(result)
			});
		})
	}
};

export default SteemAsync;
