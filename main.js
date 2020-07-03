/* COMPONENT SECTION */
let Card = Vue.component('card', {
    data: function () {
      return {
          color: ""
        }
    },
    methods:{
        flipCard(clickedEvent, color){
            // count class active
            let flipped = $(".active").length;

            this.color = color;

            // call activateCard - on activate
            this.$emit('activate',this.color)

            // path[2]: div.card#n
            const cardid =clickedEvent.path[2].id; 
            // flip card
            const selector = "#"+cardid+" .card-wrapper";
            $(selector).toggleClass("active");

            // check symbol
            if(flipped==1){
                // if not matched, unflip these two cards
                // flip two cards maximum
                // at the mean time, all cards are disabled
                $(".card").toggleClass("disabled");
                setTimeout(()=>{
                    flipped = 0;
                    $(".active").toggleClass("active");
                    $(".card").toggleClass("disabled");
                }, 1000);
            }
        }
    },
    props:['card'],
    template: `
        <div class="card" :id="'card_'+card.id">
            <div :class="{'card-wrapper': true, 'matched': card.matched}" @click="flipCard($event, card.color)">
                <div class="card-face card-front" :style="{'background':card.color}"></div>
                <div class="card-face card-back"></div>
            </div>
        </div>
    `
});

/* APP SECTION */
const app = new Vue({
    el: "#app",
    data: {
        // test: "test",
        cards: [
            {
                id: "1",
                color: "url('img/TLogo.png')",
                matched: false,
            },
            {
                id: "2",
                color: "green",
                matched: false,
            },
            {
                id: "3",
                color: "url('img/TLogo.png')",
                matched: false,
            },
            {
                id: "4",
                color: "green",
                matched: false,
            },
            {
                id: "5",
                color: "blue",
                matched: false,
            },
            {
                id: "6",
                color: "purple",
                matched: false,
            },
            {
                id: "7",
                color: "purple",
                matched: false,
            },
            {
                id: "8",
                color: "blue",
                matched: false,
            },
            {
                id: "9",
                color: "pink",
                matched: false,
            },
            {
                id: "10",
                color: "pink",
                matched: false,
            },
        ],
        curColor: "",
        moves: 0,
        matchedCards: 0,
        timer: "0",
        message: "",
    },
    created: function() {
        // randomize orders of cards
        this.cards = this.randomize(this.cards);
      },
    methods: {
        activateCard(color){
            // set timer
            if(this.timer==="0"){
                this.timer = 0;
                setInterval(()=>{
                    this.timer+=1;
                },1000);
            }
            this.moves += 1;
            // when flip the first card, there should not be a curColor
            if(this.moves%2==1){
                this.curColor="";
            }

            if(color == this.curColor){
                // matched
                this.matchedCards += 1;    
                // stay flipped: set cards with curColor matched
                for(card of this.cards){
                    if (card.color == this.curColor) {
                        card.matched = true;
                    }
                }
            }
            // console.log(this.cards);
            // set new color
            this.curColor = color;

            if(this.matchedCards == this.cards.length/2){
                this.message = "Congrats! You used " + this.moves + " moves. You completed it in " + this.timer + " seconds.";
                $('.heading').toggleClass('hide');
            }
        },
        randomize(cards) {
            for (let i = cards.length - 1; i > 0; i--) {
                const r = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[r]] = [cards[r], cards[i]];
            }
            return cards;
        }
    },
    components:{
        Card
    }
});