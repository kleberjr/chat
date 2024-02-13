export const authenticationMiddleware = (req, res, next) => {
  console.log('>>> Request passing through Authentication Middleware...');
  
  if (req.path === '/login') {
    return next();
  }

  return next();
}