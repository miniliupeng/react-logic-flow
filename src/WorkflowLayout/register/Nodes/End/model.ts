import type LogicFlow from '@logicflow/core';
// import { ReactNodeModel } from '../../react-node-registry';
import { ReactNodeModel } from '@logicflow/react-node-registry';

export class EndNodeModel extends ReactNodeModel {
  initNodeData(data: LogicFlow.NodeConfig): void {
    super.initNodeData(data);
    this.width = 140;
    this.height = 40;
    this.sourceRules = [
      {
        message: '结束状态节点不能连接其他节点',
        validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          return false;
        },
      },
    ];
    // this.targetRules = [
    //   {
    //     message: '结束状态节点只允许一个输入',
    //     validate: (sourceNode, targetNode, sourceAnchor, targetAnchor, adjustEdgeID) => {
    //       const edges = this.graphModel.getNodeIncomingEdge(targetNode.id);
    //       if (edges.find((edge) => edge.id === adjustEdgeID)) return true
    //       if (edges.length >= 1) {
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     },
    //   },
    // ];
  }
}
