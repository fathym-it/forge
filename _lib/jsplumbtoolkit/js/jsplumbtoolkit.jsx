import React from 'react';
import { jsPlumbToolkit, Surface } from 'jsplumbtoolkit';
 
/**
 * jsPlumb Toolkit Component - provides an instance of the jsPlumb Toolkit, with a Surface widget.
 */
class JsPlumbToolkitComponent extends React.Component {
    
    constructor(props) {
        super(props)
                
        this.toolkit = jsPlumbToolkit.newInstance(this.props.toolkitParams || {});

        if (this.props.data) {
            this.toolkit.load({
                data:this.props.data
            });
        } else if (this.props.url) {
            this.toolkit.load({
                url:this.props.url
            });
        }      
    }

  render() {
    return <div ref={(c) => this._container = c} style={{width:"100%",height:"100%"}}></div>
  }

  componentDidMount() {
    
    const renderParams = this.props.renderParams || {}
    renderParams.container = this._container
    renderParams.view = this.props.view || {}

    this.surface = this.toolkit.render(renderParams)
  }

  addNode(node) {
      return this.toolkit.addNode(node)
  }
}
 
export default JsPlumbToolkitComponent;