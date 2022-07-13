const queryString = require("query-string");

const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    });
    const link = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
    // return res.status(200).json({ message: link });
};

module.exports = googleAuth;
