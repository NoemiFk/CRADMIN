import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';;
import 'rxjs/add/operator/map'
//const URL="http://localhost:3002"
const URL="http://54.214.162.22:3002"
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
        console.log("HOLAAAAAA", URL+'/agencies')
        return this.http.get<any>(URL+'/agencies')
            .map(resp => {
             
                //console.log(" getAgenciesList",resp)
                return resp;
            });
    }
    getAgency(id:string) {
        return this.http.get<any>(URL+'/agency/'+id)
            .map(resp => {
             
                //console.log("updateAgency",resp)
                return resp;
            });
      }
    updateAgency(id:string, body:object) {
      return this.http.put<any>(URL+'/agency/'+id,body)
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
      return this.http.post<any>(URL+'/agency/',body)
          .map(resp => {
           
              //console.log("createAgency",resp)
              return resp;
          });
    }
    statusAgency(status:boolean, id:string) {
        return this.http.put<any>(URL+'/agency/'+status+'/'+id, httpOptions)
            .map(resp => {
                console.log("statusAgency",resp)
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
      return this.http.put<any>(URL+'/plan/'+id,body)
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
      return this.http.post<any>(URL+'/plan/',body)
          .map(resp => {
           
              //console.log("createPlan",resp)
              return resp;
          });
    }
    statusPlan(status:boolean, id:string) {
        return this.http.put<any>(URL+'/plan/'+status+'/'+id,httpOptions)
            .map(resp => {
                console.log("statusAgency",resp)
                return resp;
            });
      }

    // Users
    getUsersList(id:string) {
      return this.http.get<any>(URL+'/agency/users/'+id)
          .map(resp => {
           
              //console.log("getUsersList",resp)
              return resp;
          });
    }
    deleteUser(id:string) {
      return this.http.delete<any>(URL+'/agency/user/'+id)
          .map(resp => {
          
              //console.log("deleteUser",resp)
              return resp;
          });
    }
    createUser(body:object) {
      return this.http.post<any>(URL+'/agency/user',body)
          .map(resp => {
          
              //console.log("createUser",resp)
              return resp;
          });
    }
    // Users
    getAdminList() {
      return this.http.get<any>(URL+'/admin')
          .map(resp => {
           
              //console.log("getUsersList",resp)
              return resp;
          });
    }
    deleteAdmin(id:string) {
      return this.http.delete<any>(URL+'/admin/'+id)
          .map(resp => {
          
              //console.log("deleteAdmin",resp)
              return resp;
          });
    }
    createAdmin(body:object) {
      return this.http.post<any>(URL+'/admin',body)
          .map(resp => {
          
              //console.log("createAdmin",resp)
              return resp;
          });
    }
    updateAdmin(id:string,body:object) {
        return this.http.put<any>(URL+'/admin/'+id,body)
        .map(resp => {
            
            //console.log("updatePlan",resp)
            return resp;

        });
      }
      statusAdmin(status:boolean, id:string) {
        return this.http.put<any>(URL+'/admin/'+status+'/'+id,httpOptions)
            .map(resp => {
                console.log("statusAgency",resp)
                return resp;
            });
      }
      getInvoice(id:string) {
        return this.http.get<any>(URL+'/history/agency/'+id)
            .map(resp => {
            
                //console.log("updatePlan",resp)
                return resp;

            });
    }

    getCommunicationsList() {
        return this.http.get<any>(URL+'/services')
            .map(resp => {
             
                //console.log("getUsersList",resp)
                return resp;
            });
      }
      deleteCommunication(id:string) {
        return this.http.delete<any>(URL+'/service/'+id)
            .map(resp => {
            
                //console.log("deleteCommunication",resp)
                return resp;
            });
      }
      createCommunication(body:object) {
        return this.http.post<any>(URL+'/service',body)
            .map(resp => {
            
                //console.log("createCommunication",resp)
                return resp;
            });
      }
      updateCommunication(id:string,body:object) {
          return this.http.put<any>(URL+'/service/'+id,body)
          .map(resp => {
              
              //console.log("updatePlan",resp)
              return resp;
  
          });
        }
        statusCommunication(id:string,body:object) {
            return this.http.put<any>(URL+'/service/'+id,body)
            .map(resp => {
                
                //console.log("updatePlan",resp)
                return resp;
    
            });
          }
        
}