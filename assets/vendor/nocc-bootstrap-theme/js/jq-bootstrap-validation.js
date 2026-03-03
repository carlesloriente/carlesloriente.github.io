!(function (a) {
    var t = [],
      e = {
        options: {
          prependExistingHelpBlock: !1,
          sniffHtml: !0,
          preventSubmit: !0,
          submitError: !1,
          submitSuccess: !1,
          semanticallyStrict: !1,
          autoAdd: { helpBlocks: !0 },
          filter: function () {
            return !0;
          },
        },
        methods: {
          init: function (o) {
            var r = a.extend(!0, {}, e);
            r.options = a.extend(!0, r.options, o);
            var l = a.unique(
              this.map(function () {
                return a(this).parents("form")[0];
              }).toArray()
            );
            return (
              a(l).bind("submit", function (t) {
                var e = a(this),
                  i = 0,
                  n = e.find("input,textarea,select").not("[type=submit],[type=image]").filter(r.options.filter);
                n.trigger("submit.validation").trigger("validationLostFocus.validation"),
                  n.each(function (t, e) {
                    var n = a(e).parents(".form-group").first();
                    n.hasClass("warning") && (n.removeClass("warning").addClass("error"), i++);
                  }),
                  n.trigger("validationLostFocus.validation"),
                  i
                    ? (r.options.preventSubmit && t.preventDefault(), e.addClass("error"), a.isFunction(r.options.submitError) && r.options.submitError(e, t, n.jqBootstrapValidation("collectErrors", !0)))
                    : (e.removeClass("error"), a.isFunction(r.options.submitSuccess) && r.options.submitSuccess(e, t));
              }),
              this.each(function () {
                var e = a(this),
                  o = e.parents(".form-group").first(),
                  l = o.find(".help-block").first(),
                  d = e.parents("form").first(),
                  s = [];
                if ((!l.length && r.options.autoAdd && r.options.autoAdd.helpBlocks && ((l = a('<div class="help-block" />')), o.find(".controls").append(l), t.push(l[0])), r.options.sniffHtml)) {
                  var c = "";
                  if (
                    (void 0 !== e.attr("pattern") &&
                      ((c = "Not in the expected format<!-- data-validation-pattern-message to override -->"),
                      e.data("validationPatternMessage") && (c = e.data("validationPatternMessage")),
                      e.data("validationPatternMessage", c),
                      e.data("validationPatternRegex", e.attr("pattern"))),
                    void 0 !== e.attr("max") || void 0 !== e.attr("aria-valuemax"))
                  ) {
                    var v = void 0 !== e.attr("max") ? e.attr("max") : e.attr("aria-valuemax");
                    (c = "Too high: Maximum of '" + v + "'<!-- data-validation-max-message to override -->"),
                      e.data("validationMaxMessage") && (c = e.data("validationMaxMessage")),
                      e.data("validationMaxMessage", c),
                      e.data("validationMaxMax", v);
                  }
                  if (void 0 !== e.attr("min") || void 0 !== e.attr("aria-valuemin")) {
                    var m = void 0 !== e.attr("min") ? e.attr("min") : e.attr("aria-valuemin");
                    (c = "Too low: Minimum of '" + m + "'<!-- data-validation-min-message to override -->"),
                      e.data("validationMinMessage") && (c = e.data("validationMinMessage")),
                      e.data("validationMinMessage", c),
                      e.data("validationMinMin", m);
                  }
                  void 0 !== e.attr("maxlength") &&
                    ((c = "Too long: Maximum of '" + e.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->"),
                    e.data("validationMaxlengthMessage") && (c = e.data("validationMaxlengthMessage")),
                    e.data("validationMaxlengthMessage", c),
                    e.data("validationMaxlengthMaxlength", e.attr("maxlength"))),
                    void 0 !== e.attr("minlength") &&
                      ((c = "Too short: Minimum of '" + e.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->"),
                      e.data("validationMinlengthMessage") && (c = e.data("validationMinlengthMessage")),
                      e.data("validationMinlengthMessage", c),
                      e.data("validationMinlengthMinlength", e.attr("minlength"))),
                    (void 0 !== e.attr("required") || void 0 !== e.attr("aria-required")) &&
                      ((c = r.builtInValidators.required.message), e.data("validationRequiredMessage") && (c = e.data("validationRequiredMessage")), e.data("validationRequiredMessage", c)),
                    void 0 !== e.attr("type") &&
                      "number" === e.attr("type").toLowerCase() &&
                      ((c = r.builtInValidators.number.message), e.data("validationNumberMessage") && (c = e.data("validationNumberMessage")), e.data("validationNumberMessage", c)),
                    void 0 !== e.attr("type") &&
                      "email" === e.attr("type").toLowerCase() &&
                      ((c = "Not a valid email address<!-- data-validator-validemail-message to override -->"),
                      e.data("validationValidemailMessage") ? (c = e.data("validationValidemailMessage")) : e.data("validationEmailMessage") && (c = e.data("validationEmailMessage")),
                      e.data("validationValidemailMessage", c)),
                    void 0 !== e.attr("minchecked") &&
                      ((c = "Not enough options checked; Minimum of '" + e.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->"),
                      e.data("validationMincheckedMessage") && (c = e.data("validationMincheckedMessage")),
                      e.data("validationMincheckedMessage", c),
                      e.data("validationMincheckedMinchecked", e.attr("minchecked"))),
                    void 0 !== e.attr("maxchecked") &&
                      ((c = "Too many options checked; Maximum of '" + e.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->"),
                      e.data("validationMaxcheckedMessage") && (c = e.data("validationMaxcheckedMessage")),
                      e.data("validationMaxcheckedMessage", c),
                      e.data("validationMaxcheckedMaxchecked", e.attr("maxchecked")));
                }
                void 0 !== e.data("validation") && (s = e.data("validation").split(",")),
                  a.each(e.data(), function (a, t) {
                    var e = a.replace(/([A-Z])/g, ",$1").split(",");
                    "validation" === e[0] && e[1] && s.push(e[1]);
                  });
                var u = s,
                  g = [];
                do
                  a.each(s, function (a, t) {
                    s[a] = i(t);
                  }),
                    (s = a.unique(s)),
                    (g = []),
                    a.each(u, function (t, n) {
                      if (void 0 !== e.data("validation" + n + "Shortcut"))
                        a.each(e.data("validation" + n + "Shortcut").split(","), function (a, t) {
                          g.push(t);
                        });
                      else if (r.builtInValidators[n.toLowerCase()]) {
                        var o = r.builtInValidators[n.toLowerCase()];
                        "shortcut" === o.type.toLowerCase() &&
                          a.each(o.shortcut.split(","), function (a, t) {
                            (t = i(t)), g.push(t), s.push(t);
                          });
                      }
                    }),
                    (u = g);
                while (u.length > 0);
                var h = {};
                a.each(s, function (t, n) {
                  var o = e.data("validation" + n + "Message"),
                    l = void 0 !== o,
                    d = !1;
                  if (
                    ((o = o || "'" + n + "' validation failed <!-- Add attribute 'data-validation-" + n.toLowerCase() + "-message' to input to change this message -->"),
                    a.each(r.validatorTypes, function (t, r) {
                      void 0 === h[t] && (h[t] = []), d || void 0 === e.data("validation" + n + i(r.name)) || (h[t].push(a.extend(!0, { name: i(r.name), message: o }, r.init(e, n))), (d = !0));
                    }),
                    !d && r.builtInValidators[n.toLowerCase()])
                  ) {
                    var s = a.extend(!0, {}, r.builtInValidators[n.toLowerCase()]);
                    l && (s.message = o);
                    var c = s.type.toLowerCase();
                    "shortcut" === c
                      ? (d = !0)
                      : a.each(r.validatorTypes, function (t, o) {
                          void 0 === h[t] && (h[t] = []), d || c !== t.toLowerCase() || (e.data("validation" + n + i(o.name), s[o.name.toLowerCase()]), h[c].push(a.extend(s, o.init(e, n))), (d = !0));
                        });
                  }
                  d || a.error("Cannot find validation info for '" + n + "'");
                }),
                  l.data("original-contents", l.data("original-contents") ? l.data("original-contents") : l.html()),
                  l.data("original-role", l.data("original-role") ? l.data("original-role") : l.attr("role")),
                  o.data("original-classes", o.data("original-clases") ? o.data("original-classes") : o.attr("class")),
                  e.data("original-aria-invalid", e.data("original-aria-invalid") ? e.data("original-aria-invalid") : e.attr("aria-invalid")),
                  e.bind("validation.validation", function (t, i) {
                    var o = n(e),
                      l = [];
                    return (
                      a.each(h, function (t, n) {
                        (o || o.length || (i && i.includeEmpty) || (r.validatorTypes[t].blockSubmit && i && i.submitting)) &&
                          a.each(n, function (a, i) {
                            r.validatorTypes[t].validate(e, o, i) && l.push(i.message);
                          });
                      }),
                      l
                    );
                  }),
                  e.bind("getValidators.validation", function () {
                    return h;
                  }),
                  e.bind("submit.validation", function () {
                    return e.triggerHandler("change.validation", { submitting: !0 });
                  }),
                  e.bind("keyup.validation focus.validation blur.validation click.validation keydown.validation keypress.validation change.validation", function (t, i) {
                    var s = n(e),
                      c = [];
                    o.find("input,textarea,select").each(function (t, n) {
                      var o = c.length;
                      if (
                        (a.each(a(n).triggerHandler("validation.validation", i), function (a, t) {
                          c.push(t);
                        }),
                        c.length > o)
                      )
                        a(n).attr("aria-invalid", "true");
                      else {
                        var r = e.data("original-aria-invalid");
                        a(n).attr("aria-invalid", void 0 !== r && r);
                      }
                    }),
                      d
                        .find("input,select,textarea")
                        .not(e)
                        .not('[name="' + e.attr("name") + '"]')
                        .trigger("validationLostFocus.validation"),
                      (c = a.unique(c.sort())).length
                        ? (o.removeClass("success error").addClass("warning"),
                          r.options.semanticallyStrict && 1 === c.length
                            ? l.html(c[0] + (r.options.prependExistingHelpBlock ? l.data("original-contents") : ""))
                            : l.html('<ul role="alert"><li>' + c.join("</li><li>") + "</li></ul>" + (r.options.prependExistingHelpBlock ? l.data("original-contents") : "")))
                        : (o.removeClass("warning error success"), s.length > 0 && o.addClass("success"), l.html(l.data("original-contents"))),
                      "blur" === t.type && o.removeClass("success");
                  }),
                  e.bind("validationLostFocus.validation", function () {
                    o.removeClass("success");
                  });
              })
            );
          },
          destroy: function () {
            return this.each(function () {
              var e = a(this),
                i = e.parents(".form-group").first(),
                n = i.find(".help-block").first();
              e.unbind(".validation"),
                n.html(n.data("original-contents")),
                i.attr("class", i.data("original-classes")),
                e.attr("aria-invalid", e.data("original-aria-invalid")),
                n.attr("role", e.data("original-role")),
                t.indexOf(n[0]) > -1 && n.remove();
            });
          },
          collectErrors: function (t) {
            var e = {};
            return (
              this.each(function (t, i) {
                var n = a(i),
                  o = n.attr("name"),
                  r = n.triggerHandler("validation.validation", { includeEmpty: !0 });
                e[o] = a.extend(!0, r, e[o]);
              }),
              a.each(e, function (a, t) {
                0 === t.length && delete e[a];
              }),
              e
            );
          },
          hasErrors: function () {
            var t = [];
            return (
              this.each(function (e, i) {
                t = t.concat(a(i).triggerHandler("getValidators.validation") ? a(i).triggerHandler("validation.validation", { submitting: !0 }) : []);
              }),
              t.length > 0
            );
          },
          override: function (t) {
            e = a.extend(!0, e, t);
          },
        },
        validatorTypes: {
          callback: {
            name: "callback",
            init: function (a, t) {
              return { validatorName: t, callback: a.data("validation" + t + "Callback"), lastValue: a.val(), lastValid: !0, lastFinished: !0 };
            },
            validate: function (a, t, e) {
              if (e.lastValue === t && e.lastFinished) return !e.lastValid;
              if (!0 === e.lastFinished) {
                (e.lastValue = t), (e.lastValid = !0), (e.lastFinished = !1);
                var i = e,
                  n = a;
                !(function a(t, e) {
                  for (var i = Array.prototype.slice.call(arguments).splice(2), n = t.split("."), o = n.pop(), r = 0; r < n.length; r++) e = e[n[r]];
                  return e[o].apply(this, i);
                })(e.callback, window, a, t, function (a) {
                  i.lastValue === a.value &&
                    ((i.lastValid = a.valid),
                    a.message && (i.message = a.message),
                    (i.lastFinished = !0),
                    n.data("validation" + i.validatorName + "Message", i.message),
                    setTimeout(function () {
                      n.trigger("change.validation");
                    }, 1));
                });
              }
              return !1;
            },
          },
          ajax: {
            name: "ajax",
            init: function (a, t) {
              return { validatorName: t, url: a.data("validation" + t + "Ajax"), lastValue: a.val(), lastValid: !0, lastFinished: !0 };
            },
            validate: function (t, e, i) {
              return "" + i.lastValue == "" + e && !0 === i.lastFinished
                ? !1 === i.lastValid
                : (!0 === i.lastFinished &&
                    ((i.lastValue = e),
                    (i.lastValid = !0),
                    (i.lastFinished = !1),
                    a.ajax({
                      url: i.url,
                      data: "value=" + e + "&field=" + t.attr("name"),
                      dataType: "json",
                      success: function (a) {
                        "" + i.lastValue == "" + a.value &&
                          ((i.lastValid = !!a.valid),
                          a.message && (i.message = a.message),
                          (i.lastFinished = !0),
                          t.data("validation" + i.validatorName + "Message", i.message),
                          setTimeout(function () {
                            t.trigger("change.validation");
                          }, 1));
                      },
                      failure: function () {
                        (i.lastValid = !0),
                          (i.message = "ajax call failed"),
                          (i.lastFinished = !0),
                          t.data("validation" + i.validatorName + "Message", i.message),
                          setTimeout(function () {
                            t.trigger("change.validation");
                          }, 1);
                      },
                    })),
                  !1);
            },
          },
          regex: {
            name: "regex",
            init: function (a, t) {
              var e;
              return { regex: ((e = a.data("validation" + t + "Regex")), RegExp("^" + e + "$")) };
            },
            validate: function (a, t, e) {
              return (!e.regex.test(t) && !e.negative) || (e.regex.test(t) && e.negative);
            },
          },
          required: {
            name: "required",
            init: function (a, t) {
              return {};
            },
            validate: function (a, t, e) {
              return !!(0 === t.length && !e.negative) || !!(t.length > 0 && e.negative);
            },
            blockSubmit: !0,
          },
          match: {
            name: "match",
            init: function (a, t) {
              var e = a
                .parents("form")
                .first()
                .find('[name="' + a.data("validation" + t + "Match") + '"]')
                .first();
              return (
                e.bind("validation.validation", function () {
                  a.trigger("change.validation", { submitting: !0 });
                }),
                { element: e }
              );
            },
            validate: function (a, t, e) {
              return (t !== e.element.val() && !e.negative) || (t === e.element.val() && e.negative);
            },
            blockSubmit: !0,
          },
          max: {
            name: "max",
            init: function (a, t) {
              return { max: a.data("validation" + t + "Max") };
            },
            validate: function (a, t, e) {
              return (parseFloat(t, 10) > parseFloat(e.max, 10) && !e.negative) || (parseFloat(t, 10) <= parseFloat(e.max, 10) && e.negative);
            },
          },
          min: {
            name: "min",
            init: function (a, t) {
              return { min: a.data("validation" + t + "Min") };
            },
            validate: function (a, t, e) {
              return (parseFloat(t) < parseFloat(e.min) && !e.negative) || (parseFloat(t) >= parseFloat(e.min) && e.negative);
            },
          },
          maxlength: {
            name: "maxlength",
            init: function (a, t) {
              return { maxlength: a.data("validation" + t + "Maxlength") };
            },
            validate: function (a, t, e) {
              return (t.length > e.maxlength && !e.negative) || (t.length <= e.maxlength && e.negative);
            },
          },
          minlength: {
            name: "minlength",
            init: function (a, t) {
              return { minlength: a.data("validation" + t + "Minlength") };
            },
            validate: function (a, t, e) {
              return (t.length < e.minlength && !e.negative) || (t.length >= e.minlength && e.negative);
            },
          },
          maxchecked: {
            name: "maxchecked",
            init: function (a, t) {
              var e = a
                .parents("form")
                .first()
                .find('[name="' + a.attr("name") + '"]');
              return (
                e.bind("click.validation", function () {
                  a.trigger("change.validation", { includeEmpty: !0 });
                }),
                { maxchecked: a.data("validation" + t + "Maxchecked"), elements: e }
              );
            },
            validate: function (a, t, e) {
              return (e.elements.filter(":checked").length > e.maxchecked && !e.negative) || (e.elements.filter(":checked").length <= e.maxchecked && e.negative);
            },
            blockSubmit: !0,
          },
          minchecked: {
            name: "minchecked",
            init: function (a, t) {
              var e = a
                .parents("form")
                .first()
                .find('[name="' + a.attr("name") + '"]');
              return (
                e.bind("click.validation", function () {
                  a.trigger("change.validation", { includeEmpty: !0 });
                }),
                { minchecked: a.data("validation" + t + "Minchecked"), elements: e }
              );
            },
            validate: function (a, t, e) {
              return (e.elements.filter(":checked").length < e.minchecked && !e.negative) || (e.elements.filter(":checked").length >= e.minchecked && e.negative);
            },
            blockSubmit: !0,
          },
        },
        builtInValidators: {
          email: { name: "Email", type: "shortcut", shortcut: "validemail" },
          validemail: { name: "Validemail", type: "regex", regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}", message: "Not a valid email address<!-- data-validator-validemail-message to override -->" },
          passwordagain: { name: "Passwordagain", type: "match", match: "password", message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->" },
          positive: { name: "Positive", type: "shortcut", shortcut: "number,positivenumber" },
          negative: { name: "Negative", type: "shortcut", shortcut: "number,negativenumber" },
          number: { name: "Number", type: "regex", regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?", message: "Must be a number<!-- data-validator-number-message to override -->" },
          integer: { name: "Integer", type: "regex", regex: "[+-]?\\d+", message: "No decimal places allowed<!-- data-validator-integer-message to override -->" },
          positivenumber: { name: "Positivenumber", type: "min", min: 0, message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->" },
          negativenumber: { name: "Negativenumber", type: "max", max: 0, message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->" },
          required: { name: "Required", type: "required", message: "This is required<!-- data-validator-required-message to override -->" },
          checkone: { name: "Checkone", type: "minchecked", minchecked: 1, message: "Check at least one option<!-- data-validation-checkone-message to override -->" },
        },
      },
      i = function (a) {
        return a.toLowerCase().replace(/(^|\s)([a-z])/g, function (a, t, e) {
          return t + e.toUpperCase();
        });
      },
      n = function (t) {
        var e = t.val(),
          i = t.attr("type");
        return "checkbox" === i && (e = t.is(":checked") ? e : ""), "radio" === i && (e = a('input[name="' + t.attr("name") + '"]:checked').length > 0 ? e : ""), e;
      };
    (a.fn.jqBootstrapValidation = function (t) {
      return e.methods[t]
        ? e.methods[t].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof t && t
        ? (a.error("Method " + t + " does not exist on jQuery.jqBootstrapValidation"), null)
        : e.methods.init.apply(this, arguments);
    }),
      (a.jqBootstrapValidation = function (t) {
        a(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
      });
  })(jQuery);
