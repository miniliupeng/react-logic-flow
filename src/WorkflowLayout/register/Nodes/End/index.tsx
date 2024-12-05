import React, { FC } from 'react';
import styles from './index.module.less';
import { ReactNodeProps } from '@logicflow/react-node-registry';
import { SvgIcon } from '@/components/SvgIcon';

export const End: FC<ReactNodeProps> = ({ node }) => {
  const properties = node.getData().properties;

  return (
    <div className={styles['node-container']}>
      <span className="anticon">
        <SvgIcon name="end" size={14} />
      </span>
      <span className={styles['node-name']}>{properties?.name || '结束节点'}</span>
    </div>
  );
};

export { EndNodeModel } from './model';
