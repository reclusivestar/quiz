import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Quiz extends Component {
  constructor() {
     super();
      this.state = {
         page : 0,
         option: '',
         answers: [],
         results: ''
      }
   }

   prev(){
      var pg = this.state.page;
      if (pg > 0)
         this.setState({page : pg - 1})
   }

   next() {
      var pg = this.state.page;
      var ans = this.state.answers;
      ans[pg] = this.state.option;
      this.setState({
         page : pg + 1,
         answers : ans
      })
   }

   setOption(e) {
      this.setState({option : e.currentTarget.value});
   }

   handleSubmit() {
      var data = this.state.answers;
      data[this.state.page] = this.state.option;
      console.log(data);
      
      fetch('https://cors-anywhere.herokuapp.com/', {
         crossDomain:true,
         method: 'POST',
         headers: {'Content-Type':'application/json'},
         body: data
       }).then(response => alert("Response status " + response.status + " from " + response.url))
       this.setState({results : "Your answers are : " + data + " The correct answers are b c c"})
   }

   render() {
      const quiz = [
         {
           question: "Which is the best movie?",
           answers: {
             a: "Star Wars",
             b: "Bohemian Rhapsody",
             c: "The Avengers"
           },
           correctAnswer: "b"
         },
         {
           question: "What is the best song?",
           answers: {
             a: "Stairway to Heaven - Led Zeppelin",
             b: "Let it be - Beatles",
             c: "Comfortably Numb - Pink Floyd"
           },
           correctAnswer: "c"
         },
         {
            question: "What does the fox say?",
            answers: {
              a: "Moo Moo",
              b: "Meow Meow",
              c: "Aaaaaiii"
            },
            correctAnswer: "c"
         }
       ];
      return (
         <div>
            <h1>Quiz on Important Facts</h1>
            <div className="quiz-container">
               <p>{this.state.page + 1 + ") "}{quiz[this.state.page].question}</p>
               <div className="form-check">
                  <input className="form-check-input" type="radio" name="options" 
                     id={this.state.page + " a"} value="a" onChange={e => this.setOption(e)}/>
                  <label className="form-check-label" htmlFor={this.state.page + " a"}>
                    {quiz[this.state.page].answers.a}
                  </label>
               </div>
               <div className="form-check">
                  <input className="form-check-input" type="radio" name="options" 
                     id={this.state.page + " b"} value="b" onChange={e => this.setOption(e)}/>
                  <label className="form-check-label" htmlFor={this.state.page + " b"}>
                     {quiz[this.state.page].answers.b}
                  </label>
               </div>
               <div className="form-check">
                  <input className="form-check-input" type="radio" name="options" 
                     id={this.state.page + " c"} value="c" onChange={e => this.setOption(e)}/>
                  <label className="form-check-label" htmlFor={this.state.page + " c"}>
                     {quiz[this.state.page].answers.c}
                  </label>
               </div>
            </div>
            {this.state.page ? <button id="previous" onClick={() => this.prev()}>Previous Question</button> : null} 
            {this.state.page !== quiz.length - 1? <button id="next" onClick={() => this.next()}>Next Question</button> : null}
            <button id="submit" onClick={() => this.handleSubmit()}>Submit Quiz</button>
            <p>{this.state.results}</p>
         </div>
      );
   }
}
export default Quiz;