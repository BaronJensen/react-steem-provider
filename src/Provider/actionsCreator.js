import React from 'react';
const uuidv4 = require('uuid/v4');

const actionsCreator = (steem) => {


	const _authUser = steem.auth?steem.auth.name:null;


	const actions = {

		post: (params, advanced = [])=>{



			const {
				permlink = uuidv4(),
				title,
				body,
				category,
				parent_permlink,
				jsonmetadata = {},
			} = params;

		const comment = ['comment',
			{
				parent_author: '',
				parent_permlink: category ? category: parent_permlink,
				author: _authUser,
				permlink,
				title,
				body,
				json_metadata: JSON.stringify(jsonmetadata)
			}
		]

				return new Promise((resolve, reject) => {
				steem.steemConnect.broadcast([
					comment, ...advanced],
	            	(err, res)=>{
	            	if(err)
	            		reject(err)
	            	resolve(res)

	            })
			})
		},
		reply: (params, advanced=[])=>{

			const {
				author, //Author of the post
				post, //Permalink of the parent post
				body,  //body of the post
				jsonmetadata = {}, //jsonmetadata
			} = params;

		const comment = ['comment',
			{
				parent_author: author,
				parent_permlink: post,
				author: _authUser,
				permlink: `${author}-${post}-${uuidv4()}`,
				title:"",
				body,
				json_metadata: JSON.stringify(jsonmetadata)
			}
		]

				return new Promise((resolve, reject) => {
				steem.steemConnect.broadcast([
					comment, ...advanced],
								(err, res)=>{
									console.log([
										comment, ...advanced]);
								if(err)
									reject(err)

								resolve(res)

							})
			})
		},
		remove: (permlink)=>( new Promise((resolve, reject) => {
					steem.steemConnect.broadcast([
					[
						"delete_comment",
						{
						"author": _authUser,
						 permlink
						}
						]
					],
		            	(err, res)=>{
			            	if(err)
			            		reject(err)
			            	resolve(res)

		            })
				}


				)
		),
		me: () => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.me((err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		comment: (parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata) => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, (err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		revokeToken: () => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.revokeToken((err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		reblog: (account, author, permlink) => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.reblog(account, author, permlink, (err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		follow: (following) => {
			return new Promise((resolve, reject) => {
				const follower = _authUser;
				steem.steemConnect.follow(follower, following,(err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		unfollow: (unfollower, unfollowing) => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.unfollow(unfollower, unfollowing,(err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		claimRewardBalance: (account, rewardSteem, rewardSbd, rewardVests) => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests,(err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
		updateUserMetadata: (metadata) => {
			return new Promise((resolve, reject) => {
				steem.steemConnect.updateUserMetadata(metadata, (err, res) => {
				  if(err)
						reject(err)
					else
						resolve(res)
				});
			})
		},
	}

	return actions;
}


export default actionsCreator
