	document.addEventListener("DOMContentLoaded", function(event) { 
		prepareCode() ; 
	});

	function prepareCode() {
		var index = 0
		var list = $(".example .container")		
		for (var i=0; i<list.length; i++) {
			if (!list[i].classList.contains('noCode') ) { 
				let example = document.createElement("pre")
				example.classList.add("saharian-debug-showcode")
				example.innerHTML = list[i].innerHTML.replace(/\</g,"&lt;").replace(/\t/g,"  ")
				list[i].after(example)
			}			
		}
	}
		
	function $(selector) {
		return document.querySelectorAll(selector)
	}