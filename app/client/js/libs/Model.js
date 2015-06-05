/**
 * Created by Treem on 05.06.2015.
 */

class Model {

    constructor() {
        this.data = {};
    }

    readData(key){
        return this.data[key];
    }

    storeData(key, value){
        this.data[key] = value;
    }

    setupEvents() {
        var me = this;

        return {

        };
    }

    fireEvent(){

    }

    setupData() {

        console.log('setup data');

    }

}