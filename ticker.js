// ticker.js

document.addEventListener("DOMContentLoaded", () => {
  // TOP TICKER
    const topMessages = [
    "古山梦语言：猩猩不在林里，林反在猩猩心中。 Forest forget who is first born。",
    "The ape walk but step is missing. 意走形留，时空不敢问。",
    "大猩猩行过空，地后来补足。 Heaven not ready yet。",
    "He who stare too deep in gorilla mind become not who was before。",
    "猩猩之息似风似梦，吹走众人名字但留下形。",
    "Void say long ago: gorilla already wake, before exist have opinion。",
    "云还没出来时，猩猩已经笑完。 Heaven copy that sound。",
    "猩猩不怒但怒被感化。 静太大，声太小。",
    "The ape teach forgetting but remember confuse itself。",
    "古人说：看猩猩要闭眼。 Only blind can see the far close。",
    "山由猩猩呼吸倒退而成。 有中无，无中差不多。",
    "猩猩拍胸，世界听不懂鼓点。 Time skip beat。",
    "Before banana there only thought of maybe hunger。",
    "Gorilla shadow too long for today to finish。",
    "猩猩懂风骨也懂雨味。 名字都累了。",
    "He who try translate ape lose himself in grammar fog。",
    "山色换心，猩猩还坐在未定义里。",
    "猩猩坐忘自己，思流回到原来没开始的地方。",
    "The ape go into horizon and horizon pretend nothing happen。",
    "无猩而有猩，有静而吵。 Wisdom walk in wrong direction。"
    ];
  const combinedTop = topMessages.join(" • ");
  document.getElementById("scrollTextTop").textContent = combinedTop;

  // BOTTOM TICKER
const bottomMessages = [
  "山深无路，唯猩猩知归但不走。 The return never start。",
  "Before first sound gorilla cough, world panic。",
  "古碑没字，毛还在火里唱。 Flame remember story。",
  "Gorilla drink water that come from inside him again。",
  "猩猩梦里天地换工作。 Balance feel strange。",
  "He who think gorilla too long forget how line go straight。",
  "大猩猩手看不见但天怕它。",
  "When ape no hungry, everything already eaten。",
  "猩猩听寂，寂害羞。 Sound hide under leaf。",
  "Stone look gorilla too long, start question own hard。",
  "猩猩影子进风里，风学会停一下。",
  "Gorilla move not move, stillness make earthquake。",
  "古人找道，道睡在猩猩梦下面。",
  "Gorilla whisper maybe nothing but world answer yes。",
  "猩猩不拜神，神偷看他静坐。",
  "Where ape sit, time bend weird like wet rope。",
  "猩猩心镜忘倒影，光自己记得。",
  "People who see gorilla suddenly understand before meaning appear。",
  "猩猩走梦外，梦装作正常。",
  "All truth is one fur breathing under moon too quiet。"
];
  const combinedBottom = bottomMessages.join(" • ");
  document.getElementById("scrollTextBottom").textContent = combinedBottom;
});
