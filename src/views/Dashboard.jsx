import React from "react";
import { socket } from "../global/header";
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


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      food_data: []
      // this is where we are connecting to with sockets,
    };
  }

  getData = foodItems => {
    console.log(foodItems);
    this.setState({ food_data: foodItems });
  };

  changeData = () => socket.emit("initial_data");

  componentDidMount() {
    var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);
  }

  componentWillUnmount() {
    socket.off("get_data");
    socket.off("change_data");
  }

  markDone = id => {
    // console.log(predicted_details);
    socket.emit("mark_done", id);
  };



  getFoodData() {
    return this.state.food_data.map(food => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td> {food.ordQty} </td>
          <td> {food.prodQty} </td>
          <td> {food.predQty} </td>
          <td>
            <button onClick={() => this.markDone(food._id)}>Done</button>
          </td>
        </tr>
      );
    });
  }



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
                      <tbody>{this.getFoodData()}</tbody>
                    </Table>
                  </Col>
                  <Col md="6">
                    <Table className="table-hover">
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>USA</td>
                          <td className="text-right">2.920</td>
                          <td className="text-right">53.23%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/DE.png")}
                              />
                            </div>
                          </td>
                          <td>Germany</td>
                          <td className="text-right">1.300</td>
                          <td className="text-right">20.43%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/AU.png")}
                              />
                            </div>
                          </td>
                          <td>Australia</td>
                          <td className="text-right">760</td>
                          <td className="text-right">10.35%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/GB.png")}
                              />
                            </div>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right">690</td>
                          <td className="text-right">7.87%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/RO.png")}
                              />
                            </div>
                          </td>
                          <td>Romania</td>
                          <td className="text-right">600</td>
                          <td className="text-right">5.94%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/BR.png")}
                              />
                            </div>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right">550</td>
                          <td className="text-right">4.34%</td>
                        </tr>
                      </tbody>
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
                        <p className="card-category">Capacity</p>
                        <CardTitle tag="p">150GB</CardTitle>
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
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <CardTitle tag="p">$ 1,345</CardTitle>
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
                        <p className="card-category">Errors</p>
                        <CardTitle tag="p">23</CardTitle>
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
                        <p className="card-category">Followers</p>
                        <CardTitle tag="p">+45K</CardTitle>
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
