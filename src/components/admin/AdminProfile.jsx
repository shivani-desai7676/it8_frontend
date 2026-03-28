export default function AdminProfile() {

  const email = localStorage.getItem("admin");

  return (

    <div>

      <h2>Admin Profile</h2>

      <p>
        <b>Email:</b> {email}
      </p>

    </div>

  );
}
