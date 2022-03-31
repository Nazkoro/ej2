import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {User} from './user';

@Injectable()
export class UserService{

  private url = "http://localhost:4000/api/admin";
  constructor(private http: HttpClient){ }

  getUsers(){
    return this.http.get<any>(`${this.url}/all`);
  }

  createUser(user: any){
    return this.http.post<any>(`${this.url}/create`, user);
  }

  updateUser(user: any) {
    return this.http.put<any>(`${this.url}/update`, user);
  }

  deleteUser(id: any){
    console.log("service delete id", id);
    return this.http.delete<any>(this.url + '/' + id);
  }
}
