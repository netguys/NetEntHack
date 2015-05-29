class SomeController {
    constructor () {
        this.someValue = 'Max';

        console.log('Yeah! I Created!');
    }

    log() {
        console.log(this.someValue + ' dynamic method is working');


    }
}

var someCtrl = new SomeController();

setTimeout(function() {
    someCtrl.log();
}, 500);

//{ let a = 'I am declared inside an anonymous block'; }
//console.log(a); // ReferenceError: a is not defined