Drupal.behaviors.shortcut = function(context) {
  $(document).keydown(processShortcutDown);
};

shortcutsPress = new Array();
shortcutsDown = new Array();
shortcut_found = false;

shortcut_call_external_path = function(path){
 document.location = path;
}

shortcut_call_internal_path = function(path){
 document.location = Drupal.settings.basePath + path;
}


processShortcutDown = function(ev){
	shortcut_found = false;
	code = ev.keyCode;

  for(i=0; i < Drupal.settings.shortcuts.length; i++) {
    shortcutDown = Drupal.settings.shortcuts[i];

    //we sum a empty string into the ev values for cast it his values to a string
    if(
      shortcutDown.char_code == code 
      && shortcutDown.alt == ev.altKey+''
      && shortcutDown.ctrl == ev.ctrlKey+''
      && shortcutDown.shift == ev.shiftKey+''){

      if(ev.stopPropagation){
        ev.stopPropagation(true);
        ev.preventDefault(true);
      } else {
        ev.cancelBubble = true;
      }

      eval(shortcutDown.func_name+'("'+shortcutDown.param+'")');
      shortcut_found = true;
      return false;
    }
  }
}
