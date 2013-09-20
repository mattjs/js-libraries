/* See https://github.com/mattjs/js-libraries for license */
function FormObject(form) {
	var _this = this;
	// PUBLIC INTERFACE
	this.action;
	this.api_action;
	this.data = {};
	
	var elements = [];
	
	var get_form_elements = function() {
		for(var i in form.elements) {
			if(typeof form.elements[i] == 'object'
			&& 'name' in form.elements[i]
			&& form.elements[i]['name']
			&& 'value' in form.elements[i]) {
				if(form.elements[i].type == 'checkbox') {
					elements.push({
						name: form.elements[i]['name'],
						value: form.elements[i]['checked']
					});
				} else {
					elements.push({
						name: form.elements[i]['name'],
						value: form.elements[i]['value']
					});
				}
			}
		}
	}
	
	var build_form_object = function() {
		var sorted = {};
		
		for(var i in elements) {
			if(/^\w*\[\w*\][\w\[\]]*$/.test(elements[i].name)) {
				var info = /^(\w*)([\w\[\]]*)$/.exec(elements[i].name);
				
				if(!(info[1] in sorted)) {
					sorted[info[1]] = [];
				}
				
				sorted[info[1]].push({
					fragment: info[2],
					value: elements[i].value
				});
			} else {
				_this.data[elements[i].name] = elements[i].value;
			}
		}
		
		for(var name in sorted) {
			_this.data[name] = _buld_from_object(sorted[name]);
		}
	}
	
	var _buld_from_object = function(details) {
		if(details[0].fragment == '[]') {
			var arr = [];
			for(var i in details) {
				arr.push(details[i].value);
			}
			return arr;
		} else if(details[0].fragment == '') {
			return details[0].value;
		} else {
			var sorted = {};
			
			for(var i in details) {
				var info = /^(\[\w*\])([\w\[\]]*)$/.exec(details[i].fragment);

				if(!(info[1] in sorted)) {
					sorted[info[1]] = [];
				}
				
				sorted[info[1]].push({
					fragment: info[2],
					value: details[i].value
				});
			}
			
			var obj = {};
			
			for(var name in sorted) {
				obj[name.replace(/[\[\]]/g, '')] = _buld_from_object(sorted[name]);
			}
			
			return obj;
		}

	}
	
	var get_action = function() {
		_this.action = form.hasAttribute('action')?form.getAttribute('action'):null;
		_this.api_action = form.hasAttribute('data-api-action')?form.getAttribute('data-api-action'):null;
	}
	
	var init = function() {
		get_form_elements();
		build_form_object();
		get_action();
	}
	
	init();
}
