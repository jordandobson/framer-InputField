################################################################################
# Created 07 Jan 2016 by Jordan Robert Dobson / @jordandobson / JordanDobson.com
################################################################################
#
# Valid & Tested InputField Types: 
# 	"text", "email", "number", "number-only", "url", "tel", "password", "search"
# 	"time", "month", "date", "datetime-local", "file", "file-multiple", "file-image", "file-video"
# 
# The time & date types REQUIRE the value property is in a correct format & IGNORE the placeholder property.
# 
# Here's a few examples to use for the value: property when you create them:
#
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
################################################################################


class InputField extends Layer

	PATTERN_NUMBER = "[0-9]*"
	
	INPUT_HIDE_PSUEDO_UI  = "{ -webkit-appearance: none; display: none; }"
	INPUT_SELECTOR_NUMBER = "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button"
	INPUT_SELECTOR_SEARCH = "input[type=search]::-webkit-search-cancel-button"
	
	Events.Input    = "InputField.OnInput"
	Events.Focus    = "InputField.OnFocus"
	Events.Blur     = "InputField.OnBlur"
	Events.Valid    = "InputField.OnValid"
	Events.Invalid  = "InputField.OnInvalid"
	Events.Match    = "InputField.OnMatch"
	Events.FileData = "InputField.OnFileData"
	
	@define "value",
		get: ->
			@input.value
			
		set: (v) ->
			return unless v
			if @input
				@changeInputValue v


	constructor: (@options={}) ->
	
		@isNumber = false
		@isSearch = false
		@isFile   = false
		
		@isEmpty  = true
		@isValid  = null
		
		@isFileMulti = false
		@isFilePhoto = false
		@isFileVideo = false
		
		@originalTextColor = null
		
		# Make sure we set the Checking Flag
		@shouldCheckValidity = true if @options.pattern? or @options.match?

		# Make sure this is in px
		@options.lineHeight = "#{@options.lineHeight}px" if @options.lineHeight?
		 								
		# Framer Layer Props
		@options.name             ?= "#{@options.type}Input"
		@options.color            ?= "#000"
		@options.backgroundColor  ?= ""
		@options.borderRadius     ?= 0

		# Custom Layer Props		
		@options.type             ?= "text"
		@options.fontSize         ?= 32
		@options.fontWeight       ?= 300
		@options.fontFamily       ?= "-apple-system, Helvetica Neue"
		@options.lineHeight       ?= 1.25
		@options.indent           ?= 0
		@options.placeHolderFocus ?= null
		@options.placeHolderColor ?= null


		# Started work on file
		if _.startsWith(@options.type, ["file"])
			@options.fontSize = "inherit"
			@options.fontWeight = 400
			@options.lineHeight = 1

		super @options
		
		# Adjust a few things for various types
		
		switch @options.type
			when "search" then @isSearch = true
			when "number" then @isNumber = true
			when "numbers-only", "number-only"
				@isNumber = true
				@options.type    = if @options.pattern? then "number"         else "text"
				@options.pattern = if @options.pattern? then @options.pattern else PATTERN_NUMBER
			when "file", "file-multiple", "file-image", "file-video"
				@isFile = true
				@isFilePhoto = true if @options.type is "file-image"
				@isFileVideo = true if @options.type is "file-video"
				@isFileMulti = true if @options.type is "file-multiple"
				@options.type = "file"
				
		
		@html += switch
			when @isNumber then "<style type='text/css'>#{INPUT_SELECTOR_NUMBER}#{INPUT_HIDE_PSUEDO_UI}</style>"
			when @isSearch then "<style type='text/css'>#{INPUT_SELECTOR_SEARCH}#{INPUT_HIDE_PSUEDO_UI}</style>"
			else ""

		if @options.placeHolderColor?
			@html += "<style type='text/css'>::-webkit-input-placeholder { color: #{@options.placeHolderColor}; } ::-moz-placeholder { color: #{@options.placeHolderColor}; } :-ms-input-placeholder { color: #{@options.placeHolderColor}; } ::-ms-input-placeholder { color: #{@options.placeHolderColor}; } :placeholder-shown { color: #{@options.placeHolderColor}; }</style>"
			
		# Create The Input
		
		@input = document.createElement "input"
		# Text Type Adjustments
		@input.type        = @options.type
		@input.value       = @options.value                  if @options.value?
		@input.placeholder = @options.placeHolder            if @options.placeHolder?
		@input.pattern     = @options.pattern                if @options.pattern?
		@input.setAttribute("maxLength", @options.maxLength) if @options.maxLength?
		@input.setAttribute("autocapitalize", (if @options.autoCapitalize is true then "on" else "off"))
		@input.setAttribute("autocomplete",   (if @options.autoComplete   is true then "on" else "off"))
		@input.setAttribute("autocorrect",    (if @options.autoCorrect    is true then "on" else "off"))
		# File Type Adjustments 
		@input.setAttribute("multiple", "multiple") if @isFileMulti
		@input.setAttribute("accept",   "video/*" ) if @isFileVideo
		@input.setAttribute("accept",   "image/*" ) if @isFilePhoto
		
		@_element.appendChild @input
		
		# Setup Values
		@isEmpty           = !(@options.value?.length > 0)
		@originalTextColor = @options.color
		
		# Setup Input Style
		
		inputStyle =
			font: "#{@options.fontWeight} #{@options.fontSize}px/#{@options.lineHeight} #{@options.fontFamily}"
			outline: "none"
			textIndent: "#{@options.indent}px"
			backgroundColor: "transparent"
			height: "100%"
			width:  "100%"
			margin:  "0"
			padding: "0"
			verticalAlign: "top"
			"-webkit-appearance": "none"
			opacity:       if @isFile then 0     else 1
			pointerEvents: if @isFile then "all" else "auto"
			
		@input.style[key]  = val for key, val of inputStyle
		@input.style.color = @options.color if @options.color?
		
		@input.onfocus = =>
			document.body.scrollTop = 0
			@input.placeholder = @options.placeHolderFocus if @options.placeHolderFocus?
			document.body.scrollTop = 0
			@emit(Events.Focus, @input.value, @)

		@input.onblur  = =>
			document.body.scrollTop = 0
			unless @input.placeholder is @options.placeHolder or !@options.placeHolder?
				@input.placeholder = @options.placeHolder
			@emit(Events.Blur, @input.value, @)

		@input.oninput = =>
			@isEmpty = !( @input.value?.length > 0)
			@emit(Events.Input, @input.value, @)
			@checkValidity()
			
		@input.addEventListener("change", @fileSelectHandler, false) if @isFile
			
		@on Events.TouchEnd, -> @input.focus()
		@on "change:color",  -> @changeInputTextColor()
		
		@wrapFileInputToParent()
		

	# http://www.sitepoint.com/html5-javascript-open-dropped-files/
	fileSelectHandler: (event) =>
		return unless event # fix Check this better?
		file = event.target.files[0]		
		if file.type.indexOf("image") == 0
			reader = new FileReader()
			reader.onload = (readEvent) => 
				@emit(Events.FileData, readEvent.target.result, @)
				console.log readEvent
				console.log file
			reader.readAsDataURL file
		
	checkValidity: ->
		return unless @shouldCheckValidity

		if @options.pattern?
			validity = @input.checkValidity()
			@isEmpty = !( @input.value?.length > 0)
			
			if @isValid isnt validity or @isEmpty
				if @isEmpty or !validity
					@isValid = false
					@emit(Events.Invalid, @input.value, @)
				else
					@isValid = true
					@emit(Events.Valid,   @input.value, @)
					
		if @checkMatch()
			@isValid = true
			@emit(Events.Match, @input.value, @)
			
	checkMatch: ->
		return false unless @options.match?
		if Array.isArray(@options.match)
			for match in @options.match
				return true if @input.value.indexOf(match) > -1
		else
			return true if @input.value.indexOf(@options.match) > -1
		return false
			
	clear: ->
		@input.value = ""
		@isValid = null
		@isEmpty = true
		
	changeInputTextColor: -> 
		@input.style.color = @color.toHexString()
	
	changeInputValue: (v) ->
		@input.value = v
		@input.oninput()
		
	wrapFileInputToParent: ->
		return unless @isFile
		if @.parent
			@.width  = @.parent.frame.width
			@.height = @.parent.frame.height
		else
			@input.style.opacity = 1
			@input.style.lineHeight = "#{@.height}px"
			@input.style.color = "#fff"
			@input.style.textIndent = "1em"
			@.backgroundColor  = "#fff"



