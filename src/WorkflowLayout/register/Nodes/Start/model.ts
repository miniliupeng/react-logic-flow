import type LogicFlow from '@logicflow/core';
// import { ReactNodeModel } from '../../react-node-registry';
import { ReactNodeModel } from '@logicflow/react-node-registry';

export class StartNodeModel extends ReactNodeModel {
  initNodeData(data: LogicFlow.NodeConfig): void {
    super.initNodeData(data);
    this.width = 140;
    this.height = 40;
    this.targetRules = [
      {
        message: '初始状态节点不能被其它节点连接',
        validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          return false;
        },
      },
    ];
    // this.sourceRules = [
    //   {
    //     message: `初始状态节点只允许一个输出`,
    //     validate: (sourceNode, targetNode, sourceAnchor, targetAnchor, adjustEdgeID) => {
    //       const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
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
