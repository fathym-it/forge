
declare module jsPlumbToolkit {
    function foo():void;

    module Dialogs {
        function show(options:any):void;
        function initialize(options:any):void;
    }

    module jsPlumbToolkitUtil {
        function uuid():string;
    }   

    module jsPlumbToolkit {
        function newInstance(params:any):jsPlumbToolkit;
        function ready(fn:any):void;
    } 

    class jsPlumbToolkit {
        render(params:any):Surface;
        clearSelection():void;
        load(options:any):void;
        bind(event:string, handler:Function):void;
        exportData():Object;

        toggleSelection(node:any):void;

        removeEdge(edge:any):void;
        removeNode(node:any):void;

        updateNode(node:any, data:any):void;
        updateEdge(edge:any, data:any):void;

        getGroupCount():number;
        getNodeCount():number;

    } 

    class Surface {
        _ngId:string;

        getToolkit():jsPlumbToolkit;
        getJsPlumb:any;
        
        zoomToFit():void;
        centerContent():void;

        setMode(mode:string):void;

        createMiniview(options:any):Miniview;

        getObjectInfo(obj:any):any;

        repaintEverything():void;

        toggleGroup(group:any):void;
    }   

    class Miniview {

    }

    class DrawingTools {
        constructor(options:any)
    }

    class jsPlumb {
        static extend(target:Object, source:Object):Object;
        static addClass(el:NodeListOf<Element>, clazz:string):void;
        static removeClass(el:NodeListOf<Element>, clazz:string):void;

        static on(el:any, event:string, delegateSelector:string, handler:Function):void;
        static on(el:any, event:string, handler:Function):void;
        static off(el:any, event:string, handler:Function):void;

        static revalidate(el:Element):void;
    }
}
    
export = jsPlumbToolkit
