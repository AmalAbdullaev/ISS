import './home.scss';

import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Card, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { SalesValueChart } from 'app/shared/charts/Charts';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;

    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-4">
          <Dropdown className="btn-toolbar">
            <Button href="/entity/record" variant="primary" size="sm" className="me-2">
              <FontAwesomeIcon icon={faArrowRight} className="me-2" />
              Перейти в базу договоров
            </Button>
          </Dropdown>

          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Поделиться
            </Button>
            <Button variant="outline-primary" size="sm">
              Экспорт
            </Button>
          </ButtonGroup>
        </div>

        <Row className="justify-content-md-center">
          <Col xs={12} className="mb-4 d-none d-sm-block">
            <Card className="bg-secondary-alt shadow-sm">
              <Card.Header className="d-flex flex-row align-items-center flex-0">
                <div className="d-block">
                  <h5 className="fw-normal mb-2">График новых клиентов</h5>
                  <h3>100 новых договоров</h3>
                  <small className="fw-bold mt-2">
                    <span className="me-2">Вчера</span>
                    <FontAwesomeIcon icon="faAngleUp" className="text-danger me-1" />
                    <span className="text-danger">10.5%</span>
                  </small>
                </div>
                <div className="d-flex ms-auto">
                  <Button variant="secondary" size="sm" className="me-2">
                    Месяц
                  </Button>
                  <Button variant="primary" size="sm" className="me-3">
                    Неделя
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-2">
                <SalesValueChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
