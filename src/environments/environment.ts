// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
     
//potrebno je uvijek staviti sat manje nego sto je kod nas (u nasoj casovnoj zoni) u hours polja, a minute napisati normalno
//pa tako npr. ukoliko zelimo da kviz pocinje u 13h po nasem vremenu, unijecemo 12 u polje hoursBegin
    
export const environment = {
  production: false,
  ROLES:["USER","ADMIN","BLOCKEDUSER"]
  
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
