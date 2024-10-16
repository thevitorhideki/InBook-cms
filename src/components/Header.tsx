export function Header() {
  return (
    <nav className="w-full max-w-screen-lg mx-auto py-5">
      <ul className="flex items-center text-center justify-around">
        <li className="flex-1">
          <a href="/">Cadastrar livros</a>
        </li>
        <li className="flex-1">
          <a href="/books">Livros</a>
        </li>
        <li className="flex-1">
          <a href="/authors">Autores</a>
        </li>
      </ul>
    </nav>
  );
}
