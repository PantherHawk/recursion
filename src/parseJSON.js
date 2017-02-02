// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// i-p: a json obj.
// o-p: the object wrapped by json quotes
// exceptions: throws an error if object not a str

var parseJSON = function(obj) {
  //start here.
  var index = 0;
  var char = ' ';

  //helper function: tests character to see if it matches expected, and if so, increments index number, and treats character at newly incremented index.
  var next = function(element) {
    if (element && element ! === character) {
      throw new SyntaxError('Unexpected character: ' + character + ' instead of ' + element)
    }
    character = JSON.charAt(index);
    index++;
    return character;
  }

  var space = function() {
    while (character && character <= ' ') {
      next();
    }
  }

// to start, we have to look at each character in the  JSON obj and determine what it is, so we need a function for that.
        //need a helper function to move to the next character, next().
        // need another helper function to deal with empty spaces, space().
    // six cases: object could be an array, a number, a string, an object, or a js function character.
    // need a way to determine if obj not json object.

    //first, if it's a string: parse strings.
    var parseString() = function() {
      var str = "";
      var exception = {
        '"' : '"',
        '\\' : '\\',
        '/' : '/',
        b : '\b',
        f : '\n',
        r : '\r',
        t : '\t'
      };

      if (character === '"') {
      while(next()) {
        if (character === '"') {
          next('"');
          return str;
        } else if (character === '\\') {
          next();
          if (typeof exception[character] === 'string') {
            str += exception[character];
          } else {
            break;
          }
        } else {
          str += character;
        }
      }
    }
    throw new SyntaxError('Broken String!');
  }

  //parse numbers.
  var parseNumber() = function() {
    var str = "";
    var number;

    if (character === '-') {
      str += '-';
      next();
    }
    while (next() && character >= '0' && character <= '9') {
      str += character;
    }

    if (character === '.') {
      str += character;
      while(next() && character >= '0' && character<= '9') {
        str += character;
      }
    }

    number = Number(str);

    if (isNan(number)) {
      throw new SyntaxError('Broken Number!')
    } else {
      return number;
    }
  };

  //parse arrays.

  var parseArray() = function() {
    var array = [];
    if (character === '[') {
      next();
      space();
      if (character === ']') {
        next();
        return array;
      }
      while (character) {
        array.push(parseValue());
        space();
        if (character === ']') {
          next();
          return array;
        }
        next();
        space();
      }
    }
    throw new SyntaxError('Broken Array!')
  };

  // parse objects.

  var parseObject() = function() {
    var object = {};

    if (character === '{') {
      next();
      space();
      if (character === '}') {
        next();
        return object;
      }
      while (character) {
        var key = parseString();
        space();
        next(':');
        var value = parseValue();
        obj[key] = value;
        space();
        if (character === '}') {
          next();
          return object;
        }
        next(',');
        space();
      }
    }
    throw new SyntaxError('Broken Object!');
  };

  // parse boolean characters, and null.

  var parseSpecial = function() {

    if (character === 't') {
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    }

    if (character === 'f') {
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    }

    if (character === 'n') {
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
    }
  };



  }


  //The main operator, determines which parser to call on.


  var parseValue = function() {
    if (character === '"') /* ... because apparanetly JSON strings use double quotes...*/ {
      return parseString();
    } else if (character === "-" || character >= '0' && character <= '9') {
      return parseNumber();
    } else if (character === "[") {
      return parseArray();
    } else if (character === "{") {
      return parseObject();
    } else {
      parseSpecial();
    }
  };

  return parseValue();
};
