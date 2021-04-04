import React from "react";

import Icon from "@ant-design/icons";
import { LargeTaggedIcon } from "../../constant/svg";

const Saved = React.memo((props) => {
  return (
    <div style={{ textAlign: "center", marginTop: 48 }}>
      <Icon style={{border: "2px solid black", borderRadius: "50%",padding: "8px", marginBottom: 16}} component={LargeTaggedIcon} />
      <p style={{fontSize: "2em", fontWeight: "200", marginBottom: "4px"}}>Photos of you</p>
      <p>When people tag you in photos, they'll appear here.</p>
    </div>
  );
});

export default Saved;
