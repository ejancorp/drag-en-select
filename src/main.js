(function () {

    /**
     * @class DragEnSelect
     */
    class DragEnSelect {

        /**
         * create DragEnSelect class
         * @param options
         */
        constructor(options = {
            onDragStart: () => {
            },
            onDragMove: () => {
            },
            onDragEnd: () => {
            },
            onDragSelect: () => {
            }
        }) {

        }

        bind_events() {
            document.addEventListener('selectstart', this.on_select_start.bind(this));
            document.addEventListener('mouseup', this.on_mouse_up.bind(this));
            document.addEventListener('mousedown', this.on_mouse_down.bind(this));
            document.addEventListener('mousemove', this.on_mouse_move.bind(this));

        }

        /**
         * Handle selectstart event
         * @param event
         */
        on_select_start(event) {
            event.preventDefault();
        }

        /**
         * Handle mouseup event
         * @param event
         */
        on_mouse_up(event) {
            document.removeEventListener('mousemove');
            document.removeEventListener('mouseup');
        }

        /**
         * Handle mousedown event
         * @param event
         */
        on_mouse_down(event) {

        }

        /**
         * Handle mousemove event
         * @param event
         */
        on_mouse_move(event) {

        }


        attach() {
            var dragbox = document.createElement('div');
            var isDragCancelled = false;
            var startX, startY;
            var selectItems;

            document.body.appendChild(dragbox);

            document.addEventListener('selectstart', function (e) {
                e.preventDefault();
            });

            document.addEventListener('mousedown', function (e) {
                isDragCancelled = false;
                startX = e.pageX;
                startY = e.pageY;

                selectItems = document.querySelectorAll('.selectable');

                selectItems = Array.prototype.map.call(selectItems, function (element) {
                    return {
                        element: element,
                        isSelected: element.classList.contains('is-selected')
                    };
                });

                document.addEventListener('mouseup', handleMouseUp);
                setTimeout(function () {
                    if (isDragCancelled) {
                        return;
                    }

                    document.addEventListener('mousemove', handleMouseMove);
                }, 100);
            });

            function handleMouseMove(e) {
                var x = e.pageX;
                var y = e.pageY;
                var top = Math.min(startY, y);
                var left = Math.min(startX, x);
                var width = Math.abs(startX - x);
                var height = Math.abs(startY - y);

                dragbox.setAttribute('style',
                    'position: absolute;' +
                    'border: 1px solid rgba(166, 193, 255, .8);' +
                    'background: rgba(166, 193, 255, .3);' +
                    'left:' + left + 'px;' + 'top:' + top + 'px;' +
                    'width:' + width + 'px;' + 'height:' + height + 'px;'
                );

                selectItems.forEach(function (selectItem) {
                    var el = selectItem.element;

                    if (
                        el.offsetLeft >= left
                        && el.offsetTop >= top
                        && el.offsetLeft + el.offsetWidth <= left + width
                        && el.offsetTop + el.offsetHeight <= top + height
                    ) {
                        selectItem.isSelected
                            ? el.classList.remove('is-selected')
                            : el.classList.add('is-selected');
                    } else {
                        selectItem.isSelected
                            ? el.classList.add('is-selected')
                            : el.classList.remove('is-selected');
                    }
                });
            }

            function handleMouseUp() {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                isDragCancelled = true;
                dragbox.style.display = 'none';
                selectItems = [];
            }
        }

        test() {

            const con = document.getElementById('element-container');
            const box = document.getElementById('el-box');

            var mouse = {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0
            };

            function setMousePosition(e) {
                var ev = e || window.event; //Moz || IE
                if (ev.pageX) { //Moz
                    mouse.x = ev.pageX + window.pageXOffset;
                    mouse.y = ev.pageY + window.pageYOffset;
                } else if (ev.clientX) { //IE
                    mouse.x = ev.clientX + document.body.scrollLeft;
                    mouse.y = ev.clientY + document.body.scrollTop;
                }
            };

            var x, y;
            con.addEventListener('mousemove', (e) => {
                x = e.clientX;
                y = e.clientY;
                box.style.position = 'absolute';
                if (typeof x !== 'undefined') {
                    box.style.left = (x - 10) + "px";
                    box.style.top = (y - 10) + "px";
                }
            }, false);

            box.addEventListener('dragstart', (e) => {
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
            }, false);

            box.addEventListener('dragend', (e) => {
                box.style.width = '10px';
                box.style.height = '10px';
                x = e.clientX;
                y = e.clientY;
            }, false);

            box.addEventListener('drag', (e) => {

                setMousePosition(e);

                box.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                box.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                box.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                box.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

            }, false);
        }
    }

    window || (window = {});
    window.DragEnSelect || (window.DragEnSelect = {});
    window.DragEnSelect = DragEnSelect;

    const app = new DragEnSelect();
    app.attach();

    //
    // const container = document.getElementById('element-container');
    //
    // const pointerEventToXY = function (e) {
    //     const out = {x: 0, y: 0};
    //     if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
    //         const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    //         out.x = touch.pageX;
    //         out.y = touch.pageY;
    //     } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
    //         out.x = e.pageX;
    //         out.y = e.pageY;
    //     }
    //     return out;
    // };
    //
    // container.addEventListener("touchstart", (e) => {
    //
    //     const pos = pointerEventToXY(e);
    //
    // }, false);
    //
    // container.addEventListener("touchmove", (event) => {
    //     console.log(event);
    // }, false);
    //
    //
    // function initDraw(canvas) {
    //     function setMousePosition(e) {
    //         var ev = e || window.event; //Moz || IE
    //         if (ev.pageX) { //Moz
    //             mouse.x = ev.pageX + window.pageXOffset;
    //             mouse.y = ev.pageY + window.pageYOffset;
    //         } else if (ev.clientX) { //IE
    //             mouse.x = ev.clientX + document.body.scrollLeft;
    //             mouse.y = ev.clientY + document.body.scrollTop;
    //         }
    //     };
    //
    //     var mouse = {
    //         x: 0,
    //         y: 0,
    //         startX: 0,
    //         startY: 0
    //     };
    //     var element = null;
    //
    //     canvas.onmousemove = function (e) {
    //         setMousePosition(e);
    //         if (element !== null) {
    //             element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
    //             element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
    //             element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
    //             element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
    //         }
    //     }
    //
    //     canvas.onclick = function (e) {
    //         if (element !== null) {
    //             element = null;
    //             canvas.style.cursor = "default";
    //             console.log("finsihed.");
    //         } else {
    //             console.log("begun.");
    //             mouse.startX = mouse.x;
    //             mouse.startY = mouse.y;
    //             element = document.createElement('div');
    //             element.className = 'rectangle'
    //             element.style.left = mouse.x + 'px';
    //             element.style.top = mouse.y + 'px';
    //             canvas.appendChild(element)
    //             canvas.style.cursor = "crosshair";
    //         }
    //     }
    // }

})();
