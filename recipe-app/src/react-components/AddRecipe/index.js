import React, { Component } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './UploadRecipe.css'
import { BrowserRouter, Route, Link } from "react-router-dom";
import { addRecipe } from '../../actions/recipes'
const printf = console.log


export default class UploadRecipe extends Component {
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            show: true,
            dish_name: null,
            serving_size: null,
            current_ingredient: null,
            current_amount: null,
            current_unit: null,
            ingredient:[],
            cooking_steps:[],
            tips:null,
            current_step: "",
            steps: [],
            image_id: ""

        }
    }
    

    returnIngredient = () =>{
      return this.state.ingredient
    }
    updateName = (name) =>{
      this.setState({dish_name: name});
    }
    updateServingSize = (size) =>{
      this.setState({serving_size: size});
    }
    updateCurrentIngredient = (ingredient)=>{
      this.setState({current_ingredient: ingredient})
      printf(ingredient)
    }
    updateCurrentAmount = (amount)=>{
      this.setState({current_amount: amount})
      printf(amount)
    }
    updateCurrentUnit = (unit) =>{
      this.setState({current_unit: unit})
    }
    
    updateImageId = (img_id) =>{
      this.setState({image_id: img_id})
    }

    addIngredient = ()=>{
      printf(this.state.current_amount);
      if(this.state.current_ingrident === null || this.state.current_amount === null){
        alert("Please type in valid ingredient/amount")
        return;
      }
      else{
        if(this.state.ingredient.length !== 0){
          for(let i = 0; i < this.state.ingredient.length; i++){
            if(this.state.ingredient[i] === this.state.current_ingredient){
              alert("You have already added this ingredient");
              return;
            }
          }
        }
  
        let new_ingredient = this.state.ingredient;
        new_ingredient.push({
          name: this.state.current_ingredient, 
          amount: this.state.current_amount, 
          unit: this.state.current_unit});
  
        this.setState({
          ingredient: new_ingredient
        })
  
      }
      printf(this.state.ingredient)
    }

    // openAddBoardModal() {
    //   this.setState({ boardAddModalShow: true }, function () {
    //     console.log(this.state.boardAddModalShow);
    //   });
    // }
    

    deleteIngredient = (ingredient) => {
      printf("before: ")
      printf(this.state.ingredient)
      printf(ingredient)
      //I have no idea why this filter function is not working
      let new_ingredient = this.state.ingredient.filter(
        item => item !== ingredient
        
      )
      this.setState({ingredient: new_ingredient}
        
        )

      printf("after")
      printf(this.state.ingredient)
    }




    updateTips = (tips)=>{
      this.setState({
        tips: tips
      })
    }

    submitRecipe = (creator_id, creator_email)=>{
      console.log(creator_id)
      let recipe = {
        creator: creator_id,
        creator_name: creator_email,
        dish_name: this.state.dish_name,
        serving_size: this.state.serving_size,
        ingredient: this.state.ingredient,
        cooking_steps: this.state.steps,
        tips: this.state.tips,
        image_id: this.state.image_id

      }
      printf(recipe)
      addRecipe(recipe)
      return recipe
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    updateStep = (event) =>{
        
      this.setState({
          current_step: event.target.value
      })
  

    }

    addStep = () =>{
        let need_add = this.state.current_step
        let new_steps = this.state.steps
        if (new_steps.includes(need_add)){
            //step already added
            alert("You can't add two same steps")
        }
        else if(need_add === ''){
            alert("Please enter a cooking step")
        }
        else{
            new_steps.push(need_add);
            this.setState({
            steps: new_steps
        })
        }
    }

    deleteStep = (step) =>{
        let new_steps = this.state.steps.filter((s) =>{
            return s !== step
        })
        this.setState({
            steps: new_steps
        })
    }



  render() {
    const { curr_id, curr_email } = this.props;
    //console.log(curr_id)

    if(this.state.show === true){
        if(this.state.step === 1){
          return(
            <div className = "step_container">
              <Step1 
              updateName = {this.updateName} 
              updateServingSize = {this.updateServingSize} ></Step1>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step + 1   })}>Next &raquo;</Button>
            </div>
          )
        }
        if(this.state.step === 2){
          


          return(
            <div className = "step_container" >
              <Step2 
              updateCurrentIngredient = {this.updateCurrentIngredient}
              updateCurrentAmount = {this.updateCurrentAmount}
              updateCurrentUnit ={this.updateCurrentUnit}
              addIngredient = {this.addIngredient}
              ingredient_list = {this.state.ingredient}
              deleteIngredient = {this.deleteIngredient}
              ></Step2>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step - 1   })}>&laquo; Previous</Button>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step + 1   })}>Next &raquo;</Button>
            </div>
          )
        }
        if(this.state.step === 3){
          return(
            <div className = "step_container">
              <Step3
              updateStep = {this.updateStep}
              addStep = {this.addStep}
              deleteStep = {this.deleteStep}
              steps = {this.state.steps}
              ></Step3>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step - 1   })}>&laquo; Previous</Button>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step + 1   })}>Next &raquo;</Button>
            </div>
          )
        }
        if(this.state.step === 4){
          return(
            <div className = "step_container">
              <Step4
              updateTips = {this.updateTips}
              ></Step4>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step - 1   })}> &laquo; Previous</Button>
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step + 1   })}>Next &raquo;</Button>

            </div>
          )
        }

        if(this.state.step === 5){
          return(
            <div className = "step_container">
              <Step5 
              updateImageId = {this.updateImageId}
              />
              <Button className='previous_next_button' onClick={() => this.setState({step: this.state.step - 1   })}> &laquo; Previous</Button>
              <Button className='previous_next_button' onClick={() => this.submitRecipe(curr_id, curr_email)}>Submit</Button>

              <Link to={`/Home`}>
                    <Button className='previous_next_button'>
                        Back to Main
                    </Button>
                    
                </Link>
            </div>
          )
        }

    }
  }
}

