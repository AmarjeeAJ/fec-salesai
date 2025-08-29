import React, { useState, useEffect } from "react";
import LeadForm from "./components/LeadForm";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [stats, setStats] = useState({});

  async function fetchLeads() {
    const r = await fetch("http://localhost:4000/api/leads");
    const j = await r.json();
    setLeads(j.leads);
  }

  async function fetchStats() {
    const r = await fetch("http://localhost:4000/api/leads/stats");
    const j = await r.json();
    setStats(j.counts || {});
  }

  useEffect(() => { fetchLeads(); fetchStats(); }, []);

  async function createLead(data) {
    await fetch("http://localhost:4000/api/leads", { 
      method:"POST", 
      headers:{ "Content-Type":"application/json" }, 
      body: JSON.stringify(data) 
    });
    fetchLeads(); fetchStats();
  }

  async function genSuggestion(lead) {
    setSelected(lead);
    const r = await fetch(`http://localhost:4000/api/leads/suggest/${lead.id}`, { method:"POST" });
    const j = await r.json();
    setSuggestion(j.suggestion);
  }

  async function takeAction(action, payload) {
    if (!selected) return;
    await fetch(`http://localhost:4000/api/leads/action/${selected.id}`, { 
      method:"POST", 
      headers:{ "Content-Type":"application/json" }, 
      body: JSON.stringify({ action, payload }) 
    });
    setSuggestion(null); 
    setSelected(null);
    fetchLeads(); fetchStats();
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold">FEC Sales & Marketing — AI-assisted Demo</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <LeadForm onCreate={createLead} />
          <div className="mt-4 p-4 border rounded">
            <h3 className="font-bold">Stats</h3>
            <ul>
              {Object.entries(stats).map(([k,v]) => <li key={k}>{k}: {v}</li>)}
            </ul>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="font-semibold">Leads</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {leads.map(l=>(
              <div key={l.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <div className="font-bold">{l.contactName} — {l.centerName}</div>
                  <div className="text-sm">Score: {l.score}</div>
                </div>
                <div className="text-sm">{l.email}</div>
                <div className="mt-2 flex gap-2">
                  <button 
                    onClick={()=>genSuggestion(l)} 
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    AI Suggest
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selected && suggestion && (
            <div className="mt-4 p-4 border rounded">
              <h3 className="font-bold">AI Suggestion</h3>

              {/* ✅ Show Score + Action */}
              <p className="mt-1"><strong>Score:</strong> {suggestion.score} / 100</p>
              <p className="mt-1"><strong>Recommended Action:</strong> {suggestion.recommendedAction}</p>

              {/* ✅ Suggested Email */}
              <h4 className="mt-3 font-semibold">Suggested Email</h4>
              <textarea 
                defaultValue={suggestion.email} 
                className="w-full p-2 border rounded mt-1" 
                rows={6} 
                id="suggestedEmail" 
              />

              {/* ✅ Suggested Call Script */}
              <h4 className="mt-3 font-semibold">Suggested Call Script</h4>
              <pre className="w-full p-2 border rounded bg-gray-50 text-sm whitespace-pre-wrap">
                {suggestion.callScript}
              </pre>

              <div className="flex gap-2 mt-3">
                <button 
                  onClick={async ()=>{ 
                    const body = document.getElementById("suggestedEmail").value; 
                    await takeAction("approve_email", { body }); 
                  }} 
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Approve & Send
                </button>

                <button 
                  onClick={()=>takeAction("schedule_demo", { demoAt: new Date().toISOString() })} 
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
