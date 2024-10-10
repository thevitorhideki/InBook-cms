export function Header() {
  return (
    <header className="flex w-full justify-around items-center py-5">
      <div className="w-1/4">
        <h1 className=" font-semibold text-xl text-center">InBook</h1>
      </div>
      <nav className="w-1/2 text-center">
        <ul className="flex items-center justify-around">
          <li>
            <a href="/">Cadastrar livros</a>
          </li>
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
