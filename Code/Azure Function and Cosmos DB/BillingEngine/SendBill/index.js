var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
        user: process.env.emailAddress,
        pass: process.env.emailPassword
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

function ApplyContext(context, body, status) {
    context.res = {
        status: status,
        body: body
    };
    context.log(body);
    context.done();
}

module.exports = function (context, req) {
    context.log(req.method);

    var header = req.headers["aeg-event-type"];
    var isEventGridEvent = false;
    if(header){
        isEventGridEvent = true;
    }
    if (header && header === 'SubscriptionValidation') {
        var event = req.body[0]
        var isValidationEvent = event && event.data &&
            event.data.validationCode &&
            event.eventType && event.eventType == 'Microsoft.EventGrid.SubscriptionValidationEvent'
        if (isValidationEvent) {
            var validationResponse = {
                "validationResponse": event.data.validationCode
            };
            ApplyContext(context, validationResponse, 200);
            return;
        }
    }
    
    var requestContent = [];

    if(isEventGridEvent){
        requestContent = req.body[0].data;
    }
    else{
        requestContent = req.body;
    }

    if (req.method != "POST") {
        ApplyContext(context, req.method + ' method is not valid', 400);
        return;
    }
    if (req.body == undefined || req.body == null) {
        ApplyContext(context, "Body can't be null", 400);
        return;
    }

    var emailTemplate = `<p>Dear ` + requestContent.customerName + `,</p><br>
                         Thank you for booking your ticket with Book My Show Application ! <br><br>

                         Please find the details of your booking below :<br><br>
                         
                         <b>Movie Name: </b> `+ requestContent.movieName + ` <br><br> 
                         <b>Number of Tickets Ordered: </b> `+ requestContent.noOfTicketsToBook + ` <br><br> 
                         <b>Total Price: </b> `+ requestContent.noOfTicketsToBook + ` X 250 = Rs ` + (requestContent.noOfTicketsToBook * 250) + ` <br> 
                         <br><br> 
                         <p><b>Best Regards,<br>Kale Dai !</b></p>`




    var mailOptions = {
        from: process.env.emailAddress, // sender address
        to: requestContent.customerEmailAddress, // list of receivers
        subject: requestContent.movieName + ' | Book My Show', // Subject line
        html: emailTemplate // email template
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            ApplyContext(context, err, 400);
        else
            ApplyContext(context, info, 200);
    });
};