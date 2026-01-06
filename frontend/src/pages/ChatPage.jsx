import ChatBox from "../components/ChatBox";
import Header from "../components/Header";

export default function ChatPage() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 rounded-4 overflow-hidden"
        style={{ width: "420px", height: "600px" }}
      >
        <Header />

        <div className="alert alert-light text-center py-1 mb-0 border-0">
          <small className="text-muted">
            MindBridge supports reflection — it does not replace professional help.
          </small>
        </div>

        <ChatBox />
      </div>
    </div>
  );
}



