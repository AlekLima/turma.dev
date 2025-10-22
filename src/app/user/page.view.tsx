import "./styles.css"

export default function UserPage() {
  return (
    <main className="user-page-grid grid my-auto min-h-screen">
      <div className="user-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'gray'}}>left content</div>
      <div className="timeline-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'green'}}>center</div>
      <div className="content-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'red'}}>left content</div>
    </main>
  );
}
