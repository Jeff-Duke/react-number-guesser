import React, { Component } from 'react';
import sourceMap from 'source-map';

export default class App extends Component {
    constructor () {
        super();
        this.state = {
            guess: '',
            guessDisplay: '',
            guessFeedback: '',
            randomNumber: '',
            randomMin: 0,
            randomMax: 100,
            submitButtonDisabled: true,
            resetState: false,
            setRangeDisabled: false,
        };
    }

    componentDidMount() {
        this.randomNumber();
    }
     
    randomNumber() {
        let randomMin = this.state.randomMin;
        let randomMax = this.state.randomMax;
        this.setState ({randomNumber: Math.round((Math.random() * ( randomMax - randomMin ) + randomMin ))});
    }

    updateProperties(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    resetGame() {
        this.setState ({
            guess: '',
            guessDisplay: '',
            guessFeedback: '',
            randomNumber: '',
            randomMin: 0,
            randomMax: 100,
            setRangeDisabled: false,
        });
        this.randomNumber();
    }

    gameWon() {
        this.setState ({
            guess: '',
            guessDisplay: '',
            randomNumber: this.randomNumber,
            randomMin: this.state.randomMin -= 10,
            randomMax: this.state.randomMax += 10,
            
        });
        this.randomNumber();
    }

    submitGuess() {

        let guess = parseInt(this.state.guess);
        let randomNumber = parseInt(this.state.randomNumber);
        this.setState ({ guess: '',
                         guessDisplay: guess,
                         resetState: true,
                         setRangeDisabled: true,
                     });
        
        if(isNaN(guess)) { this.setState({ 
                         guessFeedback: 'You need to enter a number for your guess!', 
                         guess: '' }); }
        
        if(guess > this.state.randomMax || guess < this.state.randomMin) { 
            return this.setState({
                guessFeedback: ('Please enter a valid guess'),
                guess: '',
            });}
        
        if (guess === randomNumber) { 
            this.setState ({ guessFeedback: 'You guessed it!'});
            this.gameWon();
        }
        
        else { return guess > randomNumber ? this.setState ({ guessFeedback: 'Your Guess is too High!'}) : this.setState ({ guessFeedback: 'Your Guess is too Low!'});  }  
    }

    render() {
        return (
            <div>
                <h2> {this.state.guessFeedback}</h2>
                <p> Your last guess was {this.state.guessDisplay} </p>
                <p> The random number is: {this.state.randomNumber} </p>
                <article className = "UserGuess">
                    <input
                        type = "number"
                        name = "guess"
                        value = {this.state.guess}
                        placeholder = "enter your guess here"
                        onChange = {(e) => this.updateProperties(e)} 
                    />
                <button className="SubmitButton"
                    disabled = {!this.state.guess}
                    onClick = { () => this.submitGuess() }> Submit
                </button>
                <button className="ClearInputButton"
                    disabled = {!this.state.guess}
                    onClick = { () => this.setState({ guess: '' }) }> Clear
                </button>
                <button className = "Reset Button"
                    disabled = {!this.state.resetState}
                    onClick = { () => this.resetGame() }> Reset
                </button>
                </article>

                <section className = "Min and Max">
                    <article className = "MinNumber">
                        <p> Enter the Random Number Range Minimum </p>
                        <input
                            type = "number"
                            name = "randomMin"
                            value = { this.state.randomMin }
                            placeholder = "enter the random number minimum"
                            onChange = { (e) => this.updateProperties(e) }
                        /> 
                    </article>

                    <article className = "MaxNumber">
                        <p> Enter the Random Number Range Maximum </p>
                        <input
                            type = "number"
                            name = "randomMax"
                            value = { this.state.randomMax }
                            placeholder = "enter the random number maximum"
                            onChange = { (e) => this.updateProperties(e) }
                        />
                    </article>
                    
                    <button className = "SetNewRangeButton"
                        disabled = {this.state.setRangeDisabled}
                        onClick = { () => this.randomNumber() }> Set New Range
                    </button>

                </section>

            </div>
        )
    }
}