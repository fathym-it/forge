import React from 'react';
import { jsPlumbToolkit, Surface } from 'jsplumbtoolkit';
 
/**
 * jsPlumb Toolkit Miniview Component
 * 
 * @param {JsPlumbToolkitComponent} toolkitComponent
 */
class JsPlumbToolkitMiniviewComponent extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return <div ref={ (c) => this._container = c }/>
    }

    componentDidMount() {

        if (!this.props.toolkitComponent) {
            throw new Error("No 'toolkitComponent' set on JsPlumbToolkitMiniviewComponent. This is required.")
        }   

        this.toolkitComponent = this.props.toolkitComponent;
        this.toolkit = this.toolkitComponent.toolkit;
        this.surface = this.toolkitComponent.surface;

        this.surface.createMiniview({
            container:this._container
        });    
    }  
}
 
export default JsPlumbToolkitMiniviewComponent;