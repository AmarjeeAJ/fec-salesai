const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { leads, activities } = require("../data/store");
const { scoreLead, generateSuggestion } = require("../services/ai");

const router = express.Router();

// Create Lead
router.post("/", (req, res) => {
  try {
    const id = uuidv4();
    const lead = { id, ...req.body, status: "new", createdAt: new Date().toISOString() };
    lead.score = scoreLead(lead);
    leads.push(lead);

    activities.push({
      id: uuidv4(),
      leadId: id,
      type: "lead_created",
      data: lead,
      ts: new Date().toISOString()
    });

    res.json({ ok: true, lead });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ ok: false, error: "Failed to create lead" });
  }
});

// Get Leads
router.get("/", (req, res) => res.json({ ok: true, leads }));

// Get Lead by ID
router.get("/:id", (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ ok: false, error: "not found" });
  res.json({ ok: true, lead });
});

// Generate AI Suggestion
router.post("/suggest/:id", (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ ok: false, error: "not found" });

  const suggestion = generateSuggestion(lead);

  activities.push({
    id: uuidv4(),
    leadId: lead.id,
    type: "suggestion_generated",
    data: suggestion,
    ts: new Date().toISOString()
  });

  res.json({ ok: true, suggestion });
});

// Take Action
router.post("/action/:id", (req, res) => {
  try {
    const lead = leads.find(l => l.id === req.params.id);
    if (!lead) return res.status(404).json({ ok: false, error: "not found" });

    const { action, payload } = req.body;

    activities.push({
      id: uuidv4(),
      leadId: lead.id,
      type: "action_taken",
      data: { action, payload },
      ts: new Date().toISOString()
    });

    // Update lead status based on action
    if (action === "approve_email" || action === "send_email") {
      lead.status = "contacted";
      lead.lastEmail = payload?.body || null;
    }
    if (action === "schedule_demo") {
      lead.status = "demo_scheduled";
      lead.demoAt = payload?.demoAt || null;
    }

    res.json({
      ok: true,
      lead,
      message: `Action '${action}' applied successfully`,
      activities
    });
  } catch (err) {
    console.error("Error in action:", err);
    res.status(500).json({ ok: false, error: "Failed to take action" });
  }
});

// Stats
router.get("/stats", (req, res) => {
  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});
  res.json({ ok: true, counts, total: leads.length });
});

module.exports = router;
