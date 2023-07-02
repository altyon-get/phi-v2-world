import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";


function AboutCard() {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" alt="card-img" />
      <Card.Body>
        <Card.Title>props.title</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          props.description
        </Card.Text>
        <Button variant="primary" 
        >
          <BsFillPlayFill /> &nbsp;
          {/* {props.isBlog ? "Blog" : "Play"} */}
        </Button>
        {"\n"}
        {"\n"}
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
