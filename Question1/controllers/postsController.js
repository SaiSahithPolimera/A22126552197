require("dotenv").config();

const getPostDetails = async () => {
    const postFreq = [];
    const postIDs = [];
    const response = await fetch(`${process.env.HOST_URL}/test/users`, {
        headers: {
            "Authorization": bearer
        }
    })
    const { users } = await response.json();
    const updatedUsers = (Object.entries(users).map((entry) => ({ userid: entry[0], userName: entry[1] })));
    await Promise.all(await updatedUsers.map(async (user) => {
        const response = await fetch(`${process.env.HOST_URL}/test/users/${user.userid}/posts`, {
            headers: {
                "Authorization": bearer
            }
        });
        const { posts } = await response.json();
        posts.forEach(post => {
            if (!postIDs.includes(post.id)) {
                postIDs.push({id: post.id,  count: 0});
            }
        });
        postFreq.push({ postCount: posts.length, userid: posts[0].userid });
    }));
    return { postIDs, postFreq };
}

const bearer = `Bearer ${process.env.BEARER}`;
const getPosts = async (req, res) => {
    const totalUsers = 5;
    const { postFreq } = await getPostDetails();
    postFreq.sort((post1, post2) => post1.postCount - post2.postCount);
    const topUsers = [];
    for (let i = 0; i < totalUsers; i++) {
        topUsers.push({
            userid: postFreq[i].userid,
            name: users[postFreq[i].userid]
        }

        );
    }
    res.json(
        { topUsers: topUsers }
    )
}

const getTopPosts = async (req, res) => {
    const { postIDs } = await getPostDetails();
    const { type } = req.params;
    const popularPosts = {
        
}
    console.log(type);
    await Promise.all(await postIDs.map(async (post) => {
        const response = await fetch(`${process.env.HOST_URL}/test/posts/${post.id}/comments`, {
            headers: {
                "Authorization": bearer
            }
        });
        const { comments } = await response.json();
        comments.map((comment) => postIDs[comment.postid].count + 1);
    }));
    return {
        postIDs
    }
}


module.exports = { getPosts, getTopPosts };