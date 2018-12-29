import React from 'react';
import { jsPlumbToolkit, Surface } from 'jsplumbtoolkit';
 
/**
 * jsPlumb Toolkit Palette Component - draggable nodes. This is an abstract component. You are expected to provide the `render` method.
 * 
 * @param {JsPlumbCoolkitComponent} toolkitComponent
 * @param {String} selector CSS selector identifying elements to configure as draggables.
 * @param {Element} source Source element that is the parent of the draggables.
 * @param {Function} [typeExtractor] Function to use to extract type from a dragged element.
 * @param {Function} [dataGenerator] Optional function to use to generate data for some dragged element.
 * @param {Function} [locationSetter] Optional function to use to generate location data for some dragged element.
 * @param {Object} [dragOptions] Optional drag options. Generally the defaults are what you'll want to use for this. 
 */
class JsPlumbToolkitPaletteComponent extends React.Component {
    
    constructor(props) {
        super(props)

        if (!this.props.toolkitComponent) {
            throw new Error("No 'toolkitComponent' set on JsPlumbToolkitPaletteComponent. This is required.")
        }   

        if (!this.props.selector) {
            throw new Error("No 'selector' set on JsPlumbToolkitPaletteComponent. This is required.")
        }

        this.toolkitComponent = this.props.toolkitComponent;
        this.toolkit = this.toolkitComponent.toolkit;
        this.surface = this.toolkitComponent.surface;
        this.container = this.props.container;
    }

    componentDidMount() {
        this.surface.registerDroppableNodes({
            source:this.container,
            selector: this.props.selector,
            dragOptions: this.props.dragOptions || {
                zIndex: 50000,
                cursor: "move",
                clone: true
            },
            typeExtractor: this.props.typeExtractor,
            dataGenerator:this.props.dataGenerator,
            locationSetter:this.props.locationSetter
        });    
    }  
}
 
export default JsPlumbToolkitPaletteComponent;