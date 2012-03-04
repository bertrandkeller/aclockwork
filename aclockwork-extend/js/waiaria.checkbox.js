$(document).ready(function() {

  var checkboxes = [];

  $('ul.checkboxes li').each(function(index) {
    if ($(this).attr('role') == 'checkbox') {
      checkboxes[index] = new checkbox($(this));
    };
  });

}); // end ready()

//
// Function keyCodes() is an object to contain keycodes needed for the application
//
function keyCodes() {
  this.space = 32;
}

//
// Function checkbox() is a class constructor for the implementation of a checkbox widget.
// The element passed to checkbox() must contain an image tag that will be used to display
// the state of the checkbox.
//
// @param(id string) id is the html id of the element to act as a checkbox
//
// @return N/A
//
function checkbox($id) {

  // define object properties
  this.$id = $id;
  this.keys = new keyCodes();

  // bind event handlers
  this.bindHandlers();

} // end checkbox() constructor

//
// Function bindHandlers() is a member function to bind event handlers to the checkboxes in the
// checkbox group.
//
// @return N/A
//
checkbox.prototype.bindHandlers = function() {

  var thisObj = this;

  // bind a click handler
  this.$id.click(function(e) {
    return thisObj.handleClick(e);
  });

  // bind a keydown handler
  this.$id.keydown(function(e) {
    return thisObj.handleKeyDown(e);
  });

  // bind a keypress handler
  this.$id.keypress(function(e) {
    return thisObj.handleKeyPress(e);
  });

  // bind a mouseover handler
  this.$id.mouseover(function(e) {
    return thisObj.handleMouseOver(e);
  });

  // bind a mouseout handler
  this.$id.mouseout(function(e) {
    return thisObj.handleMouseOut(e);
  });

  // bind a focus handler
  this.$id.focus(function(e) {
    return thisObj.handleFocus(e);
  });

  // bind a blur handler
  this.$id.blur(function(e) {
    return thisObj.handleBlur(e);
  });

} // end bindHandlers()

// Function toggleState() is a member function to toggle a checkbox state. This function sets the
// aria-checked property and changes the box image to display the new box state.
//
// @return N/A
//
checkbox.prototype.toggleState = function() {

  var $img = this.$id.find('img');

  if (this.$id.attr('aria-checked') == 'true') {

    this.$id.attr('aria-checked', 'false');
    $img.attr('src','images/button_checkbox_unchecked.png');
  }
  else {
    this.$id.attr('aria-checked', 'true');
    $img.attr('src','images/button_checkbox_checked.png');
  }

} // end toggleState()

//
// Function handleClick() is a member function to handle click events for the checkbox.
//
// @param (e object) e is the event object associated with the keydown event
//
// @return (boolean) Returns false if processing; true of doing nothing
//
checkbox.prototype.handleClick = function(e) {
    
  if (e.altkey || e.ctrlKey || e.shiftKey) {
    // do nothing;
    return true;
  }

  // toggle the checkbox state
  this.toggleState();

  e.stopPropagation();
  return false;
  
} // end handleClick()
  
//
// Function handleKeyDown() is a member function to handle keydown events for the checkbox.
//
// @param (e object) e is the event object associated with the keydown event
//
// @return (boolean) Returns false if processing; true of doing nothing
//
checkbox.prototype.handleKeyDown = function(e) {
    
  if (e.altkey || e.ctrlKey || e.shiftKey) {
    // do nothing;
    return true;
  }

  if( e.keyCode == this.keys.space ) {

    // toggle the checkbox state
    this.toggleState();

    e.stopPropagation();
    return false;
  } // endif

  return true;
  
} // end handleKeyDown()

//
// Function handleKeyPress() is a member function to handle keypress events for the checkbox.
// This function is needed to consume events for browsers, such as Opera, that perform window
// manipulation on keypress events.
//
// @param (e object) e is the event object associated with the keydown event
//
// @return (boolean) Returns false if processing; true of doing nothing
//
checkbox.prototype.handleKeyPress = function(e) {
    
  if (e.altkey || e.ctrlKey || e.shiftKey) {
    // do nothing;
    return true;
  }

  if( e.keyCode == this.keys.space ) {
    // consume the event
    e.stopPropagation();
    return false;
  } // endif

  return true;
  
} // end handleKeyPress()

//
// Function handleMouseOver() is a member function to handle mouseover events for the checkbox.
//
// @param (e object) e is the event object associated with the mouseover event
//
// @return (boolean) Returns false;
//
checkbox.prototype.handleMouseOver = function(e) {
    
  // if the box does not have the focus class add the hover highlight
  if (this.$id.not('.focus')) {
    this.$id.addClass('hover');
  }

  e.stopPropagation();
  return false;
  
} // end handleMouseOver()

//
// Function handleMouseOut() is a member function to handle mouseout events for the checkbox.
//
// @param (e object) e is the event object associated with the mouseout event
//
// @return (boolean) Returns false;
//
checkbox.prototype.handleMouseOut = function(e) {
    
  this.$id.removeClass('hover');

  e.stopPropagation();
  return false;
  
} // end handleMouseOut()

//
// Function handleFocus() is a member function to handle focus events for the checkbox.
//
// @param (e object) e is the event object associated with the focus event
//
// @return (boolean) Returns true;
//
checkbox.prototype.handleFocus = function(e) {
    
  this.$id.addClass('focus');

  // remove the hover class if it is applied
  this.$id.removeClass('hover');

  return true;
  
} // end handleFocus()

//
// Function handleBlur() is a member function to handle blur events for the checkbox.
//
// @param (e object) e is the event object associated with the blur event
//
// @return (boolean) Returns true;
//
checkbox.prototype.handleBlur = function(e) {
    
  this.$id.removeClass('focus');
  return true;
  
} // end handleBlur()