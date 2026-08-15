import express from "express";
import { listIncidents } from "./incidents.js";

const app = express();
const PORT = 3000;

app.get("/health", (_req, res) => {
    res.json({ status: "UP" });
});

app.get("/incidents", (_req, res) => {
    res.json(listIncidents());
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});