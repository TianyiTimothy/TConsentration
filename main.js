let Card = Vue.component('card', {
    data: function () {
      return {

        }
    },
    methods:{
        flipCard(clickedEvent){
            // count class active
            let flipped = $(".active").length;

            // path[2]: div.card#n
            const cardid =clickedEvent.path[2].id; 
            // console.log("#"+cardid);
            const selector = "#"+cardid+" .card-wrapper";
            $(selector).toggleClass("active");

            // check symbol
            if(flipped==1){
                // store symbol when flipping card#1
                

            }else if(flipped==2){
                // compare symbol to stored symbol

                // if matched, ..

                // if not matched, unflip these two cards
                // flip two cards maximum
                if(true){
                    $(".active").toggleClass("active");
                    flipped = 0;
                }
            }
        }
    },
    props:['card'],
    template: `
        <div class="card" :id="'card_'+card.id">
            <div class="card-wrapper" @click="flipCard($event)">
                <div class="card-face card-front" v-bind:style="{'backgroundColor':card.color}">front</div>
                <div class="card-face card-back">back</div>
            </div>
        </div>
    `
});

const app = new Vue({
    el: "#app",
    data: {
        // test: "test",
        cards: [
            {
                id: "1",
                color: "red",
            },
            {
                id: "2",
                color: "green",
            },
            {
                id: "3",
                color: "red",
                // symbol: "a",
            },
            {
                id: "4",
                color: "green",
                // symbol: "a",
            },
        ],
    },
    methods: {
        flipCard(){
            $(".card-wrapper").toggleClass("active");
        },
        compareCards(){
            
        }
    },
    components:{
        Card
    }
});