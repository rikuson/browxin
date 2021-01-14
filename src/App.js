import 'bootswatch/dist/slate/bootstrap.min.css';
import styles from './App.module.css';
import CommandLine from './CommandLine';

function App() {
  return (
    <div className={styles.container}>
      <h1 className="display-3">Browxin</h1>
      <p className="lead">Browse in cross-platform!</p>
      <CommandLine autoFocus={true} />
    </div>
  );
}

export default App;
