import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
  const authHeader = req.headers["authrization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ success: false, message: "Token Required" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error)
      return res
        .status(401)
        .json({ success: false, message: "Invalid or Expired Token" });
    req.user = user;
    next();
  });
};

export { authorization };
