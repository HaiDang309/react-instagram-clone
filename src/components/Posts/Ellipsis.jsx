import React from "react";

import { Button, Modal, Space } from "antd";

const Ellipsis = React.memo((props) => {
  const { openEllipsis, setOpenEllipsis } = props;
  const handleCloseEllipsis = () => {
    setOpenEllipsis(false);
  };
  return (
    <Modal
      visible={openEllipsis}
      footer={null}
      closable={false}
      style={{}}
      onCancel={handleCloseEllipsis}
      bodyStyle={{ padding: 0 }}
    >
      <Button
        style={{ color: "red", borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Report
      </Button>
      <Button
        style={{ color: "red", borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Unfollow
      </Button>
      <Button
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Go to post
      </Button>
      <Button
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Share to...
      </Button>
      <Button
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Copy Link
      </Button>
      <Button
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        type="text"
        size="large"
        block
      >
        Embed
      </Button>
      <Button type="text" size="large" block onClick={handleCloseEllipsis}>
        Cancel
      </Button>
    </Modal>
  );
});

export default Ellipsis;
