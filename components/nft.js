import react, {useState, useEffect} from "react";
import styles from "../styles/NFT.module.css"
import { Container } from "@chakra-ui/react";

export default function NFT(props) {
    const nftData = props.nftData;
    return (
        <Container className={styles.container} minH="80vh" maxW="40%" borderRadius="md">
            <img className={styles.nftImage} src={nftData.imageUrl} />
            <div className={styles.nftTitleCard}>
                <div className={styles.nftTitle}>
                    {nftData.name}
                </div>
                <div>
                    {nftData.description}
                </div>
                <div>
                    {nftData.offerPrice} {nftData.quoteCurrency}
                </div>
            </div>
        </Container>
    )
}