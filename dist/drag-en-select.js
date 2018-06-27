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
        function DragEnSelect() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                onDragStart: function onDragStart() {},
                onDragMove: function onDragMove() {},
                onDragEnd: function onDragEnd() {},
                onDragSelect: function onDragSelect() {}
            };

            _classCallCheck(this, DragEnSelect);
        }

        _createClass(DragEnSelect, [{
            key: 'attach',
            value: function attach() {

                var con = document.getElementById('element-container');
                var box = document.getElementById('el-box');

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };

                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) {
                        //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) {
                        //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var x, y;
                window.addEventListener('mousemove', function (e) {
                    x = e.clientX;
                    y = e.clientY;
                    if (typeof x !== 'undefined') {
                        box.style.left = x + "px";
                        box.style.top = y + "px";
                    }
                }, false);

                box.addEventListener('dragstart', function (e) {
                    mouse.startX = mouse.x;
                    mouse.startY = mouse.y;
                }, false);

                box.addEventListener('drag', function (e) {

                    setMousePosition(e);

                    box.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                    box.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                    box.style.left = mouse.x - mouse.startX < 0 ? mouse.x + 'px' : mouse.startX + 'px';
                    box.style.top = mouse.y - mouse.startY < 0 ? mouse.y + 'px' : mouse.startY + 'px';
                }, false);
            }
        }]);

        return DragEnSelect;
    }();

    window || (window = {});
    window.DragEnSelect || (window.DragEnSelect = {});
    window.DragEnSelect = DragEnSelect;

    var app = new DragEnSelect();
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