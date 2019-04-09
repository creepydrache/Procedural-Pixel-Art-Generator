(function(){

    function initCheckbox (checkbox) {
        
        //use this as dropdown element if not specified (for when el.initDropdown is called)
        if (!checkbox) checkbox = this;
        console.log('checkbox initialized',checkbox);
        
        //make sure it's the right element
        if (!checkbox.classList.contains('checkbox')) return console.log(checkbox,'is not a checkbox');
        
        //add click event
        checkbox.addEventListener('click', function (e) {

            //clicked on select button / top of list
            if (e.target.classList.contains('checkbox')) 
                toggleCheckbox(e.target);
        });
        
        //add toggle function to element
        checkbox.toggleCheckbox = toggleCheckbox;
        
        //add value functions to element
        checkbox.getValue = getValue;
        checkbox.setValue = setValue;
        
    }
    
    function toggleCheckbox (checkbox) {
        //use `this` as dropdown element if not specified (for when el.initDropdown is called)
        if (!checkbox) checkbox = this;
        
        //if checkbox is checked
        if (checkbox.classList.contains('checked')){
            checkbox.classList.remove('checked');
            checkbox.isChecked = false;
            checkbox.querySelector('input[type="hidden"]').value = 0;
        }
        
        //checkbox is not checked
        else {
            checkbox.classList.add('checked');
            checkbox.isChecked = true;
            checkbox.querySelector('input[type="hidden"]').value = 1;
        }

        console.log('checkbox toggled',checkbox, checkbox.getValue());
    }
    
    function getValue () {
        var value = this.querySelector('input[type="hidden"]').value;
        return value == '1' ? true : false;
    }
    
    function setValue (newValue) {
    
        var setToChecked = newValue == '1' || newValue == 'true' || newValue == true;
        
        //check
        if (setToChecked){
            this.classList.add('checked');
            this.isChecked = true;
            this.querySelector('input[type="hidden"]').value = 1;
        }
        
        //uncheck
        else {
            this.classList.remove('checked');
            this.isChecked = false;
            this.querySelector('input[type="hidden"]').value = 0;
        }
        
        console.log('set checkbox value on',this,'to',setToChecked,'('+newValue+')');
    }
    
    //add function to elements so they can be turned into dropdowns
    HTMLElement.prototype.initCheckbox = initCheckbox;
    
    //initialize every checkbox on page
    var checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((c)=> initCheckbox(c));

})();
/*global HTMLElement*/


