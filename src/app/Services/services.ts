import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';;
import 'rxjs/add/operator/map'
const URL="http://localhost:3002"
const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'my-auth-token',
      "Access-Control-Allow-Headers":"origin, content-type, accept",
      "Access-Control-Allow-Origin":"*",
    })
  };
  

@Injectable()
export class Services {

 constructor(private http: HttpClient) { }

    getAgenciesList() {
        return this.http.get<any>(URL+'/agencies')
            .map(resp => {
             
                console.log(" getAgenciesList",resp)
                return resp;
            });
    }
    updateAgency(id:string, body:object) {
      return this.http.put<any>(URL+'/agency/'+id,body)
          .map(resp => {
           
              console.log("updateAgency",resp)
              return resp;
          });
    }
    deleteAgency(id:string) {
      return this.http.delete<any>(URL+'/agency/'+id)
          .map(resp => {
           
              console.log("deleteAgency",resp)
              return resp;
          });
    }
    createAgency(body:object) {
      return this.http.post<any>(URL+'/agency/',body)
          .map(resp => {
           
              console.log("createAgency",resp)
              return resp;
          });
    }

    ///
    getPlansList() {
        return this.http.get<any>(URL+'/agencies')
            .map(resp => {
             
                console.log(" getPlansList",resp)
                return resp;
            });
    }
    updatePlan(id:string, body:object) {
      return this.http.put<any>(URL+'/agency/'+id,body)
          .map(resp => {
           
              console.log("updatePlan",resp)
              return resp;
          });
    }
    deletePlan(id:string) {
      return this.http.delete<any>(URL+'/agency/'+id)
          .map(resp => {
           
              console.log("deletePlan",resp)
              return resp;
          });
    }
    createPlan(body:object) {
      return this.http.post<any>(URL+'/agency/',body)
          .map(resp => {
           
              console.log("createPlan",resp)
              return resp;
          });
    }
}