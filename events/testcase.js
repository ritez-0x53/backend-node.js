

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

class CarsInventory extends EventEmitter{
    constructor(...cars) {
        super();
        this.cars = [...cars]
    }
    addCar(carName) {
        this.cars = [...this.cars , carName];
        let newCarIndex = this.cars.findIndex(val => val === carName);
        this.emit("add" , newCarIndex);
    }
    showCars(){
        return this.cars;
    }
}


const sambhuCars = new CarsInventory("BMW" , "Lamborghini");
sambhuCars.showCars()

sambhuCars.on("add" , (index) => {
    console.log("car added named : "+sambhuCars.showCars()[index]);
    console.log("all cars : "+sambhuCars.showCars());
})



sambhuCars.addCar("Tata Nexon")
sambhuCars.addCar("Kia")
sambhuCars.addCar("Maruti")
