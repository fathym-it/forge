(function() {

    "use strict";

    var root = this;

    var _toolkits = {},
        _surfaces = {},
        _workQueues = {},
        _handlers = {
            "palette": function (surface, params) {
                surface.registerDroppableNodes({
                    droppables: params.element.querySelectorAll(params.selector),
                    dragOptions: params.dragOptions,
                    typeExtractor: params.typeExtractor,
                    dataGenerator: params.dataGenerator,
                    locationSetter: params.locationSetter,
                    dragOptions: {
                        zIndex: 50000,
                        cursor: "move",
                        clone: true
                    }
                });
            },
            "miniview": function (surface, params) {
                var miniview = surface.createMiniview({
                    container: params.container
                });
                surface.getToolkit().bind("dataLoadEnd", function() {
                    miniview.invalidate();
                });

                surface.getToolkit().bind("nodeAdded", function(params) {
                    miniview.invalidate(params.node.id);
                });
            }
        },
        _addToWorkQueue = function (surfaceId, params, handler) {
            var s = _surfaces[surfaceId];
            if (s) {
                handler(s, params);
            }
            else {
                _workQueues[surfaceId] = _workQueues[surfaceId] || [];
                _workQueues[surfaceId].push([params, handler]);
            }
        };

    /**
     * jsPlumb Toolkit Vue 2 integration.
     *
     * @class jsPlumbToolkit.Vue
     */
    root.jsPlumbToolkit.Vue = {
        addToolkit:function(id, toolkitParams) {
            id = id || jsPlumbUtil.uuid();
            var toolkit = jsPlumbToolkit.newInstance(toolkitParams || {});
            _toolkits[id] = toolkit;
            toolkit._vueId = id;
            return toolkit;
        },
        addSurface:function(toolkit, surfaceId, container, renderParams, view) {
            var rp = jsPlumb.extend(renderParams || {}, {
                container:container,
                view:view || {}
            });

            var surface = toolkit.render(rp);
            surface._vueId = surfaceId;
            _surfaces[surfaceId] = surface;

            if (_workQueues[surfaceId]) {
                for (var i = 0; i <_workQueues[surfaceId].length; i++) {
                    try {
                        _workQueues[surfaceId][i][1](surface, _workQueues[surfaceId][i][0]);
                    }
                    catch (e) {
                        if (typeof console != "undefined")
                            console.log("Cannot create component " + e);
                    }
                }
            }
            delete _workQueues[surfaceId];

            return surface;
        },
        /**
         * Add a component to the Surface with the given id. If the Surface already exists and has been initialised the component
         * will be added immediately; otherwise it will be enqueued for later processing.
         * @method addComponent
         * @param {String} surfaceId ID of the Surface to add the component to.
         * @param {Object} params Constructor parameters for the component.
         * @param {String} type Type of component to add.
         */
        addComponent : function (surfaceId, params, type) {
            _addToWorkQueue(surfaceId, params, _handlers[type]);
        },
        /**
         * Add a Palette to the Surface with the given id. If the Surface already exists and has been initialised the Palette
         * will be added immediately; otherwise it will be enqueued for later processing. This is really just a wrapper around
         * addComponent.
         * @method addPalette
         * @param {String} surfaceId ID of the Surface to add the Palette to.
         * @param {Object} params Constructor parameters for the Palette.
         */
        addPalette:function(surfaceId, params) {
            this.addComponent(surfaceId, params, "palette");
        },

        /**
         * Add a Miniview to the Surface with the given id. If the Surface already exists and has been initialised the Miniview
         * will be added immediately; otherwise it will be enqueued for later processing. This is just a wrapper around addComponent.
         * @method addMiniview
         * @param {String} surfaceId ID of the Surface to add the Miniview to.
         * @param {Object} params Constructor parameters for the Miniview.
         */
        addMiniview : function (surfaceId, params) {
            this.addComponent(surfaceId, params, "miniview");
        },

        /**
         * Provides a mixin you can use to create a component that controls a set of droppable nodes for a Surface.
         *
         * Usage:
         *
         * ```
         * Vue.component('my-palette', {
         *  props:[ "nodeTypes" ],
         *  mixins:[ jsPlumbToolkit.Vue.Palette ],
         *  selector:'[data-type]',
         *  template:'<ul><li v-for="node in nodeTypes" :data-type="type">{{label}}</li></ul>',
         *  methods:{
         *      typeExtractor: function (el) {
         *          return el.getAttribute("jtk-node-type");
         *      },
         *      dataGenerator: function (type) {
         *          return { w:120, h:80 };
         *      }
         *  }
         * })
         * ```
         *
         * @class Vue2 palette mixin
         * @param {String} surfaceId ID of the Surface to configure the palette to drop to.
         */
        Palette : {
            props:["surfaceId", "selector"],
            mounted:function() {
                var self = this;
                jsPlumbToolkit.Vue.addPalette(this.surfaceId, {
                    element:self.$el,
                    selector:self.selector,
                    dataGenerator:self.dataGenerator,
                    typeExtractor:self.typeExtractor
                });
            }
        }
    };

    /**
     * jsPlumb Toolkit component, offering a Toolkit instance and a Surface widget.
     *
     * Usage:
     *
     * ```
     * <jsplumb-toolkit id="toolkitId" surface-id="surfaceId"
     *  v-bind:renderParams="someObject" v-bind:toolkitParams="someObject" v-bind:view="someObject"></jsplumb-toolkit>
     *
     * ```
     *
     * @class Vue 2 jsplumb-toolkit component
     * @constructor
     * @param {String} id ID of the Toolkit.
     * @param {String} surfaceId ID to assign to the generated Surface. Required if you wish to attach a Palette or Miniview.
     * @param {Object} [renderParams] Optional parameters for the Surface constructor
     * @param {Object} [toolkitParams] Optional parameters for the Toolkit constructor
     * @param {Object} [view] Optional view spec (optional, but you'll almost certainly want to provide one)
     * @param {String} [url] Optional URL for initial data to load.
     * @param {Object} [data] Optional initial data to load.
     */
    Vue.component('jsplumb-toolkit', {
        props: [ "data", "renderParams", "toolkitParams", "view", "url", "id", "surfaceId" ],
        template: '<div style="width:100%;height:100%;"></div>',
        mounted:function() {
            var self = this;
            var toolkit = jsPlumbToolkit.Vue.addToolkit(self.id, self.toolkitParams);

            if (self.url) {
                toolkit.load({
                    url: self.url
                });
            } else if (self.data) {
                toolkit.load({
                    data: self.data
                });
            }

            this.toolkit = toolkit;
            this.surface = jsPlumbToolkit.Vue.addSurface(toolkit, self.surfaceId, self.$el, self.renderParams, self.view);
        }
    });

    /**
     * Provides a miniview component. You must provide `surface-id` as an attribute to this component: it identifies the
     * Surface to which to attach the Miniview. You can, optionally, also provide `class-name`, to set a class on the
     * Miniview container's div.
     *
     * Usage:
     *
     * ```
     * <jsplumb-miniview surface-id="surfaceId" class-name="my-miniview-class"></jsplumb-miniview>
     * ```
     *
     * @class Vue 2 jsplumb-miniview component
     * @param {String} surfaceId ID of the Surface to attach the miniview to.
     * @param {String} [className] Optional class name to set on the miniview container element.
     */

    Vue.component('jsplumb-miniview', {
        props:["surfaceId", "className"],
        template:'<div v-bind:class="className"></div>',
        mounted:function() {
            var self = this;
            jsPlumbToolkit.Vue.addMiniview(self.surfaceId, {
                container:self.$el
            });
        }
    });

    // if (typeof exports !== "undefined" && typeof exports.jsPlumbToolkit !== "undefined") {
    //     exports.jsPlumbToolkit.Vue = 
    // }

}).call(typeof window !== 'undefined' ? window : this);