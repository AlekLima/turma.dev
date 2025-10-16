export default function UserPage() {
  return (
    <main className="grid grid-rows-[1fr] grid-cols-[2.25fr_0.25fr_1.50fr_1fr] items-center justify-center my-auto min-h-screen">
      <div className="left-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'gray'}}>left content</div>
      <div className="center-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'green'}}>center</div>
      <div className="right-container flex items-center justify-center h-[300px] text-white" style={{ backgroundColor: 'red'}}>left content</div>
    </main>
  );
}
