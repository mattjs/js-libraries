/* See https://github.com/mattjs/js-libraries for license */
;(function(context, undefined) {
	'use strict';
	
	var loaders = [];
	
	var start = function(size, element, absolute, color) {
		var l = new Loader(size, element, absolute, color)
		loaders.push(l);
		return l.element();
	}
	
	var remove = function(element, cb) {
		for(var i in loaders) {
			if(loaders[i].parent() == element) {
				loaders[i].remove(cb);
				loaders.splice(i,1);
			}
		}
	}
	
	function Loader(size, parent, absolute, options) {
		var inner_diameter = 0.4;
		var element = document.createElement('div');
		
		var settings = {
			lines: 11, // The number of lines to draw
			corners: 1, // Corner roundness (0..1)
			color: '#000', // #rgb or #rrggbb
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			top: 0, // Top position relative to parent in px
			left: 0 // Left position relative to parent in px
		}
		
		if(options != undefined && 'color' in options) {
			settings['color'] = '#'+options['color'];
		}
	
		var init = function() {
			loader_settings();
			configure_container();
			var spinner = new Spinner(settings);
			spinner.spin(element);
			parent.appendChild(element);
		}
		
		var configure_container = function() {
			var style = 'height:'+size+'px; width: '+size+'px;';
			
			
			if(absolute) {
				style += ' position: absolute;';
				if(options != undefined && 'left' in options) {
					style += ' left:'+options['left']+'px;';
				} else {
					style += ' left: 50%; margin-left: -'+(size/2)+'px;';
				}
				
				if(options != undefined && 'top' in options) {
					style += ' top:'+options['top']+'px;';
				} else {
					style += ' top: 50%; margin-top: -'+(size/2)+'px;';
				}
			}
			
			element.setAttribute('style', style);
		}
		
		var loader_settings = function() {
			// Must be even 
			if(is_odd(size)) {
				size = size - 1;
			}
			
			settings.radius = Math.floor((size*inner_diameter)/2);
			settings.width = Math.floor(size/12);
			settings.length = (size - settings.radius*2)/2 - settings.width;
		}
		
		var is_odd = function(value) {
			return !!(value%2);
		}
		
		this.remove = function(cb) {
			$(element).fadeOut({
				complete: function() {
					parent.removeChild(element);
					if(typeof cb == 'function') {
						cb();
					}
				}
			})
		}
		
		this.parent = function() {
			return parent;
		}
		
		this.element = function() {
			return element;
		}
		
		
		init();
	}
	
	context.LoadAnimation = {
		start: start,
		remove: remove
	};
	
	window.LoadAnimation = LoadAnimation;
}(this));
