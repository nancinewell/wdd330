const quiz = [
              { name: "Superman",realName: "Clark Kent" },
              { name: "Wonderwoman",realName: "Dianna Prince" },
              { name: "Batman",realName: "Bruce Wayne" },
            ];

// View Object
const view = {
	response: document.querySelector('#response'),
	start: document.getElementById("start"),
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
	},
	show(element){
		element.style.display = 'block';
	},
	hide(element){
		element.style.display = 'none';
	}, 
	setup(){
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);
		this.hide(this.start);
		this.render(this.score,game.score);
		this.render(this.result,'');
		this.render(this.info,'');
		this.resetForm();
	}, 
	resetForm(){
		this.response.answer.value = '';
		this.response.answer.focus();
	},
	teardown(){
		this.hide(this.question);
		this.hide(this.response);
		this.show(this.start);
	}
};

// Game Object
const game = {
  start(quiz){
	this.score = 0;
	this.questions = [...quiz];
	view.setup();
	game.ask(quiz);
	// main game loop
    /*for(const question of this.questions){
      this.question = question;
      this.ask();
    }*/
    
	// end of main game loop
    //this.gameOver();
  },
  /*ask(){
    const question = `What is ${this.question.name}'s real name?`;
    view.render(view.question,question);
    const response =  prompt(question);
    this.check(response);
  }*/
	
ask(){
    if(this.questions.length > 0) {
        this.question = this.questions.pop();
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
    }
    else {
        this.gameOver();
    }
},
  /*check(response){
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
  }*/
	
	check(event){
		event.preventDefault();
		const response = view.response.answer.value;
		const answer = this.question.realName;
		if(response === answer){
			view.render(view.result,'You sure know your heroes!',{'class':'correct'});
			this.score++;
			view.render(view.score,this.score);
		} else {
			view.render(view.result,`Sorry! A bigger fan would have known the answer is ${answer}`,{'class':'wrong'});
		}
		view.resetForm();
		this.ask();
},
  gameOver(){
    view.render(view.info,`G A M E   O V E R !    \nYou scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
	view.teardown();
  }
}

//view.start.addEventListener("click", game.start(quiz));
view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response);



