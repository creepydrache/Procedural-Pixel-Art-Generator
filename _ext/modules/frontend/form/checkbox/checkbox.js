var hbs = require('hbs');
var fs = require('fs');
var slugify = require('slugify');
hbs.registerHelper('svg', require('handlebars-helper-svg'));

//get template
var prefix = process.env.HOST?'':'_ext/'; //adds a prefix if process.env is not enabled, as we're probably in open source environment
var template = fs.readFileSync(prefix + 'modules/frontend/form/checkbox/checkbox.hbs', 'utf8');
template = hbs.compile(template);

module.exports = function(fieldName,args) {
	

	//default values
	var checked = false;
	

	//format fieldname with prefix
	//if (args.hash.prefix)
	//	fieldName = args.hash.prefix + fieldName;
	
	console.log('fieldname',fieldName)
	

	//if the value was passed from express, use that
	if (this[fieldName] == true || this[fieldName] == 'true')
	checked = true;
	
	//if it wasnt passed from express, but a default is defined in the helper, use that
	else if (typeof this[fieldName] === 'undefined' && args.hash.default == 'true')
	checked = true;
	
	//set label
	var label = args.hash.label || fieldName;


	//apply template
	var output = template({
		fieldName: fieldName,
		fieldslug: fieldName.replace(/\s*/,''),
		checked: checked,
		label: label,
	});
	
	return new hbs.SafeString(output);
}
