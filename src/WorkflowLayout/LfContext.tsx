import type LogicFlow from "@logicflow/core";
import React, { createContext, useContext, useRef } from "react";

interface LogicFlowContextType {
  lfInstance: React.MutableRefObject<LogicFlow | undefined>;
  graphData: LogicFlow.GraphConfigData;
  isSilentMode: boolean;
}
const LfContext = createContext<LogicFlowContextType | undefined>(undefined);

export const LfProvider = ({ isSilentMode, children }) => {
  const lfInstance = useRef<LogicFlow>();

  const graphData: LogicFlow.GraphConfigData = {
    // 节点
    nodes: [
      {
        id: "1",
        type: "start",
        data: {
          name: "开始节点",
        },
      },
      {
        id: "2",
        type: "action",
        data: {
          name: "动作节点",
        },
      },
      {
        id: "3",
        type: "end",
        data: {
          name: "结束节点",
        },
      },
    ],
    // 边
    edges: [
      {
        type: "bezier",
        sourceNodeId: "1",
        targetNodeId: "2",
        text: '连线1',
        properties: {
          name: "连线1"
        }
      },
      {
        type: "bezier",
        sourceNodeId: "2",
        targetNodeId: "3",
        text: '连线2',
        properties: {
          name: "连线2"
        }
      },
    ],
  };

  return (
    <LfContext.Provider value={{ isSilentMode, lfInstance, graphData }}>
      {children}
    </LfContext.Provider>
  );
};

export default LfContext;

export const useLf = (): LogicFlowContextType => {
  const context = useContext(LfContext);
  if (!context) {
    throw new Error("useLf 必须在 LfProvider 中使用");
  }
  return context;
};
