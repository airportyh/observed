Observed
========

A Javascript mixin that can notify listeners of when the host object's properties change.

Example
-------

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