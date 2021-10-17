let CONFIG = {
  'CLIENT_SECURE_CERT': './cert/autonet.stg.pfx',
  'CLIENT_SECURE_CERT_PASSPHRASE': 'Netrust88798!',
  'CALLBACK_URL': 'http://localhost:3001/callback',
  'MYINFO_API_AUTHORISE': {
    'SANDBOX': 'https://sandbox.api.myinfo.gov.sg/com/v3/authorise',
    'TEST': 'https://test.api.myinfo.gov.sg/com/v3/authorise'
  },
  'MYINFO_API_TOKEN': {
    'SANDBOX': 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
    'TEST': 'https://test.api.myinfo.gov.sg/com/v3/token'
  },
  'MYINFO_API_PERSON': {
    'SANDBOX': 'https://sandbox.api.myinfo.gov.sg/com/v3/person',
    'TEST': 'https://test.api.myinfo.gov.sg/com/v3/person'
  },
  'MYINFO_SIGNATURE_CERT_PUBLIC_CERT': './cert/pub.stg.consent.myinfo.gov.sg.cer',
}

let PERSON_APP_CONFIG = {
  'CLIENT_ID': 'STG-200413421N-SLTG-AUTOCONNECT-LOANAPPLN',
  'CLIENT_SECRET': 'JpQEh1PdIzIlXpTBRhXZfsqu6KVAtIbE',
  'PURPOSE': 'Get Person Personal Data',
  'SCOPES': 'uinfin,name,sex,race,nationality,dob,email,mobileno,regadd',
}

let VEHICLES_APP_CONFIG = {
  'CLIENT_ID': 'STG-200413421N-SLTG-RAIN-ADDVEHICLE',
  'CLIENT_SECRET': 'X3li0cxMqiAWYxxYsRA0swG1jzmL2vcc',
  'PURPOSE': 'Get Person Vehicles Data',
  'SCOPES': 'vehicles.vehicleno,vehicles.type,vehicles.iulabelno,vehicles.make,vehicles.model,vehicles.chassisno,vehicles.engineno',
}

//Set following configuration for MyInfo library to call token and person API
// IMPORTANT: DO NOT rename the JSON Keys
let PERSON_MYINFO_CONNECTOR_CONFIG = {
  'MYINFO_SIGNATURE_CERT_PUBLIC_CERT': CONFIG.MYINFO_SIGNATURE_CERT_PUBLIC_CERT,

  'CLIENT_ID': PERSON_APP_CONFIG.CLIENT_ID, //Client id provided during onboarding
  'CLIENT_SECRET': PERSON_APP_CONFIG.CLIENT_SECRET, //Client secret provided during onboarding
  'CLIENT_SECURE_CERT': CONFIG.CLIENT_SECURE_CERT, //Alias of the application private key in P12 format.
  'CLIENT_SECURE_CERT_PASSPHRASE': CONFIG.CLIENT_SECURE_CERT_PASSPHRASE, //Password of the private key.
  'REDIRECT_URL': CONFIG.CALLBACK_URL, //Redirect URL for web application
  'ATTRIBUTES': PERSON_APP_CONFIG.SCOPES,


  /* 
  Without Encryption and Signing 
  Note: The sandbox environment is used for your testing when developing your prototype
  */
  // 'ENVIRONMENT': 'SANDBOX',
  // 'TOKEN_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
  // 'PERSON_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/person',


  /* 
  With Encryption and Signing 
  Note: The test environment is used for testing your application with the full security measures required in production
  */
  'ENVIRONMENT': 'TEST',
  'TOKEN_URL': CONFIG.MYINFO_API_TOKEN.TEST,
  'PERSON_URL': CONFIG.MYINFO_API_PERSON.TEST,


  //Proxy parameters (OPTIONAL) 
  'USE_PROXY': 'N', //Indicate whether proxy url is used. i.e. Y or N
  'PROXY_TOKEN_URL': '', //Configure your proxy url here, if any.
  'PROXY_PERSON_URL': '', //Configure your proxy url here, if any.

  /*
  Debug level for library logging. i.e 'error, info, debug' leave empty to turn off logs (OPTIONAL)
   * error - Log out all the errors returned from the library
   * info - log urls called, authorization headers and errors from the library
   * debug - Full logs from the library, i.e (errors, urls, authorization headers, API response) 
  
  NOTE: debug mode should never be turned on in production
  */
  'DEBUG_LEVEL': 'info'
}

//Set following configuration for MyInfo library to call token and person API
// IMPORTANT: DO NOT rename the JSON Keys
let VEHICLES_MYINFO_CONNECTOR_CONFIG = {
  'MYINFO_SIGNATURE_CERT_PUBLIC_CERT': CONFIG.MYINFO_SIGNATURE_CERT_PUBLIC_CERT,

  'CLIENT_ID': VEHICLES_APP_CONFIG.CLIENT_ID, //Client id provided during onboarding
  'CLIENT_SECRET': VEHICLES_APP_CONFIG.CLIENT_SECRET, //Client secret provided during onboarding
  'CLIENT_SECURE_CERT': CONFIG.CLIENT_SECURE_CERT, //Alias of the application private key in P12 format.
  'CLIENT_SECURE_CERT_PASSPHRASE': CONFIG.CLIENT_SECURE_CERT_PASSPHRASE, //Password of the private key.
  'REDIRECT_URL': CONFIG.CALLBACK_URL, //Redirect URL for web application
  'ATTRIBUTES': VEHICLES_APP_CONFIG.SCOPES,


  /* 
  Without Encryption and Signing 
  Note: The sandbox environment is used for your testing when developing your prototype
  */
  // 'ENVIRONMENT': 'SANDBOX',
  // 'TOKEN_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
  // 'PERSON_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/person',


  /* 
  With Encryption and Signing 
  Note: The test environment is used for testing your application with the full security measures required in production
  */
  'ENVIRONMENT': 'TEST',
  'TOKEN_URL': 'https://test.api.myinfo.gov.sg/com/v3/token',
  'PERSON_URL': 'https://test.api.myinfo.gov.sg/com/v3/person',


  //Proxy parameters (OPTIONAL) 
  'USE_PROXY': 'N', //Indicate whether proxy url is used. i.e. Y or N
  'PROXY_TOKEN_URL': '', //Configure your proxy url here, if any.
  'PROXY_PERSON_URL': '', //Configure your proxy url here, if any.

  /*
  Debug level for library logging. i.e 'error, info, debug' leave empty to turn off logs (OPTIONAL)
   * error - Log out all the errors returned from the library
   * info - log urls called, authorization headers and errors from the library
   * debug - Full logs from the library, i.e (errors, urls, authorization headers, API response) 
  
  NOTE: debug mode should never be turned on in production
  */
  'DEBUG_LEVEL': 'info'
}

module.exports = {
  CONFIG,
  PERSON_APP_CONFIG, PERSON_MYINFO_CONNECTOR_CONFIG,
  VEHICLES_APP_CONFIG, VEHICLES_MYINFO_CONNECTOR_CONFIG
}
