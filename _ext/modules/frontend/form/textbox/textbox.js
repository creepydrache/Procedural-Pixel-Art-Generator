var hbs = require('hbs');
var fs = require('fs');

module.exports = function(fieldName, args) {

	//get template
	var prefix = process.env.HOST ? '' : '_ext/'; //adds a prefix if process.env is not enabled, as we're probably in open source environment
	var template = fs.readFileSync(prefix + 'modules/frontend/form/textbox/textbox.hbs', 'utf8');
	template = hbs.compile(template);

	//check for multiline option
	var multiline = args.hash.hasOwnProperty('multiline');

	//set default value
	var defaultValue = '';

	//get value from form
	if (args.hash.default)
		defaultValue = args.hash.default;

	//get value from page
	if (this[fieldName])
		defaultValue = this[fieldName];

	//field is disabled
	var disabled = args.hash.disabled || false;

	//regex pattern match
	var pattern = args.hash.pattern || null;

	//regex pattern match
	var title = args.hash.title || null;


	//console.log('dfs',fieldName,args.hash.hasOwnProperty('noform'))

	//console.log('fisdsd',fieldName, args.hash)

	//apply template
	var output = template({
		field: fieldName,
		fieldslug: fieldName.toLowerCase(),
		default: defaultValue,
		label: args.hash.label,
		prelabel: args.hash.prelabel,
		placeholder: args.hash.placeholder,
		nameless: args.hash.nameless || false,
		//noform: args.hash.hasOwnProperty('noform'),
		multiline: multiline,
		disabled: disabled,
		pattern: pattern,
		title: title,
		maxLength: args.hash.maxLength,
	});

	return new hbs.SafeString(output);
}
