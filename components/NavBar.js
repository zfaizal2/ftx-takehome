import styles from "../styles/NavBar.module.css"
import Link from "next/link"

export default function NavBar() {
    return (
        <Link href="/">
            <div className={styles.title}>
                N(FTX)
            </div>
        </Link>
    )
}

