import React, { Component } from 'react'
import { Form, Button, DropdownButton, Dropdown, Card, ListGroup} from "react-bootstrap";


const printf = console.log
export default class Steps extends Component {
    constructor(props){
        super(props)
        
        this.state = {
          steps: this.props.steps
        }

    }




  render() {

    
    return (
        <div>
          <h1>Step 3</h1>
            <Form >
            <Form.Group  >
            <Form.Label>Add New Step</Form.Label>
            <Form.Control type="text" placeholder="New Step"  onChange={this.props.updateStep}/>
            <Button onClick={this.props.addStep} >Add</Button>
            </Form.Group>


            </Form>
            <ul>
                {
                    this.state.steps.map((step, index) =>{
                        return (
                            <li key = {step}>


                              <Card style={{ width: '46rem' }}>
                                <Card.Header>Step {index + 1}</Card.Header>
                                <ListGroup>
                                  <ListGroup.Item>{step}</ListGroup.Item>
                                  <Button onClick={() => {this.props.deleteStep(step)}} >Delete</Button>
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
