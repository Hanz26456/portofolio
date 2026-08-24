import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    });
    setMessage("");
  };

  return (
    <div className="bg-white/90 dark:bg-zinc-900 border border-zinc-200 dark:border-gray-700 p-6 rounded-2xl shadow-md transition-colors duration-300 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-zinc-900 dark:text-white transition-colors duration-300">
        💬 Ruang Obrolan
      </h2>

      {/* Header user */}
      {user && (
        <div className="flex justify-between items-center mb-4 border-b border-zinc-200 dark:border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700" />
            <span className="text-zinc-900 dark:text-white font-semibold">{user.displayName}</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full text-white text-sm font-medium transition-colors"
          >
            Keluar
          </button>
        </div>
      )}

      {/* Area pesan */}
      <div className="h-72 overflow-y-auto border border-zinc-200 dark:border-gray-700 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 mb-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
            Belum ada pesan. Jadilah yang pertama menyapa!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 items-end ${msg.uid === user?.uid ? "justify-end" : "justify-start"}`}
            >
              {msg.uid !== user?.uid && (
                <img
                  src={msg.photoURL || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-7 h-7 rounded-full flex-shrink-0"
                />
              )}
              <div
                className={`p-3 rounded-2xl max-w-[75%] shadow-sm ${
                  msg.uid === user?.uid
                    ? "bg-violet-600 text-white rounded-br-none"
                    : "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-white rounded-bl-none"
                }`}
              >
                <div className={`text-[11px] font-medium mb-1 ${msg.uid === user?.uid ? "text-violet-200" : "text-zinc-500 dark:text-zinc-400"}`}>
                  {msg.displayName}
                </div>
                <div className="text-sm leading-relaxed">{msg.text}</div>
              </div>
              {msg.uid === user?.uid && (
                <img
                  src={msg.photoURL || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-7 h-7 rounded-full flex-shrink-0"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Form login / kirim pesan */}
      {user ? (
        <form onSubmit={sendMessage} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 min-w-0 p-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-colors cursor-pointer w-full sm:w-auto"
          >
            Kirim
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-2">
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-3 bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50 px-5 py-2.5 rounded-full shadow-sm transition font-medium text-sm cursor-pointer"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Masuk dengan Google
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Login untuk mengirim pesan</p>
        </div>
      )}
    </div>
  );
}
