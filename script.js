
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}!@#$%^&*()_+________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 80);
      const end = start + Math.floor(Math.random() * 80);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.05) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}



const phrases = [
'HeY ViSiToR',
'My Name iS',
'ATULYA GARG',
'And sOOner OR laTer',
'You\'RE Going To Realize',
'The Power OF CHESS',
'UnTil ThEn',
'KEEP PLAYING',
'KEEP ON PROGRAMMING',
'KEEP HUSTLING',
'AnD',
'Welcome tO tHe',
'MATRIX',
'LET ME SHED SOME LIGHT UPON THE RULES',
' Whites will start the game and make their first move\. Each player will have 60 seconds to make a move\.',
'And if he doesn\'t make his move in that time\, the opponent will be declared as the winner\.',
'The whole game should be completed within 45 minutes\, maximum\. After this time\, the game will be declared drawn\.',
'The game can be paused at any point of time\, but the game board will not be displayed until the game is resumed\.',
'InitiaTing MaTriX lOOp',
'\1\.\.\.\2\.\.\.\3\.\.\.\4\.\.\.\5\.\.\.\6\.\.\.',
'INItialiZinG\.\.\.',
'LOOP WORLD STARTED',

];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1000);
  });
  counter = (counter + 1) % phrases.length;
};

next();