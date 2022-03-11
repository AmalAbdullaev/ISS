import { Moment } from 'moment';

export const enum VidStrahovaniya {
  LIFE = 'LIFE',
  MEDICAL = 'MEDICAL',
  TRANSPORT = 'TRANSPORT',
  FINANCIAL = 'FINANCIAL',
  PROPERTY = 'PROPERTY',
  STAFF = 'STAFF',
  PENSIONS = 'PENSIONS',
  CONSTRUCTION_RISKS = 'CONSTRUCTION_RISKS',
  CARGO = 'CARGO',
  TRANSIT = 'TRANSIT',
  ACCIDENT = 'ACCIDENT',
  BORROWER = 'BORROWER'
}

export interface IRecord {
  id?: number;
  idDogovora?: string;
  vidStrahovaniya?: VidStrahovaniya;
  strahovayaSumma?: number;
  tarifnayaStavka?: number;
  filial?: string;
  strahovoyPlatej?: number;
  procent?: number;
  dataZaklucheniya?: Moment;
  srokIstecheniya?: Moment;
  strahovoySluchay?: string;
  stoimostVgod?: number;
  idClient?: string;
  fioClient?: string;
  passportClient?: string;
  telephoneClient?: string;
  addressClient?: string;
  kodAgent?: string;
  fioAgent?: string;
  telephoneAgent?: string;
  passportAgent?: string;
  addressAgent?: string;
}

export const defaultValue: Readonly<IRecord> = {};
