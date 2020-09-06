import styles from "../styles/Home.module.css";
import { MainLayout } from "../client/components";
import { PrivateRoute } from "../client/HOC";

function PrivatePage() {
  return (
    <MainLayout>
      <h1 className={styles.title}>Private</h1>
    </MainLayout>
  );
}

export default PrivateRoute(PrivatePage);
