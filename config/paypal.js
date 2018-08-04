const paypal = require('paypal-rest-sdk');

const paypalPayment = paypal.configure({
    'mode': 'sandbox', //sandbox or live
    // 'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM', //FTWO
    // 'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM' //FTWO
    // 'client_id': 'AdUqLc1_pPrgBEu31AM0RMq90T_gYb5VltWuVV5RcNw-QkkWjUsKDnkoJKnTIhl8BFRK82AKLui3GZ9w', //seaflyers
    // 'client_secret': 'EHKixj07wH6gJWnxaWgrPYkHYiExmClcZJu9SmlCUfPlFkp6UEzhYpZ7gg5tg8eD5m8fOTec2DKdXsm_' //seaflyers

     //Pornchai Transport and Tours
    'client_id': 'AS7Mw57OYtE6DXs1cW-3wfmG1fISjFt7tx_l_HTxUgl_2UPRjNwFoyxQvK2H_LnARWBmHwFlFf5O9_n6', //seaflyers
    'client_secret': 'EF-cGaliGY6pQxHK_GO4kxUAQkvbIOcRdAgKySHgtA6FiUzAAGK7isJFWzKy9gkwbMdL5sBwLFJZEg-D' //seaflyers
  });

module.exports = paypalPayment;