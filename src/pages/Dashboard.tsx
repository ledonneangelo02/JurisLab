import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>

      <section>
        <h2>Your tools</h2>
        <a href="/generate-brief">Generate Brief</a>
      </section>
    </main>
  );
}