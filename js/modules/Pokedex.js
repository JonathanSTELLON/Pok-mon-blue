export class Pokedex{

    constructor(){

        this.layout = document.querySelector(".layout");
        this.template = document.getElementById("pkmnDisplay");
        this.card = document.querySelector(".card");
        this.container = document.querySelector(".layout");

        this.getDatas();
        
    }

    async getDatas(){
        let that = this;
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=250')
        .then(response => response.json())
        .then(data => {
            let list = data.results;
            for(let index in list){
                fetch(list[index].url)
                    .then(response => response.json())
                    .then(data => {
                        let pkmnName = data.name;
                        let src = data.sprites.front_default;
                        let listType = data.types;
                        fetch(data.species.url)
                            .then(response => response.json())
                            .then(descriptions => {
                                let descFr = descriptions.flavor_text_entries.filter(o => o.language.name == 'fr')[0].flavor_text;
                                that.templating(data, src, listType, descFr); 
                            })
                        
                    })
            }
        })
    }

    templating(pkmn, src, listType, descFr){

        this.template = document.getElementById("pkmnDisplay");
        this.clone = document.importNode(this.template.content, true);

        let pkmnName = this.clone.getElementById("pkmnName");
        pkmnName.innerText = pkmn.name;

        let pkmnSprite = this.clone.getElementById("pkmnSprite");
        pkmnSprite.src = pkmn.sprites.front_default;

        let type = this.clone.getElementById("pkmnType");
        type.textContent = listType.map(o => o.type.name).join(' ');
        type.setAttribute('class', 'type ' + type.textContent);

        let pkmnDesc = this.clone.getElementById("pkmnDesc");
        pkmnDesc.innerText = descFr;

        this.layout.appendChild(this.template);
        this.layout.appendChild(this.clone);    
    }
}