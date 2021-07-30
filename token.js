
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
    };
    axios({
        method: 'post',
        url: url,
        data: body
    })
        .then(access)
        .catch(err => console.log(err.response));
}

function access(response) {
    console.log(response);
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;
    const merchantapi = "https://www.googleapis.com/content/v2/accounts/authinfo";
    axios.get(merchantapi, {
        headers: {"Authorization": `Bearer ${access_token}`}
    })
        .then(res => {
            console.log(res.data);
            document.getElementById("accinfo").innerText = res.data.accountIdentifiers[0].merchantId;
        })
        .catch(err => console.log(err.data));
}

getToken();