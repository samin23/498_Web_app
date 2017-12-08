import React, { Component } from 'react';
import { Button, Input, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'



class NewEntry extends Component {
  constructor(props){
    super(props)
    this.state={
      text: '',
      text1: '',
      text2: '',
      text3: '',
      userId: 'not'
    }
    this.savestate = this.savestate.bind(this);
    this.titleInputChangeHandler = this.titleInputChangeHandler.bind(this);
    this.codeInputChangeHandler = this.codeInputChangeHandler.bind(this);
    this.commentsInputChangeHandler = this.commentsInputChangeHandler.bind(this);
  }

  savestate(){
    console.log(this.state)
    fetch("http://165.227.123.227:4001/api/code", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firebaseID: this.props.location.state.test,
        language: this.state.text3,
        code: this.state.text1,
        comment: this.state.text2,
        title: this.state.text
      })
    });
    console.log("saved");
  }

  // Updates title whenever the title input is changed
  titleInputChangeHandler(event){
    this.setState({ text: event.target.value });
  }

  // Updates code whenever the code input is changed
  codeInputChangeHandler(event){
    this.setState({ text1: event.target.value });
  }

  // Updates comments whenever the comments input is changed
  commentsInputChangeHandler(event){
    this.setState({ text2: event.target.value });
  }




  render(){
    //console.log(this.props.location.state.test);
    //console.log(this.state.userId);
    //console.log('s');
    //console.log(this.props.location );
    //console.log(!this.props.location.state);
    if(!this.props.location.state){
      return(
             <Link to={{pathname:`/`}}>Log In</Link>
           )
    }
    else{
      //this.stateSetter();

      return(
        <div className='NewEntry'>
          <h3>Title:</h3>
          <Input
            className='entryInputClass'
            onChange={this.titleInputChangeHandler}
            value={this.state.text} />
          <h3>Code:</h3>
          <Input
            className='entryInputClass'
            onChange={this.codeInputChangeHandler}
            value={this.state.text1}
            size= 'large' />
          <h3>Comments:</h3>
          <Input
            className='entryInputClass'
            onChange={this.commentsInputChangeHandler}
            value={this.state.text2} />
          <h3>Language:</h3>
            {/* TODO: picker */}
          <Button className="ui button" role="button" onClick={this.savestate}>SAVE</Button>
        </div>
      )
    }
  }
}

NewEntry.propTypes = {
    text: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    text3: PropTypes.string
};


export default NewEntry
