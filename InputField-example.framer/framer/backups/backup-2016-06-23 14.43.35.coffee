{InputField} = require 'InputField'

################################################################################
# Updated 04 APR 2016 by Jordan Robert Dobson / @jordandobson / JordanDobson.com
################################################################################

Screen.backgroundColor = "#808080"
	
################################################################################
# Build the text inputs
#
# Valid & Tested InputField Types:
# 	"text", "email", "number", "number-only", "url", "tel", "password", "search", file, file-multiple, file-image, file-video
# 	"time", "month", "date", "datetime-local"
# 
# The time & date types REQUIRE the value property is in a correct format & IGNORE the placeholder property.
#
# Here's a few examples to use for the value: property when you create them.
# 	* time: "12:38"
# 	* month: "2016-01"
# 	* date: "2016-01-04"
# 	* datetime-local: "2016-01-04T12:44:31.192"
#
# NOTES / 
# 	Some types work better than others on mobile or display differently than desktop.
# 	All properties will work with input type "text" but may not work with other types.
# 	Some events won't fire if you enter incorrect content for the field type: i.e. "hello" for input type "number".
# 	Find more patterns for Valid and Invalid events at http://html5pattern.com
# 
# TO DO - Textarea or Content Editable
# 
################################################################################
# SIMPLE EXAMPLE
# myInput = new InputField
# 		width: 300
# 		height: 88
# 		backgroundColor: "white"

################################################################################
# ADVANCED EXAMPLE WITH EVENTS & ALL SUPPORTED PROPERTIES

photoSpot = new Layer
	width:  Screen.width
	height: Screen.height/2
	image: ""
	maxY: Screen.height
	backgroundColor: "black"
	html: "Add Image"
	style: 
		font: "200 2em/#{Screen.height/2}px -apple-system, Roboto, helvetica, sans-serif"
		textAlign: "center"
		

fileInput = new InputField
	name: "fileInput"
	type: "file-image"
	width:  Screen.width
	parent: photoSpot
	
fileInput.on Events.FileData, (value, layer) ->
	@.parent.image = value

colorInput = new InputField
	name: "colorInput"
	type: "text"
	width:  Screen.width
	height: 132
	y: 0
	color: "#696969"
	backgroundColor: "#f5f5f5"
	indent:   48
	fontSize: 48
	fontWeight: 600
	fontFamily: "Georgia, serif"
	placeHolder: "Enter Hexadecimal Color"
	placeHolderFocus: "#_ _ _ _ _ _"
	placeHolderColor: "silver"
	autoCapitalize: false
	autoComplete: false
	autoCorrect: false
	maxLength: 7
	pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
	match: ["orange", "Orange", "red", "Red", "blue", "Blue"]
	value: ""
	# lineHeight: 30

colorInput.on Events.Input, (value, layer) ->
	setDefault @ if @.isEmpty
	# print "INPUT", value, layer, @.isEmpty
	
colorInput.on Events.Focus, (value, layer) ->
	@.color = @.originalTextColor
	# print "Blur", value, layer

colorInput.on Events.Blur, (value, layer) ->
	@.color = "limeGreen" if @.isValid
	# print "Blur", value, layer

colorInput.on Events.Valid, (value, layer) ->
	setValid @, value
	# print "Valid", value, layer
	
colorInput.on Events.Invalid, (value, layer) ->
	setInvalid @, value

colorInput.on Events.Invalid, (value, layer) ->
	setInvalid @, value
	# print "Invalid", value, layer

colorInput.on Events.Match, (value, layer) ->
	setDefault @, value
	@.animate properties: 
		backgroundColor: value
		color: "#fff"
	Utils.delay 3, =>
		@.animate properties: 
			backgroundColor: "#f5f5f5"
			color: @.originalTextColor
		
################################################################################
# DEMO HELPER FUNCTIONS 

setDefault = (input, value) ->
	check.states.switch "invalid"
	input.color = input.originalTextColor
	input.backgroundColor = "#f5f5f5"
	Screen.backgroundColor = "#808080"

setValid = (input, value) ->
	check.states.switch "valid"
	input.color = input.originalTextColor
	input.backgroundColor = "#f5f5f5"
	Screen.backgroundColor = value
			
setInvalid = (input, value) ->
	check.states.switch "invalid"
	input.backgroundColor = "#f5f5f5"
	Screen.backgroundColor = value	
	Utils.delay 1.5, =>
		unless input.isValid
			input.color = "red" unless input.isEmpty
			check.states.switch "invalid"
			Screen.backgroundColor = value

################################################################################
# DEMO HELPER CODE FOR CHECKMARK

check = new Layer
	width: 20
	height: 40
	rotation: 45
	backgroundColor: ""
	style: boxShadow: "inset -8px -8px 0 limeGreen"
	
check.states.add
	valid: opacity: 1, scale: 1
	invalid: opacity: 0, scale: .25
check.states.animationOptions = curve: "spring(1000,30,0)"
check.states.switchInstant "invalid"
check.center()

check.bringToFront()
check.props =
	midY: colorInput.midY - 8
	maxX: colorInput.maxX - 48

################################################################################
# DEMO FOR CLASS FUNCTIONS	
	
buttton_read = new Layer
	width: Screen.width/3
	height: 88
	y: 132 + (Screen.width/3)/3
	x: (Screen.width/3)/3
	borderRadius: 132/2
	backgroundColor: "rgba(0,0,0,.25)"
	html: "Print Value"
	style: 
		font: "400 32px/88px -apple-system, sans-serif"
		textAlign: "center"
		boxShadow: "inset 0 0 0 2px #fff"
		
buttton_read.onClick ->
	print if colorInput.checkMatch() then "Match Found" else "No Match Found"
	print colorInput.value
		
buttton_clear = new Layer
	width: Screen.width/3
	height: 88
	y: 132 + (Screen.width/3)/3
	maxX: Screen.width - (Screen.width/3)/3
	borderRadius: 132/2
	backgroundColor: "rgba(0,0,0,.25)"
	html: "Clear Value"
	style: 
		font: "400 32px/88px -apple-system, sans-serif"
		textAlign: "center"
		boxShadow: "inset 0 0 0 2px #fff"
	
buttton_clear.onClick -> 
	colorInput.clear()	
	setDefault(colorInput)
	