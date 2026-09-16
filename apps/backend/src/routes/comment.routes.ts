import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Get comments by task - TODO" });
});

router.post("/", (_req, res) => {
  res.json({ message: "Create comment - TODO" });
});

router.put("/:id", (_req, res) => {
  res.json({ message: "Update comment - TODO" });
});

router.delete("/:id", (_req, res) => {
  res.json({ message: "Delete comment - TODO" });
});

export default router;
