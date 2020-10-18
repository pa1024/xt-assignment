import { Card } from 'react-bootstrap'
import React from 'react'

export default function Details(props) {
  const _name = props.data.mission_name + " #" + props.data.flight_number
  const cardStyle = {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
  const _ids = props.data.mission_id && props.data.mission_id.length > 0
    ? props.data.mission_id.toString() : undefined
  return(
    <Card className={props.className}>
    <Card.Img variant="top" src={props.data.links.mission_patch_small} style={{backgroundColor: '#dae0e5'}}/>
    <Card.Body>
      <Card.Title style={cardStyle}>{_name}</Card.Title>
        <Card.Text>
          {_ids && (
            <p><strong>Mission Ids: </strong>{_ids}</p>
          )}
          <p><strong>Launch Year: </strong>{props.data.launch_year}</p>
          {props.data.land_success !== null && (
            <p><strong>Successful Launch: </strong>{props.data.launch_success.toString()}</p>
          )}
          {props.data.land_success && (
            <p><strong>Successful Landing: </strong>{props.data.land_success.toString()}</p>
          )}
        </Card.Text>
    </Card.Body>
    </Card>
  )
}