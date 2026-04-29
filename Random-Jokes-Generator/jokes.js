/**
 * Comprehensive Joke Generator Application
 * Features: Random joke display, No repeat jokes, Clipboard copy, Analytics
 * Version: 2.0
 */

// ==================== DATA ====================
const jokes = [
  "What did one snowman say to the other snowman? It smells like carrots over here!",
  "Why did Beethoven get rid of his chickens? All they ever said was, 'Bach, Bach, Bach!'",
  "What did 20 do when it was hungry? Twenty-eight.",
  "Why is grass so dangerous? Because it's full of blades!",
  "Why are mountains so funny? They’re hill areas.",
  "Why wasn’t the cactus invited to hang out with the mushrooms? He wasn’t a fungi.",
  "Why shouldn’t you fundraise for marathons? They just take the money and run.",
  "Why did the crab cross the road? It didn’t—it used the sidewalk.",
  "Why does it take pirates a long time to learn the alphabet? Because they can spend years at C!",
  "Why can't a nose be 12 inches long? Because then it would be a foot.",
  "Why can’t you put two half-dollars in your pocket? Because two halves make a hole, and your money will fall out!",
  "Why does a moon rock taste better than an Earth rock? It’s a little meteor.",
  "How much do rainbows weigh? Not much. They’re actually pretty light.",
  "What is the most popular fish in the ocean? The starfish.",
  "A slice of apple pie costs $2.50 in Jamaica, $3.75 in Bermuda, and $3 in the Bahamas. Those are the pie-rates of the Caribbean.",
  "Why did the football coach yell at the vending machine? He wanted his quarter back!",
  "I had a joke about paper today, but it was tearable.",
  "What kind of job can you get at a bicycle factory? A spokesperson.",
  "What does a condiment wizard perform? Saucery.",
  "What's the difference in an alligator and a crocodile? You’ll see one later and one in a while.",
  "What’s the difference between the bird flu and the swine flu? One requires tweetment and the other an oinkment.",
  "What’s the difference between ducks and dine-and-dashers? Ducks take care of their bills.",
  "What's the difference between spring rolls and summer rolls? Their seasoning.",
  "What’s the difference between Iron Man and Aluminum Man? Iron Man stops the bad guy. Aluminum Man foils their plans.",
  "What’s the difference between a poorly dressed man on a unicycle and a well-dressed man on a bicycle? Attire.",
  "What’s the difference between a $20 steak and a $55 steak? February 14th.",
  "What's the best thing about Switzerland? The flag is a big plus.",
  "I went to the aquarium this weekend, but I didn’t stay long. There’s something fishy about that place.",
  "I found a lion in my closet the other day! When I asked what it was doing there, it said, 'Narnia business.'",
  "What's a cat's favorite instrument? Purr-cussion.",
  "Why did the snail paint a giant S on his car? So when he drove by, people could say: 'Look at that S car go!'",
  "What do you call a happy cowboy? A jolly rancher.",
  "What subject do cats like best in school? Hiss-tory.",
  "Humpty Dumpty had a great fall. He said his summer was pretty good too.",
  "My boss said 'dress for the job you want, not for the job you have.' So I went in as Batman.",
  "How do you make holy water? You boil the hell out of it.",
  "Justice is a dish best served cold. Otherwise, it's just water.",
  "Why should you never throw grandpa's false teeth at a vehicle? You might denture car.",
  "Why are Christmas trees bad at knitting? They always drop their needles.",
  "What did the lunch box say to the refrigerator? Don't hate me because I'm a little cooler.",
  "I can always tell when someone is lying. I can tell when they're standing too.",
  "Some people pick their nose, but I was born with mine.",
  "What's the coolest element in the periodic table? Ber-yllium.",
  "I used to be afraid of speed bumps. I'm trying to get over it.",
  "If your house is cold, just stand in the corner. It’s always 90 degrees there.",
  "I don't recommend entering a wormhole. You might get stuck in the apple.",
  "The owner of the tuxedo store kept hovering over me when I was browsing, so I asked him to leave me alone. He said, 'Fine, suit yourself.'",
  "Why did the egg have a day off? Because it was Fryday.",
  "Have you ever heard about the kidnapping at school? It's okay, he woke up.",
  "I found a book called How to Solve 50% of Your Problems. So I bought 2.",
  "What do Keanu Reeves and baby Yoda have in common? They age at the same rate.",
  "Why did the coffee taste like dirt? Because it was ground just a few minutes ago.",
  "Why can't you make a dinosaur omelet? Because they're egg-stinct.",
  "Why do quarterbacks tell obvious jokes? So they don't go over their receivers' heads.",
  "Why did the Rolling Stones stop making music? Because they got to the bottom of the hill.",
  "How many goats does it take to change a lightbulb? Just one, but you have to goat them into it.",
  "What did one cupcake say to the other? You ain't see muffin yet.",
  "What is the best present? Broken drums! You can't beat them.",
  "Did you hear about the new squirrel diet? It's just nuts.",
  "I made a song about tortilla once, now it's more like a wrap.",
  "Did you hear about the spatula's hot new flame? It met the grill of its dreams.",
  "Did you know corduroy pillows are in style? They're making headlines.",
  "What does a nosey pepper do? It gets jalapeño business.",
  "Did you hear about the fragile myth? It was busted.",
  "Did you hear about the pirate who became a great chef? He mastered the seven sea-sonings.",
  "What word can you make shorter by adding two letters? Short.",
  "When does a hippo have a tusk? After some rhino-plasty.",
  "What do you call a criminal landing an airplane? Condescending.",
  "I decided to sell my vacuum cleaner. It was just gathering dust.",
  "I stayed up all night wondering where the sun went, and then it dawned on me.",
  "Why do people who live in Greece hate waking up at dawn? Because Dawn is tough on Greece.",
  "What falls, but never needs a bandage? The rain.",
  "I was going to tell you a joke about boxing, but I forgot the punch line.",
  "I'm not a fan of spring cleaning. Let's be honest, I'm not into summer, fall, or winter cleaning either.",
  "Why did the egg hide? It was a little chicken.",
  "What did the dirt say to the rain? If you keep this up, my name will be mud!",
  "Why couldn't the sunflower ride its bike? It lost its petals.",
  "What's an egg's favorite vacation spot? New Yolk City.",
  "I ate a sock yesterday. It was very time-consuming.",
  "What kind of candy do astronauts like? Mars bars.",
  "I wanted to buy some camo pants but couldn't find any.",
  "I ordered a chicken and an egg from Amazon. I'll let you know.",
  "What month is the shortest of the year? May, it only has three letters.",
  "What did the snail who was riding on the turtle's back say? Wheeeee!",
  "I was going to tell a time-traveling joke, but you guys didn't like it.",
  "What do you call a lazy kangaroo? A pouch potato.",
  "I used to run a dating service for chickens, but I was struggling to make hens meet.",
  "Why do we tell actors to 'break a leg?' Because every play has a cast.",
  "What does a pig put on dry skin? Oinkment.",
  "What do you call it when a snowman throws a tantrum? A meltdown.",
  "My uncle named his dogs Timex and Rolex. They're his watch dogs.",
  "Did you hear about the guy whose left side was cut off? He's all right now.",
  "How do you open a banana? With a mon-key.",
  "Which is faster, hot or cold? Hot, because you can catch cold.",
  "What did one plate say to the other plate? Dinner's on me.",
  "Why do oranges wear sunscreen? So they don't peel.",
  "My wife told me to stop acting like a flamingo, so I had to put my foot down.",
  "What do you call a pig that does karate? A pork chop.",
  "Where does Batman go to the bathroom? The batroom.",
  "What do you call a pony with a sore throat? A little horse.",
  "What did the left eye say to the right eye? Between you and me, something smells.",
  "What did the mama tomato say to the baby tomato? Catch up!",
  "Why didn't the melons get married? Because they cantaloupe.",
  "What do you call a fake noodle? An impasta.",
  "How did the pig get to the hogspital? In a hambulance.",
];
// ==================== STATE MANAGEMENT ====================
let usedJokes = new Set();
let jokeCount = 0;
let currentJoke = "";

