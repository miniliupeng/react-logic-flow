import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import {
  AimOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  CompressOutlined,
  DownloadOutlined,
  RedoOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useLf } from '../LfContext';
import type { MiniMap } from '@logicflow/extension';

export const ControlPanel = () => {
  const { lfInstance, isSilentMode } = useLf();
  const [undoAble, setUndoAble] = useState(false);
  const [redoAble, setRedoAble] = useState(false);
  const controlItems = [
    {
      title: '放大',
      icon: <ZoomInOutlined />,
      onClick: () => {
        lfInstance.current.zoom(true);
      },
    },
    {
      title: '缩小',
      icon: <ZoomOutOutlined />,
      onClick: () => {
        lfInstance.current.zoom(false);
      },
    },
    {
      title: '大小适应',
      icon: <CompressOutlined />,
      onClick: () => {
        lfInstance.current.resetZoom();
      },
    },
    {
      title: '定位还原(大小&定位)',
      icon: <AimOutlined />,
      onClick: () => {
        lfInstance.current.resetZoom();
        // lfInstance.current.resetTranslate();
        lfInstance.current.translateCenter();
      },
    },
    {
      title: '上一步',
      icon: <UndoOutlined />,
      style: {
        color: undoAble ? '#000' : '#ccc',
      },
      onClick: () => {
        if (undoAble) lfInstance.current.undo();
      },
    },
    {
      title: '下一步',
      icon: <RedoOutlined />,
      style: {
        color: redoAble ? '#000' : '#ccc',
      },
      onClick: () => {
        if (redoAble) lfInstance.current.redo();
      },
    },
    {
      title: '水平布局',
      icon: <ColumnWidthOutlined />,
      onClick: () => {
        lfInstance.current.extension.dagre.layout({
          rankdir: 'LR',
          ranksep: 60,
        });
        lfInstance.current.translateCenter();

        // bug: 布局后小地图未刷新，刷新下小地图
        (lfInstance.current.extension.miniMap as MiniMap).hide();
        (lfInstance.current.extension.miniMap as MiniMap).show();
      },
    },
    {
      title: '垂直布局',
      icon: <ColumnHeightOutlined />,
      onClick: () => {
        lfInstance.current.extension.dagre.layout();
        lfInstance.current.translateCenter();
        // bug: 布局后小地图未刷新，刷新下小地图
        (lfInstance.current.extension.miniMap as MiniMap).hide();
        (lfInstance.current.extension.miniMap as MiniMap).show();
      },
    },
    {
      title: '导出图片',
      icon: <DownloadOutlined />,
      onClick: () => {
        lfInstance.current.getSnapshot(undefined, {
          backgroundColor: '#f0f4fb',
        });
      },
    },
  ];

  useEffect(() => {
    lfInstance.current.on('history:change', ({ data: { undoAble, redoAble, undos } }) => {
      // console.log('undos', undos);
      setUndoAble(undoAble);
      setRedoAble(redoAble);
    });
  }, []);
  return (
    <div
      className={styles['control-panel']}
      style={{
        left: isSilentMode ? 8 : 260,
      }}
    >
      {controlItems.map((item) => (
        <Tooltip title={item.title} key={item.title}>
          {React.cloneElement(item.icon, {
            style: {
              fontSize: 16,
              ...item.style,
            },
            onClick: item.onClick,
          })}
        </Tooltip>
      ))}
    </div>
  );
};
