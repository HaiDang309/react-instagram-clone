import React from 'react';

import {
  Card,
  Avatar,
  Space,
  Typography,
  Image,
  Input,
  Button,
  message,
} from "antd";
import Icon from '@ant-design/icons';
import { UserOutlined } from "@ant-design/icons";
import {
  EllipsisIcon,
  BookMarkIcon,
  HeartIcon,
  LikedIcon,
  CommentIcon,
  ChatIcon,
  SmileIcon,
} from "../../constant/svg";

import { usernames } from '../../constant/username'

import Ellipsis from './Ellipsis';
import Comments from './Comments';

import { getAllComments } from '../../api';

import firebase from '../../Services/firebase';

const Post = React.memo(props => {
    const { pid, photo, username, avatar } = props;
    const { Text } = Typography;
    const db = firebase.firestore();
    const [comment, setComment] = React.useState('');
    const [cmtData, setCmtData] = React.useState([]);
    const [openEllipsis, setOpenEllipsis] = React.useState(false);
    const [openCmt, setOpenCmt] = React.useState(false);
    const [isLike, setIsLike] = React.useState(false);
    const handleOpenEllipsis = () => {
        setOpenEllipsis(true);
    } 
    const handleOpenCmt = () => {
      setOpenCmt(true);
    }; 
    const handleLike = () => {
        setIsLike(!isLike);
    }
    const handleAddComment = () => {
        db.collection("comments")
          .add({
            avatar: avatar,
            content: comment,
            pid: pid,
            username: username,
          })
          .then(() => {
            message.success("Successfully added!");
            setComment("");
          })
          .catch((err) => {
            message.error(err.message);
          });
    }
    React.useEffect(() => {
      getAllComments(pid).then(data => setCmtData(data))
    },[])
    return (
      <Card
        title={
          <div>
            <Space size={16}>
              <Avatar src={avatar} icon={<UserOutlined />} size={32} />
              <Text style={{ fontWeight: "500" }}>{username}</Text>
            </Space>
            <Icon
              onClick={handleOpenEllipsis}
              style={{ float: "right" }}
              component={EllipsisIcon}
            />
            <Ellipsis
              setOpenEllipsis={setOpenEllipsis}
              openEllipsis={openEllipsis}
            />
          </div>
        }
        cover={<Image src={photo} alt="" />}
        size="small"
        bodyStyle={{ padding: 0 }}
        style={{ width: 600, marginBottom: 32 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px",
          }}
        >
          <Space>
            <Icon
              onClick={handleLike}
              component={isLike ? LikedIcon : HeartIcon}
            />
            <Icon component={CommentIcon} />
            <Icon component={ChatIcon} />
          </Space>
          <Icon component={BookMarkIcon} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 8px",
            borderBottom: "1px solid #f3f3f3",
            paddingBottom: "8px",
          }}
        >
          <Text>
            Liked by{" "}
            <strong style={{ cursor: "pointer" }}>
              {usernames[Math.floor(Math.random() * (29 - 0 + 1)) + 0].username}
            </strong>
            {", "}
            <strong style={{ cursor: "pointer" }}>
              {usernames[Math.floor(Math.random() * (29 - 0 + 1)) + 0].username}
            </strong>{" "}
            and <strong>others</strong>
          </Text>
          <Text
            onClick={handleOpenCmt}
            style={{ cursor: "pointer" }}
            type="secondary"
          >
            View all {cmtData.length} comments
            <Comments
              cmtData={cmtData}
              openCmt={openCmt}
              setOpenCmt={setOpenCmt}
            />
          </Text>
          <Text style={{ fontSize: "0.7em" }} size="small" type="secondary">
            {Math.floor(Math.random() * (23 - 0 + 1)) + 1} HOURS AGO
          </Text>
        </div>

        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onPressEnter={handleAddComment}
          prefix={<Icon component={SmileIcon} />}
          suffix={
            <Button
              onClick={handleAddComment}
              disabled={!comment}
              type="primary"
            >
              Post
            </Button>
          }
          style={{ height: 56 }}
          bordered={false}
          placeholder="Add a comment..."
        />
      </Card>
    );
})

export default Post;