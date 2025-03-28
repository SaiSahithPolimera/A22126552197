require("dotenv").config();

const bearer = `Bearer ${process.env.BEARER}`;
const getPosts = async (req, res) => {
    const totalUsers = 5;
    const userid = req.params;
    const response = await fetch(`${process.env.HOST_URL}/test/users`, {
        headers: {
            "Authorization": bearer
        }
    })
    const { users } = await response.json();
    const updatedUsers = (Object.entries(users).map((entry) => ({ userid: entry[0], userName: entry[1] })));
    const postFreq = [];
    await Promise.all(await updatedUsers.map(async (user) => {
        const response = await fetch(`${process.env.HOST_URL}/test/users/${user.userid}/posts`, {
            headers: {
                "Authorization": bearer
            }
        });
        const { posts } = await response.json();
        postFreq.push({ postCount: posts.length, userid: posts[0].userid });
    }));
    postFreq.sort((post1, post2) => post1.postCount - post2.postCount);
    const topUsers = [];
    for (let i = 0; i < totalUsers; i++) {
        topUsers.push( {
            userid: postFreq[i].userid,
            name: users[postFreq[i].userid]
        }

        );
    }
    res.json(
        { topUsers: topUsers }
    )
}


module.exports = { getPosts };