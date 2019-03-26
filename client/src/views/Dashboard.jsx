import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";



const AE = props => (
    <tr>
        <td>{props.slaes.project_description}</td>
    </tr>
)


const Participant = props => (
    <tr>
        <td>{props.slaes}</td>
    </tr>
)



class Dashboard extends React.Component {

      constructor(props) {
          super(props);
          this.state = {slaes: []};
      }

      componentDidMount() {
          axios.get('http://ec2-18-191-125-190.us-east-2.compute.amazonaws.com:4000/slaes/')
              .then(response => {
                  this.setState({ slaes: response.data });
              })
              .catch(function (error){
                  console.log(error);
              })
      }

      slaesList() {
          return this.state.slaes.map(function(currentSlaes, i){
            return <AE slaes={currentSlaes} key={i} />;
          })
      }


      participantList() {
           return this.state.slaes.map(function(currentPartcipant, i){
            return currentPartcipant.participant.map(function(current, i){
              return <Participant slaes={current.uniqueID} key={i} />
            })
      })}


  render() {
    return (
      <>
        <div className="content">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Current Projects and Recent Participants</CardTitle>
              </CardHeader>
              <CardBody className="table-responsive">
                <Row>
                  <Col md="6">
                    <Table className="table-hover">
                      <tbody>{this.slaesList()}</tbody>
                    </Table>
                  </Col>
                  <Col md="6">
                    <Table className="table-hover">
                      <tbody>{this.participantList()}</tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Projects</p>
                        <CardTitle tag="p">3</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Adverse Events</p>
                        <CardTitle tag="p">0</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Participants</p>
                        <CardTitle tag="p">2</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
        </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
