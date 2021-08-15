/* MIT License

Copyright (c) 2018 fabio@cs.unibo.it, luca.morosini@studio.unibo.it,
chantal.lengua@studio.unibo.it

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var extName = "SahARIAn";
var extVersion = "1.9.3";
var extPrefix = "$aharian";

activate(false);

function activate(force) {
	chrome.storage.local.get(extName, function (data) {
		var dontBother = true
		if (force) dontBother = false;
		if (data[extName] && data[extName].level != 'off') dontBother = false;

		if (dontBother) {
			log('not active');
		} else {
			log('active');
			if (!window[extPrefix]) {
				window[extPrefix] = (function () {

					/* ----------------------------------------------------------

										  Globals
						  
					------------------------------------------------------------ */

					var placeHolder = "data:image/png;base64,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"

					var status = {
						currentLevel: 0,
						deactivateImages: null,
						deactivateStyles: null
					}

					/* ----------------------------------------------------------

										  CSS Styles
									  
					------------------------------------------------------------ */

					var SaharianLevelMin = `
[role="heading"][aria-level="1"] {
  font-size: 36pt;
}

[role="heading"][aria-level="2"] {
  font-size: 32pt;
}

[role="heading"][aria-level="3"] {
  font-size: 28pt;
}

[role="heading"][aria-level="4"] {
  font-size: 24pt;
}

[role="heading"][aria-level="5"] {
  font-size: 20pt;
}

[role="heading"][aria-level="6"] {
  font-size: 18pt;
}

[role="heading"][aria-level="7"] {
  font-size: 16pt;
}

[role="heading"][aria-level="42"] {
  font-size: 16pt;
}



body {
		margin: 	0px;
		border : solid #dddddd 100px;
		padding : 15px;
		font-family: 'Arial'; 
		font-size: 14pt; 
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}

/*
	.main {
		padding: 0.5%;
		max-width: 50px;
	}
*/
	div {
		padding: 0.8% 0;    /* aggiunto per esempi vincenzo */
		min-height: 1.5em !important; 
	}

	[aria-hidden="true"] {
		display: none !important; 
	}

	[aria-hidden="false"] {
		display: initial; 
	}

	[role="banner"] {
		border: 1px solid #dadce0;
		padding: 1em;
	}

	a {
		margin-right: 1em;
	}

	.col {
		float: left;
	}

	.row {
		clear:both;
	}

	[role="search"] {
		text-align: right;
	}

	[role="presentation"] {
		display: none !important;
	}

	[role="searchbox"] {
		text-align: left;
		position: relative;
		width: 10em;
		border: 1px solid;
		left: calc(100% - 10em);
	}

	[role="main"], [role="complementary"] {
		width: 100%;
		left: auto;
		right: auto;
		float: left;
		padding: 1em;
		border: 1px solid #dadce0;
	}

	
		[role="complementary"] {
			width: 29%;
			padding: 1%;
			left: auto;
			right: auto;
		}
		
		[role="main"] {
			width: 66%;
			padding: 1%;
			left: auto;
			right: auto;
		}
	
	*[data-saharian-an]:not([data-saharian-an=""])::before {
		content: attr(data-saharian-an) ; 
		background-color: #dfd ; 
		border: solid #060 1px; 
		padding-left: 0.5em;
		padding-right: 0.5em;
		width: fit-content;
	}

	*[data-saharian-ad]:not([data-saharian-ad=""])::after {
		content: "DESCRIPTION: " attr(data-saharian-ad) ; 
		background-color: #ffd ; 
		border: solid #660 1px; 
		display: inline-block; 
		padding-left: 0.5em;
		padding-right: 0.5em;
		font-size: 0.5em; 
		width: fit-content;
	}

	.saharian-imageDecorative {
		display: none !important ; 
	}



	[role="form"] {
		clear: both;
	}

	[role="textbox"] {
		border: 1px solid #dadce0;
		padding: 1em !important;
		margin: .5em 0;
		/* outline: none; */
		display: block;              /* aggiunto per esempi vincenzo, forse un problema per quei textbox che devono essere inline */
	}
	
	[role="directory"],
	[role="listitem"] {
		list-style-type: none;
	}

	.saharian-imageReplacement {
		width: 66%;
		height: 3em; 
		display: flex;
		align-items: center;
		justify-content: center; 
		background-image: url($placeHolder);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.saharian-hide {
		display: none !important; 
	}

	svg {
		display: none !important; 
	}

	footer, [role="contentinfo"] {
		display:block;
		clear: both;
		border: 1px solid #dadce0;
		padding: 1em;
	}
	
	.hidden {
		display: none
	}	
	
	label {
		display: block;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}
	

input[type=text], select, input[type=number], input[type=tel], input[type=email], input[type=password] {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=search] {
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* questo è da perfezionare */
/*
span:not(.icon-bar) {
	padding: 0.5em 0
}
*/

input[type=submit] {
	margin: 5px 0 5px 0;
	padding: 15px 30px;
	display: inline-block;
	position: relative;
	border: 1px solid hsl(0, 0%, 79%);	
	border-radius: 5px;
	box-shadow: 0 1px 2px hsl(0, 0%, 80%);
	color: black;
	background-color: hsl(0, 0%, 85%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 77%), hsl(0, 0%, 80%));
	cursor: pointer;
}

input[type=submit]:hover {
  border-color: hsl(0, 0%, 34%);
	background-color: hsl(0, 0%, 39%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 41%), hsl(0, 0%, 34%));
	cursor: default;
	color: white;
	cursor: pointer;
}

input[type=submit]:focus {
	display: inline-block;
	position: relative;
	border: 1px solid hsl(0, 0%, 79%);	
	border-radius: 5px;
	box-shadow: 0 1px 2px hsl(0, 0%, 80%);
	color: black;
	background-color: hsl(0, 0%, 85%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 77%), hsl(0, 0%, 80%));
	cursor: pointer;
}

	
/* Accordion */

/* Alert */
[role="alert"] {
	padding: 5px 8px 5px 8px;
	border: 2px solid hsl(0, 0%, 79%);
	border-radius: 4px;
	background: hsl(0, 0%, 94%);		
	margin: 15px 0 15px 0;
	font-size: 100%;			
	width:fit-content;
  }
  
  [role="alert"]:empty {
	display: none;
  }
  
/* Breadcrumb */

nav {
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
/*  width: fit-content;*/
  border-radius: 5px;
}

nav ul, nav ol {
  list-style-type: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
  width: fit-content;
  border-radius: 5px;
}

nav li {
  float: left;
}

nav li a {
  display: block;
  text-align: center;
  padding: 14px 16px;
  border-right: 1px solid #e7e7e7;
}

/* non funziona, si applica a tutti
nav li a:last-of-type {
border: none;
}
*/

nav li a:hover, nav li a:focus {
  border-color: hsl(0, 0%, 34%);
  background-color: hsl(0, 0%, 39%);
  background-image: linear-gradient(to bottom, hsl(0, 0%, 41%), hsl(0, 0%, 34%));
  color: hsl(0, 0%, 98%);
  outline: none;
}

nav li.active,
nav a.active {
  border-color: hsl(0, 0%, 34%);
  background-color: hsl(0, 0%, 39%);
  background-image: linear-gradient(to bottom, hsl(0, 0%, 41%), hsl(0, 0%, 34%));
  color: hsl(0, 0%, 98%);
  text-decoration: underline;
}

nav li [aria-current="page"],
nav a [aria-current="page"] {
  border-color: hsl(0, 0%, 34%);
  background-color: hsl(0, 0%, 39%);
  background-image: linear-gradient(to bottom, hsl(0, 0%, 41%), hsl(0, 0%, 34%));
  color: hsl(0, 0%, 98%);
  outline: none;
  text-decoration: underline;
 text-align: center;  					/* questi 2 aggiunti per wordpress */
  padding: 14px 16px;
}

/* Button : si trova in fondo */

/* Carousel */

/* Checkbox */
/* Non riesco a inserire la regola list-style: none; */
[role="checkbox"] {
  display: inline-block;
  position: relative;
  padding-left: 1.4em !important;
  cursor: pointer;
}

[role="checkbox"]::before,
[role="checkbox"]::after {
  position: absolute;
  left: 7px;
   top: 50%;
  transform: translate(-50%, -50%);
  content: '';
}

/* the squares */
[role="checkbox"]::before {
  width: 14px;
  height: 14px;
  border: 1px solid hsl(0, 0%, 66%);
  border-radius: 0.2em;
  background-image: linear-gradient(to bottom, hsl(0, 0%, 93%), #fff 30%);
}

[role="checkbox"]:active::before {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 73%), hsl(0, 0%, 93%) 30%);
}

[role="checkbox"][aria-checked="mixed"]::before,
[role="checkbox"][aria-checked="true"]::before {
  display: block;	
  border-color: #454545; 
  background: #e7e7e7; 
  background-image: linear-gradient(to bottom, hsl(0, 0%, 78%), hsl(0, 0%, 68%));
}

[role="checkbox"][aria-checked="mixed"]::after,
[role="checkbox"][aria-checked="mixed"]::after {
  display: block;
  width: 8px;
  border-bottom: 0.125em solid #fff;
  transform: translate(-50%, -50%) rotateZ(45deg);
  transform-origin: center center;
}

[role="checkbox"][aria-checked="mixed"]:active::after,
[role="checkbox"][aria-checked="true"]::after {
  display: block;
  width: 0.25em;
  height: 0.4em;
  border: solid #fff;
  border-width: 0 0.125em 0.125em 0;
  transform: translateY(-65%) translateX(-50%) rotate(45deg);
}

[role="checkbox"][aria-checked="mixed"]:active::before,
[role="checkbox"][aria-checked="true"]:active::before {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 68%)), hsl(0, 0%, 78%));
}

[role="checkbox"]:focus {
  outline: none;
}

[type="checkbox"]:focus {
  width: 13px;
  height: 13px;	
  box-sizing: content-box;
  border-color: hsl(0, 0%, 81%);
  border-width: 4px;
  border-radius: calc(0.2em + 4px);
  box-shadow: inset 0 0 0 1px hsl(0, 0%, 62%);
  outline-color: grey;
  outline-style: groove;
  }
  
/* do not add [type="checkbox"] here (keyboard focus) */
[role="checkbox"]:focus::before {
  width: 16px;
  height: 16px;
  box-sizing: content-box;
  border-color: hsl(0, 0%, 81%);
  border-width: 3px;
  border-radius: calc(0.2em + 3px);
  box-shadow: inset 0 0 0 1px hsl(0, 0%, 62%);
}

/* Combobox */
[role=combobox] {
  display: inline-block;
  position: relative;
  padding-bottom: 0;
}

[role="listbox"],
[role="grid"] {
  min-width: 232px;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 1;			/*per wordpress ho tolto da qui il margin left 10px e spero non faccia problemi da altre parti */
}
  
  [role="grid"] {
  margin-left: 10px;
}

[role="listbox"] li, [role="listbox"] [role="option"] {
  cursor: default;
  margin: 0;
}

[role="grid"] [role="row"] {
  padding: 2px;
  cursor: default;
  margin: 0;
}

[role="listbox"] li:hover, [role="listbox"] [role="option"]:hover,
[role="grid"] [role="row"]:hover {
  background: hsl(0, 0%, 70%);
}

[role=combobox] input {
  font-size: inherit;
  border: 1px solid #aaa;
  border-radius: 2px;
  line-height: 1.5em;
  padding-right: 30px;
  width: 200px;
}

[role="grid"] [role="gridcell"] {
  display: inline-block;
  margin: 0;
}

[role="grid"] [role="gridcell"]:last-child {
  float: right;
  font-size: 12px;
  font-weight: 200;
  color: #333;
}

/* pulsante con sopra immagine: attenzione! 
.combobox-dropdown {
  position: absolute !important;
  right: -68px !important;
  top: 12px !important;
  height: 8px !important;
  width: 10px !important;
  border-radius: 0 2px 2px 0 !important;
  border: 1px solid #aaa !important;
}
*/

/* Dialog: Alert Dialog AND Modal Dialog*/
textarea {
  margin: 10px 0 10px 0;
  display: block;
  font-size: 1rem;
  line-height: 1.3;
  min-width: 400px;
  max-width: 100%;
}

[role="alertdialog"],
[role="dialog"] {
  box-sizing: border-box;
  padding: 15px;
  border: 1px hsl(0, 0%, 20%);
  background-color: #fff;
  min-height: 100vh;
  border-radius: 3px;
}

@media screen and (min-width: 640px) {
  [role="alertdialog"],
  [role="dialog"] {
	position: absolute;
	top: 2rem;
	left: 50vw;  /* move to the middle of the screen (assumes relative parent is the body/viewport) */
	transform: translateX(-50%);  /* move backwards 50% of this element's width */
	min-width: calc(640px - (15px * 2));  /* == breakpoint - left+right margin */
	min-height: auto;
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.12), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
}

[role="alertdialog"] h1, [role="alertdialog"] h2,
[role="alertdialog"] h1, [role="alertdialog"] h2,
[role="dialog"] h1, [role="dialog"] h2,
[role="dialog"] h1, [role="dialog"] h2 {
  text-align: center;
  font-size: 100%;
}

[role="alertdialog"] p, [role="dialog"] p{
  margin: 5px 5px;
  padding: 10px 10px;
  line-height: normal;
  font-size: 100%;
}

[role="alertdialog"] button, 
[role="alertdialog"] [type="button"],
[role="alertdialog"] [role="button"],
[role="dialog"] button, 
[role="dialog"] [type="button"],
[role="dialog"] [role="button"] {
  float: right;
  margin: 5px;
}

[role="dialog"] label {
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
}

[role="dialog"] [type="text"] {
	position: inherit;
    width: 80%;
    padding: 12px 16px;
	margin: 8px 0 8px 0;
}

/* PROBLEMA CON CLASSI QUI: */
/* native <dialog> element uses the ::backdrop pseudo-element */
/* dialog::backdrop, */
.dialog-backdrop {
  display: none;
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
@media screen and (min-width: 640px) {
  .dialog-backdrop {
	background: rgba(0, 0, 0, 0.3);
  }
}
.dialog-backdrop.active {
  display: block;
}
.no-scroll {
  overflow-y: auto !important;
}
.has-dialog {
  overflow: hidden;
}

/* Datepicker */

/* Disclosure */
/* Disclosure for Navigation Menus (3/3) */
/* da fare */


/* Feed AND role="article" */
[role="feed"]{
  display: inline-block;
  vertical-align: top;
  min-width: 250px;
  max-width: 100%; 
}

@media screen and (max-width: 560px) {
 [role="feed"] {
    width: 100%;
  }
}

[role="article"] {
	border: 1px solid #dadce0;
	padding: 1em;
	margin: 1em 0;
    background: white;
    box-shadow: 1px 1px 6px #bbb;	
}

/* listbox */
[role="listbox"] {
  min-height: 18em;
  padding: 0;
  background: white;
  border: 1px solid #aaa;
}

[role="option"] {
  display: block;
  padding: 0 1em 0 1.5em;
  position: relative;
  line-height: 1.8em;
}


/* radio group */
[role="radiogroup"] {
  padding: 0;
  margin: 0;
  list-style: none;
}

[role="radiogroup"]:focus {
  outline: none;
}

[role="radio"] {
  border: 2px solid transparent;
  border-radius: 5px;
  display: block;
  position: relative;
  padding: 0.125em !important;
  padding-left: 1.5em !important;
  padding-right: 0.5em !important;
  cursor: pointer;
  outline: none;
  width: fit-content;  
}

[role="radio"]::before,
[role="radio"]::after {
  display: block;	
  position: absolute;
  top: 50%;
  left: 7px;
  transform: translate(-20%, -50%);
  content: '';
}

[role="radio"]::before {
  width: 14px;
  height: 14px;
  border: 1px solid hsl(0, 0%, 66%);
  border-radius: 100%;
  background-image: linear-gradient(to bottom, hsl(0, 0%, 93%), #fff 60%);
}

[role="radio"]:active::before {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 73%), hsl(0, 0%, 93%));
}

[role="radio"][aria-checked="true"]::before {
  border-color: hsl(0, 0%, 62%);
  background: hsl(0, 0%, 78%);
  background-image: linear-gradient(to bottom, hsl(0, 0%, 78%), hsl(0, 0%, 68%));
}

[role="radio"][aria-checked="true"]::after {
  display: block;
  border: 0.1875em solid #fff;
  border-radius: 100%;
  transform: translate(17.5%, -50%);
}

[role="radio"][aria-checked="mixed"]:active::before,
[role="radio"][aria-checked="true"]:active::before {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 68%), hsl(0, 0%, 78%) 60%);
}

[role="radio"]:hover::before {
  border-color: hsl(0, 0%, 75%);
}

[role="radio"].focus {
  border-color: hsl(0, 0%, 81%);
  background-color: hsl(0, 0%, 98%);
}

[role="radio"]:hover {
  background-color: hsl(0, 0%, 94%);
}

/* [role="table"] AND <table> */
[role="table"] {
	overflow-x: auto;
	overflow-y: hidden;
	border-collapse: collapse;
}

[role="table"] [role="columnheader"] {
  display: table-cell;
  font-weight: normal;
  padding: 0.5em;
  background-color: hsl(0, 0%, 28%);
  color: white;
  border: 1px solid hsl(0, 0%, 90%);
  text-align: center;
}

[role="table"] [role="row"] {
  display: table-row;
}

[role="table"] [role="cell"],
[role="table"] [role="columnheader"],
[role="table"] [role="rowheader"] {
  padding: 0.5em;
  display: table-cell;
  border: 1px solid hsl(0, 0%, 90%);
  min-width: 8em;
}

[role="rowgroup"] {
  padding: 0px;
  display: table-row-group;
}

[role="table"] [role="rowgroup"]:last-child [role="row"]:nth-child(odd) {
  background-color: hsl(0, 0%, 90%);
}

table caption {
	display: table-caption;
}

thead {
	display: table-row-group;
}

table {
	overflow-x: auto;
	overflow-y: hidden;
	border-collapse: collapse;
}

th, thead th {
  display: table-cell;
  font-weight: normal;
  padding: 0.5em;
  background-color: hsl(0, 0%, 28%);
  color: white;
  border: 1px solid hsl(0, 0%, 90%);
}

tr {
    display: table-row;
}

td, th {
  padding: 0.5em;
  display: table-cell;
  border: 1px solid hsl(0, 0%, 90%);
  min-width: 8em;
}

tr:nth-child(even) {
  background-color: hsl(0, 0%, 90%);
}

/* Tablist, Tabpanel */
.tabs {
  width: 20em;
}

[role="tablist"] {
  margin: 0 0 -0.1em;
  overflow: visible;
  padding: 0 !important;
  display: inline;
}

[role="tab"] {
  position: relative;
  display: inline-block !important;
  margin: 0;
  padding: 0.3em 0.5em 0.4em;
  border: 1px solid hsl(0, 0%, 72%);
  border-radius: 0.2em 0.2em 0 0;
  box-shadow: 0 0 0.2em hsl(0, 0%, 72%);
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

[role="tab"]:hover::before,
[role="tab"]:focus::before {
  border-color:  hsl(0, 0%, 48%);
  background-color: hsl(0, 0%, 48%);
  cursor: pointer;
}

[role="tab"]:hover::before,
[role="tab"]:focus::before,
[role="tab"][aria-selected="true"]::before {
  position: absolute;
  bottom: 100%;
  right: -1px;
  left: -1px;
  border-radius: 0.2em 0.2em 0 0;
  border-top: 3px solid hsl(0, 0%, 48%); 
  content: '';
  cursor: pointer;
}

[role="tab"][aria-selected="true"] {
  border-radius: 0;
  background: hsl(0, 0%, 99%);
  outline: 0;
  cursor: pointer;
}

[role="tab"][aria-selected="true"]:not(:focus):not(:hover)::before {
  border-top: 5px solid hsl(0, 0%, 64%);	
  cursor: pointer;
}

[role="tab"].active {
	background: hsl(0, 0%, 80%);
}

[role="tab"][aria-selected="true"]::after {
  position: absolute;
  z-index: 3;
  bottom: -1px;
  right: 0;
  left: 0;
  height: 0.3em;
  background: hsl(0, 0%, 99%);
  box-shadow: none;
  content: '';
  cursor: pointer;
}

[role="tab"]:hover,
[role="tab"]:focus,
[role="tab"]:active {
  outline: 0;
  border-radius: 0;
  color: inherit;
  cursor: pointer;
}

[role="tabpanel"] {
  position: relative;
  z-index: 2;
  padding: 0.5em 0.5em 0.7em;
  border: 1px solid hsl(0, 0%, 72%);
  border-radius: 0 0.2em 0.2em 0.2em;
  box-shadow: 0 0 0.2em hsl(0, 0%, 72%);
  background: hsl(0, 0%, 99%);
}

[role="tabpanel"]:focus {
  border-color: hsl(0, 0%, 48%);	/* era rosso */
  box-shadow: 0 0 0.2em hsl(0, 0%, 48%);   /*pure*/
  outline: 0;
}

[role="tabpanel"]:focus::after {
  position: absolute;
  bottom: 0;
  right: -1px;
  left: -1px;
  border-bottom: 3px solid hsl(0, 0%, 48%);   /* rosso */
  border-radius: 0 0 0.2em 0.2em;
  content: '';
}

[role="tabpanel"] p {
  margin: 0;
}

[role="tabpanel"] * + p {
  margin-top: 1em;
}

/* Tree view */
/* Treeview File Directory (1/4), (2/4) */
[role="tree"] {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 110%;
  cursor: pointer;
}

[role="treeitem"][aria-expanded="false"] > ul {
  display: none;
}
[role="treeitem"][aria-expanded="true"] > ul {
  display: block;
}

[role="treeitem"][aria-expanded="false"] > span::before {
  content: '▼';
}
[role="treeitem"][aria-expanded="true"] > span::before {
  content: '►';
}

[role="treeitem"],
[role="treeitem"] span {
  width: 9em;
  margin: 0;
  padding: 0.125em;
  border: 2px transparent solid;
  display: block;
}

[role="treeitem"]:focus {
  outline: 0;
}

[role="treeitem"].focus,
[role="treeitem"] span.focus,
[role="treeitem"].hover,
[role="treeitem"] span:hover {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 85%), hsl(0, 0%, 93%));
  border: 2px solid hsl(0, 0%, 83%);
  border-radius: 5px;
}

/* Treeview Example Using Computed Properties (3/4), (4,4) */
[role="tree"] li,
[role="tree"] [role="treegrid"] {
  margin: 0;
  padding: 5px;
  list-style: none;
}

[role="tree"] a {
  text-decoration: underline;
  border-color: transparent;
}

[role="treeitem"] ul {
  margin: 0;
  padding: 0;
  margin-left: 0.9em;
}



/* Treegrid */
[role="treegrid"] {
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
  table-layout: fixed;
}

[role="treegrid"] thead th {
  display: table-cell;
  font-weight: normal;
  padding: 0.5em;
  background-color: hsl(0, 0%, 28%);
  color: white;
  border: 1px solid hsl(0, 0%, 90%);
}

/* no */
#treegrid tr {
  display: table-row;
}

[role="treegrid"] td,
[role="treegrid"] [role="gridcell"] {
  overflow-x: hidden;
  text-overflow: ellipsis;
  cursor: pointer;  
}

[role="treegrid"] tr:focus,
[role="treegrid"] td:focus,
[role="treegrid"] a:focus,
[role="treegrid"] [role="gridcell"]:focus {
  outline: 2px solid hsl(0, 0%, 75%);
  background-color: hsl(0, 0%, 90%);
  top: -1;
}

[role="treegrid"] tr > td:not(:first-child),
[role="treegrid"] tr > [role="gridcell"]:not(:first-child),
[role="treegrid"] tr > th:not(:first-child) {
  padding-left: 3ch;
}

[role="treegrid"] tr:nth-child(even) {
  background-color: white;
}

[role="treegrid"] tr[aria-level="2"] > td:first-child,
[role="treegrid"] tr[aria-level="2"] > [role="gridcell"]:first-child {
  padding-left: 2.5ch;
}
[role="treegrid"] tr[aria-level="3"] > td:first-child,
[role="treegrid"] tr[aria-level="3"] > [role="gridcell"]:first-child {
  padding-left: 5ch;
}
[role="treegrid"] tr[aria-level="4"] > td:first-child,
[role="treegrid"] tr[aria-level="4"] > [role="gridcell"]:first-child {
  padding-left: 7.5ch;
}
[role="treegrid"] tr[aria-level="5"] > td:first-child,
[role="treegrid"] tr[aria-level="5"] > [role="gridcell"]:first-child {
  padding-left: 10ch;
}
[role="treegrid"] tr[aria-level="6"] > td:first-child,
[role="treegrid"] tr[aria-level="6"] > [role="gridcell"]:first-child {
  padding-left: 12.5ch;
}
[role="treegrid"] tr[aria-level="7"] > td:first-child,
[role="treegrid"] tr[aria-level="7"] > [role="gridcell"]:first-child {
  padding-left: 15ch;
}

[role="treegrid"] tr > td:first-child::before {
  content: " ";
  display: inline-block !important;
  width: 2ch;
  height: 11px;
  transition: transform 0.3s;
  transform-origin: 5px 5px;
}
[role="treegrid"] tr[aria-expanded] > td:first-child::before,
[role="treegrid"] td[aria-expanded]:first-child::before {
  cursor: pointer;
  content: "►";
  margin-left: 10px;
}
[role="treegrid"] tr[aria-expanded="true"] > td:first-child::before,
[role="treegrid"] td[aria-expanded="true"]:first-child::before {
  transform: rotate(90deg);
  margin-left: 10px;
  }







/* Link */
[role="link"] {
  color: hsl(0, 0%, 28%);
  background: transparent;
  text-decoration: underline;
}

[role="link"]:hover,
[role="link"]:focus,
[role="link"]:hover::before,
[role="link"]:focus::before {
  color: black;
  cursor: pointer;
  background: hsl(0, 0%, 95%);
  box-shadow: 0 0 2px 5px hsl(0, 0%, 95%); 
  outline: 2px solid hsl(0, 0%, 26%);
  outline-offset: 0.2em;
  }

/* Button */
[role="button"], button, [type="button"] {
	margin: 5px 0 5px 0;
	padding: 15px 30px;
	display: inline-block;
	position: relative;
	border: 1px solid hsl(0, 0%, 79%);		 /* ho messo 20% più chiaro dell'originale button aria */
	border-radius: 5px;
	box-shadow: 0 1px 2px hsl(0, 0%, 80%);
	color: black;
	background-color: hsl(0, 0%, 85%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 77%), hsl(0, 0%, 80%));
	cursor: pointer;
	}

[role="button"]:hover, button:hover, [type="button"]:hover {
	border-color: hsl(0, 0%, 34%);
	background-color: hsl(0, 0%, 39%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 41%), hsl(0, 0%, 34%));
	cursor: default;
	color: white;
	cursor: pointer;
	}

[role="button"]:focus, button:focus, [type="button"]:focus {
	display: inline-block;
	position: relative;
	border: 1px solid hsl(0, 0%, 79%);		 /* ho messo 20% più chiaro dell'originale button aria */
	border-radius: 5px;
	box-shadow: 0 1px 2px hsl(0, 0%, 80%);
	color: black;
	background-color: hsl(0, 0%, 85%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 77%), hsl(0, 0%, 80%));
	cursor: pointer;
	}

[role="button"]:focus, button:focus, [type="button"]:focus {
	}

[role="button"]:active, button:active, [type="button"]:active {
		border-color: hsl(0, 0%, 58%);
		background-color: hsl(0, 0%, 39%);
		background-image: linear-gradient(to bottom, hsl(0, 0%, 65%), hsl(0, 0%, 59%));
		box-shadow: inset 0 3px 5px 1px hsl(0, 0%, 38%);
		cursor: pointer;
	}

[role="button"][aria-pressed="true"], button[aria-pressed="true"], [type="button"][aria-pressed="true"] {
		padding: 15px 30px;
		border-color: hsl(0, 0%, 69%);
		background-color: hsl(0, 0%, 45%);
		background-image: linear-gradient(to bottom, hsl(0, 0%, 80%), hsl(0, 0%, 77%));
		box-shadow: inset 0 3px 5px 1px hsl(0, 0%, 44%);
	  }

button[aria-disabled="true"],
[role="button"][aria-disabled="true"],
[type="button"][aria-disabled="true"] {
	cursor: not-allowed;
	color: hsl(0, 0%, 90%)
}

button[aria-disabled="true"]:hover,
[role="button"][aria-disabled="true"]:hover,
[type="button"][aria-disabled="true"]:hover {
	cursor: not-allowed;
	color: hsl(0, 0%, 57%);
	background-image: linear-gradient(to bottom, hsl(0, 0%, 80%), hsl(0, 0%, 93%)) !important;
	border: 1px solid hsl(0, 0%, 79%) !important;
}	  
	  
	  
/* Switch Luca Morosini /*
	[role="switch"][aria-checked="false"]::after,
	[role="switch"][aria-checked="true"]::after {
		display: block;
		position: relative;
		width: 12px;
		top: -5px;
		border: 12px solid;
		border-radius: 1em;
		content: "";	
		-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
	}

	[role="switch"][aria-checked="false"]::after {
		border-color: hsl(174, 0%, 95%);
		left: -3px;
	}

	[role="switch"][aria-checked="true"]::after {
		border-color: black !important;
		left: 30px;
	}


/* Fabio has problems, too */

[id*="naptha"] {
	display: none !important; 
}

	/* Do not modify after this line */`.tpl({
						placeHolder: placeHolder
					});

					var SaharianLevelMax = `
	body {
		margin: 	0px;
		border : solid #ffddff 100px;
		display: grid;
		width: calc(100vw - 245px);
		grid-template-areas: "head head search"
						   "left center right"
						   "foot foot foot";
		grid-template-columns: 1fr 2fr 1fr;
	} 

	.saharian-imageDecorative {
		display: initial !important; 
		background-color: rgba(72, 251, 71, 0.5) ; 
	}

	.saharian-imageMissingAlt {
		display: initial !important; 
		background-color: #a40606;
		background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
	}

	body > div {
		border: solid red 1px; 
/*		background-color: #fcc; */
	}

	
	main, [role="main"] {
		grid-area: center; 
		border : solid blue 1px;
		padding: 5px; 
		background-color: white; 
	}
	main::before, [role="main"]::before {
		position: relative;
		font-size: 75%; 
		padding: 5px; 
		top: -2.2em;
		left: -0.4em; 
		content: "MAIN"; 
		background-color: blue;
		color: white;
		font-weight: bold; 
	}

	[role="banner"] {
		grid-area: head; 
		border: none; 
		background-color: white; 
		margin: 0px 0px 5px px; 
	}
	[role="banner"]::before {
		position: relative;
		top: -1.5em;
		content: "banner"
		background-color: green;
		color: white;
		font-weight: bold; 
	}

	footer, [role="contentinfo"] {
		grid-area: foot;
		background-color: #ccc; 
		padding: 10px; 
		margin: 5px 0px 0px 0px; 
	}

	nav, [role="navigation"] {
		grid-area: left; 
		margin: 0px 5px 0px 0px; 
	}
	nav::before, [role="navigation"]::before {
		position: relative;
		top: -1.5em;
		content: "navigation"
		background-color: brown;
		color: white;
		font-weight: bold; 
	}

	[role="search"] {
		grid-area: search; 
		margin: 0px 5px 0px 0px; 
		padding: 5px; 
		border: solid #999999 1px; 
		background-color: #dddddd;
	}

	[role="presentation"] {
		display: block; 
	}
	
	[role="dialog"] {
		position: absolute; 
		width: 60% ;
		top: 10%;
		left: 20%; 
		background-color: white; 
		border: solid black 1px; 
	}


	[role="dialog"] .saharian-label {
		margin: 0px; 
		display: block; 
		top: 0px; 
		left: 0px; 
		right: 0px; 
		color: white; 
		font-size: 125% ;
		background-color: gray; 
		padding: 10px; 
	}

	[role="tablist"] {
		display: block; 
		overflow: hidden;
		margin: 0px; 
		padding: 0px;
		margin-bottom: -1px; 
		z-index: 2; 
	}


	/* Style the buttons that are used to open the tab content */
	[role="tab"] {
		display: inline-block; 
		float: left; 
		z-index: 2; 
		background-color: #eee;
		border: 1px solid #ccc;
		outline: none;
		cursor: pointer;
		color: inherit; 
		text-decoration: inherit; 
		padding: 14px 16px;
		transition: 0.3s;
		margin-right: 5px; 
		z-index: 2; 
		border-radius: 5px 5px 0px 0px;
	}

	/* Change background color of buttons on hover */
	[role="tab"]:hover {
		background-color: #ddd;
	}

	/* Create an active/current tablink class */
	[role="tab"].active {
		border-bottom: 1px solid #fff; 
		background-color: inherit; 
	}

	/* Style the tab content */
	[role="tabpanel"] {
		display: none;
		padding: 6px 12px;
		z-index: 1; 
		border: 1px solid #ccc; 
		width: calc( 100% - 24px) !important; 
	}

	[role="button"] {
		border-radius: 3px;
		padding: 6px;
		border: 1px solid #ccc; 
	}

	img:not([alt]) {
		background-color: #faa ; 
	}

	/* Do not modify after this line */`

					var SaharianLevel3 = `
	p {
		color: green !important; 
	}

	/* Do not modify after this line */`

					var SaharianLevel4 = `
	p {
		background-color: yellow !important; 
	}

	/* Do not modify after this line */`

					/* ----------------------------------------------------------

										  Handle Images
						  
					------------------------------------------------------------ */

					async function deactivateImages() {
						var imgs = [...document.getElementsByTagName('source'), ...document.getElementsByTagName('img')];
						for (var i = 0; i < imgs.length; i++) {
							var img = imgs[i];

							if (!sidelined(img, 'src') && !sidelined(img, 'srcset')) {
								var text = "No image information available";
								if (img.attributes.alt) {
									text = img.attributes.alt.value || "Decorative image" ;
								}
								let role = img.getAttribute("role") || ""
								let datauri = ""
								var wrap = await new Promise ( (resolve, reject) => {
									var wrap = document.createElement("span");
									wrap.innerHTML = text;
									wrap.classList.add('saharian-imageReplacement');
									// img.parentElement.insertBefore(wrap,img)
									document.body.appendChild(wrap)
									resolve(wrap)
								})
								datauri = await node2image(wrap)
								// wrap.parentElement?.removeChild(wrap)
								document.body.removeChild(wrap)
								sideline(img, 'src', datauri);
								sideline(img, 'srcset', datauri);
								sideline(img, 'width')
								sideline(img, 'height')
								sideline(img, 'play')
								if (text == "Decorative image" || role.indexOf('presentation') !== -1 || role.indexOf('none') !== -1) {
									img.classList.add('saharian-imageDecorative')
								}
								if (text == "No image information available" ) {
									img.classList.add('saharian-imageMissingAlt')
								}
							}
						}
						status.deactivateImages = setTimeout(deactivateImages, 500);
					}

					function reactivateImages() {
						var imgs = [...document.getElementsByTagName('source'), ...document.getElementsByTagName('img')];
						for (var i = 0; i < imgs.length; i++) {
							restore(imgs[i], 'src');
							restore(imgs[i], 'srcset');
							restore(imgs[i], 'width')
							restore(imgs[i], 'height')
							restore(imgs[i], 'play')
							imgs[i].classList.remove('saharian-imageDecorative')
						}
						var reps = [].slice.call(document.getElementsByClassName("saharian-imageReplacement"));
						for (var i = 0; i < reps.length; i++) {
							reps[i].remove();
						}
					}


					/* ----------------------------------------------------------

									 Handle stylesheets
						  
					------------------------------------------------------------ */

					async function deactivateStylesheets() {
						var newRules = ""
						for (var i = 0; i < document.styleSheets.length; i++) {
							var s = document.styleSheets[i];
							var css = ""
							var id = s.ownerNode.id || '';
							if (!id || id.indexOf("saharian") !== 0) {
								if (s.href) {
									var base = s.href;
									css = await remoteCSS(s.href);
								} else {
									var base = document.location.href;
									css = await localCSS(s);
								}
								newRules += await replacedRules(css, base);
								s.disabled = true;
								s.ownerNode.setAttribute('data-saharian-disabled', 'true');
							}
						}
						appendCSS({
							css: newRules,
							id: 'saharianLevel0'
						});
					}

					function reactivateStylesheets() {
						var toberemoved = [];
						for (var i = 0; i < document.styleSheets.length; i++) {
							var s = document.styleSheets[i];
							var id = s.ownerNode.id || '';
							if (!id || id.indexOf("saharian") !== 0) {
								document.styleSheets[i].disabled = false;
								s.ownerNode.removeAttribute('data-saharian-disabled');
							} else {
								toberemoved.push(id);
							}
						}
						for (var i = 0; i < toberemoved.length; i++) {
							document.getElementById(toberemoved[i]).remove();
						}
					}

					var appendCSS = function (data) {
						var goOn = false;
						var s = document.createElement('style');
						s.setAttribute('type', 'text/css');
						s.setAttribute("rel", "stylesheet")
						if (data.id) {
							var old = document.getElementById(data.id)
							if (old) old.remove();
							s.setAttribute('id', data.id);
						}
						if (data.href) {
							s.setAttribute('href', chrome.extension.getURL(data.href));
							goOn = true;
						} else if (data.css) {
							s.appendChild(document.createTextNode(data.css));
							goOn = true;
						}
						if (goOn) {
							document.getElementsByTagName('head')[0].appendChild(s);
							if (data.disabled) {
								s.sheet.disabled = true;
								s.setAttribute('data-saharian-disabled', 'true');
							}
						}
					};

					var enableStylesheet = function (id) {
						var s = document.getElementById(id);
						s.sheet.disabled = false;
						s.removeAttribute('data-saharian-disabled');
					}

					async function remoteCSS(url) {
						return new Promise(function (resolve, reject) {
							var xhr = CORSRequest("GET", url);
							xhr.onload = function () {
								var ttr = textToRules(xhr.responseText);
								resolve(ttr);
							}
							xhr.onerror = function () {
								console.log('url "' + url + '" did not load!');
								resolve("");
							};
							xhr.send();
						});
					};

					async function localCSS(stylesheet) {
						return stylesheet.cssRules || stylesheet.rules;
					}

					async function replacedRules(css, base) {
						var rules = '';
						for (var i = 0; i < css.length; i++) {
							if (css[i] instanceof CSSImportRule) {
								var url = resolveURL(base, css[i].href);
								var css = await remoteCSS(url);
							} else if (css[i] instanceof CSSMediaRule) {
								var mr = css[i].rules || css[i].cssRules;
								var rr = ""
								for (var j = 0; j < mr.length; j++) {
									rr += generateReplacementForRule(mr[j]);
								}
								rules += `
								@media $selector { 
									$rules
								}
							`.tpl({
									selector: css[i].conditionText,
									rules: rr
								});
							} else if (css[i] instanceof CSSStyleRule) {
								if (css[i].selectorText && css[i].selectorText.indexOf("saharian-debug")!==-1) {
									rules += css[i].cssText
								} else {
									rules += generateReplacementForRule(css[i]);
								}
							};
						}
						return rules;
					}

					function generateReplacementForRule(rule) {
						var newRules = '';
						for (var i = 0; rule.style && i < rule.style.length; i++) {
							var name = rule.style[i]
							var value = rule.style[name];
							var important = rule.style.getPropertyPriority(name) == 'important' ? '!important' : '';
							if (name == 'position') {
								newRules += "$name: $value $important;\n".tpl({
									name: name,
									value: 'static',
									important: important
								})
							} else if (name == 'display') {
								var v = ['none', 'inline', 'inherit', 'initial'].indexOf(value) !== -1 ? value : 'block';
								newRules += "$name: $value $important;\n".tpl({
									name: name,
									value: v,
									important: important
								})
							} else if (name == 'visibility') {
								var addedRule = value == 'hidden' ? 'height: 0px; ' : ''
								newRules += "$name: $value $important;\n $added".tpl({
									name: name,
									value: value,
									important: important,
									added: addedRule
								})
							}
						}
						if (newRules) {
							if (rule.selectorText) {
								return `
									$selector { 
										$rules
									}

									`.tpl({
									selector: rule.selectorText,
									rules: newRules
								});
							} else {
								return newRules;
							}
						} else {
							return ""
						}
					}

					// https://stackoverflow.com/questions/3326494/parsing-css-in-javascript-jquery
					var textToRules = function (styleContent) {
						var doc = document.implementation.createHTMLDocument("");
						var styleElement = document.createElement("style");
						styleElement.textContent = styleContent;
						doc.body.appendChild(styleElement);
						return styleElement.sheet.cssRules;
					};

					// https://stackoverflow.com/questions/24472352/external-css-styles-cant-be-accessed-in-google-chrome
					var CORSRequest = function (method, url) {
						var xhr = new XMLHttpRequest();
						if ("withCredentials" in xhr) { // Chrome, Firefox, Opera, Safari
							xhr.open(method, url, true);
						} else if (typeof XDomainRequest != "undefined") { // IE
							xhr = new XDomainRequest();
							xhr.open(method, url);
						} else { // CORS isn't supported
							xhr = null;
						}
						return xhr;
					}


					/* ----------------------------------------------------------

								Handle individual style attributes
						  
					------------------------------------------------------------ */

					function deactivateStyles() {
						var styles = document.querySelectorAll('*[style]');
						for (var i = 0; i < styles.length; i++) {
							if (!sidelined(styles[i], 'style')) {
								var x = generateReplacementForRule(styles[i]);
								sideline(styles[i], 'style', x);
							}
						}
					}

					function reactivateStyles() {
						var styles = getSidelined('style')
						for (var i = 0; i < styles.length; i++) {
							restore(styles[i], 'style');
						}
					}

					/* ----------------------------------------------------------

						   		Handle accessible names
					 	 based on https://www.w3.org/TR/accname-1.1/
					------------------------------------------------------------ */

					let emptyElems = ['INPUT','TABLE']
					let ANSelector =    `*[aria-label], 
									  	 *[aria-labelledby]`
					let ADSelector =    `*[aria-describedby]`
					let dummySelector = `.saharian-dummy`
					let currentTraversal = null
					
					function generateAccessibleNames() {
						var elements = document.querySelectorAll(ANSelector);
						for (let i = 0; i < elements.length; i++) {
							currentTraversal = [] 
							if (!elements[i].hasAttribute('data-saharian-an')) {
								var x = generateTextAlternative(elements[i], 'name');
								if (x) {
									if (emptyElems.indexOf(elements[i].nodeName) == -1) {
										elements[i].setAttribute("data-saharian-an", x, false)	
									} else {
										elements[i].setAttribute("data-saharian-an", "", false)	
										elements[i].insertAdjacentHTML('beforeBegin', `<span class="saharian-dummy" data-saharian-an="${x}"></span>`)
									}
								} 
							}
						}
						var elements = document.querySelectorAll(ADSelector);
						for (let i = 0; i < elements.length; i++) {
							currentTraversal = [] 
							if (!elements[i].hasAttribute('data-saharian-ad')) {
								var x = generateTextAlternative(elements[i], 'description');
								if (x) {
									if (emptyElems.indexOf(elements[i].nodeName) == -1) {
										elements[i].setAttribute("data-saharian-ad", x, false)	
									} else {
										elements[i].setAttribute("data-saharian-ad", "", false)	
										elements[i].insertAdjacentHTML('afterend', `<span class="saharian-dummy" data-saharian-ad="${x}"></span>`)
									}
								}
							}
						}
					}

					function removeAccessibleNames() {
						var elements = document.querySelectorAll(ANSelector);
						for (var i = 0; i < elements.length; i++) {
								elements[i].removeAttribute("data-saharian-an")
								elements[i].removeAttribute("data-saharian-ad")
						}
						elements = document.querySelectorAll(dummySelector);
						for (var i = 0; i < elements.length; i++) {
							elements[i].parentNode.removeChild(elements[i]);
						}
					}
					
					function generateTextAlternative(el, type, traversal) {
						let idrefs = null
						let result = ""

						if (isHidden(el) && !traversal) return ""
							
						if (type=='name' && el.hasAttribute('aria-labelledby') && currentTraversal.indexOf(el) == -1) {
							idrefs = el.getAttribute('aria-labelledby').split(' ')					
						} else if (type=='description' && el.getAttribute('aria-describedby') && currentTraversal.indexOf(el) == -1) {
							idrefs = el.getAttribute('aria-describedby')?.split(' ')											
						}

						currentTraversal.push(el)						
						if (idrefs) {
							for (var i in idrefs) {							
								result += ' ' + generateTextAlternative(document.getElementById(idrefs[i]),type, true)
							}
						} else if (el.hasAttribute('aria-label')) {
							result += ' ' + el.getAttribute('aria-label').trim()
						} else if (el.title && el.title.trim() !== '') {
							result += el.title.trim()
						} else if (el.alt && el.alt.trim() !== '') {
							result += el.alt.trim()
						} else if (el.ariaValueText) {
							result += el.ariaValueText.trim()
						} else if (el.ariaValueNow) {
							result += el.ariaValueNow.trim()
						} else {
							result += el.innerText || ""	
						}
						currentTraversal.pop()
						return result.trim()
					}

					// https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
					// Where el is the DOM element you'd like to test for visibility
					function isHidden(el) {
						return (el.offsetParent === null)
					}

					/* ----------------------------------------------------------

								 Handle mouse and navigation
						  
					------------------------------------------------------------ */

					function convertMouseEvent(ev) { //modificato action { , focus, blur}
						var action = {
							'click': 'click',
							'mouseenter': '',
							'mouseexit': ''
						} [ev.type];

						if (ev.target && (ev.target?.id.indexOf('saharian') !== -1 || canFocus(ev.target))) {
							if (action !== ev.type) {
								ev.target[action]();
								ev.stopImmediatePropagation();
							}
						} else {
							ev.stopImmediatePropagation();
						}
					}

					function canFocus(el) {
						// https://stackoverflow.com/questions/7668525
						// $('*[tabindex], a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), 
						// button:not([disabled]), iframe, object, embed, *[contenteditable]'
						if (el && el.attributes && el.attributes.tabindex && (parseInt(el.attributes.tabindex.value) > -1)) return true;
						if (el.nodeName) {
							if (el.nodeName.toLowerCase() == 'a' && el.attributes.href) return true;
							if (el.nodeName.toLowerCase() == 'area' && el.attributes.href) return true;
							if (el.nodeName.toLowerCase() == 'input' && !el.disabled) return true;
							if (el.nodeName.toLowerCase() == 'select' && !el.disabled) return true;
							if (el.nodeName.toLowerCase() == 'input' && !el.disabled) return true;
							if (el.nodeName.toLowerCase() == 'textarea' && !el.disabled) return true;
							if (el.nodeName.toLowerCase() == 'button' && !el.disabled) return true;
							if (el.nodeName.toLowerCase() == 'iframe') return true;
							if (el.nodeName.toLowerCase() == 'object') return true;
							if (el.nodeName.toLowerCase() == 'embed') return true;
						}
						if (el.attributes && el.attributes.contenteditable) return true;
						return false;
					}

					/* ----------------------------------------------------------

								 saharian event bypass
						  
					------------------------------------------------------------ */

					function injectEventBypass() {
						document.body.addEventListener('click',convertMouseEvent,true)
/*						var All = document.querySelectorAll('*');
						All.forEach(function (i, e) {
							i.addEventListener('click', convertMouseEvent)
							i.addEventListener('mouseenter', convertMouseEvent)
							i.addEventListener('mouseexit', convertMouseEvent)
						});
*/					}

					function removeEventBypass() {
						document.body.removeEventListener('click',convertMouseEvent,true)
/*						var All = document.querySelectorAll('*');
						All.forEach(function (i, e) {
							i.removeEventListener('click', convertMouseEvent)
							i.removeEventListener('mouseenter', convertMouseEvent)
							i.removeEventListener('mouseexit', convertMouseEvent)
						});
*/					}

					/* ----------------------------------------------------------

								 Utilities
						  
					------------------------------------------------------------ */

					var node2image = async function(node) {
						try {
							var x = await new Promise( (resolve, reject) => {
								domtoimage.toPng(node)
								.then((dataUrl) => {
									resolve(dataUrl)
								})
								.catch( (error) => { 
									reject(error) 
								})		
							})	
							return x
						} catch (e) {
							return e.message					
						}
					}
    



					var getNode = function (selectorOrNode) {
						if (typeof selectorOrNode == 'object')
 							return selectorOrNode;
						return document.querySelectorAll(selector);
					}

					function toDOM(domstring) {
						var html = new DOMParser().parseFromString(domstring, 'text/html');
						return html.body.firstChild;
					};

					String.prototype.tpl = function (o) {
						var r = this;
						for (var i in o) {
							r = r.replace(new RegExp("\\$" + i, 'g'), o[i])
						}
						return r
					}

					String.prototype.fakehashCode = function () {
						return this.substr(0, 50);
					};

					// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
					String.prototype.hashCode = function () {
						var hash = 0,
							i, chr;
						if (this.length === 0) return hash;
						for (i = 0; i < this.length; i++) {
							chr = this.charCodeAt(i);
							hash = ((hash << 5) - hash) + chr;
							hash |= 0; // Convert to 32bit integer
						}
						return hash;
					};

					// https://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascript
					function resolveURL(base, relative) {
						var stack = base.split("/");
						var parts = relative.split("/");

						stack.pop(); // remove current file name (or empty string)
						// (omit if "base" is the current folder without trailing slash)
						for (var i = 0; i < parts.length; i++) {
							if (parts[i] == ".")
								continue;
							if (parts[i] == "..")
								stack.pop();
							else
								stack.push(parts[i]);
						}
						return stack.join("/");
					}

					function sidelined(el, attr) {
						var hash = 'data-saharian-sideline-' + attr
						return el.attributes[hash] && (el.attributes[attr] ? el.attributes[hash].value == "done" || el.attributes[attr].value.hashCode() == el.attributes[hash].value : true);
					}


					function getSidelined(attr) {
						var sideline = 'data-saharian-sideline-' + attr;
						return document.querySelectorAll(`*[${sideline}]`);
					}
					
					function sideline(el, attr, value) {
						if (el.attributes[attr]) {
							var sideline = 'data-saharian-sideline-' + attr;
							var hash = 'data-saharian-sideline-' + attr + '-hash';
							el.setAttribute(sideline, el.attributes[attr].value);
							if (value) {
								el.setAttribute(attr, value);
								el.setAttribute(hash, value.hashCode() );
							} else {
								el.setAttribute(hash, "done");
								el.removeAttribute(attr);
							}
							return true
						} 
						return false
					}

					function restore(el, attr) {
						var sideline = 'data-saharian-sideline-' + attr;
						var hash = 'data-saharian-sideline-' + attr + '-hash';
						if (el.attributes[sideline]) {
							el.setAttribute(attr, el.attributes[sideline].value);
							el.removeAttribute(sideline)
						}
						if (el.attributes[hash]) {
							el.removeAttribute(hash)
						}


					}

					function wrapElement(oldNode, newNode) {
						oldNode.parentNode.insertBefore(newNode, oldNode);
						oldNode.remove();
					}

					function unwrapElement(node) {
						var granfather = node.parentNode.parentNode
						grandfather.insertBefore(node, node.parentNode);
						node.parentNode.remove();
					}

					/* ----------------------------------------------------------

									 saharian object
							  
						------------------------------------------------------------ */

					return {
						status: function () {
							return status;
						},
						activate: async function (level, mode) {
							status.currentLevel = level;
							status.currentMode = mode;
							if (level == 'off') {
								log("Deactivating (level '$level', mode '$mode')".tpl({
									level: level,
									mode: mode
								}));
								reactivateStylesheets()
								removeEventBypass();
								if (status.deactivateImages) {
/*									clearInterval(status.deactivateImages); */
									clearTimeout(status.deactivateImages)
									reactivateImages();
								}
								if (status.deactivateStyles) {
									clearInterval(status.deactivateStyles);
									reactivateStyles();
								}
								if (status.generateAccessibleNames) {
									clearInterval(status.generateAccessibleNames);
									removeAccessibleNames();
								}
							} else {
								log("Activating at level $level with mode '$mode'".tpl({
									level: level,
									mode: mode
								}));
								status.generateAccessibleNames = setInterval(generateAccessibleNames, 500);
								deactivateImages()
/*								status.deactivateImages = setInterval(deactivateImages, 500); */
								status.deactivateStyles = setInterval(deactivateStyles, 500);
			
								injectEventBypass();
								await deactivateStylesheets();

								appendCSS({
									css: SaharianLevelMin,
									id: "saharianLevelMin",
									disabled: false
								});
								appendCSS({
									css: SaharianLevelMax,
									id: "saharianLevelMax",
									disabled: true
								});
								if (level == 'max') enableStylesheet("saharianLevelMax");
							}
						}
					}
				})();
			}

			window[extPrefix].activate(data[extName].level, data[extName].mode);
		}
	});
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		activate(true);
	}
);


String.prototype.tpl = function (o) {
	var r = this;
	for (var i in o) {
		r = r.replace(new RegExp("\\$" + i, 'g'), o[i])
	}
	return r
}

String.prototype.ellipsis = function (len) {
	return (len < 5 || this.length <= len) ? (this + '') : (this.substring(0, len - 3) + '...');
}

function log() {
	var loc = ((document && document.location && document.location.href) ? document.location.href : "No location");
	var text = "$name $version on document '$loc'".tpl({
		name: extName,
		version: extVersion,
		loc: loc.ellipsis(50)
	});
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] == 'object')
			text += "\n" + JSON.stringify(arguments[i], null, 2)
		else
			text += "\n" + arguments[i]
	}
	console.log(text);
}















