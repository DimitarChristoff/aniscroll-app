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

	var anim = primish({

		implement: [options, emitter],

		options: {

		},

		constructor: function(element, options){
			this.setOptions(options);
		}
	});

	return anim;
});