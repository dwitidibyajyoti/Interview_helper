export default function Home({ title, tagline }) {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
      <p>{tagline}</p>

      <button
        style={{
          padding: "14px 22px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginTop: "30px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </main>
  );
}

// SSG — Static Site Generation
export async function getStaticProps() {
  return {
    props: {
      title: "Welcome to My Landing Page",
      tagline: "Fast. Simple. Beautiful.",
    },
  };
}
