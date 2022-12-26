import React, { Component } from 'react'
import { Form, Button, DropdownButton, Dropdown, Card, ListGroup} from "react-bootstrap";


const printf = console.log
export default class Step1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredient: this.props.ingredient_list
    }
  }



  render() {
  

    return (
      <div>
        <h1>Step 2</h1>
        <Form >
          <Form.Group  >
          <Form.Label>New Ingredient</Form.Label>
          <Form.Control type="text" placeholder="Ingredient"  onChange = {(e) => {this.props.updateCurrentIngredient(e.target.value)}}/>
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" placeholder="Amount" onChange={(e) => {this.props.updateCurrentAmount(e.target.value)}  }/>
          <Form.Control type="text" placeholder="Unit"  onChange={(e) => {this.props.updateCurrentUnit(e.target.value)}  }/>
          <Button onClick={this.props.addIngredient} >Add</Button>
          </Form.Group>
        </Form>
        


        <ul>
            {
              this.state.ingredient.map((ingredient, index) => {
                return (
                  <li key = {Math.random()}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Header># {index + 1}</Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item>{ingredient.name}</ListGroup.Item>
                        <ListGroup.Item>{ingredient.amount} {ingredient.unit}</ListGroup.Item>
                        <Button onClick={() => {this.props.deleteIngredient(ingredient)}}>x</Button>
                      </ListGroup>
                    </Card>
                  </li>
                )

              })
            }
        </ul>







      </div>
    )
  }
}
