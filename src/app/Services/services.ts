import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';;
import 'rxjs/add/operator/map'
const URL="http://localhost:3002"
//const URL="http://34.217.90.9:3002"
const token=localStorage.getItem('Token')
//console.log("----",token )
const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': token,
      "Access-Control-Allow-Headers":"origin, content-type, accept",
      "Access-Control-Allow-Origin":"*",
    })
  };
  

@Injectable()
export class Services {

 constructor(private http: HttpClient) { }

    getAgenciesList() {
        return this.http.get<any>(URL+'/agencies',httpOptions)
            .map(resp => {
             
                //console.log(" getAgenciesList",resp)
                return resp;
            });
    }
    updateAgency(id:string, body:object) {
      return this.http.put<any>(URL+'/agency/'+id,body,httpOptions)
          .map(resp => {
           
              //console.log("updateAgency",resp)
              return resp;
          });
    }
    deleteAgency(id:string) {
      return this.http.delete<any>(URL+'/agency/'+id, httpOptions)
          .map(resp => {
           
              //console.log("deleteAgency",resp)
              return resp;
          });
    }
    createAgency(body:object) {
      return this.http.post<any>(URL+'/agency/',body,httpOptions)
          .map(resp => {
           
              //console.log("createAgency",resp)
              return resp;
          });
    }

    ///
    getPlansList() {
        return this.http.get<any>(URL+'/plans')
            .map(resp => {
             
                //console.log(" getPlansList",resp)
                return resp;
            });
    }
    updatePlan(id:string, body:object) {
      return this.http.put<any>(URL+'/plan/'+id,body,httpOptions)
          .map(resp => {
           
              //console.log("updatePlan",resp)
              return resp;

          });
    }
    deletePlan(id:string) {
      return this.http.delete<any>(URL+'/plan/'+id, httpOptions)
          .map(resp => {
           
              //console.log("deletePlan",resp)
              return resp;
          });
    }
    createPlan(body:object) {
      return this.http.post<any>(URL+'/plan/',body,httpOptions)
          .map(resp => {
           
              //console.log("createPlan",resp)
              return resp;
          });
    }

    // Users
    getUsersList(id:string) {
      return this.http.get<any>(URL+'/agency/users/'+id, httpOptions)
          .map(resp => {
           
              //console.log("getUsersList",resp)
              return resp;
          });
    }
    deleteUser(id:string) {
      return this.http.delete<any>(URL+'/agency/user/'+id, httpOptions)
          .map(resp => {
          
              //console.log("deleteUser",resp)
              return resp;
          });
    }
    createUser(body:object) {
      return this.http.post<any>(URL+'/agency/user',body,httpOptions)
          .map(resp => {
          
              //console.log("createUser",resp)
              return resp;
          });
    }
    // Users
    getAdminList() {
      return this.http.get<any>(URL+'/admins')
          .map(resp => {
           
              //console.log("getUsersList",resp)
              return resp;
          });
    }
    deleteAdmin(id:string) {
      return this.http.delete<any>(URL+'/admin/'+id, httpOptions)
          .map(resp => {
          
              //console.log("deleteAdmin",resp)
              return resp;
          });
    }
    createAdmin(body:object) {
      return this.http.post<any>(URL+'/admin',body,httpOptions)
          .map(resp => {
          
              //console.log("createAdmin",resp)
              return resp;
          });
    }
}