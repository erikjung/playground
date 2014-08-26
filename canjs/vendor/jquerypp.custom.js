/*!
 * jQuery++ - 1.0.1
 * http://jquerypp.com
 * Copyright (c) 2014 Bitovi
 * Tue, 26 Aug 2014 18:42:23 GMT
 * Licensed MIT
 * Download from: http://bitbuilder.herokuapp.com/jquerypp.custom.js?plugins=jquerypp%2Fdom%2Fform_params&plugins=jquerypp%2Fevent%2Ffastfix&plugins=jquerypp%2Fevent%2Fpause
 */
(function($) {

    // ## jquerypp/dom/form_params/form_params.js
    var __m1 = (function($) {
        var
        // use to parse bracket notation like my[name][attribute]
        keyBreaker = /[^\[\]]+/g,
            // converts values that look like numbers and booleans and removes empty strings
            convertValue = function(value) {
                if ($.isNumeric(value)) {
                    return parseFloat(value);
                } else if (value === 'true') {
                    return true;
                } else if (value === 'false') {
                    return false;
                } else if (value === '' || value === null) {
                    return undefined;
                }
                return value;
            },
            // Access nested data
            nestData = function(elem, type, data, parts, value, seen, fullName) {
                var name = parts.shift();
                // Keep track of the dot separated fullname. Used to uniquely track seen values
                // and if they should be converted to an array or not
                fullName = fullName ? fullName + '.' + name : name;

                if (parts.length) {
                    if (!data[name]) {
                        data[name] = {};
                    }

                    // Recursive call
                    nestData(elem, type, data[name], parts, value, seen, fullName);
                } else {

                    // Handle same name case, as well as "last checkbox checked"
                    // case
                    if (fullName in seen && type != "radio" && !$.isArray(data[name])) {
                        if (name in data) {
                            data[name] = [data[name]];
                        } else {
                            data[name] = [];
                        }
                    } else {
                        seen[fullName] = true;
                    }

                    // Finally, assign data
                    if ((type == "radio" || type == "checkbox") && !elem.is(":checked")) {
                        return
                    }

                    if (!data[name]) {
                        data[name] = value;
                    } else {
                        data[name].push(value);
                    }

                }

            };


        $.fn.extend({
                formParams: function(params) {

                    var convert;

                    // Quick way to determine if something is a boolean
                    if ( !! params === params) {
                        convert = params;
                        params = null;
                    }

                    if (params) {
                        return this.setParams(params);
                    } else {
                        return this.getParams(convert);
                    }
                },
                setParams: function(params) {

                    // Find all the inputs
                    this.find("[name]").each(function() {
                        var $this = $(this),
                            value = params[$this.attr("name")];

                        // Don't do all this work if there's no value
                        if (value !== undefined) {

                            // Nested these if statements for performance
                            if ($this.is(":radio")) {
                                if ($this.val() == value) {
                                    $this.attr("checked", true);
                                }
                            } else if ($this.is(":checkbox")) {
                                // Convert single value to an array to reduce
                                // complexity
                                value = $.isArray(value) ? value : [value];
                                if ($.inArray($this.val(), value) > -1) {
                                    $this.attr("checked", true);
                                }
                            } else {
                                $this.val(value);
                            }
                        }
                    });
                },
                getParams: function(convert) {
                    var data = {},
                        // This is used to keep track of the checkbox names that we've
                        // already seen, so we know that we should return an array if
                        // we see it multiple times. Fixes last checkbox checked bug.
                        seen = {},
                        current;

                    this.find("[name]:not(:disabled)").each(function() {
                        var $this = $(this),
                            type = $this.attr("type"),
                            name = $this.attr("name"),
                            value = $this.val(),
                            parts;

                        // Don't accumulate submit buttons and nameless elements
                        if (type == "submit" || !name) {
                            return;
                        }

                        // Figure out name parts
                        parts = name.match(keyBreaker);
                        if (!parts.length) {
                            parts = [name];
                        }

                        // Convert the value
                        if (convert) {
                            value = convertValue(value);
                        }

                        // Assign data recursively
                        nestData($this, type, data, parts, value, seen);

                    });

                    return data;
                }
            });

        return $;
    })($);

    // ## jquerypp/event/fastfix/fastfix.js
    var __m3 = (function($) {
        // http://bitovi.com/blog/2012/04/faster-jquery-event-fix.html
        // https://gist.github.com/2377196

        // IE 8 has Object.defineProperty but it only defines DOM Nodes. According to
        // http://kangax.github.com/es5-compat-table/#define-property-ie-note
        // All browser that have Object.defineProperties also support Object.defineProperty properly
        if (Object.defineProperties) {
            var
            // Use defineProperty on an object to set the value and return it
            set = function(obj, prop, val) {
                if (val !== undefined) {
                    Object.defineProperty(obj, prop, {
                            value: val
                        });
                }
                return val;
            },
                // special converters
                special = {
                    pageX: function(original) {
                        if (!original) {
                            return;
                        }

                        var eventDoc = this.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        return original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    },
                    pageY: function(original) {
                        if (!original) {
                            return;
                        }

                        var eventDoc = this.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        return original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                    },
                    relatedTarget: function(original) {
                        if (!original) {
                            return;
                        }

                        return original.fromElement === this.target ? original.toElement : original.fromElement;
                    },
                    metaKey: function(originalEvent) {
                        if (!originalEvent) {
                            return;
                        }
                        return originalEvent.ctrlKey;
                    },
                    which: function(original) {
                        if (!original) {
                            return;
                        }

                        return original.charCode != null ? original.charCode : original.keyCode;
                    }
                };

            // Get all properties that should be mapped
            $.each($.event.keyHooks.props.concat($.event.mouseHooks.props).concat($.event.props), function(i, prop) {
                if (prop !== "target") {
                    (function() {
                        Object.defineProperty($.Event.prototype, prop, {
                                get: function() {
                                    // get the original value, undefined when there is no original event
                                    var originalValue = this.originalEvent && this.originalEvent[prop];
                                    // overwrite getter lookup
                                    return this['_' + prop] !== undefined ? this['_' + prop] : set(this, prop,
                                        // if we have a special function and no value
                                        special[prop] && originalValue === undefined ?
                                        // call the special function
                                        special[prop].call(this, this.originalEvent) :
                                        // use the original value
                                        originalValue)
                                },
                                set: function(newValue) {
                                    // Set the property with underscore prefix
                                    this['_' + prop] = newValue;
                                }
                            });
                    })();
                }
            });

            $.event.fix = function(event) {
                if (event[$.expando]) {
                    return event;
                }
                // Create a jQuery event with at minimum a target and type set
                var originalEvent = event,
                    event = $.Event(originalEvent);
                event.target = originalEvent.target;
                // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
                if (!event.target) {
                    event.target = originalEvent.srcElement || document;
                }

                // Target should not be a text node (#504, Safari)
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode;
                }

                return event;
            }
        }

        return $;
    })($);

    // ## jquerypp/event/default/default.js
    var __m5 = (function($) {

        $.fn.triggerAsync = function(type, data, success, prevented) {
            if (typeof data == 'function') {
                prevented = success;
                success = data;
                data = undefined;
            }

            if (this.length) {
                var el = this;
                // Trigger the event with the success callback as the success handler
                // when triggerAsync called within another triggerAsync,it's the same tick time so we should use timeout
                // http://javascriptweblog.wordpress.com/2010/06/28/understanding-javascript-timers/
                setTimeout(function() {
                    el.trigger({
                            type: type,
                            _success: success,
                            _prevented: prevented
                        }, data);
                }, 0);

            } else {
                // If we have no elements call the success callback right away
                if (success)
                    success.call(this);
            }
            return this;
        }


        //cache default types for performance
        var types = {}, rnamespaces = /\.(.*)$/,
            $event = $.event;

        $event.special["default"] = {
            add: function(handleObj) {
                //save the type
                types[handleObj.namespace.replace(rnamespaces, "")] = true;
            },
            setup: function() {
                return true
            }
        }

        // overwrite trigger to allow default types
        var oldTrigger = $event.trigger;

        $event.trigger = function defaultTriggerer(event, data, elem, onlyHandlers) {

            // Event object or event type
            var type = event.type || event,
                // Caller can pass in an Event, Object, or just an event type string
                event = typeof event === "object" ?
                // jQuery.Event object
                event[$.expando] ? event :
                // Object literal
                new $.Event(type, event) :
                // Just the event type (string)
                new $.Event(type),
                res = oldTrigger.call($.event, event, data, elem, onlyHandlers),
                paused = event.isPaused && event.isPaused();

            if (!onlyHandlers && !event.isDefaultPrevented() && event.type.indexOf("default") !== 0) {
                // Trigger the default. event
                oldTrigger("default." + event.type, data, elem)
                if (event._success) {
                    event._success(event)
                }
            }

            if (!onlyHandlers && event.isDefaultPrevented() && event.type.indexOf("default") !== 0 && !paused) {
                if (event._prevented) {
                    event._prevented(event);
                }
            }

            // code for paused
            if (paused) {
                // set back original stuff
                event.isDefaultPrevented =
                    event.pausedState.isDefaultPrevented;
                event.isPropagationStopped =
                    event.pausedState.isPropagationStopped;
            }
            return res;
        };

        return $;
    })($);

    // ## jquerypp/event/pause/pause.js
    var __m4 = (function($) {

        var current,
            rnamespaces = /\.(.*)$/,
            returnFalse = function() {
                return false
            },
            returnTrue = function() {
                return true
            };

        $.Event.prototype.isPaused = returnFalse

        $.Event.prototype.pause = function() {
            // stop the event from continuing temporarily
            // keep the current state of the event ...
            this.pausedState = {
                isDefaultPrevented: this.isDefaultPrevented() ? returnTrue : returnFalse,
                isPropagationStopped: this.isPropagationStopped() ? returnTrue : returnFalse
            };

            this.stopImmediatePropagation();
            this.preventDefault();
            this.isPaused = returnTrue;
        };

        $.Event.prototype.resume = function() {
            // temporarily remove all event handlers of this type 
            var handleObj = this.handleObj,
                currentTarget = this.currentTarget;
            // temporarily overwrite special handle
            var origType = $.event.special[handleObj.origType],
                origHandle = origType && origType.handle;

            if (!origType) {
                $.event.special[handleObj.origType] = {};
            }
            $.event.special[handleObj.origType].handle = function(ev) {
                // remove this once we have passed the handleObj
                if (ev.handleObj === handleObj && ev.currentTarget === currentTarget) {
                    if (!origType) {
                        delete $.event.special[handleObj.origType];
                    } else {
                        $.event.special[handleObj.origType].handle = origHandle;
                    }
                }
            }
            delete this.pausedState;
            // reset stuff
            this.isPaused = this.isImmediatePropagationStopped = returnFalse;

            if (!this.isPropagationStopped()) {
                // fire the event again, no events will get fired until
                // same currentTarget / handler
                $.event.trigger(this, [], this.target);
            }

        };

        return $;
    })($, __m5);
})(jQuery);