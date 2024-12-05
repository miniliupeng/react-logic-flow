import { Button } from 'antd';
import styles from './index.module.less';
import { useLf } from '../LfContext';
import type LogicFlow from '@logicflow/core';

export const SaveBtn = () => {
  const { lfInstance } = useLf();
  const onSave = async () => {
    // 保存流程图数据
    const data = lfInstance.current.getGraphData() as LogicFlow.GraphData;
    console.log('流程图数据',data);
  };
  return (
    <Button type="primary" className={styles['save-btn']} onClick={onSave}>
      保存流程图
    </Button>
  );
};
