import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token , access denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //add user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log("Auth middleware error", error);
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

export default authMiddleware;
