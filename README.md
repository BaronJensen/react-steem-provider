# react-steem-provider

### What is react-steem-provider?
Start quickly a steem project with this flexible library that combines SteemConnect and Steem

### Installing
```bash
$ npm install react-steem-provider
$ yarn add react-steem-provider
 ```

---


### Usage
---
#### SteemConnect Auth

This library implements a context provider to manage the login state and other steemConnect instances.

**Setting up the context provider:**

When the context provider is mounted, checks if there is the callback url with the token from SteemConnect to log in the user.


*Note: The context provider requires the Steem Connect configJSON of your project*


```javascript
import React from 'react';
import SteemProvider from 'react-steem-provider';

//SteemConnect Config JSON
const STEEM_CONFIG = {
        baseURL: 'https://steemconnect.com',
        app: '<appname>', 
        callbackURL: "<callbackURL>", 
        scope: [ 'login', 'vote', 
                'comment', 'delete_comment', 
                'comment_options', 'custom_json'
                ]
        };



const App = ()=>{
  return( 
    <SteemProvider config={STEEM_CONFIG}>
      <Dashboard />
    </SteemProvider>
    );
}

export default App;
```

--- 
**Using steem context consumer**

Once we have the provider in a parent component we need to consume our Context Provider to  use instances and functions from SteemConnect.

```javascript
import React from 'react';
import {withSteem} from 'react-steem-provider'; //CONSUMER HOC

const Dashboard = ({steem})=>{
  const {
    loginUrl,
    auth,
    } = steem
  return( 
    <React.Fragment>
      {auth?:<h1 >You are logged</h1>:<a href={loginUrl}>Log in</a>}
    </React.Fragment>
    )
}

const DashboardWithSteem = withSteem(Dashboard);
/*
NOTE:

Instead of using withSteem, you can import the **SteemContext** as well to use it's Consumer .
import {SteemContext} from 'react-steem-provider';

<SteemContext.Consumer>
{(steem)=>{
    return <h1><SteemContext.Consumer></h1>
}}
</SteemContext.Consumer>

*/

```

What is in the steem instance?:

```javascript
    {
        loginUrl,//SteemConnect loginUrl 
        auth, //steem user or null
        steemConnect,//steemConnect original intance
        logout, //logout
        loading, //true when auth is loading
        actions //Set of writtig functions
    }
```

--- 

**Using steem context consumer with useContext (hooks)**


```javascript
import React, {useContext} from 'react';
import {SteemContext} from 'react-steem-provider';

const Dashboard = (props)=>{
  const {
    loginUrl,
    auth,
    loading
    } = useContext(SteemContext);
    
    if(loading) return <h1>Loading, please wait...</h1>

  return( 
    <React.Fragment>
      {auth?:<h1>You are logged</h1>:<a href={loginUrl}>Log in</a>}
    </React.Fragment>
    )
}
```
---
**List of actions from SteemContext**


*Note: You MUST be logged to use some of this actions*


- Get logged user
```javascript
await steem.actions.me()
```

- Publish a post
```javascript
await steem.actions.post(params, advanced = [])
```
 ```javascript
post_params = {
    permlink, /*This is not required an uuidv4 id is replace in case if npt pasing this argument*/
    title,
    body,
    category,
    parent_permlink,
    jsonmetadata = {}
}
```


 
- Reply post
```javascript
await steem.actions.reply(params, advanced=[])
```

 ```javascript
reply_params = {
    author, 
    post, 
    body,  
    jsonmetadata = {}
}
```


- Remove post
```javascript
await steem.actions.remove(permlink)
```

- Create regular post
```javascript
await steem.actions.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata)
```

- Reblog Post
```javascript
await steem.actions.reblog(account, author, permlink)
```
- Follow account
```javascript
await steem.actions.follow(following)
```
- Unfollow account
```javascript
await steem.actions.unfollow(unfollower, unfollowing)
```
- Claim Reward Balance
```javascript
await steem.actions.claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests)
```
- Update User Metadata
```javascript
await steem.actions.updateUserMetadata(metadata)
```
- Remove token
```javascript
await steem.actions.revokeToken()
```


--- 

**Async Steem functions**

A simplificated set of async steem functions.


```javascript
import SteemAsync from 'react-steem-provider/SteemAsync';
```
- List of posts in the platform.
```javascript
// getBy: "Trending | Created | Hot | Promoted"
 SteemAsync.readPostGeneral(tag, getBy, limit).then(
    (response)=>{ console.log(response) }).catch(
    (err)=>console.error(err));
```

- Get full post 

```javascript
 SteemAsync.getPost(author, permlink).then(
    (response)=>{ console.log(response) }).catch(
    (err)=>console.error(err));

```
- Get user by username

```javascript

const user =  await SteemAsync.getUserAccount(username);

```


- List of posts in an account
```javascript
const post = await SteemAsync.getDiscussionsByBlog(username, limit);
```

- Get Follows Count in an account
```javascript
 SteemAsync.getFollowCount(username).then(
    (response)=>{ console.log(response) }).catch(
    (err)=>console.error(err));
```
- Get following 
```javascript
  await SteemAsync.getFollowing(username, limit); 
```
- Get Followers

```javascript
const followers =  SteemAsync.getFollowers(username, limit).then(
    (response)=>{ console.log(response) }).catch(
    (err)=>console.error(err));

```

 
**Helpers**

Useful functions for your steem project.


- Parse reputation
```javascript
import {parserSteemRep, parserSteemSimpleRep} from 'react-steem-provider/Helpers';
Helpers.parserSteemRep("<<reputation>>") 
Helpers.parserSteemSimpleRep("<<reputation>>")
```
- Parse Steem markdown  
```javascript
import {parseSteemMarkdown} from 'react-steem-provider/Helpers';
SteemHelpers.parseSteemMarkdown("<<post.body>>")
```

---

### Exapmle

**Dahsboard.js**

*Note: Remeber to implement the context provider as parent component.*


```javascript
import React, { useEffect, useContext } from "react";
import SteemAsync from "react-steem-provider/SteemAsync";
import { SteemContext } from "react-steem-provider";

const PrintPost = props => {
  const { actions, auth } = useContext(SteemContext);

  useEffect(async () => {
    let post = await SteemAsync.readPostGeneral("", "Trending", 10);
    console.log(post);
  });

  const makeANewPost = () => {
    actions
      .post({
        title: "_react-steem-provider",
        body: "### npm install react-steem-provider",
        category: "developer"
      })
      .then(() => {
        alert("Post created");
      })
      .catch(error => {
        alert("UPS, there is an error");
      });
  };

  if (!auth) throw "User not logged";
  return (
    <React.Fragment>
      <h1>
        This button create a post in your blog, be wise when you click on it{" "}
      </h1>
      <button onClick={makeANewPost}>Make a new post</button>
    </React.Fragment>
  );
};

const Dashboard = props => {
  const { auth, loginUrl } = useContext(SteemContext);
  return (
    <React.Fragment>
      {auth ? <PrintPost /> : <a href={loginUrl}>Log in</a>}
    </React.Fragment>
  );
};

export default Dashboard;

```

### Contribute
Help us to make of this an epic package.

### License
Licensed under MIT

