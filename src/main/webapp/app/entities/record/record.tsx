import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { faCheck, faPlus, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
// import { Button, Col, Row, Table } from 'reactstrap';
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  Form,
  Pagination,
  ButtonGroup,
  InputGroup
} from '@themesberg/react-bootstrap';

// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './record.reducer';
import { IRecord } from 'app/shared/model/record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { insuranceTypeMap } from 'app/shared/util/insurance-type-map';

export interface IRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRecordState = IPaginationBaseState;

export class Record extends React.Component<IRecordProps, IRecordState> {
  state: IRecordState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  TableRow = (record: any) => {
    const { match } = this.props;
    return (
      <tr key={record.idDogovora}>
        <td>{record.idDogovora}</td>
        <td>{insuranceTypeMap[record.vidStrahovaniya]}</td>
        <td>{record.filial}</td>
        <td>{record.dataZaklucheniya && moment(record.dataZaklucheniya.toString()).format('MMMM DD YYYY')}</td>
        <td>{record.srokIstecheniya && moment(record.srokIstecheniya.toString()).format('MMMM DD YYYY')}</td>
        <td>{record.strahovoyPlatej}</td>
        <td>{record.idClient}</td>
        <td className="text-right">
          <div className="btn-group flex-btn-group-container">
            <Button href={`${match.url}/${record.id}/edit`} variant="secondary" size="sm">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            <Button href={`${match.url}/${record.id}/delete`} variant="danger" size="sm">
              <FontAwesomeIcon icon="trash" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </span>
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  render() {
    const { recordList, match, totalItems } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h4>Страховые договоры</h4>
            <p className="mb-0">Список договоров</p>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <Button variant="outline-primary" size="sm">
                Поделиться
              </Button>
              <Button variant="outline-primary" size="sm">
                Экспортировать
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="table-settings mb-4">
          <Row className="justify-content-between align-items-center">
            <Col xs={8} md={6} lg={3} xl={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Поиск" />
              </InputGroup>
            </Col>
            <Col xs={4} className="ps-md-0 text-end">
              <Button href={`${match.url}/new`} className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Создать договор
              </Button>
            </Col>
          </Row>
        </div>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">ID договора</th>
                  <th className="border-bottom">Вид страхования</th>
                  <th className="border-bottom">Филиал</th>
                  <th className="border-bottom">Дата заключения</th>
                  <th className="border-bottom">Срок истечения</th>
                  <th className="border-bottom">Платеж</th>
                  <th className="border-bottom">Код клиента</th>
                </tr>
              </thead>
              <tbody>{recordList.map(t => this.TableRow(t))}</tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <JhiPagination
                  items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                />
              </Nav>
              <small className="fw-bold">
                Всего <b>{totalItems}</b> записей
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
        {/* <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('idDogovora')}>
                  <Translate contentKey="issApp.record.idDogovora">Id Dogovora</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('vidStrahovaniya')}>
                  <Translate contentKey="issApp.record.vidStrahovaniya">Vid Strahovaniya</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('strahovayaSumma')}>
                  <Translate contentKey="issApp.record.strahovayaSumma">Strahovaya Summa</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tarifnayaStavka')}>
                  <Translate contentKey="issApp.record.tarifnayaStavka">Tarifnaya Stavka</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('filial')}>
                  <Translate contentKey="issApp.record.filial">Filial</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('strahovoyPlatej')}>
                  <Translate contentKey="issApp.record.strahovoyPlatej">Strahovoy Platej</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('procent')}>
                  <Translate contentKey="issApp.record.procent">Procent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('dataZaklucheniya')}>
                  <Translate contentKey="issApp.record.dataZaklucheniya">Data Zaklucheniya</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('srokIstecheniya')}>
                  <Translate contentKey="issApp.record.srokIstecheniya">Srok Istecheniya</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('strahovoySluchay')}>
                  <Translate contentKey="issApp.record.strahovoySluchay">Strahovoy Sluchay</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('stoimostVgod')}>
                  <Translate contentKey="issApp.record.stoimostVgod">Stoimost Vgod</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('idClient')}>
                  <Translate contentKey="issApp.record.idClient">Id Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fioClient')}>
                  <Translate contentKey="issApp.record.fioClient">Fio Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('passportClient')}>
                  <Translate contentKey="issApp.record.passportClient">Passport Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('telephoneClient')}>
                  <Translate contentKey="issApp.record.telephoneClient">Telephone Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('addressClient')}>
                  <Translate contentKey="issApp.record.addressClient">Address Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('kodAgent')}>
                  <Translate contentKey="issApp.record.kodAgent">Kod Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fioAgent')}>
                  <Translate contentKey="issApp.record.fioAgent">Fio Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('telephoneAgent')}>
                  <Translate contentKey="issApp.record.telephoneAgent">Telephone Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('passportAgent')}>
                  <Translate contentKey="issApp.record.passportAgent">Passport Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('addressAgent')}>
                  <Translate contentKey="issApp.record.addressAgent">Address Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recordList.map((record, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${record.id}`} color="link" size="sm">
                      {record.id}
                    </Button>
                  </td>
                  <td>{record.idDogovora}</td>
                  <td>
                    <Translate contentKey={`issApp.VidStrahovaniya.${record.vidStrahovaniya}`} />
                  </td>
                  <td>{record.strahovayaSumma}</td>
                  <td>{record.tarifnayaStavka}</td>
                  <td>{record.filial}</td>
                  <td>{record.strahovoyPlatej}</td>
                  <td>{record.procent}</td>
                  <td>
                    <TextFormat type="date" value={record.dataZaklucheniya} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={record.srokIstecheniya} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{record.strahovoySluchay}</td>
                  <td>{record.stoimostVgod}</td>
                  <td>{record.idClient}</td>
                  <td>{record.fioClient}</td>
                  <td>{record.passportClient}</td>
                  <td>{record.telephoneClient}</td>
                  <td>{record.addressClient}</td>
                  <td>{record.kodAgent}</td>
                  <td>{record.fioAgent}</td>
                  <td>{record.telephoneAgent}</td>
                  <td>{record.passportAgent}</td>
                  <td>{record.addressAgent}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${record.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${record.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${record.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row> */}
      </div>
    );
  }
}

const mapStateToProps = ({ record }: IRootState) => ({
  recordList: record.entities,
  totalItems: record.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
