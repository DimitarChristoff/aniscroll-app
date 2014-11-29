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
			scroll: 'scroll',
			over: 'mouseenter',
			out: 'mouseleave',
			parallax: 'scroll'
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
					eventObj[eventMap[event]] = [];
				});
			}

			this.options.supportedEvents.forEach(function(event){
				eventObj[eventMap[event]].push(this['on'+event]);
			}, this);

			console.log(eventObj);

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

				//el.on()
			});
		},

		onscroll: function(){

		},

		onover: function(){

		},

		onout: function(){

		},

		onparallax: function(){

		}
	});

	return Anime;
});