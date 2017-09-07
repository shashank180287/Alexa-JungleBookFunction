'use strict';

var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.0c20ab91-ce99-458c-9629-11dfce57cea6";

var SKILL_NAME = "Jungle Book";
var HELP_MESSAGE = "You can aks for any Jungle knowledge points. Know attribute of differend animals. What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

const animalTraitMap = new Object();
animalTraitMap['anaconda'] = [
    'Anaconda are stocky muscular snakes',
    'Anaconda have nostrils and Eyes on top of head',
    'Anaconda have maximum length of 25-30 feet',
    'Anaconda are found in swamps and calmer waters',
    'Anaconda have average weight of 100-150 pound'
    ];
animalTraitMap['black caiman'] = [
    'Black Caiman have black scaly Skin',
    'Black Caiman are found in South America',
    'Black Caiman have body length between 13 to 20 feet',
    'Black Caiman are largest predator in Amazon river',
    'Black Caiman have life expectancy of 65 to 80 years'
    ];
animalTraitMap['elephant'] = [
    'Elephants have Trunk',
    'Elephants can eat 300 pound of food daily',
    'Elephants have Tusk',
    'Elephants have gestation period of 22 months',
    'Elephants have more than 100000 muscles in trunk'	
    ];
animalTraitMap['giraffe'] = [
    'Giraffe are tallest land animal',
    'Giraffe have extremely long neck',
    'Giraffe are mostly lives in Africa',
    'Giraffe have Gestation period of 400 to 468 days',
    'Giraffe can extend tongue upto 18 inches'
    ];
animalTraitMap['leopard'] = [
    'Leopard are opportunistic hunters',
    'Leopard can drag prey up to 3 times heavier',
    'Leopard have large head but small jaw',
    'Leopard can live without water for long duration',
    'Leopard are stealthy animal'
    ];
animalTraitMap['tiger'] = [
    'Tiger are solitary animal',
    'Tiger are active from dawn to dusk',
    'Tiger are largest of big cat',
    'Tiger are Can leap upto 30 feet',
    'Tiger are strong swimmers'
    ];
animalTraitMap['dog'] = [
    'There are more than 150 dog breeds',
    'The most popular name for a dog is Max',
    'Three dogs, from First Class cabins, survived the sinking of the Titanic',
    'Dogs can see in the dark',
    'Dogs have about 1700 taste buds'
    ];
animalTraitMap['crocodile'] = [
    'Smallest crocodile species is Dwarf Crocodile',
    'Crocodiles have 24 sharp teeth but they do not chew their food.',
    'Crocodiles wipe their eyes when feeding, because their eyes bubble and froth when eating.',
    'Crocodiles can swim at 25mph just with the help of their powerful tail',
    'Farmed crocodiles can reach 5 feet in length in just one year.'
    ];
//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('JungleKnowledge');
    },
    'JungleKnowledge': function () {
        var speechOutput = "Good to hear that you are interested in Jungle Facts. Tell me for which of these animals, you want to know more . ";
        var keys = Object.keys(animalTraitMap);
        for(var i = 0, size = keys.length; i < size ; i++){
            var animalName = keys[i];
            if(i==(size - 1)){
                speechOutput+="or " + animalName + " ? ";
            } else {
                speechOutput+=animalName + " ? ";
            }
        }
        this.emit(':ask', speechOutput, speechOutput);
    },
    'SelectAnimalIntent': function () {
        var speechOutput = "";
        var selectedAnimal = this.event.request.intent.slots.SelectedAnimal.value;
        var traits = animalTraitMap[selectedAnimal];
        if(traits){
            console.info("---------Presenting facts for " + selectedAnimal+"---------");
            speechOutput = "Here is the fact about " + selectedAnimal + " . ";
            var fact = traits[Math.floor(Math.random() * 5) + 1];
            speechOutput += fact;
            speechOutput +=" . Thank you for using Jungle Book . ";
            this.emit(':tell', speechOutput, speechOutput);
        } else {
            console.error("---------User is looking facts for " + selectedAnimal+"---------");
            speechOutput = "Sorry, currently we do not have any facts for " + selectedAnimal + " . We are updating our records. Please visit us again.";
            this.emit(':tell', speechOutput, speechOutput);
        }
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
