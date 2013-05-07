Observed
========

A Javascript mixin that can notify listeners of when the host object's properties change. At the moment, the mixin adds one method: `onChange(e)`.

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
    user.onChange(function(e){
      console.log('You changed the properties ' + e.properties.join(', ') +
        ' of the user object.')
    })
    user.setName('james')