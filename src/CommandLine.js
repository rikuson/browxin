import 'bootswatch/dist/slate/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function CommandLine() {
  return (
    <form className="input-group" action="//www.google.com/search" method="GET">
      <input name="q" className="form-control" style={{ margin: 1 }} type="search" placeholder="Search..." />
      <div className="input-group-append">
        <button className="btn btn-secondary" type="submit"><FontAwesomeIcon icon={faGoogle} /></button>
      </div>
    </form>
  );
}

export default CommandLine;
