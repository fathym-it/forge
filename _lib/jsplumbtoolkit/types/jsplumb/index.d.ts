declare module jsPlumb {
    function extend(target:Object, source:Object):Object;
    function addClass(el:NodeListOf<Element>, clazz:string):void;
    function removeClass(el:NodeListOf<Element>, clazz:string):void;

    function on(el:any, event:string, delegateSelector:string, handler:Function):void;
    function on(el:any, event:string, handler:Function):void;
    function off(el:any, event:string, handler:Function):void;

    function revalidate(el:Element):void;
}

export = jsPlumb