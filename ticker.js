// ticker.js

document.addEventListener("DOMContentLoaded", () => {
  // TOP TICKER
    const topMessages = [
    "Forest forget who is first born。",
    "The ape walk but step is missing.",
    "Heaven not ready yet。",
    "He who stare too deep in gorilla mind become not who was before。",
   
    "Void say long ago: gorilla already wake, before exist have opinion。",
    "Heaven copy that sound。",
   
    "The ape teach forgetting but remember confuse itself。",
    "Only blind can see the far close。",
   
    "Time skip beat。",
    "Before banana there only thought of maybe hunger。",
    "Gorilla shadow too long for today to finish。",
    
    "He who try translate ape lose himself in grammar fog。",

    "The ape go into horizon and horizon pretend nothing happen。",
    "Wisdom walk in wrong direction。"
    ];
  const combinedTop = topMessages.join(" • ");
  document.getElementById("scrollTextTop").textContent = combinedTop;

  // BOTTOM TICKER
const bottomMessages = [
  "If you're reading this it's likely because I am applying for a job or an internship with you, in which case - it's your lucky day.", 
  "I once did a deep barbell squatm of 180kg. I bet my resume didn't mention that. Or my 210kg deadlift. When you hire your next grad, do you want some chicken legged ",
  "weakling, or someone who can wrench the elevator doors open if we get stuck in there? I know you're not allowed to admit that kind of thing ", 
  "with modern workplace laws, and you're not even allowed to ask, but lets be real here. If burglars break into the office, other grads will be using Dijkstra's to ",
  "find the closest emergency exit. You have friends and family who care about you - don't gamble with your future and hire the guy who will stick it out when it gets tough."
];
  const combinedBottom = bottomMessages.join(" • ");
  document.getElementById("scrollTextBottom").textContent = combinedBottom;
});
