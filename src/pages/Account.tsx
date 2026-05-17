import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Account() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <main>
      <h1>Account</h1>

      <section>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>User ID:</strong> {user?.id}
        </p>

        <p>
          <strong>Plan:</strong> Free
        </p>
      </section>

      <button onClick={handleSignOut}>Log Out</button>
    </main>
  );
}