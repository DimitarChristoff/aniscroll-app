/**
 * @module Anime
 * @description data-bindings API for animate.css
 **/
;(function(factory){
	// UMD wrap
	if (typeof define === 'function' && define.amd){
		define(['jquery', 'primish/primish', 'primish/options', 'primish/emitter'], factory);
	} else {
		 this.jQuery.Anime = factory(this.jQuery, this.primish, this.options, this.emitter);
	}
}).call(this, function($, primish, options, emitter){
	'use strict';

	var eventHandlers = {},
		eventMap = {
			scroll: {
				base: 'scroll',
				target: 'parent'
			},
			over: {
				base: 'mouseenter',
				target: 'self'
			},
			out: {
				base: 'mouseleave',
				target: 'self'
			},
			parallax: {
				base: 'scroll',
				target: 'parent'
			}
		};

	/**
	 * @class Anime
	 */
	var Anime = primish({

		implement: [options, emitter],

		options: {
			prefix: 'data-ani',
			supportedEvents: ['scroll', 'over', 'out', 'parallax']
		},

		/**
		 * @constructor
		 * @param element
		 * @param options
		 * @returns {Anim}
		 */
		constructor: function(element, options){
			this.element = element;
			this.parent = (options && options.parent) ? $(options.parent, delete options.parent) : document.body;
			this.setOptions(options);
			this.setupDom();
		},

		setupDom: function(){
			// unique id
			this.euid = this.element.data('uid');
			this.euid || this.element.data('uid', this.euid = $.expando);

			this.elements = this.element.find(this.options.supportedEvents.map(function(e){
				return ['[', this.prefix, '-', e, ']'].join('');
			}, this.options).join(','));
			this.attachEvents();
		},

		attachEvents: function(){
			var eventObj = eventHandlers[this.euid],
				o = this.options,
				prefixExtracted = o.prefix.replace('data-', '');

			if (!eventObj){
				eventObj = {};
				// set base array of events
				this.options.supportedEvents.forEach(function(event){
					eventObj[eventMap[event].base] = [];
				});
			}

			this.options.supportedEvents.forEach(function(event){
				eventMap[event].target === 'self' && eventObj[eventMap[event].base].push(this['on'+event]);
			}, this);

			this.elements.each(function(){
				var el = $(this),
					data = el.data(),
					events = [],
					obj = {};

				for (var event in data){
					if (event.indexOf(prefixExtracted) !== 0) continue;
					obj[event.replace(prefixExtracted, '').toLowerCase()] = data[event];
					events.push(obj);
				}

				if (!events.length){
					return;
				}

				el.on(eventObj);
			});


		},

		onscroll: function(){

		},

		onover: function(){
			console.log('over');
		},

		onout: function(){
			console.log('out');
		},

		onparallax: function(){

		}
	});

	return Anime;
});