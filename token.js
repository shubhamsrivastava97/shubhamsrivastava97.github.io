
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

const getToken = () => {
    const url = "https://oauth2.googleapis.com/token";
    const body = {
        "code": code,
        "redirect_uri": "https://shubhamsrivastava97.github.io/product",
        "client_id": "554423675989-u38fd4g646q444j9kdrcr0r4k35bhdp9.apps.googleusercontent.com",
        "client_secret": "40w0RT9zORmQY1YzIm4p-Gl5",
        "scope": "https://www.googleapis.com/auth/content",
        "grant_type": "authorization_code"
    }
    axios({
        method: 'post',
        url: url,
        data: {
            body
        }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err.response));
}
getToken();