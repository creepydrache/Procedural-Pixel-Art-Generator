(function(){
    function inittextbox (textbox) {
        
        //use this as dropdown element if not specified (for when el.initDropdown is called)
        if (!textbox) textbox = this;
        console.log('textbox initialized',textbox);
        
        //make sure it's the right element
        if (!textbox.classList.contains('textbox')) return console.log(textbox,'is not a textbox');

        //add value functions to element
        textbox.getValue = getValue;
        textbox.setValue = setValue;
        
    }

    function getValue () {
        return this.value;
    }
    
    function setValue (newValue) {
    
        this.value = newValue;
        
        console.log('set textbox value on',this,'to',newValue);
    }
    
    //add function to elements so they can be turned into dropdowns
    HTMLElement.prototype.inittextbox = inittextbox;
    
    //initialize every textbox on page
    var textboxes = document.querySelectorAll('.textbox');
    textboxes.forEach((c)=> inittextbox(c));

})();
/*global HTMLElement*/


