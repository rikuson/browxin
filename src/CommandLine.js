import 'bootswatch/dist/slate/bootstrap.min.css';

function CommandLine() {
  return (
    <form className="input-group" action="//www.google.com/search" method="GET">
      <input name="q" className="form-control" style={{ margin: 1 }} type="search" />
      <div className="input-group-append">
        <button className="btn btn-secondary" type="submit">Search</button>
      </div>
    </form>
  );
}

export default CommandLine;
