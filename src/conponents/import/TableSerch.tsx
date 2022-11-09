
import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

interface TableSerchProp{
     onFinish : (values: Values) => void
}

interface Values{
    key:string
}

export default function TableSerch(props:TableSerchProp){
    const {onFinish} = props
    

return(
    <div style={{height:60,padding:"10px  20px"}}>
        <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="key" label="Key">
         <Input placeholder='请输入' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          提交
        </Button>
      </Form.Item>
    </Form>
    </div>
)

}