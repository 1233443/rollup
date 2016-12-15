import './assets/common.css';

var arr = ["aa", "bb", "ccc"];

arr.map((item, index) => {
	return item;
});

if(ENV !== 'production') {
	// Enable LiveReload
	document.write(
		'<script src="http://' + (location.host || 'localhost').split(':')[0] +
		':35729/livereload.js?snipver=1"></' + 'script>'
	);
} else {
	debug.disable();

}