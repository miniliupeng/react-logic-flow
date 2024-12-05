import React, { FC } from 'react';
import styles from './index.module.less';
import { ReactNodeProps } from '@logicflow/react-node-registry';
import { SvgIcon } from '@/components/SvgIcon';

export const Action: FC<ReactNodeProps> = ({ node }) => {
  const properties = node.getData().properties;

  return (
    <div className={styles['node-container']}>
      <span className="anticon">
        <SvgIcon name="action" size={14} />
      </span>
      <span className={styles['node-name']}>{properties?.name || '普通节点'}</span>
    </div>
  );
};

export { ActionNodeModel } from './model';
