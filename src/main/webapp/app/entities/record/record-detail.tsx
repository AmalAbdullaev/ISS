import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './record.reducer';
import { IRecord } from 'app/shared/model/record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecordDetail extends React.Component<IRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="issApp.record.detail.title">Record</Translate> [<b>{recordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idDogovora">
                <Translate contentKey="issApp.record.idDogovora">Id Dogovora</Translate>
              </span>
            </dt>
            <dd>{recordEntity.idDogovora}</dd>
            <dt>
              <span id="vidStrahovaniya">
                <Translate contentKey="issApp.record.vidStrahovaniya">Vid Strahovaniya</Translate>
              </span>
            </dt>
            <dd>{recordEntity.vidStrahovaniya}</dd>
            <dt>
              <span id="strahovayaSumma">
                <Translate contentKey="issApp.record.strahovayaSumma">Strahovaya Summa</Translate>
              </span>
            </dt>
            <dd>{recordEntity.strahovayaSumma}</dd>
            <dt>
              <span id="tarifnayaStavka">
                <Translate contentKey="issApp.record.tarifnayaStavka">Tarifnaya Stavka</Translate>
              </span>
            </dt>
            <dd>{recordEntity.tarifnayaStavka}</dd>
            <dt>
              <span id="filial">
                <Translate contentKey="issApp.record.filial">Filial</Translate>
              </span>
            </dt>
            <dd>{recordEntity.filial}</dd>
            <dt>
              <span id="strahovoyPlatej">
                <Translate contentKey="issApp.record.strahovoyPlatej">Strahovoy Platej</Translate>
              </span>
            </dt>
            <dd>{recordEntity.strahovoyPlatej}</dd>
            <dt>
              <span id="procent">
                <Translate contentKey="issApp.record.procent">Procent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.procent}</dd>
            <dt>
              <span id="dataZaklucheniya">
                <Translate contentKey="issApp.record.dataZaklucheniya">Data Zaklucheniya</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recordEntity.dataZaklucheniya} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="srokIstecheniya">
                <Translate contentKey="issApp.record.srokIstecheniya">Srok Istecheniya</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recordEntity.srokIstecheniya} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="strahovoySluchay">
                <Translate contentKey="issApp.record.strahovoySluchay">Strahovoy Sluchay</Translate>
              </span>
            </dt>
            <dd>{recordEntity.strahovoySluchay}</dd>
            <dt>
              <span id="stoimostVgod">
                <Translate contentKey="issApp.record.stoimostVgod">Stoimost Vgod</Translate>
              </span>
            </dt>
            <dd>{recordEntity.stoimostVgod}</dd>
            <dt>
              <span id="idClient">
                <Translate contentKey="issApp.record.idClient">Id Client</Translate>
              </span>
            </dt>
            <dd>{recordEntity.idClient}</dd>
            <dt>
              <span id="fioClient">
                <Translate contentKey="issApp.record.fioClient">Fio Client</Translate>
              </span>
            </dt>
            <dd>{recordEntity.fioClient}</dd>
            <dt>
              <span id="passportClient">
                <Translate contentKey="issApp.record.passportClient">Passport Client</Translate>
              </span>
            </dt>
            <dd>{recordEntity.passportClient}</dd>
            <dt>
              <span id="telephoneClient">
                <Translate contentKey="issApp.record.telephoneClient">Telephone Client</Translate>
              </span>
            </dt>
            <dd>{recordEntity.telephoneClient}</dd>
            <dt>
              <span id="addressClient">
                <Translate contentKey="issApp.record.addressClient">Address Client</Translate>
              </span>
            </dt>
            <dd>{recordEntity.addressClient}</dd>
            <dt>
              <span id="kodAgent">
                <Translate contentKey="issApp.record.kodAgent">Kod Agent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.kodAgent}</dd>
            <dt>
              <span id="fioAgent">
                <Translate contentKey="issApp.record.fioAgent">Fio Agent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.fioAgent}</dd>
            <dt>
              <span id="telephoneAgent">
                <Translate contentKey="issApp.record.telephoneAgent">Telephone Agent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.telephoneAgent}</dd>
            <dt>
              <span id="passportAgent">
                <Translate contentKey="issApp.record.passportAgent">Passport Agent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.passportAgent}</dd>
            <dt>
              <span id="addressAgent">
                <Translate contentKey="issApp.record.addressAgent">Address Agent</Translate>
              </span>
            </dt>
            <dd>{recordEntity.addressAgent}</dd>
          </dl>
          <Button tag={Link} to="/entity/record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/record/${recordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ record }: IRootState) => ({
  recordEntity: record.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordDetail);
