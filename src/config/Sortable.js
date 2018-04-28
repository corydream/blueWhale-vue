/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */
import datas from './datas';
import { pubMethod } from './public';
import { Message, Loading } from 'iview';
import { setTimeout } from 'timers';
import moment from 'moment';
var isLock = true;

(function sortableModule(factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window == "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
					;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
						);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
		;


	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}
		$("#num-advanced-2,#dim-advanced-2").on("click",">li .js-select",function(ev){
			var e=ev||window.event;
			e.preventDefault();
			// fa-sort-up
			// $("#num-advanced-2>li,#dim-advanced-2>li").removeClass("current");
			if(isLock){
				isLock = false;
				if(!$(this).parents('li').hasClass("current")){
					$("#num-advanced-2>li,#dim-advanced-2>li").each((_v,item)=>{
						if($(item).hasClass('current')){
							$(item).find('.js-select').find('i').css({
								top:'-3px',
								transform:'rotate(0deg)'
							}).parents('li').removeClass("current");
							$(item).children('ul').slideUp("fast");
						}
					})
					$(this).find('i').css({
						top:'3px',
						transform:'rotate(180deg)'
					}).parents('li').addClass("current");
					$(this).parents('li').children('ul').slideDown("fast");
				}else{
					$(this).find('i').css({
						top:'-3px',
						transform:'rotate(0deg)'
					}).parents('li').removeClass("current");
					$(this).parents('li').children('ul').slideUp("fast");
				}
				setTimeout(_=>{
					isLock = true;
				},100)
			}

		});
		// $(document).on("click",function(ev){
			// console.log($(this))
			// $("#num-advanced-2>li,#dim-advanced-2>li").removeClass("current");
		// });
		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0}
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		_on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}


			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				if($(dragEl).parent().hasClass('dim-advanced-origin')||$(dragEl).parent().hasClass('num-advanced-origin')){
					dragEl.style['will-change'] = 'transform';
					dragEl.style['width'] = '80%';
					dragEl.style['background-image'] = 'linear-gradient(90deg,#5dc9f4,#4ba6e9)';
					dragEl.style['border-radius'] = '20px';
					dragEl.style['height'] = '28px';
					dragEl.style['line-height'] = '28px';
				}
				else{
					dragEl.style['will-change'] = '';
					dragEl.style['will-change'] = 'transform';
				}

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'pointercancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					setTimeout(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
						/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';
				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.checkPull(this, this, dragEl, evt)) {
				cloneEl = _clone(dragEl);
				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';
				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, this.options.chosenClass, false);

				rootEl.insertBefore(cloneEl, dragEl);
				_dispatchEvent(this, rootEl, 'clone', dragEl);
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
					_on(document, 'pointermove', this._onTouchMove);
					_on(document, 'pointerup', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			};

			if (dragEl.animated) {
				return;
			};

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
						: ( putSortable === this || ( (activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					/*if (cloneEl || nextEl) {
					 rootEl.insertBefore(dragEl, cloneEl || nextEl);
					 } else if (!canSort) {
					 rootEl.appendChild(dragEl);
					 }*/
					return;
				};

				if ((el.children.length === 0) || (el.children[0] === ghostEl) || (el === evt.target) && (_ghostIsLast(el, evt))) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					};

					if (target) {
						if (target.animated) {
							return;
						};
						targetRect = target.getBoundingClientRect();
					};

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							/*el.appendChild(dragEl);
							 parentEl = el; */// actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					};

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
					} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						/*if (!dragEl.contains(el)) {
						 if (after && !nextSibling) {
						 el.appendChild(dragEl);
						 } else {
						 target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
						 }
						 }*/
						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},
		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				// _css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDropNew:function(/**Event*/evt,dragEl){
			var fatherID=this._getFatherIDByPath(evt);
			var fromID=dragEl.parentNode.getAttribute("id");
			if(fatherID==null)	
			{
				console.log("fatherID is null");
				return;
			}			
			var obj=this._getReclosing(evt,dragEl,fatherID);
			//重合
			var uuid=dragEl.getAttribute("data-id");
			dragEl.style = '';
			
			
			var dimArr = [];
			// if(fatherID == fromID){
			// 	return false;
			// }
			$("#dim-advanced-2>li").each(function(i,item){
				dimArr.push($(item).attr('data-id'))
			})

			var dimid = $(obj.recloseItem).attr('data-id');
			if(dimArr.indexOf(dimid)>0){
				pubMethod.adalert('只能钻取第一个维度');
			}
			if(!this._checkDrill()){
				datas.datas.drillAction=true;

			}else
			{
				datas.datas.drillAction=false;
			}

			if((fatherID=="dim-advanced-2" && fromID=="dim-advanced-1") || (fromID=="dim-advanced-2" && fatherID=="dim-advanced-2")){
				if(!this._checkDrill()){
					//adalert("请先删除所有下钻维度");
					datas.datas.drillAction=true;
					return;
				};
				if(obj.hasRecloseItem){
					if(dragEl.parentNode.getAttribute("id")=="dim-advanced-2"){
						$(dragEl).remove();
					};
					this._addDrillingLine(dragEl,obj.recloseItem);
					if(!this._checkDrill()){
						datas.datas.drillAction=true;

					}else
					{
						datas.datas.drillAction=false;
					}
				}else{
					datas.datas.drillAction=false;
					// $(".page-echart-item .chart-graph").eq(index-1).show();
					// $(".page-echart-item").hide();
					datas.datas.tableCalculateData.totalColumnAll = false;
					datas.datas.tableCalculateData.totalChartAll = false;
					untablesMerge();
					datas.datas.grayImgIndex = 0;
					datas.datas.showStyle.forEach((item,v)=>{
						if(v == 0){
							item.active = true;
						}else{
							item.active = false;
						}
					})
					if(obj.hasRightItem){
						this._sortColumn(obj.rightItem,uuid,dragEl,fatherID);
						pubMethod.regenerateTabel(false);
						
					};
					if(!this._repeatedDimension(uuid,fatherID)){
						this._appendDimension(uuid,fatherID);
						pubMethod.regenerateTabel(false);
					};
				}
			}else if((fatherID=="dim-advanced-3") ) {
				if(this._repeatedDimension(uuid,'dim-advanced-4')){
					Message.error({
						content:'下钻字段暂无法进行筛选',
						duration:2,
						closable:true
					})
					return false; 
				}
				if(!this._repeatedDimension(uuid,fatherID)){
					pubMethod.saveConditionInfo(uuid);
					var current=this._getCoditionDirection(evt,dragEl,fatherID);
					this._sortCondition(uuid,current,false);
				}else {
					var current=this._getCoditionDirection(evt,dragEl,fatherID);
					if(current.direction!="null")
					{
						$(dragEl).remove();
					}
					this._sortCondition(uuid,current,true);
				}
			}else if(fatherID=="dim-advanced-4" && fromID=="dim-advanced-1") {
				if(this._repeatedDimension(uuid,fatherID)){
					return ;
				}
				if(this._repeatedDimension(uuid,'dim-advanced-3')){
					Message.error({
						content:'该字段下钻错误,请先移出数据筛选',
						duration:2,
						closable:true
					})
					return false;
				}
				
				if(obj.hasRecloseItem){
					this._addDrillingLine(dragEl,obj.recloseItem);
					///datas.datas.drillAction=true;
					///regenerateTabel(false);
				};
			}else if((fatherID=="num-advanced-2" && fromID=="num-advanced-1") || (fatherID=="num-advanced-2" && fromID=="num-advanced-2")){
				datas.datas.tableCalculateData.totalColumnAll = false;
				datas.datas.tableCalculateData.totalChartAll = false;
				untablesMerge();
				// $(".page-echart-item").hide();
				datas.datas.grayImgIndex = 0;
				datas.datas.showStyle.forEach((item,v)=>{
					if(v == 0){
						item.active = true;
					}else{
						item.active = false;
					}
				})
				$(".page-echart-item .chart-graph").hide();
				if(obj.hasRightItem){
					this._sortColumn(obj.rightItem,uuid,dragEl,fatherID);
					this.addTableColumns(dragEl.getAttribute("data-id"),dragEl.innerText,dragEl.getAttribute("data-mark"));
					pubMethod.regenerateTabel(false);
				}else{
					if(!this._repeatedDimension(uuid,fatherID)){
						this._appendDimension(uuid,fatherID,dragEl.getAttribute("data-mark"),null,dragEl.getAttribute("data-aggTypes"));
						this.addTableColumns(dragEl.getAttribute("data-id"),dragEl.innerText,dragEl.getAttribute("data-mark"));
						
						pubMethod.regenerateTabel(false);
					};
				};
			}
			// else if(fatherID=="dim-advanced-2" && $(dragEl).attr('data-absolute')){
			// 	pubMethod.saveConditionInfo(uuid);
			// 	var current=this._getCoditionDirection(evt,dragEl,fatherID);
			// 	this._sortCondition(uuid,current,false);	
			// }
		},

		_checkDrill()
		{
			var itemArray=$("#dim-advanced-4>li");
			if(itemArray.length>0)
			{
				return false;
			}

			return true;
		},
		globalfindObj(id){
			var resultObj=null;
			for(var key in datas.originalData.data.data){
				datas.originalData.data.data[key].forEach(function(item,index){
					if(item.uuid==id){
						resultObj=item;
					};
				});
			};
			return resultObj;
		},
		addTableColumns(uuid,chinese,str){
			// debugger;
			let totalItemObj = {
				uuid:uuid,
				name:$.trim(chinese),
				options:[]
			};
			datas.datas.numericalListAry.map(v=>{
				if(v.uuid == uuid){
					v.aggTypes.map(v_a=>{
						if(v_a == 'COUNTDISTINCT' || v_a == 'SUM'){
							totalItemObj.options.push({
								name:"列总数",
								value:v_a,
								selected:true
							})
						}
						else if(v_a == "AVG"){
							totalItemObj.options.push({
								name:"列平均数",
								value:v_a,
								selected:false
							})
						}
						else if(v_a == "MAX"){
							totalItemObj.options.push({
								name:"列最大值",
								value:v_a,
								selected:false
							})
						}
						else if(v_a == "MIN"){
							totalItemObj.options.push({
								name:"列最小值",
								value:v_a,
								selected:false
							})
						}
					})
				}
			})
			// let totalItemObj={
			// 	uuid:uuid,
			// 	name:chinese,
			// 	options:[
			// 		{
			// 			name:"列总数",
			// 			value:"SUM",
			// 			selected:true
			// 		},{
			// 			name:"列平均数",
			// 			value:"AVG",
			// 			selected:false
			// 		},{
			// 			name:"列最大值",
			// 			value:"MAX",
			// 			selected:false
			// 		},{
			// 			name:"列最小值",
			// 			value:"MIN",
			// 			selected:false
			// 		}
			// 	]
			// };
			let hasItem=false;
			datas.datas.tableCalculateData.totalColumns.forEach(function(o,l){
				if(uuid == o.uuid){
					hasItem=true;
				}
			});
			if(!hasItem){
				if(str != 'true'){
					datas.datas.tableCalculateData.totalColumns.push(totalItemObj);
				}
			}
		},
		_sortColumn(rightItem,uuid,dragEl,fatherID)
		{
			var id="#"+fatherID+">li";
			var parentUuid=dragEl.parentNode.getAttribute("id");
			if(parentUuid!="dim-advanced-1" && parentUuid!="num-advanced-1")
			{
				$(dragEl).remove();
			}
			if($(rightItem).attr("data-id")!=uuid)
			{
				var itemArray=$(id);
				let _this = this;
				for(var i=0;i<itemArray.length;i++)
				{
					var item=itemArray[i];
					var dataId=dragEl.getAttribute("data-id");

					var newItem = this.globalfindObj(dataId);
					if(item.getAttribute("data-id")==rightItem.getAttribute("data-id"))
					{
						if(!this._repeatedDimension(dataId,fatherID))
						{
							var cloneEl=$(dragEl).clone();
							$(rightItem).after(cloneEl);
							if(dragEl.getAttribute("data-mark")!='true'){
								var drillDownHtml=this._getDrillDownHtml(fatherID,dragEl.getAttribute("data-aggTypes"));
								cloneEl.append(drillDownHtml);
								if(dragEl.getAttribute('data-absolute')){
									let objItem=pubMethod.globalfindObj(uuid);
									let columnType=objItem.columnType;
									$("#dim-advanced-1>li").each(function(index,item){
										if($(item).attr("data-id")==uuid  && $(item).attr("data-absolute")){
											var cloneEl=$(dragEl).clone();	
											$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
											$(cloneEl).append(_this._getSelectHtml(columnType,uuid))
											$("#dim-advanced-3").append(cloneEl);
											pubMethod.saveConditionInfo(uuid);
										};
									});
								}
							}

						}

					}

				}
			}

		},
		_getDrillDownHtml:function(fatherId,aggTypes){
			var drillDownHtml='<ul class="drow-down-ul drow-down-ul-one">'+
				'	<li data-val="DEFAULT" class="next-level"><a href="javascript:;">设置排序</a>'+
				'		<ul class="drow-down-ul drow-down-ul-two">'+
				'			<li data-val="DEFAULT"><a href="javascript:;">默认</a></li>'+
				'			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
				'			<li data-val="DESC"><a href="javascript:;">降序</a></li>'+
				'		</ul>'+
				'	</li>'+
				'</ul>';

			if(fatherId=="num-advanced-2"){
				drillDownHtml=' <ul class="drow-down-ul drow-down-ul-one">';
				var obj = {
					SUM:'<li data-val="SUM"><a href="javascript:;">求和</a></li>',
					AVG:'<li data-val="AVG"><a href="javascript:;">平均值</a></li>',
					MAX:'<li data-val="MAX"><a href="javascript:;">最大值</a></li>',
					MIN:'<li data-val="MIN"><a href="javascript:;">最小值</a></li>',
					COUNT:'<li data-val="COUNT"><a href="javascript:;">计数</a></li>',
					COUNTDISTINCT:'<li data-val="COUNTDISTINCT"><a href="javascript:;">去重计数</a></li>',
				}
				if(aggTypes){
					aggTypes.split(',').forEach(item=>{
						drillDownHtml+=obj[item]
					})
				}
				// drillDownHtml+='<li data-val="SUM"><a href="javascript:;">求和</a></li>'+
				// 	'	<li data-val="AVG"><a href="javascript:;">平均值</a></li>'+
				// 	'	<li data-val="MAX"><a href="javascript:;">最大值</a></li>'+
				// 	'	<li data-val="MIN"><a href="javascript:;">最小值</a></li>'+
				// 	/*'	<li data-val="isDistinct"><a href="javascript:;">去重</a></li>'+*/
				// 	'	<li data-val="COUNT"><a href="javascript:;">计数</a></li>';
				drillDownHtml+='	<li data-val="isPercent"><a href="javascript:;">百分比</a></li>'+
				// '	<li data-val="HighCal" class="next-level"><a href="javascript:;">高级计算</a>'+
				// '		<ul class="drow-down-ul drow-down-ul-two">'+
				// '			<li data-val="similarity"><a href="javascript:;">同比</a></li>'+
				// // '			<li data-val="ASC"><a href="javascript:;">环比</a></li>'+
				// '		</ul>'+
				// '	</li>'+
				'	<li data-val="DEFAULT" class="next-level"><a href="javascript:;">设置排序</a>'+
				'		<ul class="drow-down-ul drow-down-ul-two">'+
				'			<li data-val="DEFAULT"><a href="javascript:;">默认</a></li>'+
				'			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
				'			<li data-val="DESC"><a href="javascript:;">降序</a></li>'+
				'		</ul>'+
				'	</li>'+
				'</ul>';
			};
			return drillDownHtml;
		},
		_getReclosing:function(/**Event*/evt,dragEl,fatherID)
		{
			var x=evt.clientX;
			var y=evt.clientY;
			var uuid=dragEl.getAttribute("data-id");
			//console.log("x:",x,",y:",y);

			var ratio=0;

			var obj=new Object();
			obj.rightItem=null;
			obj.hasRightItem=false;
			obj.recloseItem=null;
			obj.hasRecloseItem=false;

			var id="#"+fatherID+">li";
			var itemArray=$(id);

			if(itemArray.length>=2)
			{
				for(var i=0;i<itemArray.length;i++)
				{
					if(i==itemArray.length-1){
						var lastItem=itemArray[itemArray.length-1];
						if(lastItem.getAttribute("data-id")==uuid){
							return obj;
						};
						var ptype=this._checkPosition(lastItem,null,x,y);
						if(ptype==1){
							obj.recloseItem=lastItem;
							obj.hasRecloseItem=true;
							return obj;
						}else if(ptype==2){
							obj.rightItem=lastItem;
							obj.hasRightItem=true;
							return obj;
						};
						break;
					};
					var item=itemArray[i];
					var nextItem=itemArray[i+1];

					if(item.getAttribute("data-id")!=uuid){
						var ptype=this._checkPosition(item,nextItem,x,y);
						if(ptype==1){
							obj.recloseItem=item;
							obj.hasRecloseItem=true;
							return obj;
						}else if(ptype==2){
							obj.rightItem=item;
							obj.hasRightItem=true;
							return obj;
						};
					};
				}

			}else if(itemArray.length==1)
			{

				if(itemArray[0].getAttribute("data-id")==uuid)
				{
					return obj;
				}
				var ptype=this._checkPosition(itemArray[0],null,x,y);
				if(ptype==1)
				{
					obj.recloseItem=itemArray[0];
					obj.hasRecloseItem=true;
					return obj;
				}else if(ptype==2){
					obj.rightItem=itemArray[0];
					obj.hasRightItem=true;
					return obj;
				}
			}


			return obj;
		},

		_getFatherIDByPath(evt)
		{
			var fatherID=evt.target.getAttribute("id");
			if(fatherID==null)
			{
				var pathArray=evt.path;
				for(var key in pathArray)
				{
					if(pathArray[key].getAttribute("id"))
					{
						fatherID =pathArray[key].getAttribute("id");
						return fatherID;
					}
				}
			}else{
				return fatherID;
			}
		},

		_sortCondition(uuid,obj,repeated)
		{
			if(obj.direction=="null")
			{
				return;
			}
			let _this = this;
            let objItem=pubMethod.globalfindObj(uuid);
			let columnType=objItem.columnType;
			if(obj.direction=="none")
			{
				$("#dim-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(cloneEl).append(_this._getSelectHtml(columnType,uuid))
						$("#dim-advanced-3").append(cloneEl);
						if(columnType =="STRING" || columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					};
				});
				$("#num-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$("#dim-advanced-3").append(cloneEl);
						if(columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					}
				})
			}else if(obj.direction=="up")
			{
				var current=obj.item;
				$("#dim-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(cloneEl).append(_this._getSelectHtml(columnType,uuid))
						$(current).before(cloneEl);
						if(columnType =="STRING" || columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					};
				});
				$("#num-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(current).after(cloneEl);
						if(columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					}
				})

			}else if(obj.direction=="down")
			{
				var current=obj.item;
				$("#dim-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(cloneEl).append(_this._getSelectHtml(columnType,uuid))
						$(current).after(cloneEl);
						if(columnType =="STRING" || columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					};
				});
				$("#num-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(current).after(cloneEl);
						if(columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					}
				})
			}
			else if(obj == 'down'){
				//新增判断          
				let objItem=pubMethod.globalfindObj(uuid);
				let columnType=objItem.columnType;
				$("#dim-advanced-1>li").each(function(index,item){
					if($(item).attr("data-id")==uuid){
						var cloneEl= $(item).clone();
						$(".js-remove",cloneEl).before('<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span><span class="set-ico"><i class="fa fa-cog"></i></span>');
						$(cloneEl).append(_this._getSelectHtml(columnType,uuid))
						$("#dim-advanced-3").append(cloneEl);
						pubMethod.saveConditionInfo(uuid);
						if(columnType =="STRING" || columnType == "NUMBER"){
							$(cloneEl).find('.set-ico').click();
						}
					};
				});
			}
			$('#dim-advanced-3').find('li.hint-info').remove();
		},
		_getSelectHtml(str,uuid){
			var html = '<ul class="filter-select">';
			let conditionInfo = datas.datas.conditionMap[uuid];
			if(str =="DATETIME" || str == "DATE"){
				html += `<li class="shortcut-date" data-time="">全部时间</li>`;
				html += `<li class="shortcut-date" data-time="${moment().format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">今天</li>`;
				html += `<li class="shortcut-date" data-time="${moment().subtract(1,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">昨天</li>`;
				html += `<li class="shortcut-date" data-time="${moment().subtract(7,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近7天</li>`;
				html += `<li class="shortcut-date" data-time="${moment().subtract(14,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近14天</li>`;
				html += `<li class="shortcut-date" data-time="${moment().subtract(30,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近30天</li>`;
				html += `<li class="shortcut-date" data-time="${moment().subtract(6,'months').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近半年</li>`;
				html += `<li class="show-popup">自定义时间区间</li>`;
			}
			html += `</ul>`;
			return html;
		},
		_getCoditionDirection(evt,dragEl,fatherID)
		{
			var x=evt.clientX;
			var y=evt.clientY;
			var uuid=dragEl.getAttribute("data-id");

			var id="#"+fatherID+">li";
			var itemArray=$(id);

			var obj=new Object();
			obj.direction="none";
			obj.item=null;

			//	if(uuid==)


			if(itemArray.length>=2)
			{
				for(var i=0;i<itemArray.length;i++)
				{
					if(i==itemArray.length-1){
						var lastItem=itemArray[itemArray.length-1];

						if(lastItem.getAttribute("data-id")==uuid){
							obj.direction="null";
							return obj;
						};
						var ptype=this._checkConditionPosition(lastItem,null,x,y);
						if(ptype==1){
							obj.direction="down";
							obj.item=lastItem;
							return obj;
						}else if(ptype==2){
							obj.direction="up";
							obj.item=lastItem;
							return obj;
						};
						break;
					};
					var item=itemArray[i];
					var nextItem=itemArray[i+1];

					if(item.getAttribute("data-id")!=uuid){
						var ptype=this._checkConditionPosition(item,nextItem,x,y);
						if(ptype==1){
							obj.direction="up";
							obj.item=item;
							return obj;
						}else if(ptype==2){
							obj.direction="down";
							obj.item=item;
							return obj;
						};
					}else{
						obj.direction="null";
						return obj;
					}
				}

			}else if(itemArray.length==1)
			{
				if(uuid==itemArray[0].getAttribute("data-id"))
				{
					obj.direction="null";
					return obj;
				}
				var ptype=this._checkConditionPosition(itemArray[0],null,x,y);
				if(ptype==1)
				{
					obj.direction="up";
					obj.item=itemArray[0];
					return obj;
				}else if(ptype==2){
					obj.direction="down";
					obj.item=itemArray[0];
					return obj;
				}
			}

			return obj;
		},


		_checkConditionPosition(item,nextItem,x,y)
		{
			var height=$(item).outerHeight();
			var scrollTop=$(window).scrollTop();
			var yTop=$(item).offset().top+height*0.2-scrollTop;
			var yBottom=$(item).offset().top-height*0.2-scrollTop;

			if(nextItem){
				var nextHeight=$(nextItem).outerHeight();
				var nextTop=$(nextItem).offset().top+nextHeight*0.2-scrollTop;
				var nextBottom=$(nextItem).offset().top+nextHeight-scrollTop;

				if(y>yBottom && y<nextTop)
				{
					return 1;
				}

			}else{
				if(y>yBottom)
				{
					return 1;
				}else(y<yTop)
				{
					return 2;
				}

			}
			return 3;
		},

		_checkPosition(item,nextItem,x,y)
		{//判断距离关系

			var scrollLeft=$(window).scrollLeft();
			var scrollTop=$(window).scrollTop();

			var xwidth=$(item).outerWidth()+14;
			var xRight=$(item).offset().left+xwidth-scrollLeft;
			var xLeft=$(item).offset().left-scrollLeft;

			var yTop=$(item).offset().top-scrollTop;
			var yBottom=$(item).offset().top+$(item).outerHeight()-scrollTop;

			if(x>xLeft && x<xRight && y>yTop && y<yBottom){
				return 1;
			}

			if(nextItem){
				var nextWidth=$(nextItem).outerWidth();
				var nextRight=$(nextItem).offset().left+nextWidth-scrollLeft;
				var nextLeft=$(nextItem).offset().left-scrollLeft;

				var nextTop=$(nextItem).offset().top-scrollTop;
				var nextBottom=$(nextItem).offset().top+$(nextItem).outerHeight()-scrollTop;

				if(x>=xRight && x<nextLeft)
				{
					return 2;
				}

			}else{
				if(x>=xRight)
				{
					return 2;
				}
			}
			return 3;
		},

		_repeatedDimension:function(dragUuid,fatherID)
		{
			var find=false;
			var id="#"+fatherID+">li";
			$(id).each(function(index,item){
				var uuid=$(item).attr("data-id");
				if(dragUuid==uuid){
					find=true;
					return;
				};
			});
			return find;
		},
		_addDrillingLine:function(dragEl,recloseItem){
			var arrDimenssion = pubMethod.loopNormalDimenssion();
			
			var dataId=dragEl.getAttribute("data-id");

			var ruuid=recloseItem.getAttribute("data-id");
			if($(recloseItem).parents('#dim-advanced-2').length>0){
				if(arrDimenssion[0].uuid != ruuid){
					Message.error({
						content:'只能钻取第一个维度',
						duration:2,
						closable:true
					})
					// this.$Message.error({content: '只能钻取第一个维度',duration: 10,closable: true});
					return false;
				}
			}
			if(this._repeatedDimension(dataId,'dim-advanced-3') || this._repeatedDimension(ruuid,'dim-advanced-3')){
				Message.error({
					content:'该字段下钻错误,请先移出数据筛选',
					duration:2,
					closable:true
				})
				return false;
			}
			if($("#dim-advanced-4>li").length==0){

				this._appendDimension(ruuid,"dim-advanced-4",null,true);


			};

			this._appendDimension(dataId,"dim-advanced-4");



		},


		_appendDimension:function(uuid,fatherID,str,type,aggtypes)
		{
			var _this=this;
			var find=false;
			var appendid="#"+fatherID;
			var drillDownHtml=_this._getDrillDownHtml(fatherID,aggtypes);
			$("#dim-advanced-1>li").each(function(index,item){
				if($(item).attr("data-id")==uuid){
					var cloneEl= $(item).clone();
					if(type){
						if(fatherID=="dim-advanced-2"){
							cloneEl.append(drillDownHtml)
						};
						$(appendid).append(cloneEl);
					}else{
						if(fatherID == 'dim-advanced-4'){
							$(appendid).append('<i class="fa fa-chevron-right" style="margin-right:10px;"></i>').append(cloneEl);
						}else{
							if(fatherID=="dim-advanced-2"){
								cloneEl.append(drillDownHtml)
								
							};
							$(appendid).append(cloneEl);
							if($(item).attr('data-absolute')){
								_this._sortCondition(uuid,'down',false);
								$('#dim-advanced-3').find('li.hint-info').remove();
							}
						}
					}
					var drillNavDataLength = datas.datas.drillNavData.length;
					var drawBackDrillIndex = pubMethod.drawBackDrill().length;
					if(drillNavDataLength < drawBackDrillIndex){
						datas.datas.isDrill = true;
					}
				};
			});
			$("#num-advanced-1>li").each(function(index,item){
				if($(item).attr("data-id")==uuid){
					var cloneEl= $(item).clone();
					if(fatherID=="num-advanced-2"){
						if(str != 'true')cloneEl.append(drillDownHtml)
					}
					// $("#dim-advanced-3").append(cloneEl);
					// 2017-12-19
					// else if(fatherID=="dim-advanced-3"){};
					$(appendid).append(cloneEl);
					
				};
			});
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				};

				if (dragEl) {
					this._onDropNew(evt,dragEl);
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
						}
					} else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					};

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						};
						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);
						// Save sorting
						this.save();
					}
				};
			};
			this._nulling();
		},

		_nulling: function() {
			rootEl =
				dragEl =
					parentEl =
						ghostEl =
							nextEl =
								cloneEl =
									lastDownEl =

										scrollEl =
											scrollParentEl =

												tapEvt =
													touchEvt =

														moved =
															newIndex =

																lastEl =
																	lastCSS =

																		putSortable =
																			activeGroup =
																				Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;
			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	};

	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	};

	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	};

	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	};

	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	};

	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}

	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		return $
			? $(el).clone(true)[0]
			: (Polymer && Polymer.dom
				? Polymer.dom(el).cloneNode(true)
				: el.cloneNode(true)
		);
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}
	function untablesMerge(){
		// /ar tabelEl=$("#list-table");
		$("#list-table tbody td").removeAttr("rowspan style");
	};
	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				captureMode = {
					capture: false,
					passive: false
				};
			}
		}));
	} catch (err) {}

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		// css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.6.1';
	return Sortable;
});
