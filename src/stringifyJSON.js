// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result;
  var isFirst = true;

  if(typeof obj === "undefined" || typeof obj === "function"){
    return "";
  }

  if(obj === null){
      return "" + obj + "";
    }

    if(typeof obj === "string"){
      return "\"" + obj + "\"";
    }

    if(typeof obj !== "object"){
      return "" + obj + "";
    }

    if(Array.isArray(obj)){
      result = [];
      obj.forEach((item) => {
        result.push(stringifyJSON(item));
      })

      return "[" + result + "]";
    }

    if(typeof obj === "object"){
      result = "";
      var tuple = [];
      _.each(obj, (item, key) => {
        var log = stringifyJSON(item);
        if(log === ""){
          result = "";
        } else {
          tuple.push("\"" + key + "\"" + ":" + log);
          result = tuple.join(',');
        }

      });

      return "{" + result + "}";
    }

};
