var hbs = require('hbs');
var fs = require('fs');
hbs.registerHelper('svg', require('handlebars-helper-svg'));

module.exports = function(fieldName,args) {

  // console.log('CHECKBOX DEBUG ARGS',args)

  //get template
  var prefix = process.env.HOST?'':'_ext/'; //adds a prefix if process.env is not enabled, as we're probably in open source environment
  var template = fs.readFileSync(prefix + 'modules/frontend/form/checkbox/checkbox.hbs', 'utf8');
  template = hbs.compile(template);

  var checked = false;

  //if the value was passed from express, use that
  if (this[fieldName] == true || this[fieldName] == 'true')
    checked = true;

  //if it wasnt passed from express, but a default is defined in the helper, use that
  else if (typeof this[fieldName] === 'undefined' && args.hash.default == 'true')
    checked = true;

  //apply template
  var output = template({
    field: fieldName,
    fieldslug: fieldName.toLowerCase(),
    checked: checked,
    label: args.hash.label,
  });

  return new hbs.SafeString(output);
}
