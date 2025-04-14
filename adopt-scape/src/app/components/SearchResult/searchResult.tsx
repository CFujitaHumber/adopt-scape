import { Card, Image } from "react-bootstrap";



type props = {
    title: string;
    distanceMsg: string;
    imageHref?: string;
}

export default function SearchResult({title, distanceMsg, imageHref}: props){
    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Img variant="bottom" src={imageHref}/>
            <Card.Body>
                {distanceMsg}
            </Card.Body>
        </Card>
    )
}