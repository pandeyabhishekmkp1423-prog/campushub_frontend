export default function DarkToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDark}
      className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-full"
    >
      🌙
    </button>
  );
}