// ==================== UTILITIES ====================

/**
 * Safe DOM element getter with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} DOM element or null
 */
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found`);
  }
  return element;
}

/**
 * Copy text to clipboard with visual feedback
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    console.error("Clipboard API not supported");
    alert("Copy to clipboard not supported in your browser");
    return;
  }

  navigator.clipboard.writeText(text).then(
    () => {
      showNotification("Joke copied to clipboard! 📋");
    },
    () => {
      console.error("Failed to copy to clipboard");
      alert("Failed to copy to clipboard");
    }
  );
}

/**
 * Show temporary notification message
 * @param {string} message - Notification text
 * @param {number} duration - Display duration in ms
 */
function showNotification(message, duration = 2000) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// ==================== JOKE LOGIC ====================

/**
 * Get a random joke ensuring no repeats until all jokes are shown
 * @returns {string} Random joke from the collection
 */
function getRandomJoke() {
  // Reset set if all jokes have been cycled through
  if (usedJokes.size >= jokes.length) {
    usedJokes.clear();
  }

  // Filter out already used jokes
  const availableJokes = jokes.filter((joke) => !usedJokes.has(joke));
  
  if (availableJokes.length === 0) {
    return "No jokes available!";
  }

  // Select random joke from available ones
  const randomJoke =
    availableJokes[Math.floor(Math.random() * availableJokes.length)];
  
  usedJokes.add(randomJoke);
  jokeCount++;
  currentJoke = randomJoke;
  
  return randomJoke;
}

/**
 * Get current joke statistics
 * @returns {object} Joke count and progress information
 */
function getJokeStats() {
  return {
    jokeCount,
    totalJokes: jokes.length,
    cyclesCompleted: Math.floor(jokeCount / jokes.length),
    progress: ((usedJokes.size / jokes.length) * 100).toFixed(1)
  };
}

// ==================== MODAL MANAGEMENT ====================

/**
 * Display joke in modal
 */
function showJokeModal() {
  const modal = getElement("jokeModal");
  const backdrop = getElement("jokeBackdrop");
  const jokeText = getElement("jokeText");

  if (!modal || !backdrop || !jokeText) {
    console.error("Required modal elements not found");
    return;
  }

  jokeText.textContent = getRandomJoke();
  modal.style.display = "block";
  backdrop.style.display = "block";
}

/**
 * Close joke modal
 */
function closeJokeModal() {
  const modal = getElement("jokeModal");
  const backdrop = getElement("jokeBackdrop");

  if (!modal || !backdrop) return;

  modal.style.display = "none";
  backdrop.style.display = "none";
}

/**
 * Display next joke without closing modal
 */
function showAnotherJoke() {
  const jokeText = getElement("jokeText");
  
  if (!jokeText) {
    console.error("Joke text element not found");
    return;
  }

  jokeText.textContent = getRandomJoke();
}

/**
 * Copy current joke to clipboard
 */
function copyCurrentJoke() {
  if (!currentJoke) {
    alert("No joke to copy!");
    return;
  }
  copyToClipboard(currentJoke);
}

// ==================== EVENT INITIALIZATION ====================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Get joke button listeners
  const jokeButtons = document.querySelectorAll(".joke-button");
  if (jokeButtons.length === 0) {
    console.warn("No joke buttons found");
  }

  jokeButtons.forEach((button) => {
    button.addEventListener("click", showJokeModal);
  });

  // Close modal when clicking backdrop
  const backdrop = getElement("jokeBackdrop");
  if (backdrop) {
    backdrop.addEventListener("click", closeJokeModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeJokeModal();
    }
  });

  console.log("✅ Event listeners initialized");
}

/**
 * Main initialization on DOM ready
 */
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  console.log(`📚 Joke Generator loaded with ${jokes.length} jokes`);
});