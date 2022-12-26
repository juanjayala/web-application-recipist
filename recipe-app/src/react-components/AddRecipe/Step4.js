import React, { Component } from 'react'
import { Form, Button, DropdownButton, Dropdown, Card, ListGroup} from "react-bootstrap";

export default class Step4 extends Component {
  render() {
    return (
      <div>
        <h1>Step 4</h1>
        <Form>
          <Form.Group >
            <Form.Label>Cooking tips</Form.Label>
            <Form.Control as="textarea" rows={3} onChange = {(e) => {this.props.updateTips(e.target.value)}} />
          </Form.Group>
        </Form>
        
      </div>
    )
  }
}
