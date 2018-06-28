(() => {

    /**
     * @class DragEnSelect
     */
    class DragEnSelect {

        /**
         * create DragEnSelect class
         * @param options
         */
        constructor(options) {

            const defaults = {
                selection: '.selection',
                selected_class_name: 'selected',
                select_box_class_name: 'select-box',
                update_selection: false,
                on_select_start: () => {
                },
                on_select_progress: () => {
                },
                on_select_end: () => {
                },
            };
            this.options = this.set_options(defaults, options);

            this.is_dragging = [];
            this.selection_items = [];
            this.start_x = 0;
            this.start_y = 0;

            this.select_box = document.createElement('div');
        }

        /**
         * Extends defaults with new options
         * @param defaults
         * @param options
         */
        set_options(defaults, options) {
            let prop;
            const extended = {};
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
        attach() {

            this.build_select_box();

            this.hide_select_box();

            this.bind_events();

            document.getElementsByTagName('body')[0].appendChild(this.select_box);
        }

        /**
         * Build select box style and class name
         */
        build_select_box() {
            this.select_box.className = this.options.select_box_class_name;
            this.select_box.style.position = 'absolute';
            this.select_box.style.left = '0';
            this.select_box.style.top = '0';
            this.select_box.style.width = '0';
            this.select_box.style.height = '0';
        }

        show_select_box() {
            this.select_box.style.display = 'block';
        }

        hide_select_box() {
            this.select_box.style.display = 'none';
        }

        /**
         * Bind events immediately
         */
        bind_events() {
            document.addEventListener('selectstart', this.on_select_start.bind(this));
            document.addEventListener('mousedown', this.on_mouse_down.bind(this));
        }

        /**
         * Handle selectstart event
         * @param event
         */
        on_select_start(event) {
            event.preventDefault();
        }

        /**
         * Handle mousedown event
         * @param event
         */
        on_mouse_down(event) {
            this.is_dragging = true;
            this.start_x = event.pageX;
            this.start_y = event.pageY;

            this.selection_items = this.build_items(document.querySelectorAll(this.options.selection));

            this.build_select_box();
            this.show_select_box();

            this.options.on_select_start.call(null, this.selection_items);

            document.addEventListener('mouseup', this.on_mouse_up.bind(this));

            setTimeout(() => {
                if (!this.is_dragging) return false;
                document.addEventListener('mousemove', this.on_mouse_move.bind(this));
            }, 100);
        }

        /**
         * Handle mouseup event
         * @param event
         */
        on_mouse_up(event) {

            this.options.on_select_progress.call(null, this.selection_items);

            this.is_dragging = false;
            this.selection_items = [];

            this.hide_select_box();

            document.removeEventListener('mousemove', this.on_mouse_move.bind(this));
            document.removeEventListener('mouseup', this.on_mouse_up.bind(this));
        }

        /**
         * Handle mousemove event
         * @param event
         */
        on_mouse_move(event) {
            const x = event.pageX;
            const y = event.pageY;
            const top = Math.min(this.start_y, y);
            const left = Math.min(this.start_x, x);
            const width = Math.abs(this.start_x - x);
            const height = Math.abs(this.start_y - y);

            this.select_box.style.top = `${top}px`;
            this.select_box.style.left = `${left}px`;
            this.select_box.style.width = `${width}px`;
            this.select_box.style.height = `${height}px`;

            this.set_selected_items(top, left, width, height);

            this.options.on_select_progress.call(null, this.selection_items);
        }

        /**
         * Set class name of selected items
         * @param top
         * @param left
         * @param width
         * @param height
         */
        set_selected_items(top, left, width, height) {
            this.selection_items.forEach((selected_item) => {
                if (this.is_element_selected(selected_item.element, top, left, width, height)) {
                    selected_item.is_selected
                        ? selected_item.element.classList.remove(this.options.selected_class_name)
                        : selected_item.element.classList.add(this.options.selected_class_name)
                } else {
                    selected_item.is_selected
                        ? selected_item.element.classList.add(this.options.selected_class_name)
                        : selected_item.element.classList.remove(this.options.selected_class_name)
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
        is_element_selected(element, top, left, width, height) {
            return element.offsetLeft >= left
                && element.offsetTop >= top
                && element.offsetLeft + element.offsetWidth <= left + width
                && element.offsetTop + element.offsetHeight <= top + height;
        }

        /**
         * Build selected an non selected items
         * @param items
         * @return {any[]}
         */
        build_items(items) {
            return Array.prototype.map.call(items, (element) => {

                if (!this.options.update_selection) {
                    element.classList.remove(this.options.selected_class_name)
                }

                return {
                    element: element,
                    is_selected: element.classList.contains(this.options.selected_class_name)
                };
            });
        }
    }

    window || (window = {});
    window.DragEnSelect || (window.DragEnSelect = {});
    window.DragEnSelect = DragEnSelect;

})();
