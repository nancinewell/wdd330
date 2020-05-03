const quiz = [
              { name: "Superman",realName: "Clark Kent" },
              { name: "Wonderwoman",realName: "Dianna Prince" },
              { name: "Batman",realName: "Bruce Wayne" },
            ];

// View Object
const view = {
	score: document.querySelector("#score strong"),
	question: document.getElementById("question"),
	result: document.getElementById("result"),
	info: document.getElementById("info"),
  
	render(target,content,attributes) {
		for(const key in attributes) {
			target.setAttribute(key, attributes[key]);
		}
		if (content != null){
      target.innerHTML = content;
		}
  }
};

// Game Object
const game = {
  start(quiz){
    this.score = 0;
    this.questions = [...quiz];
    // main game loop
    for(const question of this.questions){
      this.question = question;
      this.ask();
    }
    // end of main game loop
    this.gameOver();
  },
  ask(){
    const question = `What is ${this.question.name}'s real name?`;
    view.render(view.question,question);
    const response =  prompt(question);
    this.check(response);
  },
  check(response){
    const answer = this.question.realName;
    if(response === answer){
      view.render(view.result,'You know your DC!',{'class':'correct'});
      alert('You know your DC!!');
      this.score++;
      view.render(view.score,this.score);
    } else {
      view.render(view.result,`Sorry! A bigger fan would have known the answer is ${answer}.`,{'class':'wrong'});
      alert(`Sorry! A bigger fan would have known the answer is ${answer}.`);
    }
  },
  gameOver(){
    view.render(view.info,`G A M E   O V E R \nYou scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
  }
}

game.start(quiz);




/*const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

let score = 0;

for( const [question, answer] of quiz){
	const response = prompt (question);
	if(response === answer){
		alert('Correctamundo!');
		score++
	} else {
		alert(`That's a big Nope sandwich covered in Nope sauce! \nIt's really ${answer}.`);
	}
}

alert(`G A M E   O V E R \nYou scored ${score} point${score !== 1 ?'s.' : '.'}`);

/*
function start(quiz){
    let score = 0;
    // main game loop
    for(const [question,answer] of quiz){
        const response = ask(question);
        check(response,answer);
    }
    // end of main game loop
    gameOver();
    // function declarations
    function ask(question){
        return prompt(question);
    }
    function check(response,answer){
        if(response === answer){
        alert('Correct!');
        score++;
        } else {
        alert(`Nope! The correct answer is ${answer}`);
        }
    }
    function gameOver(){
        alert(`Game Over! \nYou scored ${score} point${score !== 1 ? 's' : ''}!`);
    }
}
start(quiz);*/