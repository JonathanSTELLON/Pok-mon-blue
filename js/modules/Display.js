export class Display{

    constructor(){

        //this.layout = document.querySelector(".layout");
        this.buttonPokedex = document.querySelector(".displayPokedex");
        this.buttonPokedex.addEventListener('click', this.display);

        this.display();
    }

    display(){

        let layout = document.querySelector(".layout");
        layout.classList.toggle('display');
    }

}