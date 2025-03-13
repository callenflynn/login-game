document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const passwordInput = document.getElementById('passwordInput');
    const clearButton = document.getElementById('clearButton');
    const submitButton = document.getElementById('submitButton');

    const moonPhases = [
        { emoji: '🌑', name: 'new moon' },
        { emoji: '🌒', name: 'waxing crescent moon' },
        { emoji: '🌓', name: 'first quarter moon' },
        { emoji: '🌔', name: 'waxing gibbous moon' },
        { emoji: '🌕', name: 'full moon' },
        { emoji: '🌖', name: 'waning gibbous moon' },
        { emoji: '🌗', name: 'last quarter moon' },
        { emoji: '🌘', name: 'waning crescent moon' }
    ];
    const randomMoonPhase = moonPhases[Math.floor(Math.random() * moonPhases.length)];

    const romanNumeralRequirement = { regex: /^(?=.*[IVX]).*$/, message: `all Roman numerals (I, V, X) must add up to ${Math.floor(Math.random() * 41) + 30}` };

    const passwordRequirements = [
        { regex: /[A-Z]/, message: 'must have at least one capital letter' },
        { regex: /[a-z]/, message: 'must have at least one lowercase letter' },
        { regex: /[0-9]/, message: 'must have at least one number' },
        { regex: /[\W_]/, message: 'must have at least one special character' },
        { regex: /😀|😁|😂|🤣|😃|😄|😅|😆|😉|😊|😋|😎|😍|😘|😗|😙|😚|🙂|🤗|🤩|🤔|🤨|😐|😑|😶|🙄|😏|😣|😥|😮|🤐|😯|😪|😫|😴|😌|😛|😜|😝|🤤|😒|😓|😔|😕|🙃|🤑|😲|☹️|🙁|😖|😞|😟|😤|😢|😭|😦|😧|😨|😩|🤯|😬|😰|😱|😳|🤪|😵|😡|😠|🤬|😷|🤒|🤕|🤢|🤮|🤧|😇|🥳|🥺|🤠/, message: 'must have at least one emoji (some examples are 😱, 😁, or 🤠)' },
        { regex: /[\u00C0-\u017F]/, message: 'must have at least one character from a different language' },
        { regex: /(?:McDonald\'s|Burger King|Wendy\'s|Taco Bell|Subway|KFC|Pizza Hut|Starbucks)/i, message: 'must have at least one fast food brand name' },
        { regex: /(?:Big Mac|Whopper|Frosty|Crunchwrap|Subway Club|Zinger|Pepperoni Pizza|Frappuccino|Chicken McNuggets|Double Cheeseburger|Baconator|Doritos Locos Taco|Meatball Marinara|Original Recipe Chicken|Stuffed Crust Pizza|Caramel Macchiato)/i, message: 'must have at least one specific menu item from a fast food brand' },
        { regex: new RegExp(randomMoonPhase.emoji), message: `must include the ${randomMoonPhase.name} emoji (${randomMoonPhase.emoji})` },
        { regex: /(?:red|blue|green|yellow|purple|orange|pink|brown|black|white|gray)/i, message: 'must have at least one color name' },
        { regex: /(?:cat|dog|elephant|lion|tiger|bear|wolf|fox|rabbit|deer|giraffe|zebra|hippopotamus|rhinoceros|kangaroo|koala|panda|leopard|cheetah|jaguar|hyena|buffalo|bison|antelope|gazelle|moose|elk|reindeer|caribou|camel|llama|alpaca|donkey|mule|horse|pony|goat|sheep|ram|ewe|lamb|pig|hog|boar|sow|piglet|cow|bull|ox|calf|chicken|rooster|hen|chick|duck|drake|duckling|goose|gander|gosling|turkey|peacock|peahen|peafowl|swan|cygnet|parrot|macaw|cockatoo|budgerigar|canary|finch|sparrow|robin|bluebird|cardinal|oriole|hummingbird|woodpecker|kingfisher|owl|eagle|hawk|falcon|vulture|condor|penguin|albatross|seagull|pelican|cormorant|heron|stork|flamingo|crane|ibis|spoonbill|ostrich|emu|cassowary|kiwi|dodo|pigeon|dove|bat|whale|dolphin|porpoise|shark|ray|skate|eel|lamprey|hagfish|salmon|trout|bass|perch|pike|carp|catfish|goldfish|guppy|tetra|betta|angelfish|clownfish|seahorse|starfish|jellyfish|octopus|squid|cuttlefish|nautilus|crab|lobster|shrimp|prawn|krill|barnacle|clam|oyster|mussel|scallop|snail|slug|worm|earthworm|leech|centipede|millipede|spider|tarantula|scorpion|tick|mite|ant|bee|wasp|hornet|fly|mosquito|butterfly|moth|beetle|ladybug|grasshopper|cricket|locust|katydid|mantis|cockroach|termite|dragonfly|damselfly|mayfly|stonefly|caddisfly|lacewing|antlion|dobsonfly|snake|lizard|gecko|iguana|chameleon|komodo dragon|crocodile|alligator|caiman|gavial|turtle|tortoise|terrapin|frog|toad|newt|salamander|axolotl|caecilian|fish|shark|ray|skate|eel|lamprey|hagfish|salmon|trout|bass|perch|pike|carp|catfish|goldfish|guppy|tetra|betta|angelfish|clownfish|seahorse|starfish|jellyfish|octopus|squid|cuttlefish|nautilus|crab|lobster|shrimp|prawn|krill|barnacle|clam|oyster|mussel|scallop|snail|slug|worm|earthworm|leech|centipede|millipede|spider|tarantula|scorpion|tick|mite|ant|bee|wasp|hornet|fly|mosquito|butterfly|moth|beetle|ladybug|grasshopper|cricket|locust|katydid|mantis|cockroach|termite|dragonfly|damselfly|mayfly|stonefly|caddisfly|lacewing|antlion|dobsonfly)/i, message: 'must have at least one animal name' },
        { regex: /(?:apple|banana|cherry|date|fig|grape|kiwi|lemon|mango|orange)/i, message: 'must have at least one fruit name' }
    ];

    // Shuffle the requirements array, but keep the Roman numeral requirement towards the end
    passwordRequirements.sort(() => Math.random() - 0.5);
    passwordRequirements.push(romanNumeralRequirement);

    const usernameRequirements = [
        { regex: /^.{10,50}$/, message: 'must be between 10 and 50 characters long' },
        { regex: /[A-Z]/, message: 'must have at least one capital letter' },
        { regex: /[0-9]/, message: 'must have at least one number' },
        { regex: /-/, message: 'must have at least one dash' }
    ];

    let currentRequirementIndex = 0;
    let phase = 'password'; // 'password', 'username', or 'confirm'
    let originalPassword = '';
    let confirmTimeout;

    function romanToInt(s) {
        const roman = {I: 1, V: 5, X: 10};
        let sum = 0;
        for (let i = 0; i < s.length; i++) {
            const current = roman[s[i]];
            const next = roman[s[i + 1]];
            if (current < next) {
                sum -= current;
            } else {
                sum += current;
            }
        }
        return sum;
    }

    function checkPassword() {
        const password = passwordInput.value;
        const currentRequirement = passwordRequirements[currentRequirementIndex];

        if (currentRequirementIndex === passwordRequirements.length - 1) {
            const romanSum = romanToInt(password.match(/[IVX]/g)?.join('') || '');
            const targetSum = parseInt(currentRequirement.message.match(/\d+/)[0]);
            if (romanSum === targetSum) {
                currentRequirementIndex++;
            }
        } else if (currentRequirement.regex.test(password)) {
            currentRequirementIndex++;
        }

        if (currentRequirementIndex < passwordRequirements.length) {
            outputDiv.innerHTML = `<p class="incorrect">Password is incorrect, it ${passwordRequirements[currentRequirementIndex].message}.</p>`;
        } else {
            phase = 'confirm';
            originalPassword = password;
            currentRequirementIndex = 0;
            outputDiv.innerHTML = `<p>Password is strong enough! Please confirm your password:</p>`;
            passwordInput.value = '';
            passwordInput.placeholder = 'Retype your password and press Enter';
            confirmTimeout = setTimeout(() => {
                outputDiv.innerHTML = `<p class="incorrect">Time's up! Please start over.</p>`;
                resetGame();
            }, 120000); // 2 minutes
        }
    }

    function checkUsername() {
        const username = passwordInput.value;
        const currentRequirement = usernameRequirements[currentRequirementIndex];

        if (currentRequirement.regex.test(username)) {
            currentRequirementIndex++;
        }

        if (currentRequirementIndex < usernameRequirements.length) {
            outputDiv.innerHTML = `<p class="incorrect">Username is incorrect, it ${usernameRequirements[currentRequirementIndex].message}.</p>`;
        } else {
            outputDiv.innerHTML = `<p>Username is valid! You've successfully logged in!</p>`;
        }
    }

    function confirmPassword() {
        const confirmPassword = passwordInput.value;
        if (confirmPassword === originalPassword) {
            clearTimeout(confirmTimeout);
            phase = 'username';
            outputDiv.innerHTML = `<p>Password confirmed! Now enter a username:</p>`;
            passwordInput.value = '';
            passwordInput.placeholder = 'Type your username and press Enter';
        } else {
            outputDiv.innerHTML = `<p class="incorrect">Passwords do not match. Please start over.</p>`;
            resetGame();
        }
    }

    function checkInput() {
        if (phase === 'password') {
            checkPassword();
        } else if (phase === 'confirm') {
            confirmPassword();
        } else if (phase === 'username') {
            checkUsername();
        }
    }

    function resetGame() {
        phase = 'password';
        currentRequirementIndex = 0;
        originalPassword = '';
        passwordInput.value = '';
        passwordInput.placeholder = 'Type your password and press Enter';
    }

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkInput();
        }
    });

    submitButton.addEventListener('click', () => {
        checkInput();
    });

    clearButton.addEventListener('click', () => {
        resetGame();
        outputDiv.innerHTML = '';
    });
});