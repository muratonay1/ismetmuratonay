const token = '65d78580994151d94460ea1f'
const isDeveloperMode = false;
let baseUrl = isDeveloperMode ? 'http://localhost:3000/api/' : "https://api.muratonay.com.tr/api/"
let EndPoints = {
     API_GET_COUNTER     :    'api-get-counter',
     API_VERIFY_CAPTCHA  :    'api-verify-captcha',
     API_SEND_MAIL       :    'api-send-mail',
     API_GET_CV          :    'api-get-cv'
}
const RequestUrl = {
     API_GET_COUNTER     : baseUrl + EndPoints.API_GET_COUNTER,
     API_VERIFY_CAPTCHA  : baseUrl + EndPoints.API_VERIFY_CAPTCHA,
     API_SEND_MAIL       : baseUrl + EndPoints.API_SEND_MAIL,
     API_GET_CV          : baseUrl + EndPoints.API_GET_CV
}

const RequestMethod = {
     GET       :"GET",
     POST      :"POST",
     PUT       :"PUT",
     PATCH     :"PATCH",
     DELETE    :"DELETE"
}

const GeneralKeys = {

}
