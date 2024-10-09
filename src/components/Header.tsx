export function Header() {
  return (
    <header className="flex w-full justify-around py-5">
      <div className="w-1/4">
        <a href="/" className=" font-semibold text-xl text-center">
          InBook
        </a>
      </div>
      <nav className="w-1/2 text-center">
        <ul className="flex items-center justify-around">
          <li>
            <a href="/books">Livros</a>
          </li>
          <li>
            <a href="/authors">Autores</a>
          </li>
        </ul>
      </nav>
      <span className="w-1/4"></span>
    </header>
  );
}
