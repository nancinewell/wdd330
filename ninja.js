const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
];

const game = {
	start(quiz){
		this.questions = [...quiz];
		this.score = 0;
		
		//primary game loop
		for (const question of this.questions){
			this.question = question;
			this.ask();
		}
		//end of primary game loop
		this.gameOver();
	},
	ask(){
		const question = `What is ${this.question.name}'s real name?`;
		const response = prompt(question);
		this.check(response);
	}, 
	check(response){
		const answer = this.question.realName;
		if(response === answer){
			alert('Nice job!');
			this.score++;
		} else {
			alert(`Sorry! A bigger fan would have known it's ${answer}.`);
		}
	}, 
	gameOver(){
		alert(`G A M E   O V E R  \nYou scored ${this.score} point${this.score !==1 ? 's' : ''}`);
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