// Demo data layer. Everything is kept in this browser's localStorage, so the
// trial form on the phone shows up in the dashboard on the same phone.
// A production version would swap these functions for a real backend.
(function () {
  const KEY = "krunch-demo-v1";
  const DAY = 86400000;

  const iso = (d) => new Date(d).toISOString();
  const daysFromNow = (n) => iso(Date.now() + n * DAY);
  const uid = () => Math.random().toString(36).slice(2, 10);

  function planById(id) {
    return GYM.plans.find((p) => p.id === id) || GYM.plans[0];
  }

  // Fictional members. Dates are relative to "now" so the dashboard always has
  // renewals due, lapsed members and people who stopped showing up.
  function seed() {
    const m = (name, phone, plan, endIn, lastVisitAgo, extra = {}) => {
      const p = planById(plan);
      const end = Date.now() + endIn * DAY;
      return {
        id: uid(), name, phone, plan: p.id, fee: p.price,
        start: iso(end - p.months * 30 * DAY), end: iso(end),
        lastVisit: daysFromNow(-lastVisitAgo), ...extra
      };
    };
    const members = [
      // Renewals due within a week
      m("Ravi Teja",        "9876500011", "monthly",   2,  1),
      m("Fatima Begum",     "9876500012", "quarterly", 4,  0),
      m("Karthik Rao",      "9876500013", "monthly",   6,  2),
      m("Sneha Reddy",      "9876500014", "yearly",    5,  1, { pt: true, trainer: "Prabhu" }),
      // Plan already ended, not renewed
      m("Imran Khan",       "9876500015", "monthly",  -3,  9),
      m("Lavanya P",        "9876500016", "quarterly",-9, 16),
      m("Vamshi Goud",      "9876500017", "monthly", -14, 20),
      // Active plan, but stopped coming
      m("Arjun Naik",       "9876500018", "quarterly", 40, 13),
      m("Mehak Sultana",    "9876500019", "yearly",   200, 18),
      m("Praveen Kumar",    "9876500020", "monthly",   21, 11),
      m("Divya Sree",       "9876500021", "quarterly", 55, 24),
      // Healthy, regular members
      m("Abdul Rahman",     "9876500022", "yearly",   300, 0, { pt: true, trainer: "Syed Sohail" }),
      m("Harika M",         "9876500023", "quarterly", 70, 1),
      m("Sai Charan",       "9876500024", "monthly",   18, 0),
      m("Nikhil Varma",     "9876500025", "yearly",   150, 2),
      m("Ayesha Siddiqua",  "9876500026", "quarterly", 33, 1, { pt: true, trainer: "Saba" }),
      m("Rohit Yadav",      "9876500027", "monthly",   25, 3),
      m("Pooja Sharma",     "9876500028", "yearly",   240, 1, { pt: true, trainer: "Jiya" }),
      m("Mohammed Faiz",    "9876500029", "quarterly", 80, 0),
      m("Srikanth B",       "9876500030", "monthly",   12, 2),
      m("Keerthi N",        "9876500031", "yearly",   120, 4),
      m("Zaid Ahmed",       "9876500032", "monthly",   15, 1),
      m("Bhavani D",        "9876500033", "quarterly", 60, 3),
      m("Tarun Chary",      "9876500034", "yearly",   190, 0)
    ];

    const leads = [
      { id: uid(), name: "Manoj", phone: "9000011122", goal: "Fat loss", time: "Evening", source: "trial", status: "new", createdAt: daysFromNow(-0.2) },
      { id: uid(), name: "Rukhsar", phone: "9000011133", goal: "Women's fitness", time: "Morning", source: "trial", status: "new", createdAt: daysFromNow(-1) },
      { id: uid(), name: "Harika M", phone: "9876500023", goal: "Muscle gain", time: "Morning", source: "pt", status: "new", createdAt: daysFromNow(-0.5) }
    ];

    const feedback = [
      { id: uid(), rating: 2, tags: ["Equipment"], message: "Treadmill 3 belt slipping since Monday. Only 2 treadmills working in the evening.", name: "Karthik Rao", phone: "9876500013", createdAt: daysFromNow(-0.3), resolved: false, kind: "issue" },
      { id: uid(), rating: 5, tags: ["Trainers", "Cleanliness"], message: "Prabhu sir corrected my squat form, knee pain gone.", name: "", phone: "", createdAt: daysFromNow(-1.2), resolved: true, kind: "feedback", reviewPrompted: true },
      { id: uid(), rating: 3, tags: ["Crowd"], message: "Too crowded at 7 PM, had to wait for the bench.", name: "", phone: "", createdAt: daysFromNow(-2), resolved: false, kind: "feedback", reviewPrompted: true }
    ];

    return {
      members, leads, feedback,
      // Results the owner would track during the 1-month trial.
      results: { recovered: 0, recoveredCount: 0, remindersSent: 0, reviewPrompts: 2 },
      seededAt: iso(Date.now())
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* storage blocked: fall through to fresh seed */ }
    const s = seed();
    save(s);
    return s;
  }

  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* demo still works for this page view */ }
  }

  let state = load();
  const commit = () => save(state);

  const daysUntil = (d) => Math.ceil((new Date(d) - Date.now()) / DAY);
  const daysSince = (d) => Math.floor((Date.now() - new Date(d)) / DAY);

  window.Store = {
    DAY, uid, planById, daysUntil, daysSince,
    get: () => state,
    reset() { state = seed(); commit(); },

    findMemberByPhone(phone) {
      const p = String(phone).replace(/\D/g, "").slice(-10);
      return state.members.find((m) => m.phone.slice(-10) === p);
    },
    checkIn(member) {
      member.lastVisit = iso(Date.now());
      member.visits = (member.visits || 0) + 1;
      commit();
    },
    addMember(data) {
      const p = planById(data.plan);
      const start = Date.now();
      const member = {
        id: uid(), name: data.name, phone: data.phone, plan: p.id, fee: p.price,
        start: iso(start), end: iso(start + p.months * 30 * DAY), lastVisit: iso(start)
      };
      state.members.unshift(member);
      commit();
      return member;
    },
    renew(member) {
      const p = planById(member.plan);
      const from = Math.max(Date.now(), new Date(member.end).getTime());
      member.start = iso(from);
      member.end = iso(from + p.months * 30 * DAY);
      member.renewedAt = iso(Date.now());
      state.results.recovered += p.price;
      state.results.recoveredCount += 1;
      commit();
    },
    markReminded(member) {
      member.remindedAt = iso(Date.now());
      state.results.remindersSent += 1;
      commit();
    },

    addLead(data) {
      const lead = { id: uid(), status: "new", createdAt: iso(Date.now()), ...data };
      state.leads.unshift(lead);
      commit();
      return lead;
    },
    setLeadStatus(id, status) {
      const l = state.leads.find((x) => x.id === id);
      if (l) { l.status = status; commit(); }
    },

    addFeedback(data) {
      const f = { id: uid(), resolved: false, createdAt: iso(Date.now()), ...data };
      state.feedback.unshift(f);
      commit();
      return f;
    },
    markReviewPrompted(id) {
      const f = state.feedback.find((x) => x.id === id);
      if (f && !f.reviewPrompted) { f.reviewPrompted = true; state.results.reviewPrompts += 1; commit(); }
    },
    resolveFeedback(id) {
      const f = state.feedback.find((x) => x.id === id);
      if (f) { f.resolved = true; commit(); }
    }
  };
})();
