//  create token and save it in  cookies

const sendPartnerToken = (user, statusCode, res) => {
    const token = user.getJwtToken()

    // options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60  * 60* 1000),
        httpOnly: true,
        // sameSite:"none",
        secure:true
    }

    res.status(statusCode).cookie("partner_token", token, options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendPartnerToken