import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <header>
        <h1>🌶️ Spice Spoon</h1>
        <Navbar />
      </header>

      <main>{children}</main>
    </>
  );
}

export default Layout;
