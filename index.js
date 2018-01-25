// const { Observable } = require('rxjs/Rx')


// const arrayObservable = Observable.create(obs => {
//   [1, 2, 3, 4, 5, 6].forEach(x => obs.next(x));
//   obs.complete()
// })

// arrayObservable
//   .filter(x => x % 2)
//   .map(x => x * 10)
//   .subscribe(val => console.log(val))

class Strim {
  constructor(subscribe) {
    this._subscribe = subscribe
  }

  static create(subscribe) {
    return new Strim(subscribe)
  }

  subscribe(next, complete) {
    this._subscribe({ next, complete })
  }
}

const arrayStrim = Strim.create((callbacks) => {
  [1, 2, 3, 4, 5].forEach(callbacks.next)
  callbacks.complete()
})

const intervalStrim = Strim.create((callbacks) => {
  var i = 0
  const id = setInterval(() => {
    callbacks.next(++i)

    if (i > 5) {
      callbacks.complete()
      clearInterval(id)
    }
  }, 500)
})

intervalStrim.subscribe(
  val => console.log(val),
  () => console.log('конец')
)
