export class Game {

    constructor(){
        this.sacha = document.querySelector('.sacha');
        document.addEventListener("keydown", Game.onKeyDown);
    }

    static randomPkmn(){

        let min=1; 
        let max=10;  
        let random = Math.random() * (max - min) + min; 
        if(random > 8){
            Game.PkmnAppears();
        }
    }

    static randomAttack(){

        let min = 0;
        let max = 40;
        let idAttack = Math.floor(Math.random() * (max - min) + min); 
        return idAttack;
    }
    
    static onKeyDown(event){

        let sacha = document.querySelector('.sacha');
        let parent = sacha.parentNode;
        let x = parent.getAttribute('x');
        let y = parent.getAttribute('y');

        if(event.keyCode === 37){
            x-= 1;
            let newPos = document.querySelector(`[x="${x}"][y="${y}"]`);
            newPos.appendChild(sacha);
            Game.randomPkmn();
        }
        if(event.keyCode === 39){
            x++;
            let newPos = document.querySelector(`[x="${x}"][y="${y}"]`);
            newPos.appendChild(sacha);
            Game.randomPkmn();
        }
        if(event.keyCode === 38){
            y-= 1;
            let newPos = document.querySelector(`[x="${x}"][y="${y}"]`);
            newPos.appendChild(sacha);
            Game.randomPkmn();
        }
        if(event.keyCode === 40){
            y++;
            let newPos = document.querySelector(`[x="${x}"][y="${y}"]`);
            newPos.appendChild(sacha);
            Game.randomPkmn();
        }
    }

    static async PkmnAppears(){

        document.removeEventListener("keydown", Game.onKeyDown);

        let music = new Audio('https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/gbhogmtx/107-battle%20%28vs%20wild%20pokemon%29.mp3');
        music.loop = true;
        music.volume = 0.5;
        music.play();

        let min = 0;
        let max = 250;
        let id = Math.floor(Math.random() * (max - min) + min); 
        let pkmn, sprite, friend, friendSprite, level, friendLevel, friendAtk1, friendAtk2, friendAtk3, friendAtk4, id1, id2, id3, id4, pvEnnemy, friendPV;

        await fetch ('https://pokeapi.co/api/v2/pokemon/'+ id)
            .then(response => response.json())
            .then(data =>{
                pkmn = data.name;
                sprite = data.sprites.front_default;
                level = data.base_experience;
                pvEnnemy = data.stats[0].base_stat;
            })
        
        await fetch ('https://pokeapi.co/api/v2/pokemon/9')
        .then(response => response.json())
        .then(data =>{
            
            friend = data.name;
            friendSprite = data.sprites.back_default;
            friendLevel = data.base_experience;
            friendPV = data.stats[0].base_stat;
            
            id1 = Game.randomAttack();
            friendAtk1 = data.moves[id1].move.name;
            id2 = Game.randomAttack();
            friendAtk2 = data.moves[id2].move.name;
            id3 = Game.randomAttack();
            friendAtk3 = data.moves[id3].move.name;
            id4 = Game.randomAttack();
            friendAtk4 = data.moves[id4].move.name;

            data.selectedAttacks = [friendAtk1, friendAtk2, friendAtk3, friendAtk4];
            localStorage.setItem('friend', JSON.stringify(data))
        })
        
        let sacha = document.querySelector('.sacha');
        let cells = document.querySelectorAll('.divTableCell');
        let map = document.querySelector('.divTable');
        let fight = document.querySelector('.fight');
        let attacks = document.querySelector('.attacks');

        let adv = document.getElementById('opponent');
        let ami = document.getElementById('friend');

        sacha.classList.add('disappears');

        for (let i=0; i<cells.length; i++){
            cells[i].classList.add('dark');
            await Game.sleep(30);
        }
        for (let i=0; i<cells.length; i++){
            cells[i].classList.remove('dark');
            cells[i].classList.add('white');
        }

        let p = document.createElement('p');
        p.classList.add('white');
        p.innerText = 'Un '+ pkmn +' sauvage apparait !!!';
        adv.appendChild(p);

        let h2 = document.createElement('h2');
        h2.classList.add('opponentName');
        h2.innerText = pkmn;
        adv.appendChild(h2);

        let h3 = document.createElement('h3');
        h3.classList.add('opponentLevel');
        h3.innerText = 'Lv ' + level;
        adv.appendChild(h3);

        let img = document.createElement('img');
        img.src = sprite;
        img.setAttribute('class', 'opponent');
        adv.appendChild(img);

        let imgFriend = document.createElement('img');
        imgFriend.src = friendSprite;
        imgFriend.setAttribute('class', 'friend');
        ami.appendChild(imgFriend);

        let h2fd = document.createElement('h2');
        h2fd.classList.add('friendName');
        h2fd.innerText = friend;
        ami.appendChild(h2fd);

        let h3fd = document.createElement('h3');
        h3fd.classList.add('friendLevel');
        h3fd.innerText = 'Lv ' + friendLevel;
        ami.appendChild(h3fd);

        let lifeEnnemy = document.createElement('div');
        lifeEnnemy.classList.add('life');
        adv.appendChild(lifeEnnemy);

        let levelLifeEn = document.createElement('p');
        levelLifeEn.classList.add('lifeLevel');
        levelLifeEn.innerText = pvEnnemy +'/'+ pvEnnemy;
        adv.appendChild(levelLifeEn);

        let levelLifeFd = document.createElement('p');
        levelLifeFd.classList.add('lifeLevelFd');
        levelLifeFd.innerText = friendPV +'/'+ friendPV;
        ami.appendChild(levelLifeFd);

        let lifeFd = document.createElement('div');
        lifeFd.classList.add('lifeFd');
        ami.appendChild(lifeFd);

        let button1 = document.createElement('button');
        button1.classList.add('button');
        button1.setAttribute('id', friendAtk1);
        button1.classList.add('notBehind');
        button1.innerText = friendAtk1;
        attacks.appendChild(button1);

        let button2 = document.createElement('button');
        button2.classList.add('button');
        button2.setAttribute('id', friendAtk2);
        button2.classList.add('notBehind');
        button2.innerText = friendAtk2;
        attacks.appendChild(button2);

        let button3 = document.createElement('button');
        button3.classList.add('button');
        button3.classList.add('notBehind');
        button3.setAttribute('id', friendAtk3);
        button3.innerText = friendAtk3;
        attacks.appendChild(button3);

        let button4 = document.createElement('button');
        button4.classList.add('button');
        button4.classList.add('notBehind');
        button4.setAttribute('id', friendAtk4);
        button4.innerText = friendAtk4;
        attacks.appendChild(button4);

        let listAttack = attacks.querySelectorAll('button');
        for(let attk of listAttack){
            attk.addEventListener('click', Game.attack);
        }
    }

    static attack(event){

        let ennemy = document.querySelector('.opponent');
        let friend = JSON.parse(localStorage.getItem('friend'));
        //console.log(event.target.id);
        //console.log(friend.name);
        let attacks = document.querySelector('.attacks');

        let gameDialog = document.createElement('div');
        gameDialog.innerText = friend.name + ' lance ' + event.target.id + '!';
        gameDialog.classList.add('dialog');
        attacks.appendChild(gameDialog);

        ennemy.classList.add('clignote');
    }

    static sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    }

}