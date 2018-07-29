const paypal = require('paypal-rest-sdk');

const paypalPayment = paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM', //FTWO
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM' //FTWO
    // 'client_id': 'AdUqLc1_pPrgBEu31AM0RMq90T_gYb5VltWuVV5RcNw-QkkWjUsKDnkoJKnTIhl8BFRK82AKLui3GZ9w', //seaflyers
    // 'client_secret': 'EHKixj07wH6gJWnxaWgrPYkHYiExmClcZJu9SmlCUfPlFkp6UEzhYpZ7gg5tg8eD5m8fOTec2DKdXsm_' //seaflyers
  });

module.exports = paypalPayment;