import 'bootswatch/dist/slate/bootstrap.min.css';
import styles from './App.module.css';
import CommandLine from './CommandLine';

function App() {
  return (
    <div className={styles.container}>
      <h1 className="display-3">Browxin</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <CommandLine />
    </div>
  );
}

export default App;
