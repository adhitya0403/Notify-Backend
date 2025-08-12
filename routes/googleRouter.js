import express from "express";
import User from "../models/User.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

const googleRouter = express.Router();

googleRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

googleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    const tempToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    res.redirect(`${process.env.FRONTEND_URL}/oauth?temp=${tempToken}`);
  }
);

googleRouter.post("/google/set-cookie", async (req, res) => {
  const { temp } = req.body;
  try {
    const payload = jwt.verify(temp, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) return res.status(401).json({ error: "User not found" });

    // Create real JWT - longer expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // S et cookie with real JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ error: "Invalid or expired token" });
  }
});

googleRouter.get("/getuser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "cannot get user" });
  }
});

googleRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default googleRouter;
