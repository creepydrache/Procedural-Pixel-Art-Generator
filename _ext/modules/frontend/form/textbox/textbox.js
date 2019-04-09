var hbs = require('hbs');
var fs = require('fs');

module.exports = function(fieldName,args) {
  
  //get template
  var prefix = process.env.HOST?'':'_ext/'; //adds a prefix if process.env is not enabled, as we're probably in open source environment
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
  
  //apply template
  var output = template({
    field: fieldName,
    fieldslug: fieldName.toLowerCase(),
    default: defaultValue,
    label: args.hash.label,
    multiline: multiline,
  });

  return new hbs.SafeString(output);
}
