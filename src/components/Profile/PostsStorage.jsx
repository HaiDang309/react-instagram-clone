import React from 'react';

import { Image, Space, Empty } from "antd";

import { getAllPosts } from '../../api'

const PostsStorage = React.memo(props => {
    const [postsData, setPostsData] = React.useState([]);
    const uid = window.localStorage.getItem('uid');
    React.useEffect(() => {
      getAllPosts(uid).then(data => setPostsData(data))
    },[])
    return (
      <Space>
        {
            !postsData ? <Empty description="No posts" /> : postsData.map(post => {
              return <Image width={232} height={232} key={Math.random()} src={post.photo} alt="" />
            })
        }
      </Space>
    );
})

export default PostsStorage;