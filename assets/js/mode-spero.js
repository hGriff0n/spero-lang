// This is adopted form mode-rust.js. Most of the stuff that has been changed is within the highlighting rules
// That is all that I know how to change correctly so some of the other stuff may not work correctly

ace.define("ace/mode/spero_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var stringEscape = /\\(?:[nrt0'"\\]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source;
        var SperoHighlightRules = function () {
            // Lua style start
            // var keywords = ("");
            // var builtin = ("");


            this.$rules = {
                start: [
                    {
                        token: 'variable.other.annotation.spero',
                        regex: '@[a-z][a-zA-Z$_]*!?'
                    },
                    {
                        token: 'string.quoted.single.spero',
                        regex: "'(?:[^'\\\\]|" + stringEscape + ")'"
                    },
                    {
                        token: 'string.quoted.double.spero',
                        regex: '"',
                        push: [
                            {
                                token: 'string.quoted.double.spero',
                                regex: '"',
                                next: 'pop'
                            },
                            {
                                token: 'constant.character.escape.spero',
                                regex: stringEscape
                            },
                            { defaultToken: 'string.quoted.double.spero' },
                        ],
                    },
                    {
                        token: 'keyword.spero',
                        regex: 'mod ',
                        push: [
                            {
                                token: [ 'namespace.spero', 'nohighlight.spero' ],
                                regex: '([a-z][a-zA-Z_]*)(:)',
                            },
                            {
                                token: 'namespace.spero',
                                regex: '[a-z][a-zA-Z_]*',
                                next: 'pop'
                            },
                        ],
                    },
                    {
                        token: [ 'namespace.spero', 'nohighlight.spero' ],
                        regex: '([a-z][a-zA-Z_]*)(:)'
                    },
                    {
                        token: 'keyword.spero',
                        regex: '\\b(?:use|def|let|static|if|else|loop|while|for|match|yield|wait|return|do|mut|impls|in|continue|break|self|super|as)\\b'
                    },
                    {
                        token: 'constant.language.spero',
                        regex: '\\b(?:true|false)\\b'
                    },
                    {
                        token: 'nohighlight.spero',
                        regex: '[a-z][a-zA-Z0-9_]*'
                    },
                    {
                        token: 'type.spero',
                        regex: '[A-Z][a-zA-Z0-9_]*([&*]|(\\.\\.))?'
                    },
                    {
                        token: 'comment.start.block.spero',
                        regex: '##',
                        stateName: 'comment',
                        push: [
                            {
                                token: 'comment.end.block.spero',
                                regex: '##',
                                next: 'pop'
                            },
                            { defaultToken: 'comment.block.source.spero' }]
                    },
                    {
                        token: 'comment.line.spero',
                        regex: '#.*$'
                    },
                    {   // Prevents some system chracters from being highlighted (some of these may not be necessary)
                        token: 'system.operator.spero',
                        regex: '[&~!\?]|->'
                    },
                    {
                        token: 'keyword.operator',
                        regex: '[!$%^&\*\?<>\|`/\\\-=\+~]+'
                    },
                    // { token: "punctuation.operator", regex: /[?:,;.]/ },
                    // { token: "paren.lparen", regex: /[\[({]/ },
                    // { token: "paren.rparen", regex: /[\])}]/ },
                    // {
                    //     token: 'support.constant.source.spero',
                    //     regex: '\\b(?:EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO)\\b'
                    // },
                    {
                        token: 'constant.numeric.hex.spero',
                        regex: '0x[a-fA-F0-9]+'
                    },
                    {
                        token: 'constant.numeric.binary.spero',
                        regex: '0b[01]+'
                    },
                    {
                        token: 'constant.numeric.decimal.spero',
                        regex: '[0-9]+(.[0-9+])?'
                    },
                ]
            }

            this.normalizeRules();
        };

        SperoHighlightRules.metaData = {
            fileTypes: ['spr'],
            foldingStartMarker: '^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$',
            foldingStopMarker: '^\\s*\\}',
            name: 'spero',
            scopeName: 'source.spero'
        }


        oop.inherits(SperoHighlightRules, TextHighlightRules);

        exports.SperoHighlightRules = SperoHighlightRules;
    });

