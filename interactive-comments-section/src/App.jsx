import React, { useEffect, useState } from "react";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import dataFile from "./data.json";


const STORAGE_KEY = "commentsData_v1";

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { }
    return dataFile;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  const nextId = () => {
    const allIds = [];
    data.comments.forEach(c => {
      allIds.push(c.id);
      (c.replies || []).forEach(r => allIds.push(r.id));
    });
    return Math.max(0, ...allIds) + 1;
  };

  const addComment = (content) => {
    const comment = {
      id: nextId(),
      content,
      createdAt: "just now",
      score: 0,
      user: data.currentUser,
      replies: []
    };
    setData(prev => ({ ...prev, comments: [...prev.comments, comment] }));
  };

  const addReply = (parentId, content, replyingTo) => {
    const reply = {
      id: nextId(),
      content,
      createdAt: "just now",
      score: 0,
      replyingTo,
      user: data.currentUser
    };
    setData(prev => {
      const comments = prev.comments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, reply] };
        }
        return c;
      });
      return { ...prev, comments };
    });
  };

  const updateById = (id, newContent) => {
    setData(prev => {
      const comments = prev.comments.map(c => {
        if (c.id === id) return { ...c, content: newContent };
        const replies = c.replies.map(r => r.id === id ? { ...r, content: newContent } : r);
        return { ...c, replies };
      });
      return { ...prev, comments };
    });
  };

  const deleteById = (id) => {
    setData(prev => {
      const comments = prev.comments
        .map(c => ({ ...c, replies: c.replies.filter(r => r.id !== id) }))
        .filter(c => c.id !== id);
      return { ...prev, comments };
    });
  };

  const changeScore = (id, delta) => {
    setData(prev => {
      const comments = prev.comments.map(c => {
        if (c.id === id) return { ...c, score: Math.max(0, c.score + delta) };
        const replies = c.replies.map(r => r.id === id ? { ...r, score: Math.max(0, r.score + delta) } : r);
        return { ...c, replies };
      });
      return { ...prev, comments };
    });
  };

  return (
    <div className="app-container">
      <main className="comment-area" role="main">
        <CommentList
          comments={data.comments}
          currentUser={data.currentUser}
          onAddReply={addReply}
          onUpdate={updateById}
          onDelete={deleteById}
          onVote={changeScore}
        />
        <CommentForm
          currentUser={data.currentUser}
          placeholder="Add a comment..."
          btnText="SEND"
          onSubmit={addComment}
        />
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">DevbyDay</a>.
      </div>
      </main>
    </div>
  );
}
