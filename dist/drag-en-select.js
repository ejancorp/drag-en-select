'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    /**
     * @class DragEnSelect
     */
    var DragEnSelect = function () {

        /**
         * create DragEnSelect class
         * @param options
         */
        function DragEnSelect(options) {
            _classCallCheck(this, DragEnSelect);

            var defaults = {
                selection: '.selection',
                selected_class_name: 'selected',
                select_box_class_name: 'select-box'
            };
            this.options = this.set_options(defaults, options);

            this.is_dragging = [];
            this.selected_items = [];
            this.start_x = 0;
            this.start_y = 0;

            this.select_box = document.createElement('div');
        }

        /**
         * Extends defaults with new options
         * @param defaults
         * @param options
         */


        _createClass(DragEnSelect, [{
            key: 'set_options',
            value: function set_options(defaults, options) {
                var prop = void 0;
                var extended = {};
                for (prop in defaults) {
                    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                        extended[prop] = defaults[prop];
                    }
                }
                for (prop in options) {
                    if (Object.prototype.hasOwnProperty.call(options, prop)) {
                        extended[prop] = options[prop];
                    }
                }
                return extended;
            }

            /**
             * Enable to drag and select plugin
             */

        }, {
            key: 'attach',
            value: function attach() {

                this.build_select_box();

                this.hide_select_box();

                this.bind_events();

                document.getElementsByTagName('body')[0].appendChild(this.select_box);
            }

            /**
             * Build select box style and class name
             */

        }, {
            key: 'build_select_box',
            value: function build_select_box() {
                this.select_box.className = this.options.select_box_class_name;
                this.select_box.style.position = 'absolute';
                this.select_box.style.left = '0';
                this.select_box.style.top = '0';
                this.select_box.style.width = '0';
                this.select_box.style.height = '0';
            }
        }, {
            key: 'show_select_box',
            value: function show_select_box() {
                this.select_box.style.display = 'block';
            }
        }, {
            key: 'hide_select_box',
            value: function hide_select_box() {
                this.select_box.style.display = 'none';
            }

            /**
             * Bind events immediately
             */

        }, {
            key: 'bind_events',
            value: function bind_events() {
                document.addEventListener('selectstart', this.on_select_start.bind(this));
                document.addEventListener('mousedown', this.on_mouse_down.bind(this));
            }

            /**
             * Handle selectstart event
             * @param event
             */

        }, {
            key: 'on_select_start',
            value: function on_select_start(event) {
                event.preventDefault();
            }

            /**
             * Handle mousedown event
             * @param event
             */

        }, {
            key: 'on_mouse_down',
            value: function on_mouse_down(event) {
                var _this = this;

                this.is_dragging = true;
                this.start_x = event.pageX;
                this.start_y = event.pageY;

                this.selected_items = this.build_items(document.querySelectorAll(this.options.selection));

                this.build_select_box();
                this.show_select_box();

                document.addEventListener('mouseup', this.on_mouse_up.bind(this));

                setTimeout(function () {
                    if (!_this.is_dragging) return false;
                    document.addEventListener('mousemove', _this.on_mouse_move.bind(_this));
                }, 100);
            }

            /**
             * Handle mouseup event
             * @param event
             */

        }, {
            key: 'on_mouse_up',
            value: function on_mouse_up(event) {
                this.is_dragging = false;
                this.selected_items = [];

                this.hide_select_box();

                document.removeEventListener('mousemove', this.on_mouse_move.bind(this));
                document.removeEventListener('mouseup', this.on_mouse_up.bind(this));
            }

            /**
             * Handle mousemove event
             * @param event
             */

        }, {
            key: 'on_mouse_move',
            value: function on_mouse_move(event) {
                var x = event.pageX;
                var y = event.pageY;
                var top = Math.min(this.start_y, y);
                var left = Math.min(this.start_x, x);
                var width = Math.abs(this.start_x - x);
                var height = Math.abs(this.start_y - y);

                this.select_box.style.top = top + 'px';
                this.select_box.style.left = left + 'px';
                this.select_box.style.width = width + 'px';
                this.select_box.style.height = height + 'px';

                this.set_selected_items(top, left, width, height);
            }

            /**
             * Set class name of selected items
             * @param top
             * @param left
             * @param width
             * @param height
             */

        }, {
            key: 'set_selected_items',
            value: function set_selected_items(top, left, width, height) {
                var _this2 = this;

                this.selected_items.forEach(function (selected_item) {
                    if (_this2.is_element_selected(selected_item.element, top, left, width, height)) {
                        selected_item.is_selected ? selected_item.element.classList.remove(_this2.options.selected_class_name) : selected_item.element.classList.add(_this2.options.selected_class_name);
                    } else {
                        selected_item.is_selected ? selected_item.element.classList.add(_this2.options.selected_class_name) : selected_item.element.classList.remove(_this2.options.selected_class_name);
                    }
                });
            }

            /**
             * Check if element is under the selection
             * @param element
             * @param top
             * @param left
             * @param width
             * @param height
             * @return {boolean}
             */

        }, {
            key: 'is_element_selected',
            value: function is_element_selected(element, top, left, width, height) {
                return element.offsetLeft >= left && element.offsetTop >= top && element.offsetLeft + element.offsetWidth <= left + width && element.offsetTop + element.offsetHeight <= top + height;
            }

            /**
             * Build selected an non selected items
             * @param items
             * @return {any[]}
             */

        }, {
            key: 'build_items',
            value: function build_items(items) {
                var _this3 = this;

                return Array.prototype.map.call(items, function (element) {
                    return {
                        element: element,
                        is_selected: element.classList.contains(_this3.options.selected_class_name)
                    };
                });
            }
        }]);

        return DragEnSelect;
    }();

    window || (window = {});
    window.DragEnSelect || (window.DragEnSelect = {});
    window.DragEnSelect = DragEnSelect;
})();