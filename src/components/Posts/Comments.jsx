import React from "react";

import { Modal, Button, Comment, Empty } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const Comments = React.memo((props) => {
  const { openCmt, setOpenCmt, cmtData } = props;
  const handleCloseComment = (e) => {
    e.stopPropagation();
    setOpenCmt(false);
  };
  return (
    <Modal
      footer={<Button onClick={handleCloseComment}>Close</Button>}
      closable={false}
      visible={openCmt}
    >
      {cmtData.length === 0 ? (
        <Empty description="No comments" />
      ) : (
        cmtData.map((item) => {
          return (
            <Comment
              key={Math.random() / Math.random()}
              author={item.username}
              content={item.content}
              avatar={<Avatar src={item.avatar} alt={item.username}/>}
            />
          );
        })
      )}
    </Modal>
  );
});

export default Comments;
