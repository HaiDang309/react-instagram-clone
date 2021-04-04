import React from "react";

import { Empty } from "antd";

const PostsStorage = React.memo((props) => {
  return (
    <Empty description="No saved posts" />
  );
});

export default PostsStorage;
