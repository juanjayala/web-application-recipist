import React, { Component } from 'react'
import { Form, Button, DropdownButton, Dropdown, Card, ListGroup} from "react-bootstrap";



const printf = console.log
export default class Step1 extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>Step 1</h1>
          <Form>
            <Form.Group className="amb-3">
              <Form.Label>Dish Name</Form.Label>
              <Form.Control type="text" placeholder="Dish Name" onChange={(e) =>{this.props.updateName(e.target.value)}}  />
            </Form.Group>


            <Form.Group className="amb-3">
              <Form.Label>Serving size</Form.Label>
              <Form.Control type="text" placeholder="Serving size" onChange={(e) => {this.props.updateServingSize(e.target.value)}}/>
            </Form.Group>
            
          </Form>
          

      </div>
    )
  }
}

