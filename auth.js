function googleAuth(){
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontent&" +
        "response_type=code&" +
        "access_type=offline&" +
        "redirect_uri=https://shubhamsrivastava97.github.io/product&" +
        "client_id=554423675989-u38fd4g646q444j9kdrcr0r4k35bhdp9.apps.googleusercontent.com";
    window.location = url;
}