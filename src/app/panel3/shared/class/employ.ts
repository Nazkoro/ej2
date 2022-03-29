// export interface IEmployeeDto {
//   idcompany: number;
//   externalid: number | undefined;
//   payeeid: number;
//   title: string | undefined;
//   surname: string | undefined;
//   firstname: string | undefined;
//   middlename: string | undefined;
//   preferredname: string | undefined;
//   gender: string | undefined;
//   birthdate: DateTime;
//   email: string | undefined;
//   mobilephone: string | undefined;
//   homephone: string | undefined;
//   workphone: string | undefined;
//   idaddress: number;
//   idpostaladdress: number | undefined;
//   emergencycont: string | undefined;
//   emergencynumb: string | undefined;
//   iduser: number | undefined;
//   enable: boolean;
//   id: number;
// }

export class EmployeeDto  {
  idcompany!: number;
  externalid!: number | undefined;
  payeeid!: number;
  title!: string | undefined;
  surname!: string | undefined;
  firstname!: string | undefined;
  middlename!: string | undefined;
  preferredname!: string | undefined;
  gender!: string | undefined;
  // birthdate!: DateTime;
  email!: string | undefined;
  mobilephone!: string | undefined;
  homephone!: string | undefined;
  workphone!: string | undefined;
  idaddress!: number;
  idpostaladdress!: number | undefined;
  emergencycont!: string | undefined;
  emergencynumb!: string | undefined;
  iduser!: number | undefined;
  enable!: boolean;
  id!: number;

  constructor() {
    //param: data?: IEmployeeDto
    // if (data) {
    //   for (var property in data) {
    //     if (data.hasOwnProperty(property))
    //       (<any>this)[property] = (<any>data)[property];
    //   }
    // }
  }

  init(_data?: any) {
    if (_data) {
      this.idcompany = _data["idcompany"];
      this.externalid = _data["externalid"];
      this.payeeid = _data["payeeid"];
      this.title = _data["title"];
      this.surname = _data["surname"];
      this.firstname = _data["firstname"];
      this.middlename = _data["middlename"];
      this.preferredname = _data["preferredname"];
      this.gender = _data["gender"];
      // this.birthdate = _data["birthdate"] ? DateTime.fromISO(_data["birthdate"].toString()) : <any>undefined;
      this.email = _data["email"];
      this.mobilephone = _data["mobilephone"];
      this.homephone = _data["homephone"];
      this.workphone = _data["workphone"];
      this.idaddress = _data["idaddress"];
      this.idpostaladdress = _data["idpostaladdress"];
      this.emergencycont = _data["emergencycont"];
      this.emergencynumb = _data["emergencynumb"];
      this.iduser = _data["iduser"];
      this.enable = _data["enable"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): EmployeeDto {
    data = typeof data === 'object' ? data : {};
    let result = new EmployeeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["idcompany"] = this.idcompany;
    data["externalid"] = this.externalid;
    data["payeeid"] = this.payeeid;
    data["title"] = this.title;
    data["surname"] = this.surname;
    data["firstname"] = this.firstname;
    data["middlename"] = this.middlename;
    data["preferredname"] = this.preferredname;
    data["gender"] = this.gender;
    // data["birthdate"] = this.birthdate ? this.birthdate.toString() : <any>undefined;
    data["email"] = this.email;
    data["mobilephone"] = this.mobilephone;
    data["homephone"] = this.homephone;
    data["workphone"] = this.workphone;
    data["idaddress"] = this.idaddress;
    data["idpostaladdress"] = this.idpostaladdress;
    data["emergencycont"] = this.emergencycont;
    data["emergencynumb"] = this.emergencynumb;
    data["iduser"] = this.iduser;
    data["enable"] = this.enable;
    data["id"] = this.id;
    return data;
  }
}
