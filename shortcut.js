var debug = false;

shortcuts_parent_path = '';
shortcutsPress = new Array();
shortcutsDown = new Array();
shortcut_found = false;

function shortcut_call_external_path(path){
 document.location = path;
}

function shortcut_call_internal_path(path){
 document.location = shortcuts_parent_path + path;
}

function processShortcutPress(e){
	if(shortcut_found) return false;
	if(typeof e == 'undefined'){
		ev = event;
	} else {
		ev = e;
	}
	code = ev.keyCode?ev.keyCode:ev.charCode;
	code_char = String.fromCharCode(code);
	for(i=0; i<shortcutsPress.length; i++){
		if(shortcutsPress[i].char_text == code_char 
			&& shortcutsPress[i].alt == ev.altKey
			&& shortcutsPress[i].ctrl == ev.ctrlKey
			&& shortcutsPress[i].shift == ev.shiftKey){
                if(ev.stopPropagation){
                    ev.stopPropagation(true);
					ev.preventDefault(true);
                } else {
                    ev.cancelBubble = true;
                }
				  debug_message('Press: '+shortcutsPress[i].func_name+'("'+shortcutsPress[i].param+'")');
				  eval(shortcutsPress[i].func_name+'("'+shortcutsPress[i].param+'")');
          return false;
		}
	}
}

function processShortcutDown(e){
	shortcut_found = false;
	if(typeof e == 'undefined'){
		ev = event;
	} else {
		ev = e;
	}
	code = ev.keyCode?ev.keyCode:ev.charCode;
	for(i=0; i<shortcutsDown.length; i++){
		if(shortcutsDown[i].char_code == code 
			&& shortcutsDown[i].alt == ev.altKey
			&& shortcutsDown[i].ctrl == ev.ctrlKey
			&& shortcutsDown[i].shift == ev.shiftKey){
                if(ev.stopPropagation){
                    ev.stopPropagation(true);
					ev.preventDefault(true);
                } else {
                    ev.cancelBubble = true;
                }
				debug_message('Down: '+shortcutsDown[i].func_name+'("'+shortcutsDown[i].param+'")');
				eval(shortcutsDown[i].func_name+'("'+shortcutsDown[i].param+'")');
				shortcut_found = true;
                return false;
		}
	}
}

var debug_iniciated = false;
var debug_window;
function init_debug(){
	if (!debug_iniciated) {
		debug_window = window.open('', 'debug_window');
		debug_window.document.write('<html><body><h1>Debug</h1>');
		debug_iniciated = true;
	}
}

function debug_message(msg){
	if (debug) {
		init_debug();
		debug_window.document.write('<li>');
		debug_window.document.write(msg);
		debug_window.document.write('</li>');
	}
}

if(typeof document.attachEvent == 'undefined'){
	document.addEventListener('keypress', processShortcutPress, false);
	document.addEventListener('keydown', processShortcutDown, false);
} else {
	document.attachEvent('onkeypress', processShortcutPress);
	document.attachEvent('onkeydown', processShortcutDown);
}

