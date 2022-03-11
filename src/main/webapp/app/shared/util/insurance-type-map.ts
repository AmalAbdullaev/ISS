export enum InsuranseType {
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

export const insuranceTypeMap = {
  [InsuranseType.LIFE]: 'Страхование жизни',
  [InsuranseType.MEDICAL]: 'Медицинское страхование',
  [InsuranseType.TRANSPORT]: 'Авто страхование',
  [InsuranseType.FINANCIAL]: 'Финансовое страхование',
  [InsuranseType.PROPERTY]: 'Страхование имущества',
  [InsuranseType.STAFF]: 'Страхование сотрудников',
  [InsuranseType.PENSIONS]: 'Пенсионные страхования',
  [InsuranseType.CONSTRUCTION_RISKS]: 'Строительно-монтажные риски',
  [InsuranseType.CARGO]: 'Страхование грузов',
  [InsuranseType.TRANSIT]: 'Страхование перевозчика',
  [InsuranseType.ACCIDENT]: 'Страхование от несчастных случаев',
  [InsuranseType.BORROWER]: 'Страхование заемщиков'
};
