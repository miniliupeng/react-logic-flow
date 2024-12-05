import React, { useEffect, useRef, useState } from "react";
import LogicFlow from "@logicflow/core";
import {
  Menu,
  MiniMap,
  Snapshot /* , ProximityConnect */,
} from "@logicflow/extension";
import "@logicflow/core/dist/index.css";
import "@logicflow/extension/lib/style/index.css";
import styles from "./index.module.less";
import { NodePanel } from "./NodePanel";
import { LfProvider, useLf } from "./LfContext";
import { lfRegister } from "./register";
import { ControlPanel } from "./ControlPanel";
import Dagre from "./tools/dagre";
import { ConfigPanel } from "./ConfigPanel";
import { SaveBtn } from "./SaveBtn";

const WorkflowLayout = () => {
  const { lfInstance, graphData, isSilentMode } = useLf();

  const lfContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const configPanelRef = useRef(null);
  useEffect(() => {
    if (lfContainerRef.current) {
      lfInstance.current = new LogicFlow({
        isSilentMode,
        container: lfContainerRef.current,
        background: {
          backgroundColor: "rgb(240, 244, 251)",
        },
        keyboard: {
          enabled: true,
        },
        stopScrollGraph: true,
        // stopZoomGraph: true,
        adjustEdge: false, //允许调整边
        adjustEdgeStartAndEnd: !isSilentMode, //是否允许拖动边的端点来调整连线
        hoverOutline: false, // 鼠标 hover 的时候是否显示节点的外框。
        nodeSelectedOutline: !isSilentMode, // 节点被选中时是否显示节点的外框。
        edgeSelectedOutline: !isSilentMode, // 节点被选中时是否显示节点的外框。
        nodeTextEdit: false, //节点是否可编辑。false不可编辑
        edgeTextEdit: false, //边是否可编辑。false不可编辑
        textEdit: false, // 是否开启文本编辑
        plugins: [Menu, MiniMap, Snapshot, /* ProximityConnect, */ Dagre], // 开启渐近线插件ProximityConnect，重复触发连线规则
        edgeType: "bezier",
        style: {
          anchorLine: {
            stroke: "#afafaf",
            strokeWidth: 2,
            strokeDasharray: "3,2",
          },
          snapline: {
            stroke: "#646cff",
          },
          edgeAdjust: {
            stroke: "#646cff",
          },
          outline: {
            stroke: "#646cff",
            hover: {
              stroke: "#646cff",
            },
          },
          edgeText: {
            background: {
              fill: "#fafafa",
              stroke: "#000000",
              radius: 8,
            },
            textWidth: 80,
            fontSize: 14,
            overflowMode: "autoWrap",
          },
        },
        pluginsOptions: {
          miniMap: {
            width: 200,
            height: 200,
            // leftPosition: 260,
            // bottomPosition: 0,
            showEdge: true,
          },
        },
      });
      // 注册节点
      lfRegister({
        lf: lfInstance.current,
        onConfigPanelOpen: configPanelRef.current?.onOpen,
        isSilentMode,
      });
      // 配置菜单
      lfInstance.current.setMenuConfig?.({
        nodeMenu: [
          {
            text: "删除",
            callback(node) {
              lfInstance.current.deleteNode(node.id);
            },
          },
        ],
        edgeMenu: [
          {
            text: "删除",
            callback(edge) {
              lfInstance.current.deleteEdge(edge.id);
            },
          },
        ],
      });
      setMounted(true);
    }
    return () => {
      lfInstance.current.destroy();
    };
  }, []);
  useEffect(() => {
    if (mounted) {
      // 渲染
      lfInstance.current.render(graphData);
      // 由于没有保存节点位置，采用自动垂直布局并居中
      lfInstance.current.extension.dagre.layout({
        rankdir: "TB",
      });
      lfInstance.current.translateCenter();
      lfInstance.current.history.undos = []; // 清空不需要的历史记录
      // 小地图(渲染之后)
      (lfInstance.current.extension.miniMap as MiniMap).show();
    }
  }, [mounted, graphData]);
  return (
    <div className={styles.container}>
      <div ref={lfContainerRef} style={{ height: "100%" }} />
      {mounted && (
        <>
          {!isSilentMode && (
            <>
              <NodePanel />
              <SaveBtn />
            </>
          )}
          <ControlPanel />
        </>
      )}
      <ConfigPanel ref={configPanelRef} />
    </div>
  );
};

export default ({ isSilentMode = false }) => (
  <LfProvider isSilentMode={isSilentMode}>
    <WorkflowLayout />
  </LfProvider>
);
