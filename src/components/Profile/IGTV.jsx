import React from "react";

import Icon from "@ant-design/icons";
import { TVIcon } from "../../constant/svg";
import { Button } from "antd";

const Saved = React.memo((props) => {
  return (
    <div style={{ textAlign: "center", marginTop: 48 }}>
      <Icon component={TVIcon} />
      <h3>Upload a video</h3>
      <p>Videos must be between 1 and 60 minutes long.</p>
      <Button type="primary">Upload</Button>
    </div>
  );
});

export default Saved;
