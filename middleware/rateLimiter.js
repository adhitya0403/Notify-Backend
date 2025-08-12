import ratelimit from "../config/rateLimit.js";

const rateLimiter = async (req, res, next) => {
  try {
    const result = await ratelimit.limit("my-limit-key");
    if(!result.success) {
      return res.status(429).send("Too many requests");
    }   
    next();
  } catch (error) {
    res.status(429).send("Rate limit error");
  }
};

export default rateLimiter;
