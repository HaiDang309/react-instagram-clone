import React from 'react';

import { Card } from 'antd';

import Sidebar from './Sidebar';
import FormEditing from './FormEditing'
import Navbar from '../../Navbar';
import { Content } from 'antd/lib/layout/layout';

const Edit = React.memo(props => {
    return (
      <>
        <Navbar />
        <Content style={{marginTop: 24}}>
          <Card style={{ padding: 64 }}>
            <Card.Grid hoverable={false} style={{ width: "20%", height: 832 }}>
              <Sidebar />
            </Card.Grid>
            <Card.Grid
              hoverable={false}
              style={{ width: "80%", textAlign: "left", height: 832 }}
            >
              <FormEditing />
            </Card.Grid>
          </Card>
        </Content>
      </>
    );
})

export default Edit;