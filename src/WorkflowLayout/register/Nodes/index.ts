import { Action, ActionNodeModel } from './Action';
import { End, EndNodeModel } from './End';
import { Start, StartNodeModel } from './Start';
export const NodeTypes = {
  START: 'start',
  END: 'end',
  ACTION: 'action',
  // CONDITION: "condition",
  // LOOP: "loop",
  // SUBPROCESS: "subprocess",
  // TRIGGER: "trigger",
  // WAIT: "wait",
  // CUSTOM: "custom",
};
export const Nodes = {
  [NodeTypes.START]: { component: Start, model: StartNodeModel },
  [NodeTypes.END]: { component: End, model: EndNodeModel },
  [NodeTypes.ACTION]: { component: Action, model: ActionNodeModel },
  // Condition,
  // Loop,
  // SubProcess,
  // Trigger,
  // Wait,
  // Custom,
};

export const stateNodeType = {
  0: NodeTypes.ACTION,
  1: NodeTypes.START,
  2: NodeTypes.END,
};
