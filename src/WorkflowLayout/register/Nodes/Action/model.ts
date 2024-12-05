import type LogicFlow from '@logicflow/core';
// import { ReactNodeModel } from '../../react-node-registry';
import { ReactNodeModel } from '@logicflow/react-node-registry';

export class ActionNodeModel extends ReactNodeModel {
  initNodeData(data: LogicFlow.NodeConfig): void {
    super.initNodeData(data);
    this.width = 140;
    this.height = 40;
    // this.targetRules = [
    //   {
    //     message: `动作状态节点只允许一个输入`,
    //     validate: (sourceNode, targetNode, sourceAnchor, targetAnchor, adjustEdgeID) => {
    //       const edges = this.graphModel.getNodeIncomingEdge(targetNode.id);
    //       if (edges.find((edge) => edge.id === adjustEdgeID)) return true;
    //       if (edges.length >= 1) {
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     },
    //   },
    // ];
    this.sourceRules = [
      // {
      //   message: `动作状态节点只允许一个输出`,
      //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor, adjustEdgeID) => {
      //     const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
      //     if (edges.find((edge) => edge.id === adjustEdgeID)) return true;
      //     if (edges.length >= 1) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   },
      // },
      {
        message: `动作状态节点间不允许互相连接`,
        validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          const nodes = this.graphModel.getNodeIncomingNode(sourceNode.id);
          const connectedNode = nodes.find((node) => node.id === targetNode.id);
          if (connectedNode) {
            return false;
          }
          return true;
        },
      },
    ];
  }
}
