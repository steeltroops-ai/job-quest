import { useState, useEffect } from "react";
import { JobApplication, GoalTask } from "../types";

export function useJobStorage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [goal, setGoal] = useState<number>(5);
  const [goalTasks, setGoalTasks] = useState<GoalTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setApps(data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const fetchGoal = async () => {
    try {
      const res = await fetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoal(data.count);
      }
    } catch (err) {
      console.error("Failed to fetch goal", err);
    }
  };

  const fetchGoalTasks = async () => {
    try {
      const res = await fetch("/api/goal-tasks");
      if (res.ok) {
        const data = await res.json();
        setGoalTasks(data);
      }
    } catch (err) {
      console.error("Failed to fetch goal tasks", err);
    }
  };

  useEffect(() => {
    Promise.all([fetchJobs(), fetchGoal(), fetchGoalTasks()]).finally(() => setLoading(false));
  }, []);

  const addOrUpdateApp = async (app: JobApplication) => {
    if (!app.company || !app.role) return;
    
    const isEdit = apps.some(a => a.id === app.id);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/jobs/${app.id}` : "/api/jobs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setApps(prev => prev.map(a => a.id === saved.id ? saved : a));
        } else {
          setApps(prev => [saved, ...prev]);
        }
      }
    } catch (err) {
      console.error("Failed to save job", err);
    }
  };

  const deleteApp = async (id: number) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApps(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  const updateAppStatus = async (id: number, status: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...app, status }),
      });

      if (res.ok) {
        setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const updateGoal = async (newGoal: number) => {
    setGoal(newGoal);
    try {
      await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: newGoal }),
      });
    } catch (err) {
      console.error("Failed to update goal", err);
    }
  };

  const toggleGoalTask = async (task: GoalTask) => {
    const updated = { ...task, done: !task.done };
    setGoalTasks(prev => prev.map(t => t.id === task.id ? updated : t));

    try {
      await fetch(`/api/goal-tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const addGoalTask = async (task: Partial<GoalTask>) => {
    try {
      const res = await fetch("/api/goal-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (res.ok) {
        const saved = await res.json();
        setGoalTasks(prev => [...prev, saved]);
      }
    } catch (err) {
      console.error("Failed to add goal task", err);
    }
  };

  const deleteGoalTask = async (id: number) => {
    try {
      const res = await fetch(`/api/goal-tasks/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGoalTasks(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete goal task", err);
    }
  };

  return {
    apps,
    goal,
    goalTasks,
    loading,
    addOrUpdateApp,
    deleteApp,
    updateAppStatus,
    updateGoal,
    toggleGoalTask,
    addGoalTask,
    deleteGoalTask
  };
}
