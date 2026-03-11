"use client";
import React, { useState } from "react";
import { T } from "@/shared/theme";
import { Pane, Label } from "@/shared/components/ui";
import { GoalTask } from "@/features/jobs/types";

interface GoalsViewProps {
  submitted: number;
  goal: number;
  wkApps: number;
  tasks: GoalTask[];
  onToggleTask: (task: GoalTask) => void;
  onAddTask: (task: Partial<GoalTask>) => void;
  onDeleteTask: (id: number) => void;
}

export function GoalsView({ submitted, goal, wkApps, tasks, onToggleTask, onAddTask, onDeleteTask }: GoalsViewProps) {
  const [newText, setNewText] = useState("");
  
  const handleAdd = () => {
    if (!newText.trim()) return;
    onAddTask({ text: newText.trim(), category: "Execution", done: false });
    setNewText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Pane pad="24px 26px">
        <Label style={{ marginBottom: 20 }}>Performance Milestones</Label>
        
        {/* Weekly Progress Card */}
        <div style={{ display: "flex", gap: 14, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 12, marginBottom: 20, alignItems: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
           <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text1, marginBottom: 4 }}>Weekly Application Velocity</div>
              <div style={{ fontSize: 11, color: T.text4, fontFamily: T.mono }}>Target: {goal} per week &middot; Current: {wkApps}</div>
           </div>
           <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: wkApps >= goal ? T.green : T.orange, fontFamily: T.mono }}>{Math.round((wkApps / goal) * 100)}%</div>
           </div>
        </div>

        {/* Dynamic Task List */}
        <div style={{ marginBottom: 20 }}>
          {tasks.map((task) => (
            <div key={task.id} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.045)", alignItems: "center" }}>
              <button 
                onClick={() => onToggleTask(task)}
                style={{ width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${task.done ? "rgba(52,199,89,0.7)" : "rgba(255,255,255,0.14)"}`, background: task.done ? "rgba(52,199,89,0.12)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
              >
                {task.done && <span style={{ fontSize: 12, color: T.green, fontWeight: 900 }}>✓</span>}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: task.done ? T.text3 : T.text1, textDecoration: task.done ? "line-through" : "none" }}>{task.text}</div>
                {task.note && <div style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>{task.note}</div>}
              </div>
              <button onClick={() => onDeleteTask(task.id)} style={{ background: "transparent", border: "none", color: "rgba(255,59,48,0.4)", fontSize: 14, cursor: "pointer", padding: "4px 8px" }}>×</button>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div style={{ padding: "40px 0", textAlign: "center", color: T.text4, fontSize: 12 }}>No goals defined. Define your path to dominance.</div>
          )}
        </div>

        {/* Add Task Input */}
        <div style={{ display: "flex", gap: 10 }}>
          <input 
            placeholder="Add new milestone..." 
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: T.text1, fontSize: 13, outline: "none" }}
          />
          <button onClick={handleAdd} className="btn-primary" style={{ padding: "0 18px", fontSize: 12 }}>Add</button>
        </div>
      </Pane>

      <div style={{ opacity: 0.5, fontSize: 10, textAlign: "center", color: T.text4, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 0" }}>
        Engineered for strategic execution &middot; Industry Standard Tracker
      </div>
    </div>
  );
}
