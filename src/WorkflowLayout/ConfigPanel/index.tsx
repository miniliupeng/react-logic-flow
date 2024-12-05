import { Drawer } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { EdgeForm } from './EdgeForm';
import { useLf } from '../LfContext';

export const ConfigPanel = forwardRef((_, ref) => {
  const [data, setData] = useState(undefined);
  const [open, setOpen] = useState(false);
  const { lfInstance } = useLf();
  const onClose = (cancel) => {
    if (cancel === 'close' && data && Object.keys(data.properties).length === 0) {
      // 新增一条边，但是取消配置时，删除该边
      lfInstance.current.deleteEdge(data.id);
    }
    setOpen(false);
    setData(undefined);
  };
  useImperativeHandle(ref, () => ({
    onOpen: (data) => {
      setData(data);
      setOpen(true);
    },
    onClose,
  }));
  return (
    <Drawer title="配置" placement="right" onClose={() => onClose('close')} open={open}>
      <EdgeForm data={data} onClose={onClose} />
    </Drawer>
  );
});
