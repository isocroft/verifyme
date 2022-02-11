const apiEndpoints = {
  getPhotoFileMatchValidityResult: {
    path: '/v1/verifications/identities/biometrics',
    method: 'POST',
    send_multipart: true,
    params: { idType$: String, idNumber$: String, photo$: Buffer },
    param_defaults: { idType: 'nin' },
    route_params: null
  },
  getPhotoUrlMatchValidityResult: {
    path: '/v1/verifications/identities/biometrics',
    method: 'POST',
    send_json: true,
    params: { idType$: String, idNumber$: String, photoUrl$: String },
    param_defaults: { idType: 'nin' },
    route_params: null
  },
  checkEmploymentHistoryValidity: {
    path: '/v1/verifications/employment',
    method: 'POST',
    send_json: true,
    params: { applicant$: Object, employerName$: String, currentlyEmployed$: Boolean, employerPhone$: String, startDate$: Date, endDate$: Date, jobTitle$: String, contactPersonName$: String, employerEmail$: String },
    param_defaults: null,
    route_params: null
  },
  getEmploymentHistoryValidityResult: {
    path: '/v1/verifications/employment/{:id}',
    method: 'GET',
    params: null,
    param_defaults: null,
    route_params: { id: String }
  },
  checkGuarantorPersonValidity: {
    path: '/v1/verifications/guarantors',
    method: 'POST',
    send_json: true,
    params: { applicant$: Object, firstname$: String, lastname$: String, email$: String, phone$: String, lga$: String, landmark: String, street$: String, state$: String, verifyAddress$: Boolean, acceptableIdType$: Array },
    param_defaults: { acceptableIdType: [ 'NIN' ] },
    route_params: null
  },
  getGuarantorPersonValidityResult: {
    path: '/v1/verifications/guarantor/{:id}',
    method: 'GET',
    params: null,
    param_defaults: null,
    route_params: { id: String }
  }
}

module.exports = apiEndpoints