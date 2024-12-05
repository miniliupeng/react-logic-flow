import { message, Tree } from "antd";
import styles from "./index.module.less";
import { NodeTypes } from "../register/Nodes";
import { useLf } from "../LfContext";
import { SvgIcon } from "@/components/SvgIcon";

const renderIcon = (title) => {
  if (title === "初始状态") return <SvgIcon name="start" size={14} />;
  if (title === "普通状态") return <SvgIcon name="action" size={14} />;
  if (title === "结束状态") return <SvgIcon name="end" size={14} />;
  return null;
};

const treeData = [
  {
    title: "初始状态",
    key: "start",
    children: [
      {
        title: "开始节点",
        key: "1",
        type: NodeTypes.START,
        icon: <span className="anticon">{renderIcon("初始状态")}</span>,
      },
    ],
  },
  {
    title: "普通状态",
    key: "action",
    children: [
      {
        title: "普通节点",
        key: "2",
        type: NodeTypes.ACTION,
        icon: <span className="anticon">{renderIcon("普通状态")}</span>,
      },
    ],
  },
  {
    title: "结束状态",
    key: "end",
    children: [
      {
        title: "结束节点",
        key: "3",
        type: NodeTypes.END,
        icon: <span className="anticon">{renderIcon("结束状态")}</span>,
      },
    ],
  },
];

export const NodePanel = () => {
  const { lfInstance } = useLf();
  const onMouseDown = (node) => {
    // 子节点可拖拽
    if (!node.type) return;
    // 每个节点只能使用一次
    const usedNode = lfInstance.current.getDataById(node.key);
    if (usedNode) {
      return message.error("该状态节点已被使用");
    }
    lfInstance.current.dnd.startDrag({
      id: node.key, // 每个节点只能使用一次
      type: node.type,
      properties: {
        id: node.key,
        name: node.title as string,
      },
    });
  };

  return (
    <div className={styles["node-panel"]}>
      <Tree
        selectable={false}
        defaultExpandedKeys={["start", "action", "end"]}
        treeData={treeData}
        showIcon
        blockNode
        titleRender={(node) => (
          <span
            className={styles["node-title"]}
            onMouseDown={() => onMouseDown(node)}
          >
            {node.title}
          </span>
        )}
      />
    </div>
  );
};
