require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"InputField":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.InputField = (function(superClass) {
  var INPUT_HIDE_PSUEDO_UI, INPUT_SELECTOR_NUMBER, INPUT_SELECTOR_SEARCH, PATTERN_NUMBER;

  extend(InputField, superClass);

  PATTERN_NUMBER = "[0-9]*";

  INPUT_HIDE_PSUEDO_UI = "{ -webkit-appearance: none; display: none; }";

  INPUT_SELECTOR_NUMBER = "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button";

  INPUT_SELECTOR_SEARCH = "input[type=search]::-webkit-search-cancel-button";

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

  Events.Valid = "InputField.OnValid";

  Events.Invalid = "InputField.OnInvalid";

  Events.Match = "InputField.OnMatch";

  Events.FileData = "InputField.OnFileData";

  InputField.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(v) {
      if (!v) {
        return;
      }
      if (this.input) {
        return this.changeInputValue(v);
      }
    }
  });

  function InputField(options) {
    var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, inputStyle, key, ref, val;
    this.options = options != null ? options : {};
    this.fileSelectHandler = bind(this.fileSelectHandler, this);
    this.isNumber = false;
    this.isSearch = false;
    this.isFile = false;
    this.isEmpty = true;
    this.isValid = null;
    this.isFileMulti = false;
    this.isFilePhoto = false;
    this.isFileVideo = false;
    this.originalTextColor = null;
    if ((this.options.pattern != null) || (this.options.match != null)) {
      this.shouldCheckValidity = true;
    }
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).name == null) {
      base.name = this.options.type + "Input";
    }
    if ((base1 = this.options).color == null) {
      base1.color = "#000";
    }
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = "";
    }
    if ((base3 = this.options).borderRadius == null) {
      base3.borderRadius = 0;
    }
    if ((base4 = this.options).type == null) {
      base4.type = "text";
    }
    if ((base5 = this.options).fontSize == null) {
      base5.fontSize = 32;
    }
    if ((base6 = this.options).fontWeight == null) {
      base6.fontWeight = 300;
    }
    if ((base7 = this.options).fontFamily == null) {
      base7.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base8 = this.options).lineHeight == null) {
      base8.lineHeight = 1.25;
    }
    if ((base9 = this.options).indent == null) {
      base9.indent = 0;
    }
    if ((base10 = this.options).placeHolderFocus == null) {
      base10.placeHolderFocus = null;
    }
    if ((base11 = this.options).placeHolderColor == null) {
      base11.placeHolderColor = null;
    }
    if (_.startsWith(this.options.type, ["file"])) {
      this.options.fontSize = "inherit";
      this.options.fontWeight = 400;
      this.options.lineHeight = 1;
    }
    InputField.__super__.constructor.call(this, this.options);
    switch (this.options.type) {
      case "search":
        this.isSearch = true;
        break;
      case "number":
        this.isNumber = true;
        break;
      case "numbers-only":
      case "number-only":
        this.isNumber = true;
        this.options.type = this.options.pattern != null ? "number" : "text";
        this.options.pattern = this.options.pattern != null ? this.options.pattern : PATTERN_NUMBER;
        break;
      case "file":
      case "file-multiple":
      case "file-image":
      case "file-video":
        this.isFile = true;
        if (this.options.type === "file-image") {
          this.isFilePhoto = true;
        }
        if (this.options.type === "file-video") {
          this.isFileVideo = true;
        }
        if (this.options.type === "file-multiple") {
          this.isFileMulti = true;
        }
        this.options.type = "file";
    }
    this.html += (function() {
      switch (false) {
        case !this.isNumber:
          return "<style type='text/css'>" + INPUT_SELECTOR_NUMBER + INPUT_HIDE_PSUEDO_UI + "</style>";
        case !this.isSearch:
          return "<style type='text/css'>" + INPUT_SELECTOR_SEARCH + INPUT_HIDE_PSUEDO_UI + "</style>";
        default:
          return "";
      }
    }).call(this);
    if (this.options.placeHolderColor != null) {
      this.html += "<style type='text/css'>::-webkit-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-moz-placeholder { color: " + this.options.placeHolderColor + "; } :-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } :placeholder-shown { color: " + this.options.placeHolderColor + "; }</style>";
    }
    this.input = document.createElement("input");
    this.input.type = this.options.type;
    if (this.options.value != null) {
      this.input.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.input.placeholder = this.options.placeHolder;
    }
    if (this.options.pattern != null) {
      this.input.pattern = this.options.pattern;
    }
    if (this.options.maxLength != null) {
      this.input.setAttribute("maxLength", this.options.maxLength);
    }
    this.input.setAttribute("autocapitalize", (this.options.autoCapitalize === true ? "on" : "off"));
    this.input.setAttribute("autocomplete", (this.options.autoComplete === true ? "on" : "off"));
    this.input.setAttribute("autocorrect", (this.options.autoCorrect === true ? "on" : "off"));
    if (this.isFileMulti) {
      this.input.setAttribute("multiple", "multiple");
    }
    if (this.isFileVideo) {
      this.input.setAttribute("accept", "video/*");
    }
    if (this.isFilePhoto) {
      this.input.setAttribute("accept", "image/*");
    }
    this._element.appendChild(this.input);
    this.isEmpty = !(((ref = this.options.value) != null ? ref.length : void 0) > 0);
    this.originalTextColor = this.options.color;
    inputStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      textIndent: this.options.indent + "px",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
      verticalAlign: "top",
      "-webkit-appearance": "none",
      opacity: this.isFile ? 0 : 1,
      pointerEvents: this.isFile ? "all" : "none"
    };
    for (key in inputStyle) {
      val = inputStyle[key];
      this.input.style[key] = val;
    }
    if (this.options.color != null) {
      this.input.style.color = this.options.color;
    }
    this.input.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (_this.options.placeHolderFocus != null) {
          _this.input.placeholder = _this.options.placeHolderFocus;
        }
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.input.value, _this);
      };
    })(this);
    this.input.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.input.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.input.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.input.value, _this);
      };
    })(this);
    this.input.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.input.value) != null ? ref1.length : void 0) > 0);
        _this.emit(Events.Input, _this.input.value, _this);
        return _this.checkValidity();
      };
    })(this);
    if (this.isFile) {
      this.input.addEventListener("change", this.fileSelectHandler, false);
    }
    this.on(Events.TouchEnd, function() {
      return this.input.focus();
    });
    this.on("change:color", function() {
      return this.changeInputTextColor();
    });
    this.wrapFileInputToParent();
  }

  InputField.prototype.fileSelectHandler = function(event) {
    var file, reader;
    if (!event) {
      return;
    }
    file = event.target.files[0];
    if (file.type.indexOf("image") === 0) {
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(readEvent) {
          _this.emit(Events.FileData, readEvent.target.result, _this);
          console.log(readEvent);
          return console.log(file);
        };
      })(this);
      return reader.readAsDataURL(file);
    }
  };

  InputField.prototype.checkValidity = function() {
    var ref, validity;
    if (!this.shouldCheckValidity) {
      return;
    }
    if (this.options.pattern != null) {
      validity = this.input.checkValidity();
      this.isEmpty = !(((ref = this.input.value) != null ? ref.length : void 0) > 0);
      if (this.isValid !== validity || this.isEmpty) {
        if (this.isEmpty || !validity) {
          this.isValid = false;
          this.emit(Events.Invalid, this.input.value, this);
        } else {
          this.isValid = true;
          this.emit(Events.Valid, this.input.value, this);
        }
      }
    }
    if (this.checkMatch()) {
      this.isValid = true;
      return this.emit(Events.Match, this.input.value, this);
    }
  };

  InputField.prototype.checkMatch = function() {
    var i, len, match, ref;
    if (this.options.match == null) {
      return false;
    }
    if (Array.isArray(this.options.match)) {
      ref = this.options.match;
      for (i = 0, len = ref.length; i < len; i++) {
        match = ref[i];
        if (this.input.value.indexOf(match) > -1) {
          return true;
        }
      }
    } else {
      if (this.input.value.indexOf(this.options.match) > -1) {
        return true;
      }
    }
    return false;
  };

  InputField.prototype.clear = function() {
    this.input.value = "";
    this.isValid = null;
    return this.isEmpty = true;
  };

  InputField.prototype.changeInputTextColor = function() {
    return this.input.style.color = this.color.toHexString();
  };

  InputField.prototype.changeInputValue = function(v) {
    this.input.value = v;
    return this.input.oninput();
  };

  InputField.prototype.wrapFileInputToParent = function() {
    if (!this.isFile) {
      return;
    }
    if (this.parent) {
      this.width = this.parent.frame.width;
      return this.height = this.parent.frame.height;
    } else {
      this.input.style.opacity = 1;
      this.input.style.lineHeight = this.height + "px";
      this.input.style.color = "#fff";
      this.input.style.textIndent = "1em";
      return this.backgroundColor = "#fff";
    }
  };

  return InputField;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9yZGFuL19GcmFtZXIvX01vZHVsZXMvZ2l0aHViL2ZyYW1lci1JbnB1dEZpZWxkL0lucHV0RmllbGQtZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9JbnB1dEZpZWxkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQzBCQSxJQUFBOzs7O0FBQU0sT0FBTyxDQUFDO0FBRWIsTUFBQTs7OztFQUFBLGNBQUEsR0FBaUI7O0VBRWpCLG9CQUFBLEdBQXdCOztFQUN4QixxQkFBQSxHQUF3Qjs7RUFDeEIscUJBQUEsR0FBd0I7O0VBRXhCLE1BQU0sQ0FBQyxLQUFQLEdBQWtCOztFQUNsQixNQUFNLENBQUMsS0FBUCxHQUFrQjs7RUFDbEIsTUFBTSxDQUFDLElBQVAsR0FBa0I7O0VBQ2xCLE1BQU0sQ0FBQyxLQUFQLEdBQWtCOztFQUNsQixNQUFNLENBQUMsT0FBUCxHQUFrQjs7RUFDbEIsTUFBTSxDQUFDLEtBQVAsR0FBa0I7O0VBQ2xCLE1BQU0sQ0FBQyxRQUFQLEdBQWtCOztFQUVsQixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQ0osSUFBQyxDQUFBLEtBQUssQ0FBQztJQURILENBQUw7SUFHQSxHQUFBLEVBQUssU0FBQyxDQUFEO01BQ0osSUFBQSxDQUFjLENBQWQ7QUFBQSxlQUFBOztNQUNBLElBQUcsSUFBQyxDQUFBLEtBQUo7ZUFDQyxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsQ0FBbEIsRUFERDs7SUFGSSxDQUhMO0dBREQ7O0VBVWEsb0JBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7SUFFdEIsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsTUFBRCxHQUFZO0lBRVosSUFBQyxDQUFBLE9BQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxPQUFELEdBQVk7SUFFWixJQUFDLENBQUEsV0FBRCxHQUFlO0lBQ2YsSUFBQyxDQUFBLFdBQUQsR0FBZTtJQUNmLElBQUMsQ0FBQSxXQUFELEdBQWU7SUFFZixJQUFDLENBQUEsaUJBQUQsR0FBcUI7SUFHckIsSUFBK0IsOEJBQUEsSUFBcUIsNEJBQXBEO01BQUEsSUFBQyxDQUFBLG1CQUFELEdBQXVCLEtBQXZCOztJQUdBLElBQW9ELCtCQUFwRDtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsS0FBN0M7OztVQUdRLENBQUMsT0FBdUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFWLEdBQWU7OztXQUN0QyxDQUFDLFFBQW9COzs7V0FDckIsQ0FBQyxrQkFBb0I7OztXQUNyQixDQUFDLGVBQW9COzs7V0FHckIsQ0FBQyxPQUFvQjs7O1dBQ3JCLENBQUMsV0FBb0I7OztXQUNyQixDQUFDLGFBQW9COzs7V0FDckIsQ0FBQyxhQUFvQjs7O1dBQ3JCLENBQUMsYUFBb0I7OztXQUNyQixDQUFDLFNBQW9COzs7WUFDckIsQ0FBQyxtQkFBb0I7OztZQUNyQixDQUFDLG1CQUFvQjs7SUFJN0IsSUFBRyxDQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBdEIsRUFBNEIsQ0FBQyxNQUFELENBQTVCLENBQUg7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsR0FBb0I7TUFDcEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO01BQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQixFQUh2Qjs7SUFLQSw0Q0FBTSxJQUFDLENBQUEsT0FBUDtBQUlBLFlBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFoQjtBQUFBLFdBQ00sUUFETjtRQUNvQixJQUFDLENBQUEsUUFBRCxHQUFZO0FBQTFCO0FBRE4sV0FFTSxRQUZOO1FBRW9CLElBQUMsQ0FBQSxRQUFELEdBQVk7QUFBMUI7QUFGTixXQUdNLGNBSE47QUFBQSxXQUdzQixhQUh0QjtRQUlFLElBQUMsQ0FBQSxRQUFELEdBQVk7UUFDWixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBc0IsNEJBQUgsR0FBMEIsUUFBMUIsR0FBZ0Q7UUFDbkUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQXNCLDRCQUFILEdBQTBCLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBbkMsR0FBZ0Q7QUFIL0M7QUFIdEIsV0FPTSxNQVBOO0FBQUEsV0FPYyxlQVBkO0FBQUEsV0FPK0IsWUFQL0I7QUFBQSxXQU82QyxZQVA3QztRQVFFLElBQUMsQ0FBQSxNQUFELEdBQVU7UUFDVixJQUF1QixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsS0FBaUIsWUFBeEM7VUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEtBQWY7O1FBQ0EsSUFBdUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEtBQWlCLFlBQXhDO1VBQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxLQUFmOztRQUNBLElBQXVCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxLQUFpQixlQUF4QztVQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsS0FBZjs7UUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0I7QUFabEI7SUFlQSxJQUFDLENBQUEsSUFBRDtBQUFTLGNBQUEsS0FBQTtBQUFBLGNBQ0gsSUFBQyxDQUFBLFFBREU7aUJBQ1kseUJBQUEsR0FBMEIscUJBQTFCLEdBQWtELG9CQUFsRCxHQUF1RTtBQURuRixjQUVILElBQUMsQ0FBQSxRQUZFO2lCQUVZLHlCQUFBLEdBQTBCLHFCQUExQixHQUFrRCxvQkFBbEQsR0FBdUU7QUFGbkY7aUJBR0g7QUFIRzs7SUFLVCxJQUFHLHFDQUFIO01BQ0MsSUFBQyxDQUFBLElBQUQsSUFBUyw4REFBQSxHQUErRCxJQUFDLENBQUEsT0FBTyxDQUFDLGdCQUF4RSxHQUF5RixrQ0FBekYsR0FBMkgsSUFBQyxDQUFBLE9BQU8sQ0FBQyxnQkFBcEksR0FBcUosc0NBQXJKLEdBQTJMLElBQUMsQ0FBQSxPQUFPLENBQUMsZ0JBQXBNLEdBQXFOLHVDQUFyTixHQUE0UCxJQUFDLENBQUEsT0FBTyxDQUFDLGdCQUFyUSxHQUFzUixrQ0FBdFIsR0FBd1QsSUFBQyxDQUFBLE9BQU8sQ0FBQyxnQkFBalUsR0FBa1YsY0FENVY7O0lBS0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QjtJQUVULElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBQzlCLElBQXdELDBCQUF4RDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQTlCOztJQUNBLElBQXdELGdDQUF4RDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLFlBQTlCOztJQUNBLElBQXdELDRCQUF4RDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLFFBQTlCOztJQUNBLElBQXdELDhCQUF4RDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixXQUFwQixFQUFpQyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQTFDLEVBQUE7O0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLGdCQUFwQixFQUFzQyxDQUFJLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxLQUEyQixJQUE5QixHQUF3QyxJQUF4QyxHQUFrRCxLQUFuRCxDQUF0QztJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixjQUFwQixFQUFzQyxDQUFJLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxLQUEyQixJQUE5QixHQUF3QyxJQUF4QyxHQUFrRCxLQUFuRCxDQUF0QztJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixhQUFwQixFQUFzQyxDQUFJLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxLQUEyQixJQUE5QixHQUF3QyxJQUF4QyxHQUFrRCxLQUFuRCxDQUF0QztJQUVBLElBQStDLElBQUMsQ0FBQSxXQUFoRDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixVQUFwQixFQUFnQyxVQUFoQyxFQUFBOztJQUNBLElBQStDLElBQUMsQ0FBQSxXQUFoRDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixRQUFwQixFQUFnQyxTQUFoQyxFQUFBOztJQUNBLElBQStDLElBQUMsQ0FBQSxXQUFoRDtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixRQUFwQixFQUFnQyxTQUFoQyxFQUFBOztJQUVBLElBQUMsQ0FBQSxRQUFRLENBQUMsV0FBVixDQUFzQixJQUFDLENBQUEsS0FBdkI7SUFHQSxJQUFDLENBQUEsT0FBRCxHQUFxQixDQUFDLDBDQUFlLENBQUUsZ0JBQWhCLEdBQXlCLENBQTFCO0lBQ3RCLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDO0lBSTlCLFVBQUEsR0FDQztNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsR0FBckIsR0FBd0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFqQyxHQUEwQyxLQUExQyxHQUErQyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQXhELEdBQW1FLEdBQW5FLEdBQXNFLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBdkY7TUFDQSxPQUFBLEVBQVMsTUFEVDtNQUVBLFVBQUEsRUFBZSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVYsR0FBaUIsSUFGL0I7TUFHQSxlQUFBLEVBQWlCLGFBSGpCO01BSUEsTUFBQSxFQUFRLE1BSlI7TUFLQSxLQUFBLEVBQVEsTUFMUjtNQU1BLE1BQUEsRUFBUyxHQU5UO01BT0EsT0FBQSxFQUFTLEdBUFQ7TUFRQSxhQUFBLEVBQWUsS0FSZjtNQVNBLG9CQUFBLEVBQXNCLE1BVHRCO01BVUEsT0FBQSxFQUFrQixJQUFDLENBQUEsTUFBSixHQUFnQixDQUFoQixHQUEyQixDQVYxQztNQVdBLGFBQUEsRUFBa0IsSUFBQyxDQUFBLE1BQUosR0FBZ0IsS0FBaEIsR0FBMkIsTUFYMUM7O0FBYUQsU0FBQSxpQkFBQTs7TUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQU0sQ0FBQSxHQUFBLENBQWIsR0FBcUI7QUFBckI7SUFDQSxJQUF1QywwQkFBdkM7TUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFiLEdBQXFCLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBOUI7O0lBRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLEdBQWlCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQWQsR0FBMEI7UUFDMUIsSUFBa0Qsc0NBQWxEO1VBQUEsS0FBQyxDQUFBLEtBQUssQ0FBQyxXQUFQLEdBQXFCLEtBQUMsQ0FBQSxPQUFPLENBQUMsaUJBQTlCOztRQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBZCxHQUEwQjtlQUMxQixLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxLQUFiLEVBQW9CLEtBQUMsQ0FBQSxLQUFLLENBQUMsS0FBM0IsRUFBa0MsS0FBbEM7TUFKZ0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBTWpCLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFpQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFkLEdBQTBCO1FBQzFCLElBQUEsQ0FBQSxDQUFPLEtBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxLQUFzQixLQUFDLENBQUEsT0FBTyxDQUFDLFdBQS9CLElBQStDLG1DQUF0RCxDQUFBO1VBQ0MsS0FBQyxDQUFBLEtBQUssQ0FBQyxXQUFQLEdBQXFCLEtBQUMsQ0FBQSxPQUFPLENBQUMsWUFEL0I7O2VBRUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsSUFBYixFQUFtQixLQUFDLENBQUEsS0FBSyxDQUFDLEtBQTFCLEVBQWlDLEtBQWpDO01BSmdCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQU1qQixJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ2hCLFlBQUE7UUFBQSxLQUFDLENBQUEsT0FBRCxHQUFXLENBQUMsMkNBQWMsQ0FBRSxnQkFBZCxHQUF1QixDQUF6QjtRQUNaLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLEtBQWIsRUFBb0IsS0FBQyxDQUFBLEtBQUssQ0FBQyxLQUEzQixFQUFrQyxLQUFsQztlQUNBLEtBQUMsQ0FBQSxhQUFELENBQUE7TUFIZ0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBS2pCLElBQWdFLElBQUMsQ0FBQSxNQUFqRTtNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsSUFBQyxDQUFBLGlCQUFuQyxFQUFzRCxLQUF0RCxFQUFBOztJQUVBLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLFFBQVgsRUFBcUIsU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxDQUFBO0lBQUgsQ0FBckI7SUFDQSxJQUFDLENBQUEsRUFBRCxDQUFJLGNBQUosRUFBcUIsU0FBQTthQUFHLElBQUMsQ0FBQSxvQkFBRCxDQUFBO0lBQUgsQ0FBckI7SUFFQSxJQUFDLENBQUEscUJBQUQsQ0FBQTtFQXZJWTs7dUJBMkliLGlCQUFBLEdBQW1CLFNBQUMsS0FBRDtBQUNsQixRQUFBO0lBQUEsSUFBQSxDQUFjLEtBQWQ7QUFBQSxhQUFBOztJQUNBLElBQUEsR0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQU0sQ0FBQSxDQUFBO0lBQzFCLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLE9BQWxCLENBQUEsS0FBOEIsQ0FBakM7TUFDQyxNQUFBLEdBQWEsSUFBQSxVQUFBLENBQUE7TUFDYixNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsU0FBRDtVQUNmLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFFBQWIsRUFBdUIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUF4QyxFQUFnRCxLQUFoRDtVQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWjtpQkFDQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7UUFIZTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7YUFJaEIsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsSUFBckIsRUFORDs7RUFIa0I7O3VCQVduQixhQUFBLEdBQWUsU0FBQTtBQUNkLFFBQUE7SUFBQSxJQUFBLENBQWMsSUFBQyxDQUFBLG1CQUFmO0FBQUEsYUFBQTs7SUFFQSxJQUFHLDRCQUFIO01BQ0MsUUFBQSxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsYUFBUCxDQUFBO01BQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFDLHdDQUFjLENBQUUsZ0JBQWQsR0FBdUIsQ0FBekI7TUFFWixJQUFHLElBQUMsQ0FBQSxPQUFELEtBQWMsUUFBZCxJQUEwQixJQUFDLENBQUEsT0FBOUI7UUFDQyxJQUFHLElBQUMsQ0FBQSxPQUFELElBQVksQ0FBQyxRQUFoQjtVQUNDLElBQUMsQ0FBQSxPQUFELEdBQVc7VUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxPQUFiLEVBQXNCLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBN0IsRUFBb0MsSUFBcEMsRUFGRDtTQUFBLE1BQUE7VUFJQyxJQUFDLENBQUEsT0FBRCxHQUFXO1VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsS0FBYixFQUFzQixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQTdCLEVBQW9DLElBQXBDLEVBTEQ7U0FERDtPQUpEOztJQVlBLElBQUcsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFIO01BQ0MsSUFBQyxDQUFBLE9BQUQsR0FBVzthQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLEtBQWIsRUFBb0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUEzQixFQUFrQyxJQUFsQyxFQUZEOztFQWZjOzt1QkFtQmYsVUFBQSxHQUFZLFNBQUE7QUFDWCxRQUFBO0lBQUEsSUFBb0IsMEJBQXBCO0FBQUEsYUFBTyxNQUFQOztJQUNBLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQXZCLENBQUg7QUFDQztBQUFBLFdBQUEscUNBQUE7O1FBQ0MsSUFBZSxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFiLENBQXFCLEtBQXJCLENBQUEsR0FBOEIsQ0FBQyxDQUE5QztBQUFBLGlCQUFPLEtBQVA7O0FBREQsT0FERDtLQUFBLE1BQUE7TUFJQyxJQUFlLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQWIsQ0FBcUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUE5QixDQUFBLEdBQXVDLENBQUMsQ0FBdkQ7QUFBQSxlQUFPLEtBQVA7T0FKRDs7QUFLQSxXQUFPO0VBUEk7O3VCQVNaLEtBQUEsR0FBTyxTQUFBO0lBQ04sSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQWU7SUFDZixJQUFDLENBQUEsT0FBRCxHQUFXO1dBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztFQUhMOzt1QkFLUCxvQkFBQSxHQUFzQixTQUFBO1dBQ3JCLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWIsR0FBcUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxXQUFQLENBQUE7RUFEQTs7dUJBR3RCLGdCQUFBLEdBQWtCLFNBQUMsQ0FBRDtJQUNqQixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsR0FBZTtXQUNmLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBO0VBRmlCOzt1QkFJbEIscUJBQUEsR0FBdUIsU0FBQTtJQUN0QixJQUFBLENBQWMsSUFBQyxDQUFBLE1BQWY7QUFBQSxhQUFBOztJQUNBLElBQUcsSUFBQyxDQUFDLE1BQUw7TUFDQyxJQUFDLENBQUMsS0FBRixHQUFXLElBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQzFCLElBQUMsQ0FBQyxNQUFGLEdBQVcsSUFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FGM0I7S0FBQSxNQUFBO01BSUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBYixHQUF1QjtNQUN2QixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFiLEdBQTZCLElBQUMsQ0FBQyxNQUFILEdBQVU7TUFDdEMsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBYixHQUFxQjtNQUNyQixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFiLEdBQTBCO2FBQzFCLElBQUMsQ0FBQyxlQUFGLEdBQXFCLE9BUnRCOztFQUZzQjs7OztHQXhOUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIDA3IEphbiAyMDE2IGJ5IEpvcmRhbiBSb2JlcnQgRG9ic29uIC8gQGpvcmRhbmRvYnNvbiAvIEpvcmRhbkRvYnNvbi5jb21cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jXG4jIFZhbGlkICYgVGVzdGVkIElucHV0RmllbGQgVHlwZXM6IFxuIyBcdFwidGV4dFwiLCBcImVtYWlsXCIsIFwibnVtYmVyXCIsIFwibnVtYmVyLW9ubHlcIiwgXCJ1cmxcIiwgXCJ0ZWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiXG4jIFx0XCJ0aW1lXCIsIFwibW9udGhcIiwgXCJkYXRlXCIsIFwiZGF0ZXRpbWUtbG9jYWxcIiwgXCJmaWxlXCIsIFwiZmlsZS1tdWx0aXBsZVwiLCBcImZpbGUtaW1hZ2VcIiwgXCJmaWxlLXZpZGVvXCJcbiMgXG4jIFRoZSB0aW1lICYgZGF0ZSB0eXBlcyBSRVFVSVJFIHRoZSB2YWx1ZSBwcm9wZXJ0eSBpcyBpbiBhIGNvcnJlY3QgZm9ybWF0ICYgSUdOT1JFIHRoZSBwbGFjZWhvbGRlciBwcm9wZXJ0eS5cbiMgXG4jIEhlcmUncyBhIGZldyBleGFtcGxlcyB0byB1c2UgZm9yIHRoZSB2YWx1ZTogcHJvcGVydHkgd2hlbiB5b3UgY3JlYXRlIHRoZW06XG4jXG4jIFx0KiB0aW1lOiBcIjEyOjM4XCJcbiMgXHQqIG1vbnRoOiBcIjIwMTYtMDFcIlxuIyBcdCogZGF0ZTogXCIyMDE2LTAxLTA0XCJcbiMgXHQqIGRhdGV0aW1lLWxvY2FsOiBcIjIwMTYtMDEtMDRUMTI6NDQ6MzEuMTkyXCJcbiNcbiMgTk9URVMgLyBcbiMgXHRTb21lIHR5cGVzIHdvcmsgYmV0dGVyIHRoYW4gb3RoZXJzIG9uIG1vYmlsZSBvciBkaXNwbGF5IGRpZmZlcmVudGx5IHRoYW4gZGVza3RvcC5cbiMgXHRBbGwgcHJvcGVydGllcyB3aWxsIHdvcmsgd2l0aCBpbnB1dCB0eXBlIFwidGV4dFwiIGJ1dCBtYXkgbm90IHdvcmsgd2l0aCBvdGhlciB0eXBlcy5cbiMgXHRTb21lIGV2ZW50cyB3b24ndCBmaXJlIGlmIHlvdSBlbnRlciBpbmNvcnJlY3QgY29udGVudCBmb3IgdGhlIGZpZWxkIHR5cGU6IGkuZS4gXCJoZWxsb1wiIGZvciBpbnB1dCB0eXBlIFwibnVtYmVyXCIuXG4jIFx0RmluZCBtb3JlIHBhdHRlcm5zIGZvciBWYWxpZCBhbmQgSW52YWxpZCBldmVudHMgYXQgaHR0cDovL2h0bWw1cGF0dGVybi5jb21cbiMgXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXRGaWVsZCBleHRlbmRzIExheWVyXG5cblx0UEFUVEVSTl9OVU1CRVIgPSBcIlswLTldKlwiXG5cdFxuXHRJTlBVVF9ISURFX1BTVUVET19VSSAgPSBcInsgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyBkaXNwbGF5OiBub25lOyB9XCJcblx0SU5QVVRfU0VMRUNUT1JfTlVNQkVSID0gXCJpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvblwiXG5cdElOUFVUX1NFTEVDVE9SX1NFQVJDSCA9IFwiaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uXCJcblx0XG5cdEV2ZW50cy5JbnB1dCAgICA9IFwiSW5wdXRGaWVsZC5PbklucHV0XCJcblx0RXZlbnRzLkZvY3VzICAgID0gXCJJbnB1dEZpZWxkLk9uRm9jdXNcIlxuXHRFdmVudHMuQmx1ciAgICAgPSBcIklucHV0RmllbGQuT25CbHVyXCJcblx0RXZlbnRzLlZhbGlkICAgID0gXCJJbnB1dEZpZWxkLk9uVmFsaWRcIlxuXHRFdmVudHMuSW52YWxpZCAgPSBcIklucHV0RmllbGQuT25JbnZhbGlkXCJcblx0RXZlbnRzLk1hdGNoICAgID0gXCJJbnB1dEZpZWxkLk9uTWF0Y2hcIlxuXHRFdmVudHMuRmlsZURhdGEgPSBcIklucHV0RmllbGQuT25GaWxlRGF0YVwiXG5cdFxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+XG5cdFx0XHRAaW5wdXQudmFsdWVcblx0XHRcdFxuXHRcdHNldDogKHYpIC0+XG5cdFx0XHRyZXR1cm4gdW5sZXNzIHZcblx0XHRcdGlmIEBpbnB1dFxuXHRcdFx0XHRAY2hhbmdlSW5wdXRWYWx1ZSB2XG5cblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcblx0XHRAaXNOdW1iZXIgPSBmYWxzZVxuXHRcdEBpc1NlYXJjaCA9IGZhbHNlXG5cdFx0QGlzRmlsZSAgID0gZmFsc2Vcblx0XHRcblx0XHRAaXNFbXB0eSAgPSB0cnVlXG5cdFx0QGlzVmFsaWQgID0gbnVsbFxuXHRcdFxuXHRcdEBpc0ZpbGVNdWx0aSA9IGZhbHNlXG5cdFx0QGlzRmlsZVBob3RvID0gZmFsc2Vcblx0XHRAaXNGaWxlVmlkZW8gPSBmYWxzZVxuXHRcdFxuXHRcdEBvcmlnaW5hbFRleHRDb2xvciA9IG51bGxcblx0XHRcblx0XHQjIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIENoZWNraW5nIEZsYWdcblx0XHRAc2hvdWxkQ2hlY2tWYWxpZGl0eSA9IHRydWUgaWYgQG9wdGlvbnMucGF0dGVybj8gb3IgQG9wdGlvbnMubWF0Y2g/XG5cblx0XHQjIE1ha2Ugc3VyZSB0aGlzIGlzIGluIHB4XG5cdFx0QG9wdGlvbnMubGluZUhlaWdodCA9IFwiI3tAb3B0aW9ucy5saW5lSGVpZ2h0fXB4XCIgaWYgQG9wdGlvbnMubGluZUhlaWdodD9cblx0XHQgXHRcdFx0XHRcdFx0XHRcdFxuXHRcdCMgRnJhbWVyIExheWVyIFByb3BzXG5cdFx0QG9wdGlvbnMubmFtZSAgICAgICAgICAgICA/PSBcIiN7QG9wdGlvbnMudHlwZX1JbnB1dFwiXG5cdFx0QG9wdGlvbnMuY29sb3IgICAgICAgICAgICA/PSBcIiMwMDBcIlxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciAgPz0gXCJcIlxuXHRcdEBvcHRpb25zLmJvcmRlclJhZGl1cyAgICAgPz0gMFxuXG5cdFx0IyBDdXN0b20gTGF5ZXIgUHJvcHNcdFx0XG5cdFx0QG9wdGlvbnMudHlwZSAgICAgICAgICAgICA/PSBcInRleHRcIlxuXHRcdEBvcHRpb25zLmZvbnRTaXplICAgICAgICAgPz0gMzJcblx0XHRAb3B0aW9ucy5mb250V2VpZ2h0ICAgICAgID89IDMwMFxuXHRcdEBvcHRpb25zLmZvbnRGYW1pbHkgICAgICAgPz0gXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EgTmV1ZVwiXG5cdFx0QG9wdGlvbnMubGluZUhlaWdodCAgICAgICA/PSAxLjI1XG5cdFx0QG9wdGlvbnMuaW5kZW50ICAgICAgICAgICA/PSAwXG5cdFx0QG9wdGlvbnMucGxhY2VIb2xkZXJGb2N1cyA/PSBudWxsXG5cdFx0QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvciA/PSBudWxsXG5cblxuXHRcdCMgU3RhcnRlZCB3b3JrIG9uIGZpbGVcblx0XHRpZiBfLnN0YXJ0c1dpdGgoQG9wdGlvbnMudHlwZSwgW1wiZmlsZVwiXSlcblx0XHRcdEBvcHRpb25zLmZvbnRTaXplID0gXCJpbmhlcml0XCJcblx0XHRcdEBvcHRpb25zLmZvbnRXZWlnaHQgPSA0MDBcblx0XHRcdEBvcHRpb25zLmxpbmVIZWlnaHQgPSAxXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdCMgQWRqdXN0IGEgZmV3IHRoaW5ncyBmb3IgdmFyaW91cyB0eXBlc1xuXHRcdFxuXHRcdHN3aXRjaCBAb3B0aW9ucy50eXBlXG5cdFx0XHR3aGVuIFwic2VhcmNoXCIgdGhlbiBAaXNTZWFyY2ggPSB0cnVlXG5cdFx0XHR3aGVuIFwibnVtYmVyXCIgdGhlbiBAaXNOdW1iZXIgPSB0cnVlXG5cdFx0XHR3aGVuIFwibnVtYmVycy1vbmx5XCIsIFwibnVtYmVyLW9ubHlcIlxuXHRcdFx0XHRAaXNOdW1iZXIgPSB0cnVlXG5cdFx0XHRcdEBvcHRpb25zLnR5cGUgICAgPSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyB0aGVuIFwibnVtYmVyXCIgICAgICAgICBlbHNlIFwidGV4dFwiXG5cdFx0XHRcdEBvcHRpb25zLnBhdHRlcm4gPSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyB0aGVuIEBvcHRpb25zLnBhdHRlcm4gZWxzZSBQQVRURVJOX05VTUJFUlxuXHRcdFx0d2hlbiBcImZpbGVcIiwgXCJmaWxlLW11bHRpcGxlXCIsIFwiZmlsZS1pbWFnZVwiLCBcImZpbGUtdmlkZW9cIlxuXHRcdFx0XHRAaXNGaWxlID0gdHJ1ZVxuXHRcdFx0XHRAaXNGaWxlUGhvdG8gPSB0cnVlIGlmIEBvcHRpb25zLnR5cGUgaXMgXCJmaWxlLWltYWdlXCJcblx0XHRcdFx0QGlzRmlsZVZpZGVvID0gdHJ1ZSBpZiBAb3B0aW9ucy50eXBlIGlzIFwiZmlsZS12aWRlb1wiXG5cdFx0XHRcdEBpc0ZpbGVNdWx0aSA9IHRydWUgaWYgQG9wdGlvbnMudHlwZSBpcyBcImZpbGUtbXVsdGlwbGVcIlxuXHRcdFx0XHRAb3B0aW9ucy50eXBlID0gXCJmaWxlXCJcblx0XHRcdFx0XG5cdFx0XG5cdFx0QGh0bWwgKz0gc3dpdGNoXG5cdFx0XHR3aGVuIEBpc051bWJlciB0aGVuIFwiPHN0eWxlIHR5cGU9J3RleHQvY3NzJz4je0lOUFVUX1NFTEVDVE9SX05VTUJFUn0je0lOUFVUX0hJREVfUFNVRURPX1VJfTwvc3R5bGU+XCJcblx0XHRcdHdoZW4gQGlzU2VhcmNoIHRoZW4gXCI8c3R5bGUgdHlwZT0ndGV4dC9jc3MnPiN7SU5QVVRfU0VMRUNUT1JfU0VBUkNIfSN7SU5QVVRfSElERV9QU1VFRE9fVUl9PC9zdHlsZT5cIlxuXHRcdFx0ZWxzZSBcIlwiXG5cblx0XHRpZiBAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yP1xuXHRcdFx0QGh0bWwgKz0gXCI8c3R5bGUgdHlwZT0ndGV4dC9jc3MnPjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9IDo6LW1vei1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9IDotbXMtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yfTsgfSA6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9IDpwbGFjZWhvbGRlci1zaG93biB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9PC9zdHlsZT5cIlxuXHRcdFx0XG5cdFx0IyBDcmVhdGUgVGhlIElucHV0XG5cdFx0XG5cdFx0QGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImlucHV0XCJcblx0XHQjIFRleHQgVHlwZSBBZGp1c3RtZW50c1xuXHRcdEBpbnB1dC50eXBlICAgICAgICA9IEBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQudmFsdWUgICAgICAgPSBAb3B0aW9ucy52YWx1ZSAgICAgICAgICAgICAgICAgIGlmIEBvcHRpb25zLnZhbHVlP1xuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyICAgICAgICAgICAgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXI/XG5cdFx0QGlucHV0LnBhdHRlcm4gICAgID0gQG9wdGlvbnMucGF0dGVybiAgICAgICAgICAgICAgICBpZiBAb3B0aW9ucy5wYXR0ZXJuP1xuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhMZW5ndGhcIiwgQG9wdGlvbnMubWF4TGVuZ3RoKSBpZiBAb3B0aW9ucy5tYXhMZW5ndGg/XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIChpZiBAb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZSBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb21wbGV0ZVwiLCAgIChpZiBAb3B0aW9ucy5hdXRvQ29tcGxldGUgICBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb3JyZWN0XCIsICAgIChpZiBAb3B0aW9ucy5hdXRvQ29ycmVjdCAgICBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0IyBGaWxlIFR5cGUgQWRqdXN0bWVudHMgXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIikgaWYgQGlzRmlsZU11bHRpXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCAgIFwidmlkZW8vKlwiICkgaWYgQGlzRmlsZVZpZGVvXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCAgIFwiaW1hZ2UvKlwiICkgaWYgQGlzRmlsZVBob3RvXG5cdFx0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBpbnB1dFxuXHRcdFxuXHRcdCMgU2V0dXAgVmFsdWVzXG5cdFx0QGlzRW1wdHkgICAgICAgICAgID0gIShAb3B0aW9ucy52YWx1ZT8ubGVuZ3RoID4gMClcblx0XHRAb3JpZ2luYWxUZXh0Q29sb3IgPSBAb3B0aW9ucy5jb2xvclxuXHRcdFxuXHRcdCMgU2V0dXAgSW5wdXQgU3R5bGVcblx0XHRcblx0XHRpbnB1dFN0eWxlID1cblx0XHRcdGZvbnQ6IFwiI3tAb3B0aW9ucy5mb250V2VpZ2h0fSAje0BvcHRpb25zLmZvbnRTaXplfXB4LyN7QG9wdGlvbnMubGluZUhlaWdodH0gI3tAb3B0aW9ucy5mb250RmFtaWx5fVwiXG5cdFx0XHRvdXRsaW5lOiBcIm5vbmVcIlxuXHRcdFx0dGV4dEluZGVudDogXCIje0BvcHRpb25zLmluZGVudH1weFwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0aGVpZ2h0OiBcIjEwMCVcIlxuXHRcdFx0d2lkdGg6ICBcIjEwMCVcIlxuXHRcdFx0bWFyZ2luOiAgXCIwXCJcblx0XHRcdHBhZGRpbmc6IFwiMFwiXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiBcInRvcFwiXG5cdFx0XHRcIi13ZWJraXQtYXBwZWFyYW5jZVwiOiBcIm5vbmVcIlxuXHRcdFx0b3BhY2l0eTogICAgICAgaWYgQGlzRmlsZSB0aGVuIDAgICAgIGVsc2UgMVxuXHRcdFx0cG9pbnRlckV2ZW50czogaWYgQGlzRmlsZSB0aGVuIFwiYWxsXCIgZWxzZSBcIm5vbmVcIlxuXHRcdFx0XG5cdFx0QGlucHV0LnN0eWxlW2tleV0gID0gdmFsIGZvciBrZXksIHZhbCBvZiBpbnB1dFN0eWxlXG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gQG9wdGlvbnMuY29sb3IgaWYgQG9wdGlvbnMuY29sb3I/XG5cdFx0XG5cdFx0QGlucHV0Lm9uZm9jdXMgPSA9PlxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG5cdFx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlckZvY3VzIGlmIEBvcHRpb25zLnBsYWNlSG9sZGVyRm9jdXM/XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdEBlbWl0KEV2ZW50cy5Gb2N1cywgQGlucHV0LnZhbHVlLCBAKVxuXG5cdFx0QGlucHV0Lm9uYmx1ciAgPSA9PlxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG5cdFx0XHR1bmxlc3MgQGlucHV0LnBsYWNlaG9sZGVyIGlzIEBvcHRpb25zLnBsYWNlSG9sZGVyIG9yICFAb3B0aW9ucy5wbGFjZUhvbGRlcj9cblx0XHRcdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXJcblx0XHRcdEBlbWl0KEV2ZW50cy5CbHVyLCBAaW5wdXQudmFsdWUsIEApXG5cblx0XHRAaW5wdXQub25pbnB1dCA9ID0+XG5cdFx0XHRAaXNFbXB0eSA9ICEoIEBpbnB1dC52YWx1ZT8ubGVuZ3RoID4gMClcblx0XHRcdEBlbWl0KEV2ZW50cy5JbnB1dCwgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0QGNoZWNrVmFsaWRpdHkoKVxuXHRcdFx0XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgQGZpbGVTZWxlY3RIYW5kbGVyLCBmYWxzZSkgaWYgQGlzRmlsZVxuXHRcdFx0XG5cdFx0QG9uIEV2ZW50cy5Ub3VjaEVuZCwgLT4gQGlucHV0LmZvY3VzKClcblx0XHRAb24gXCJjaGFuZ2U6Y29sb3JcIiwgIC0+IEBjaGFuZ2VJbnB1dFRleHRDb2xvcigpXG5cdFx0XG5cdFx0QHdyYXBGaWxlSW5wdXRUb1BhcmVudCgpXG5cdFx0XG5cblx0IyBodHRwOi8vd3d3LnNpdGVwb2ludC5jb20vaHRtbDUtamF2YXNjcmlwdC1vcGVuLWRyb3BwZWQtZmlsZXMvXG5cdGZpbGVTZWxlY3RIYW5kbGVyOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIHVubGVzcyBldmVudCAjIGZpeCBDaGVjayB0aGlzIGJldHRlcj9cblx0XHRmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdXHRcdFxuXHRcdGlmIGZpbGUudHlwZS5pbmRleE9mKFwiaW1hZ2VcIikgPT0gMFxuXHRcdFx0cmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXHRcdFx0cmVhZGVyLm9ubG9hZCA9IChyZWFkRXZlbnQpID0+IFxuXHRcdFx0XHRAZW1pdChFdmVudHMuRmlsZURhdGEsIHJlYWRFdmVudC50YXJnZXQucmVzdWx0LCBAKVxuXHRcdFx0XHRjb25zb2xlLmxvZyByZWFkRXZlbnRcblx0XHRcdFx0Y29uc29sZS5sb2cgZmlsZVxuXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXHRcdFxuXHRjaGVja1ZhbGlkaXR5OiAtPlxuXHRcdHJldHVybiB1bmxlc3MgQHNob3VsZENoZWNrVmFsaWRpdHlcblxuXHRcdGlmIEBvcHRpb25zLnBhdHRlcm4/XG5cdFx0XHR2YWxpZGl0eSA9IEBpbnB1dC5jaGVja1ZhbGlkaXR5KClcblx0XHRcdEBpc0VtcHR5ID0gISggQGlucHV0LnZhbHVlPy5sZW5ndGggPiAwKVxuXHRcdFx0XG5cdFx0XHRpZiBAaXNWYWxpZCBpc250IHZhbGlkaXR5IG9yIEBpc0VtcHR5XG5cdFx0XHRcdGlmIEBpc0VtcHR5IG9yICF2YWxpZGl0eVxuXHRcdFx0XHRcdEBpc1ZhbGlkID0gZmFsc2Vcblx0XHRcdFx0XHRAZW1pdChFdmVudHMuSW52YWxpZCwgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QGlzVmFsaWQgPSB0cnVlXG5cdFx0XHRcdFx0QGVtaXQoRXZlbnRzLlZhbGlkLCAgIEBpbnB1dC52YWx1ZSwgQClcblx0XHRcdFx0XHRcblx0XHRpZiBAY2hlY2tNYXRjaCgpXG5cdFx0XHRAaXNWYWxpZCA9IHRydWVcblx0XHRcdEBlbWl0KEV2ZW50cy5NYXRjaCwgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0XG5cdGNoZWNrTWF0Y2g6IC0+XG5cdFx0cmV0dXJuIGZhbHNlIHVubGVzcyBAb3B0aW9ucy5tYXRjaD9cblx0XHRpZiBBcnJheS5pc0FycmF5KEBvcHRpb25zLm1hdGNoKVxuXHRcdFx0Zm9yIG1hdGNoIGluIEBvcHRpb25zLm1hdGNoXG5cdFx0XHRcdHJldHVybiB0cnVlIGlmIEBpbnB1dC52YWx1ZS5pbmRleE9mKG1hdGNoKSA+IC0xXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRydWUgaWYgQGlucHV0LnZhbHVlLmluZGV4T2YoQG9wdGlvbnMubWF0Y2gpID4gLTFcblx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFxuXHRjbGVhcjogLT5cblx0XHRAaW5wdXQudmFsdWUgPSBcIlwiXG5cdFx0QGlzVmFsaWQgPSBudWxsXG5cdFx0QGlzRW1wdHkgPSB0cnVlXG5cdFx0XG5cdGNoYW5nZUlucHV0VGV4dENvbG9yOiAtPiBcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBAY29sb3IudG9IZXhTdHJpbmcoKVxuXHRcblx0Y2hhbmdlSW5wdXRWYWx1ZTogKHYpIC0+XG5cdFx0QGlucHV0LnZhbHVlID0gdlxuXHRcdEBpbnB1dC5vbmlucHV0KClcblx0XHRcblx0d3JhcEZpbGVJbnB1dFRvUGFyZW50OiAtPlxuXHRcdHJldHVybiB1bmxlc3MgQGlzRmlsZVxuXHRcdGlmIEAucGFyZW50XG5cdFx0XHRALndpZHRoICA9IEAucGFyZW50LmZyYW1lLndpZHRoXG5cdFx0XHRALmhlaWdodCA9IEAucGFyZW50LmZyYW1lLmhlaWdodFxuXHRcdGVsc2Vcblx0XHRcdEBpbnB1dC5zdHlsZS5vcGFjaXR5ID0gMVxuXHRcdFx0QGlucHV0LnN0eWxlLmxpbmVIZWlnaHQgPSBcIiN7QC5oZWlnaHR9cHhcIlxuXHRcdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gXCIjZmZmXCJcblx0XHRcdEBpbnB1dC5zdHlsZS50ZXh0SW5kZW50ID0gXCIxZW1cIlxuXHRcdFx0QC5iYWNrZ3JvdW5kQ29sb3IgID0gXCIjZmZmXCJcblx0XHRcblx0XHRcblx0XHQiXX0=
