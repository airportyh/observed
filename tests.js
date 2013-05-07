var o
module('Observed', {
  setup: function(){
    o = {
      a: 1,
      b: 2
    }
    
  }
})

test('it tracks an object\'s changed properties', function(){
  ObservedFuns.snapshot(o)
  o.a = 2
  deepEqual(ObservedFuns.changedProperties(o), ['a'])
})

test('you can track specified properties only', function(){
  ObservedFuns.snapshot(o, ['b'])
  o.a = 2
  deepEqual(ObservedFuns.changedProperties(o), [])
})


asyncTest('can listen to changes', function(){
  extend(o, Observed)
  o.onChange(function(e){
    deepEqual(e.properties, ['a'])
    start()
  })
  ObservedFuns.snapshot(o)
  o.a = 2
  ObservedFuns.checkChanges(o)
})

test('full example', function(){
  function User(name){
    this.name = name
  }
  extend(User.prototype, Observed)
  User.prototype.setName = Observed(function(name){
    this.name = name
  })
  var user = new User('bob')
  var called = false
  user.onChange(function(e){
    deepEqual(e.properties, ['name'])
    called = true
  })
  user.setName('james')
  equal(user.name, 'james')
  ok(called)
})

function extend(dst, src){
  for (var key in src){
    dst[key] = src[key]
  }
}