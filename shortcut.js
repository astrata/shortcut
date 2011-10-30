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

	for(i=0; i<shortcutsDown.length; i++){
		if(
      shortcutsDown[i].char_code == code 
			&& shortcutsDown[i].alt == ev.altKey
			&& shortcutsDown[i].ctrl == ev.ctrlKey
			&& shortcutsDown[i].shift == ev.shiftKey){

      if(ev.stopPropagation){
        ev.stopPropagation(true);
        ev.preventDefault(true);
      } else {
        ev.cancelBubble = true;
      }
      eval(shortcutsDown[i].func_name+'("'+shortcutsDown[i].param+'")');
      shortcut_found = true;
      return false;
		}
	}
}
