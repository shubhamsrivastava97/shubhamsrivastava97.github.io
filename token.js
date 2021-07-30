
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
let access_token;
let refresh_token;
let merchantId;
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
        .then(res => {
            console.log(res);
            access_token = res.data.access_token;
            refresh_token = res.data.refresh_token;
        })
        .catch(err => console.log(err.response));
}

function getMerchantId() {
    const merchantapi = "https://www.googleapis.com/content/v2/accounts/authinfo";
    axios.get(merchantapi, {
        headers: {"Authorization": `Bearer ${access_token}`}
    })
        .then(res => {
            console.log(res);
            merchantId = res.data.accountIdentifiers[0].merchantId;
            console.log(merchantId);
            document.getElementById("accinfo").innerText = merchantId;
        })
        .catch(err => console.log(err.response));
}

function getProductList() {
    const productapi = `https://www.googleapis.com/content/v2/${merchantId}/products`;
    axios.get(productapi, {
        headers: {"Authorization": `Bearer ${access_token}`}
    })
        .then(res => {
            console.log(res.data);
            document.getElementById("prodinfo").innerHTML = res.data.resources;
        })
        .catch(err => console.log(err.response));
}

getToken();
getMerchantId();
getProductList();