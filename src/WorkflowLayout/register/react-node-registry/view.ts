import { createElement, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { HtmlNode } from '@logicflow/core';
import { Wrapper } from './wrapper';
import { Portal } from './portal';
import { createPortal } from 'react-dom';

export class ReactNodeView extends HtmlNode {
  container?: HTMLElement;

  protected targetId() {
    return `${this.props.graphModel.flowId}:${this.props.model.id}`;
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.unmount();
  }

  setHtml(rootEl: SVGForeignObjectElement) {
    const el = document.createElement('div');
    el.className = 'custom-react-node-content';

    this.renderReactComponent(el);
    rootEl.appendChild(el);
  }

  confirmUpdate(_rootEl: SVGForeignObjectElement) {
    // This method can be customized for node update logic if needed
    // console.log('_rootEl', _rootEl);
  }

  protected renderReactComponent(container: HTMLElement) {
    // console.log('render render render ===>>>');
    this.unmountReactComponent();
    const { model, graphModel } = this.props;

    if (container) {
      this.container = container;
      const elem = createElement(Wrapper, {
        node: model,
        graph: graphModel,
      });

      if (Portal.isActive()) {
        const portal = createPortal(elem, container, model.id) as ReactPortal;
        Portal.connect(this.targetId(), portal);
      } else {
        ReactDOM.render(elem, container);
      }
    }
  }

  protected unmountReactComponent() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container.innerHTML = '';
    }
  }

  unmount() {
    this.unmountReactComponent();
  }
}

export default ReactNodeView;