convertToInputField = (layer, @options={}) ->
	layerCSS = {}
	layer._info.metadata.css.forEach (rule) ->
		return if _.includes rule, '/*'
		arr = rule.split(': ')
		layerCSS[arr[0]] = arr[1].replace(';','').replace('px','')

	@options.color            ?= layerCSS["color"] ?= "000"
	@options.backgroundColor  ?= layerCSS["background-color"] ?= "transparent"
	@options.borderRadius     ?= layerCSS["border-radius"] ?= 0
	@options.type             ?= "text"
	@options.fontSize         ?= layerCSS["font-size"] ?= 32
	@options.lineHeight 			?= layerCSS["line-height"] ?= @options.fontSize * 1.25 * 1.25;
	@options.fontWeight       ?= layerCSS["font-weight"] ?= 300
	@options.fontFamily       ?= layerCSS["font-family"] ?= "-apple-system, Helvetica Neue"
	@options.letterSpacing    ?= layerCSS["letter-spacing"] ?= 0
	@options.indent           ?= layerCSS["indent"] ?= 0
	@options.placeHolder 			?= layer._info.metadata.string ?= ""
	@options.placeHolderFocus ?= null
	@options.placeHolderColor ?= null
	@options.parent 					?= layer.parent
	@options.name 						?= layer.name
	@options.x 								?= layer.x
	@options.y 								?= layer.y
	@options.width						?= layer.width
	@options.height						?= layer.height
	@options.value 						?= null
	@options.overflow					?= "visible"

	@options.lineHeight = parseInt(@options.lineHeight) # parse into int
	@options.fontSize = parseInt(@options.fontSize) # parse into int
	@options.letterSpacing = parseInt(@options.letterSpacing) # parse into int

	@options.y -= 2 * ( (@options.lineHeight-@options.fontSize)/2 ) # compensate for how CSS handles line height
	@options.y -= 2 * @options.fontSize * 0.1 # sketch padding
	@options.x -= @options.fontSize * 0.08 # sketch padding
	@options.width += @options.fontSize * 0.5 # sketch padding

	importPath = layer.__framerImportedFromPath
	if _.includes importPath, '@2x'
		@options.fontSize *= 2
		@options.lineHeight *= 2
		@options.letterSpacing *= 2
		@options.height *= 2

	element = new InputField @options

	layer.destroy()
	return element

Layer::convertToInputField = -> convertToInputField(@)

convertInputFields = (obj) ->
	for prop,layer of obj
		if layer._info.kind is "text"
			obj[prop] = convertToInputField(layer)

exports.InputField = InputField
exports.convertInputFields = convertInputFields
