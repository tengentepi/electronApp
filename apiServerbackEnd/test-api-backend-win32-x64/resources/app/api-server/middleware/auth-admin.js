const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const userProfil = decodedToken.userProfil;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    }else if(userProfil !=='administrateur'){
        throw 'Not an Admin';
    }else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

  


  