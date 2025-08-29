function scoreLead(lead) {
  let score = 0;

  // Company size
  if (lead.size === "large") score += 40;
  else if (lead.size === "medium") score += 25;
  else score += 10;

  // Budget
  if (lead.budget >= 50000) score += 40;
  else if (lead.budget >= 20000) score += 25;
  else score += 5;

  // Interest level
  if (lead.interest === "high") score += 20;
  else if (lead.interest === "medium") score += 10;

  return Math.min(100, score);
}

function generateSuggestion(lead) {
  const score = scoreLead(lead);

  // Score-based tiering
  let recommendedAction;
  let suggestionText;

  if (score >= 80) {
    recommendedAction = "call_now";
    suggestionText = "🔥 High priority! Call immediately to schedule a demo.";
  } else if (score >= 60) {
    recommendedAction = "email_then_call";
    suggestionText = "Send a personalized email, then follow up with a call in 2-3 days.";
  } else if (score >= 40) {
    recommendedAction = "nurture_email";
    suggestionText = "Put into nurture campaign with educational emails.";
  } else {
    recommendedAction = "low_priority";
    suggestionText = "Low priority. Keep for long-term newsletter updates.";
  }

  const email = `Hi ${lead.contactName},

We have an arcade/VR solution that boosts revenue. Based on your center size (${lead.size}) and budget ($${lead.budget}), I recommend the ${
    lead.size === "large"
      ? "Premium"
      : lead.size === "medium"
      ? "Standard"
      : "Starter"
  } package.

Would you be open to a short demo next week?

Best,
Sales Team`;

  const callScript = `Hi ${lead.contactName}, this is from ArcadeVR Sales. Do you currently run VR experiences? If yes: offer a demo. If no: explain revenue opportunities.`;

  return {
    score,
    email,
    callScript,
    recommendedAction,
    suggestionText,
  };
}

export { scoreLead, generateSuggestion };