ace.define("ace/mode/folding/cstyle",
    ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"],
    function (require, exports, module) {
        "use strict";

        var oop = require("../../lib/oop");
        var Range = require("../../range").Range;
        var BaseFoldMode = require("./fold_mode").FoldMode;

        var FoldMode = exports.FoldMode = function (commentRegex) {
            if (commentRegex) {
                this.foldingStartMarker = new RegExp(
                    this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
                );
                this.foldingStopMarker = new RegExp(
                    this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
                );
            }
        };
        oop.inherits(FoldMode, BaseFoldMode);

        (function () {

            this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
            this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
            this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
            this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
            this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
            this._getFoldWidgetBase = this.getFoldWidget;
            this.getFoldWidget = function (session, foldStyle, row) {
                var line = session.getLine(row);

                if (this.singleLineBlockCommentRe.test(line)) {
                    if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                        return "";
                }

                var fw = this._getFoldWidgetBase(session, foldStyle, row);

                if (!fw && this.startRegionRe.test(line))
                    return "start"; // lineCommentRegionStart

                return fw;
            };

            this.getFoldWidgetRange = function (session, foldStyle, row, forceMultiline) {
                var line = session.getLine(row);

                if (this.startRegionRe.test(line))
                    return this.getCommentRegionBlock(session, line, row);

                var match = line.match(this.foldingStartMarker);
                if (match) {
                    var i = match.index;

                    if (match[1])
                        return this.openingBracketBlock(session, match[1], row, i);

                    var range = session.getCommentFoldRange(row, i + match[0].length, 1);

                    if (range && !range.isMultiLine()) {
                        if (forceMultiline) {
                            range = this.getSectionRange(session, row);
                        } else if (foldStyle != "all")
                            range = null;
                    }

                    return range;
                }

                if (foldStyle === "markbegin")
                    return;

                var match = line.match(this.foldingStopMarker);
                if (match) {
                    var i = match.index + match[0].length;

                    if (match[1])
                        return this.closingBracketBlock(session, match[1], row, i);

                    return session.getCommentFoldRange(row, i, -1);
                }
            };

            this.getSectionRange = function (session, row) {
                var line = session.getLine(row);
                var startIndent = line.search(/\S/);
                var startRow = row;
                var startColumn = line.length;
                row = row + 1;
                var endRow = row;
                var maxRow = session.getLength();
                while (++row < maxRow) {
                    line = session.getLine(row);
                    var indent = line.search(/\S/);
                    if (indent === -1)
                        continue;
                    if (startIndent > indent)
                        break;
                    var subRange = this.getFoldWidgetRange(session, "all", row);

                    if (subRange) {
                        if (subRange.start.row <= startRow) {
                            break;
                        } else if (subRange.isMultiLine()) {
                            row = subRange.end.row;
                        } else if (startIndent == indent) {
                            break;
                        }
                    }
                    endRow = row;
                }

                return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
            };
            this.getCommentRegionBlock = function (session, line, row) {
                var startColumn = line.search(/\s*$/);
                var maxRow = session.getLength();
                var startRow = row;

                var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
                var depth = 1;
                while (++row < maxRow) {
                    line = session.getLine(row);
                    var m = re.exec(line);
                    if (!m) continue;
                    if (m[1]) depth--;
                    else depth++;

                    if (!depth) break;
                }

                var endRow = row;
                if (endRow > startRow) {
                    return new Range(startRow, startColumn, endRow, line.length);
                }
            };

        }).call(FoldMode.prototype);

    });

ace.define("ace/mode/spero",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/spero_highlight_rules", "ace/mode/folding/cstyle"],
    function (require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var SperoHighlightRules = require("./spero_highlight_rules").SperoHighlightRules;
        var FoldMode = require("./folding/cstyle").FoldMode;

        var Mode = function () {
            this.HighlightRules = SperoHighlightRules;
            this.foldingRules = new FoldMode();
            this.$behaviour = this.$defaultBehaviour;
        };
        oop.inherits(Mode, TextMode);

        (function () {
            this.lineCommentStart = "#";
            this.blockComment = { start: "##", end: "##", nestable: false };
            this.$id = "ace/mode/spero";
        }).call(Mode.prototype);

        exports.Mode = Mode;
    });
