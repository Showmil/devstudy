function App() {
  let name = "리액트";
  return (
    <div className="container">
      <h1 className="test">
        Hello, {name === "리액트" ? <h1>YES</h1> : null}
      </h1>
      <p>반갑습니다.</p>
    </div>
  );
}