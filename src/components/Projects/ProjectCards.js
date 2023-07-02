import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary"
          as={Link}
          to={`/${props.ghLink}`}
        >
          {props.isLocked ?
            <>
              <BiLock style={{ marginBottom: "2px" }} size={20} />&nbsp;Locked
            </>
            :
            <>
              <BsFillPlayFill />&nbsp;Start
            </>}
        </Button>
        {"\n"}
        {"\n"}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
