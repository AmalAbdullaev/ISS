import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate } from 'react-jhipster';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './record.reducer';
import { IRecord } from 'app/shared/model/record.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { insuranceTypeMap, InsuranseType } from 'app/shared/util/insurance-type-map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRecordUpdateState {
  isNew: boolean;
}

export class RecordUpdate extends React.Component<IRecordUpdateProps, IRecordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.dataZaklucheniya = convertDateTimeToServer(values.dataZaklucheniya);
    values.srokIstecheniya = convertDateTimeToServer(values.srokIstecheniya);

    if (errors.length === 0) {
      const { recordEntity } = this.props;
      const entity = {
        ...recordEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/record');
  };

  render() {
    const { recordEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Договор</h5>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recordEntity} onSubmit={this.saveEntity}>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup>
                    <Label id="idDogovoraLabel" for="record-idDogovora">
                      ID Договора
                    </Label>
                    <AvField
                      id="record-idDogovora"
                      type="string"
                      name="idDogovora"
                      placeholder="ID Договора"
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') },
                        minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
                        maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                      }}
                    />
                  </AvGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <AvGroup>
                    <Label id="vidStrahovaniyaLabel" for="record-vidStrahovaniya">
                      Вид страхования
                    </Label>
                    <AvInput
                      id="record-vidStrahovaniya"
                      type="select"
                      className="form-control"
                      name="vidStrahovaniya"
                      value={(!isNew && recordEntity.vidStrahovaniya) || 'LIFE'}
                    >
                      {Object.keys(InsuranseType).map(type => (
                        <option key={type} value={type}>
                          {insuranceTypeMap[type]}
                        </option>
                      ))}
                    </AvInput>
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup id="strahovayaSumma">
                    <Label>Страховая сумма</Label>
                    <AvField type="string" name="strahovayaSumma" placeholder="Страховая сумма" />
                  </AvGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <AvGroup id="tarifnayaStavka">
                    <Label>Тарифная ставка</Label>
                    <AvField type="string" name="tarifnayaStavka" placeholder="Тарифная ставка" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup id="filial">
                    <Label>Филиал</Label>
                    <AvField type="string" name="filial" placeholder="Филиал" />
                  </AvGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <AvGroup id="strahovoyPlatej">
                    <Label>Страховой платеж</Label>
                    <AvField type="string" name="strahovoyPlatej" placeholder="Страховой платеж" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup id="procent">
                    <Label>Процент</Label>
                    <AvField type="string" name="procent" placeholder="Процент" />
                  </AvGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <AvGroup id="dataZaklucheniya">
                    <Label>Дата заключения</Label>
                    <AvInput
                      id="record-dataZaklucheniya"
                      type="datetime-local"
                      className="form-control"
                      name="dataZaklucheniya"
                      placeholder={'YYYY-MM-DD HH:mm'}
                      value={isNew ? null : convertDateTimeFromServer(this.props.recordEntity.dataZaklucheniya)}
                    />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup id="srokIstecheniya">
                    <Label>Срок истечения</Label>
                    <AvInput
                      id="record-srokIstecheniya"
                      type="datetime-local"
                      className="form-control"
                      name="srokIstecheniya"
                      placeholder={'YYYY-MM-DD HH:mm'}
                      value={isNew ? null : convertDateTimeFromServer(this.props.recordEntity.srokIstecheniya)}
                    />
                  </AvGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <AvGroup id="strahovoySluchay">
                    <Label>Страховой случай</Label>
                    <AvField type="string" name="strahovoySluchay" placeholder="Страховой случай" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <AvGroup id="stoimostVgod">
                    <Label>Стоимость в год</Label>
                    <AvField type="string" name="stoimostVgod" placeholder="Стоимость в год" />
                  </AvGroup>
                </Col>
              </Row>
              <h5 className="my-4">Клиент</h5>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="idClient">
                    <Label>ID клиента</Label>
                    <AvField
                      name="idClient"
                      type="string"
                      placeholder="ID клиента"
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') },
                        minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
                        maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                      }}
                    />
                  </AvGroup>
                </Col>
                <Col sm={6} className="mb-3">
                  <AvGroup id="fioClient">
                    <Label>ФИО клиента</Label>
                    <AvField id="record-fioClient" type="string" name="fioClient" placeholder="ФИО клиента" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="passportClient">
                    <Label>Паспорт клиента</Label>
                    <AvField type="string" name="passportClient" placeholder="Паспорт клиента" />
                  </AvGroup>
                </Col>
                <Col sm={6} className="mb-3">
                  <AvGroup id="telephoneClient">
                    <Label>Телефон клиента</Label>
                    <AvField type="string" name="telephoneClient" placeholder="Телефон клиента" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="addressClient">
                    <Label>Адрес клиента</Label>
                    <AvField type="string" name="addressClient" placeholder="Адрес клиента" />
                  </AvGroup>
                </Col>
              </Row>
              <h5 className="my-4">Агент</h5>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="kodAgent">
                    <Label>Код агента</Label>
                    <AvField
                      name="kodAgent"
                      type="string"
                      placeholder="Код агента"
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') },
                        minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
                        maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                      }}
                    />
                  </AvGroup>
                </Col>
                <Col sm={6} className="mb-3">
                  <AvGroup id="fioAgent">
                    <Label>ФИО агента</Label>
                    <AvField type="string" name="fioAgent" placeholder="ФИО агента" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="passportAgent">
                    <Label>Паспорт агента</Label>
                    <AvField name="passportAgent" type="string" placeholder="Паспорт агента" />
                  </AvGroup>
                </Col>
                <Col sm={6} className="mb-3">
                  <AvGroup id="telephoneAgent">
                    <Label>Телефон агента</Label>
                    <AvField type="string" name="telephoneAgent" placeholder="Телефон агента" />
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mb-3">
                  <AvGroup id="addressAgent">
                    <Label>Адрес агента</Label>
                    <AvField name="addressAgent" type="string" placeholder="Адрес агента" />
                  </AvGroup>
                </Col>
              </Row>
              <div className="mt-3">
                <Button id="save-entity" variant="primary" type="submit">
                  Сохранить
                </Button>
              </div>
            </AvForm>
          )}
        </Card.Body>
      </Card>
      // <div>
      //   <Row className="justify-content-center">
      //     <Col md="8">
      //       <h2 id="issApp.record.home.createOrEditLabel">
      //         <Translate contentKey="issApp.record.home.createOrEditLabel">Create or edit a Record</Translate>
      //       </h2>
      //     </Col>
      //   </Row>
      //   <Row className="justify-content-center">
      //     <Col md="8">
      //       {loading ? (
      //         <p>Loading...</p>
      //       ) : (
      //         <AvForm model={isNew ? {} : recordEntity} onSubmit={this.saveEntity}>
      //           {!isNew ? (
      //             <AvGroup>
      //               <Label for="record-id">
      //                 <Translate contentKey="global.field.id">ID</Translate>
      //               </Label>
      //               <AvInput id="record-id" type="string" className="form-control" name="id" required readOnly />
      //             </AvGroup>
      //           ) : null}
      //           <AvGroup>
      //             <Label id="idDogovoraLabel" for="record-idDogovora">
      //               <Translate contentKey="issApp.record.idDogovora">Id Dogovora</Translate>
      //             </Label>
      //             <AvField
      //               id="record-idDogovora"
      //               type="string"
      //               name="idDogovora"
      //               validate={{
      //                 required: { value: true, errorMessage: translate('entity.validation.required') },
      //                 minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
      //                 maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
      //               }}
      //             />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="vidStrahovaniyaLabel" for="record-vidStrahovaniya">
      //               <Translate contentKey="issApp.record.vidStrahovaniya">Vid Strahovaniya</Translate>
      //             </Label>
      //             <AvInput
      //               id="record-vidStrahovaniya"
      //               type="select"
      //               className="form-control"
      //               name="vidStrahovaniya"
      //               value={(!isNew && recordEntity.vidStrahovaniya) || 'LIFE'}
      //             >
      //               {Object.keys(InsuranseType).map(type => (
      //                 <option value={type}>{insuranceTypeMap[type]}</option>
      //               ))}
      //             </AvInput>
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="strahovayaSummaLabel" for="record-strahovayaSumma">
      //               <Translate contentKey="issApp.record.strahovayaSumma">Strahovaya Summa</Translate>
      //             </Label>
      //             <AvField id="record-strahovayaSumma" type="string" className="form-control" name="strahovayaSumma" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="tarifnayaStavkaLabel" for="record-tarifnayaStavka">
      //               <Translate contentKey="issApp.record.tarifnayaStavka">Tarifnaya Stavka</Translate>
      //             </Label>
      //             <AvField id="record-tarifnayaStavka" type="string" className="form-control" name="tarifnayaStavka" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="filialLabel" for="record-filial">
      //               <Translate contentKey="issApp.record.filial">Filial</Translate>
      //             </Label>
      //             <AvField id="record-filial" type="string" name="filial" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="strahovoyPlatejLabel" for="record-strahovoyPlatej">
      //               <Translate contentKey="issApp.record.strahovoyPlatej">Strahovoy Platej</Translate>
      //             </Label>
      //             <AvField id="record-strahovoyPlatej" type="string" className="form-control" name="strahovoyPlatej" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="procentLabel" for="record-procent">
      //               <Translate contentKey="issApp.record.procent">Procent</Translate>
      //             </Label>
      //             <AvField id="record-procent" type="string" className="form-control" name="procent" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="dataZaklucheniyaLabel" for="record-dataZaklucheniya">
      //               <Translate contentKey="issApp.record.dataZaklucheniya">Data Zaklucheniya</Translate>
      //             </Label>
      //             <AvInput
      //               id="record-dataZaklucheniya"
      //               type="datetime-local"
      //               className="form-control"
      //               name="dataZaklucheniya"
      //               placeholder={'YYYY-MM-DD HH:mm'}
      //               value={isNew ? null : convertDateTimeFromServer(this.props.recordEntity.dataZaklucheniya)}
      //             />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="srokIstecheniyaLabel" for="record-srokIstecheniya">
      //               <Translate contentKey="issApp.record.srokIstecheniya">Srok Istecheniya</Translate>
      //             </Label>
      //             <AvInput
      //               id="record-srokIstecheniya"
      //               type="datetime-local"
      //               className="form-control"
      //               name="srokIstecheniya"
      //               placeholder={'YYYY-MM-DD HH:mm'}
      //               value={isNew ? null : convertDateTimeFromServer(this.props.recordEntity.srokIstecheniya)}
      //             />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="strahovoySluchayLabel" for="record-strahovoySluchay">
      //               <Translate contentKey="issApp.record.strahovoySluchay">Strahovoy Sluchay</Translate>
      //             </Label>
      //             <AvField id="record-strahovoySluchay" type="string" name="strahovoySluchay" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="stoimostVgodLabel" for="record-stoimostVgod">
      //               <Translate contentKey="issApp.record.stoimostVgod">Stoimost Vgod</Translate>
      //             </Label>
      //             <AvField id="record-stoimostVgod" type="string" className="form-control" name="stoimostVgod" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="idClientLabel" for="record-idClient">
      //               <Translate contentKey="issApp.record.idClient">Id Client</Translate>
      //             </Label>
      //             <AvField
      //               id="record-idClient"
      //               type="string"
      //               name="idClient"
      //               validate={{
      //                 required: { value: true, errorMessage: translate('entity.validation.required') },
      //                 minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
      //                 maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
      //               }}
      //             />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="fioClientLabel" for="record-fioClient">
      //               <Translate contentKey="issApp.record.fioClient">Fio Client</Translate>
      //             </Label>
      //             <AvField id="record-fioClient" type="string" name="fioClient" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="passportClientLabel" for="record-passportClient">
      //               <Translate contentKey="issApp.record.passportClient">Passport Client</Translate>
      //             </Label>
      //             <AvField id="record-passportClient" type="string" name="passportClient" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="telephoneClientLabel" for="record-telephoneClient">
      //               <Translate contentKey="issApp.record.telephoneClient">Telephone Client</Translate>
      //             </Label>
      //             <AvField id="record-telephoneClient" type="string" name="telephoneClient" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="addressClientLabel" for="record-addressClient">
      //               <Translate contentKey="issApp.record.addressClient">Address Client</Translate>
      //             </Label>
      //             <AvField id="record-addressClient" type="string" name="addressClient" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="kodAgentLabel" for="record-kodAgent">
      //               <Translate contentKey="issApp.record.kodAgent">Kod Agent</Translate>
      //             </Label>
      //             <AvField
      //               id="record-kodAgent"
      //               type="string"
      //               name="kodAgent"
      //               validate={{
      //                 required: { value: true, errorMessage: translate('entity.validation.required') },
      //                 minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
      //                 maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
      //               }}
      //             />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="fioAgentLabel" for="record-fioAgent">
      //               <Translate contentKey="issApp.record.fioAgent">Fio Agent</Translate>
      //             </Label>
      //             <AvField id="record-fioAgent" type="string" name="fioAgent" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="telephoneAgentLabel" for="record-telephoneAgent">
      //               <Translate contentKey="issApp.record.telephoneAgent">Telephone Agent</Translate>
      //             </Label>
      //             <AvField id="record-telephoneAgent" type="string" name="telephoneAgent" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="passportAgentLabel" for="record-passportAgent">
      //               <Translate contentKey="issApp.record.passportAgent">Passport Agent</Translate>
      //             </Label>
      //             <AvField id="record-passportAgent" type="string" name="passportAgent" />
      //           </AvGroup>
      //           <AvGroup>
      //             <Label id="addressAgentLabel" for="record-addressAgent">
      //               <Translate contentKey="issApp.record.addressAgent">Address Agent</Translate>
      //             </Label>
      //             <AvField id="record-addressAgent" type="string" name="addressAgent" />
      //           </AvGroup>
      //           <Button tag={Link} id="cancel-save" to="/entity/record" replace color="info">
      //             <FontAwesomeIcon icon="arrow-left" />
      //             &nbsp;
      //             <span className="d-none d-md-inline">
      //               <Translate contentKey="entity.action.back">Back</Translate>
      //             </span>
      //           </Button>
      //           &nbsp;
      //           <Button color="primary" id="save-entity" type="submit" disabled={updating}>
      //             <FontAwesomeIcon icon="save" />
      //             &nbsp;
      //             <Translate contentKey="entity.action.save">Save</Translate>
      //           </Button>
      //         </AvForm>
      //       )}
      //     </Col>
      //   </Row>
      // </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  recordEntity: storeState.record.entity,
  loading: storeState.record.loading,
  updating: storeState.record.updating,
  updateSuccess: storeState.record.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordUpdate);
