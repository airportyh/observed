var ObservedFuns = (function(){

  return {
    snapshot: snapshot,
    changedProperties: changedProperties,
    checkChanges: checkChanges,
    notify: notify
  }

  function snapshot(obj, props){
    var values = obj._values = {}
    if (props){
      for (var i = 0; i < props.length; i++){
        var prop = props[i]
        values[prop] = obj[prop]
      }
    }else{
      for (var prop in obj){
        values[prop] = obj[prop]
      }
    }
  }

  function changedProperties(obj){
    var changed = []
    var values = obj._values
    for (var prop in values){
      if (values[prop] !== obj[prop]){
        changed.push(prop)
      }
    }
    return changed
  }

  function checkChanges(obj){
    var e = {}
    e.properties = changedProperties(obj)
    notify(obj, e)
  }

  function notify(obj, e){
    for (var i = 0; i < obj._callbacks.length; i++){
      obj._callbacks[i](e)
    }
  }

}());

var Observed = (function(){

  var snapshot = ObservedFuns.snapshot
  var checkChanges = ObservedFuns.checkChanges

  var Observed = function(fun){
    var _fun = function(){
      snapshot(this)
      var retval = fun.apply(this, arguments)
      checkChanges(this)
      return retval
    }
    _fun._observed = true
    return _fun
  }

  Observed.onChange = function(callback){
    this._callbacks = this._callbacks || []
    this._callbacks.push(callback)
  }

  return Observed

}());