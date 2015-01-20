/**
 * Module Pattern
 */

/*
 * Java Edition
 */
// public class Singleton {
//   private static Singleton instance;
//   private int property;
//   private Singleton() {

//   }

//   public static sysnchronized Singleton getInstance() {
//     if (instance == null) {
//       instance = new Singleton();
//     }

//     return instance;
//   }

//   public void method() {}
// }

var jsSingleton = {
  property: "something",
  method: function () {
    console.log('hello world!');
  }
};

var jsLazySingleton = (function () {
  var instance;
  function init() {
    return {
      property: 'some thing',
      method: function () {
        console.log('hello world');
      }
    }
  }

  return {
    getInstance: function () {
      return instance || instance = init();
    }
  }
})();

// test
var singleon = jsLazySingleton.getInstance();
var property = singleon.property;
console.log(property);