/**
 * See https://github.com/mattjs/js-libraries for license
 * CSS3 animations, requiers Modernizr
**/
;(function(context) {
	var animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	}
	
	var animDurationNames = {
		'WebkitAnimation' : 'WebkitAnimationDuration',
		'OAnimation' : 'oAnimationDuration',
		'msAnimation' : 'MSAnimationDuration',
		'animation' : 'animationDuration'
	}
	
	var animNameNames = {
		'WebkitAnimation' : 'WebkitAnimationName',
		'OAnimation' : 'oAnimationName',
		'msAnimation' : 'MSAnimationName',
		'animation' : 'animationName'
	}
	
	var animNameTimingFunctions = {
		'WebkitAnimation' : 'WebkitAnimationTimingFunction',
		'OAnimation' : 'oAnimationTimingFunction',
		'msAnimation' : 'MSAnimationTimingFunction',
		'animation' : 'animationTimingFunction'
	}
	
	var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	var animDurationName = animDurationNames[ Modernizr.prefixed( 'animation' ) ];
	var animNameName = animNameNames[ Modernizr.prefixed( 'animation' ) ];
	var animNameTimingFunction = animNameTimingFunctions[ Modernizr.prefixed( 'animation' ) ];
	
	var animate = function(el, animation_name, duration, timing, cb) {		
		if(typeof cb == 'function') {
			el.addEventListener(animEndEventName, function(event) {
				cb.call(this, event);
				el.removeEventListener(animEndEventName, arguments.callee, false);
			}, false);
		}
		
		el.style[animDurationName] = duration+'ms';
		el.style[animNameName] = animation_name;
		el.style[animNameTimingFunction] = timing;
	}
	
	context.CssAnimation = {
		animate: animate
	}
	
	window.CssAnimation = CssAnimation;
}(this));
