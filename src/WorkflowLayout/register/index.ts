import type LogicFlow from '@logicflow/core';
// import { register } from './react-node-registry'; // react 18 以下时
import { register } from '@logicflow/react-node-registry'
import { Nodes } from './Nodes';
import { message } from 'antd';

export const lfRegister = ({
  lf,
  onConfigPanelOpen,
  isSilentMode
}: {
  lf: LogicFlow;
  onConfigPanelOpen: (data?: any) => void;
  isSilentMode: boolean;
}) => {
  // 注册节点
  for (const key in Nodes) {
    register(
      {
        type: key,
        ...Nodes[key],
      },
      lf,
    );
  }
  // 注册事件
  lf.on('connection:not-allowed', (data) => {
    message.error(data.msg);
  });

  // lf.on('node:click', (data) => {
  //   console.log(lf.getGraphData());
  // });
  lf.on('edge:click', ({ data }) => {
    if (isSilentMode) return;
    onConfigPanelOpen(data);
  });
  lf.on('edge:add', ({ data }) => {
    if (isSilentMode) return;
    if (Object.keys(data.properties).length === 0) {
      onConfigPanelOpen(data);
    }
  });
  // lf.on('edge:mouseenter', ({ data }) => {
  //   console.log('edge:mouseenter');
  //   // 鼠标移入边保存当前历史
  //   console.log(lf.history.undos);

  // })
  // lf.on('edge:mouseleave', ({ data }) => {
  //   console.log('edge:mouseleave');
  //   // 鼠标移出边保存当前历史
  //   console.log(lf.history.undos);

  // })
  // 拖拽端点时
  // lf.on('edge:exchange-node', ({ data: {
  //   newEdge
  // } }) => {
  //   console.log('edge:exchange-node');
  //   lf.setProperties(newEdge.id, {
  //     ...newEdge.properties,
  //   })
  // });
};
